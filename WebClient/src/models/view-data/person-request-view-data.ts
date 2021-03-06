// класс для представления данных по обращению человека в сервис
export class PersonRequestViewData{
  // конструктор со свойствами класса
  constructor(
    public id: number, // id - обращения
    public name: string, // имя персоны
    public surname: string, // фамилия персоны
    public patronymic: string, // отчество персоны
    public passport: string, // паспорт
    public telephone: string, // телефон персоны
    public descriptionOfTheProblem: string, // описание проблемы
    public status: string // статус обращения
  ){
  }
}
