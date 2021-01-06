import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AdminHomePageComponent } from './admin-home-page/admin-home-page.component';
import { AdminIndexPageComponent } from './admin-index-page/admin-index-page.component';
import { AdminPersonsRequestsPageComponent } from './admin-persons-requests-page/admin-persons-requests-page.component';
import { RepairOrderInfoPageComponent } from './admin-repair-order-info-page/admin-repair-order-info-page.component';
import { AdminReportsPageComponent } from './admin-reports-page/admin-reports-page.component';
import { AdminCarsTableDataPageComponent } from './admin-cars-table-data-page/admin-cars-table-data-page.component';
import { AdminClientsTableDataPageComponent } from './admin-clients-table-data-page/admin-clients-table-data-page.component';
import { AdminWorkersTableDataPageComponent } from './admin-workers-table-data-page/admin-workers-table-data-page.component';
import { AdminCarFormPageComponent } from './admin-car-form-page/admin-car-form-page.component';
import { AdminClientFormPageComponent } from './admin-client-form-page/admin-client-form-page.component';
import { AdminWorkerFormPageComponent } from './admin-worker-form-page/admin-worker-form-page.component';
import { AdminRepairOrderFormPageComponent } from './admin-reoair-order-form-page/admin-repair-order-form-page.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'admin', component: AdminHomePageComponent,
        children: [
          {path: '', redirectTo: '/index', pathMatch: 'full'},
          {path: 'index', component: AdminIndexPageComponent},
          {path: 'requests', component: AdminPersonsRequestsPageComponent},
          {path: 'reports', component: AdminReportsPageComponent},
          {path: 'clients_table', component: AdminClientsTableDataPageComponent},
          {path: 'cars_table', component: AdminCarsTableDataPageComponent},
          {path: 'workers_table', component: AdminWorkersTableDataPageComponent},
          {path: 'repair_order/:id', component: RepairOrderInfoPageComponent},
          {path: 'car_form', component: AdminCarFormPageComponent},
          {path: 'car_form/:id', component: AdminCarFormPageComponent},
          {path: 'client_form', component: AdminClientFormPageComponent},
          {path: 'client_form/:id', component: AdminClientFormPageComponent},
          {path: 'worker_form', component: AdminWorkerFormPageComponent},
          {path: 'worker_form/:id', component: AdminWorkerFormPageComponent},
          {path: 'repair_order_form', component: AdminRepairOrderFormPageComponent},
          {path: 'repair_order_form/:id', component: AdminRepairOrderFormPageComponent},
        ]
      }
    ])
  ],
  exports: [RouterModule]
})
export class AdminPagesRoutingModule {

}
