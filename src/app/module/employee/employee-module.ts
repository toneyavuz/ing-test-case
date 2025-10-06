import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {EmployeeCreateAndEditForm} from './component/employee-create-and-edit-form/employee-create-and-edit-form';
import {EmployeeDeleteDialog} from './component/employee-delete-dialog/employee-delete-dialog';
import {EmployeeListCardView} from './component/employee-list-card-view/employee-list-card-view';
import {EmployeeListHeader} from './component/employee-list-header/employee-list-header';
import {EmployeeListListView} from './component/employee-list-list-view/employee-list-list-view';
import {EmployeeListPagination} from './component/employee-list-pagination/employee-list-pagination';

import {EmployeeRoutingModule} from './employee-routing-module';
import {EMPLOYEE_FEATURE_KEY, EmployeeEffects, employeeFeature} from './state';

@NgModule({
  declarations: [
    EmployeeListHeader,
    EmployeeListPagination,
    EmployeeListListView,
    EmployeeListCardView,
    EmployeeCreateAndEditForm,
    EmployeeDeleteDialog,
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    ReactiveFormsModule,
    FormsModule,

    //#region NgRx
    StoreModule.forFeature(EMPLOYEE_FEATURE_KEY, employeeFeature.reducer),
    EffectsModule.forFeature([EmployeeEffects]),
    //#endregion NgRx

    //#region Material
    MatToolbarModule, MatIconModule, MatButtonModule, MatMenuModule,
    MatCardModule, MatTableModule, MatPaginatorModule, MatFormFieldModule,
    MatInputModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule,
    MatDialogModule, MatSnackBarModule, MatTooltipModule, MatButtonToggleModule,
    MatBadgeModule, MatDividerModule, MatProgressSpinnerModule, MatAutocompleteModule,
    //#endregion Material
  ]
})
export class EmployeeModule {
}
