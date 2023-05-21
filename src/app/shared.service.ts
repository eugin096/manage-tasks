import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private parentData: BehaviorSubject<any> = new BehaviorSubject({}); 
  constructor() { }

  setParentData(data: any): void {
    this.parentData.next(data);
  }
  getParentData(): Observable<any> {
    return this.parentData.asObservable();
  }
}
