﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Maintenance.Models.MaintenanceEntities;
using Microsoft.EntityFrameworkCore;
using WebApplication.Data;
using WebApplication.Models.Utils;
using WebApplication.Models.ViewData;

namespace WebApplication.Models.Processes
{
    public class ClientProcess {
        // данные бд
        private readonly MaintenanceDatabaseContext _context;
        // обработка для персоны
        private readonly PersonProcess _personProcess;
        public ClientProcess(MaintenanceDatabaseContext context) {
            _context = context;
            _personProcess = new PersonProcess(_context);
        }

        // добавить адрес
        private async Task AppendAddress(Address address) {
            _context.Addresses.Add(address);
            await _context.SaveChangesAsync();
        }

        // получить всех клиентов
        public IEnumerable<ClientViewData> GetClientsData(int page = 1) {
            // если вдруг у нас номер таблицы будет равен нулю то мы кидаем исключение
            if (page == 0) throw new Exception("Недопустимая страница данных.");

            return _context.Clients
                .Include(c => c.Address)
                .Include(c => c.Person)
                .Select(c => new ClientViewData(c, c.Person, c.Address))
                .Skip(page * 10 - 10)
                .Take(10);
        }

        // получить определенного клиента
        public ClientViewData GetClientData(int id) {
            Client result = _context.Clients
                .Include(c => c.Address)
                .Include(c => c.Person)
                .FirstOrDefault(p => p.Id == id);
            if (result == null) throw new Exception("Клиент не был найден");
            return new ClientViewData(result, result.Person, result.Address);
        }

        // добавить нового клиента
        public async Task AppendClient(ClientViewData clientViewData) {
            // проверка данных по персоне
            Person person = new Person{
                Surname = clientViewData.Surname,
                Name = clientViewData.Name,
                Patronymic = clientViewData.Patronymic,
                Passport = clientViewData.Passport
            };

            // проверяем есть ли уже человек с таким паспортом но с другими ФИО. Если есть то мы будем кидать исключение
            if (_context.Persons.Any(p =>
                p.Passport == person.Passport && (p.Surname != person.Surname || p.Patronymic != person.Patronymic ||
                                                  p.Name != person.Name)))
                throw new WebApiException("Человек с таким паспортом уже существует. Проверьте корректность данных");

            // если у нас нет такого человека с такими данными, то мы добавляем его
            if (!_context.Persons.Any(p => p.Passport == person.Passport)) await _personProcess.AppendPerson(person);

            // проверка данных по адресу
            Address address = new Address {
                Building = clientViewData.Building, 
                Street = clientViewData.Street, 
                Flat = clientViewData.Flat
            };

            // в случае если мы не нашли такой адрес, то мы просто будем добавлять его
            if (!_context.Addresses.Any(a =>
                a.Street == address.Street && a.Building == address.Building && a.Flat == address.Flat))
                await AppendAddress(address);

            // создание и добавление клиента в БД
            Client client = new Client {
                PersonId = _context.Persons.First(p => p.Passport == person.Passport).Id,
                AddressId = _context.Addresses.First(a => a.Street == address.Street && a.Building == address.Building && a.Flat == address.Flat).Id,
                DateOfBorn = clientViewData.DateOfBorn,
                TelephoneNumber = clientViewData.TelephoneNumber
            };
            _context.Clients.Add(client);
            await _context.SaveChangesAsync();
        }

        // изменение данных клиента
        public async Task ChangeClient(ClientViewData clientViewData) {
            // получаем клиента для изменения
            Client client = _context.Clients.First(c => c.Id == clientViewData.Id);
            if(client == null) throw new WebApiException("Клиента не был найден");

            // создание человека
            Person person = new Person {
                Surname = clientViewData.Surname,
                Name = clientViewData.Name,
                Patronymic = clientViewData.Patronymic,
                Passport = clientViewData.Passport
            }; 
            // изменение данных персоны
            await _personProcess.ChangePerson(person);

            Address address = new Address {
                Street = clientViewData.Street,
                Building = clientViewData.Building,
                Flat = clientViewData.Flat
            };
            // добавление нового адреса
            // тут на самом деле очень спорный момент что именно нам делать,
            // менять адрес или добавлять его
            // с одной стороны адрес может измениться только потому что у клиента изменилось место жительство
            // с другой стороны может быть была какая-то опечатка. Поэтому я поставлю добавление, так будет правильнее на мой взгляд
            if(!_context.Addresses.Any(a => a.Street == address.Street && a.Building == address.Building && a.Flat == address.Flat))
                await AppendAddress(address);

            client.TelephoneNumber = clientViewData.TelephoneNumber;

            var id = _context.Addresses.FirstOrDefault(a => a.Street == address.Street && a.Building == address.Building && a.Flat == address.Flat)?.Id;
            if (id != null) client.AddressId = (int)id;

            await _context.SaveChangesAsync();
        }

        // поиск клиента для обработки в заявке на ремонт
        public async Task<bool> IsSetClient(string passport) =>
            await _context.Clients.AnyAsync(c => c.Person.Passport == passport);

        public int GetTableCount() => _context.Clients.Count();
    }
}
