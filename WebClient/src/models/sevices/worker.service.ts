import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { WorkerViewData } from "../view-data/worker-view-data";

@Injectable()
export class WorkerService{
  constructor(private http: HttpClient) {}

  // получение данных о всех работниках
  getWorkersViewData(page: number): any {
    return this.http.get<WorkerViewData[]>(`http://localhost:55280/api/WorkerViewData/GetWorkers/${page}`);
  }

  getWorkersTableInfo(): any {
    return this.http.get<any>('http://localhost:55280/api/WorkerViewData/GetInfoTable');
  }

  // получение данных о конкретном работнике
  getWorkerViewData(id: number): any {
    return this.http.get<WorkerViewData>(`http://localhost:55280/api/WorkerViewData/GetWorker/${id}`);
  }

  getWorkersString(): any {
    return this.http.get<string[]>('http://localhost:55280/api/WorkerViewData/GetWorkersForSelect');
  }

  // добавление нового работника
  postWorkerViewData(workerViewData: WorkerViewData): any{
    return this.http.post('http://localhost:55280/api/WorkerViewData/PostWorker', workerViewData, {headers: new HttpHeaders().set('Access-Control-Allow-Origin', 'Access-Control-Allow-Methods')});
  }

  // удаление работника DeleteWorker
  deleteWorkerViewData(id: number): any {
    return this.http.delete(`http://localhost:55280/api/WorkerViewData/DeleteWorker/${id}`);
  }
}
