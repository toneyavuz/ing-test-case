import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EmployeeCreateAndEditForm} from './component/employee-create-and-edit-form/employee-create-and-edit-form';
import {EmployeeListCardView} from './component/employee-list-card-view/employee-list-card-view';
import {EmployeeListListView} from './component/employee-list-list-view/employee-list-list-view';

const routes: Routes = [
  {path: '', component: EmployeeListListView},
  // {path: '', redirectTo: 'list', pathMatch: 'full'}, // redirect version
  {path: 'list', component: EmployeeListListView},
  {path: 'card', component: EmployeeListCardView},
  {path: 'add', component: EmployeeCreateAndEditForm},
  {path: 'edit/:id', component: EmployeeCreateAndEditForm},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule {
}
