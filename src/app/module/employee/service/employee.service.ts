import {Injectable} from '@angular/core';
import {delay, map, Observable, of} from 'rxjs';
import {Employee} from '../model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private store: Employee[] = Array.from({length: 100}, (_, i) => ({
    id: (i + 1).toString(),
    firstName: 'Ahmet',
    lastName: 'Sourtimes',
    dateOfEmployment: '2022-09-23',
    dateOfBirth: '1995-06-21',
    phone: '+90 532 123 45 67',
    email: 'ahmet@sourtimes.org',
    department: 'Analytics',
    position: 'Junior'
  }));

  list(): Observable<Employee[]> {
    return of([...this.store]).pipe(delay(150));
  }

  listPaged(params: { pageIndex?: number; pageSize?: number; }): Observable<{
    items: Employee[];
    total: number;
  }> {
    const {pageIndex = 0, pageSize = 10} = params;
    return this.list().pipe(
      map(all => {
        const start = pageIndex * pageSize;
        const items = all.slice(start, start + pageSize);
        return {items, total: all.length};
      })
    );
  }

  getById(id: string): Observable<Employee | undefined> {
    return this.list().pipe(map(all => all.find(e => e.id === id)));
  }

  create(employee: Employee): Observable<Employee> {
    const newEmp: Employee = {...employee, id: (this.store.length + 1).toString()};
    this.store = [...this.store, newEmp];
    return of(newEmp).pipe(delay(150));
  }

  update(id: string, changes: Partial<Employee>): Observable<Employee | undefined> {
    let updated: Employee | undefined;
    this.store = this.store.map(e => {
      if (e.id === id) {
        updated = {...e, ...changes, id};
        return updated;
      }
      return e;
    });
    return of(updated).pipe(delay(150));
  }

  delete(id: string): Observable<boolean> {
    const before = this.store.length;
    this.store = this.store.filter(e => e.id !== id);
    return of(this.store.length < before).pipe(delay(150));
  }
}
