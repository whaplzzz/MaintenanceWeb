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
  currentPage = 1;
  maxPages = 10;
  maxCount = 10;

  constructor(private router: Router, private clientService: ClientService){}

  ngOnInit(): void {
    // получаем данные о всех клиентах
    this.clientService.getClientsViewData().subscribe((data: any[]) => {
      this.clientsViewData = data as ClientViewData[];
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

  changePage(page: number): void {
    this.clientService.getClientsViewData().subscribe((data: any[]) => {
      this.clientsViewData = data as ClientViewData[];

      document.getElementById(`data-page-${this.currentPage}`)?.classList.add('btn-outline-secondary');
      document.getElementById(`data-page-${this.currentPage}`)?.classList.remove('btn-secondary');
      this.currentPage = page;
      document.getElementById(`data-page-${this.currentPage}`)?.classList.add('btn-secondary');
      document.getElementById(`data-page-${this.currentPage}`)?.classList.remove('btn-outline-secondary');
    });
  }

  createRange(range: number): any[] {
    const items = [];
    for (let i = 1; i <= range; i++) {
       items.push(i);
    }
    return items;
  }
}
