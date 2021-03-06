import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IDate } from 'src/models/interfaces/IDate';
import { ClientService } from 'src/models/sevices/client.service';
import { ClientViewData } from 'src/models/view-data/client-view-data';

@Component({
  selector: 'admin-client-table-data-page',
  templateUrl: './admin-clients-table-data-page.component.html',
})
export class AdminClientsTableDataPageComponent implements OnInit, IDate{
  clientsViewData!: ClientViewData[]; // клианты
  currentPage!: number;
  maxPages!: number;
  maxCount!: number;

  constructor(private router: Router, private clientService: ClientService){}

  ngOnInit(): void {
    this.currentPage = 1;
    // получаем данные о всех клиентах
    this.sendData(this.currentPage, () => {
      this.clientService.getClientsTableInfo().subscribe((info: any) => {
        this.maxPages = info.maxPages;
        this.maxCount = info.count;
      });
    });
  }

  // бавление клиента
  appendNewClient(): void {
    this.router.navigate(['admin/client_form']);
  }

  // редактирование клиента
  editClient(id: number): void {
    this.router.navigate(['admin/client_form', id]);
  }

  // посмотреть информацию о клиенте
  infoClient(id: number): void {
    this.router.navigate(['admin/client_info', id]);
  }

  // показать нормальную дату
  showCorrectDate(date: any): string {
    return new Date(date).toLocaleDateString();
  }

  // отправка запроса на сервер с дополнительным действием
  sendData(page: number, addEvent: any): void {
    // пофторное получение данных по конкретной странице таблицы
    this.clientService.getClientsViewData(page).subscribe((data: any[]) => {
      this.clientsViewData = data as ClientViewData[];

      // если у нас нет дополнительного действия, то мы естественно его не выполняем :)
      if (addEvent !== null && addEvent !== undefined) {
        addEvent();
      }
    });
  }
}
