import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {Employee} from '../model';

export const EmployeeAction = createActionGroup({
  source: 'Employee',
  events: {
    load: props<{  pageIndex: number; pageSize: number }>(),
    loadSuccess: props<{ items: Employee[]; total: number }>(),
    loadFailure: props<{ error: unknown }>(),

    getById: props<{  id: string }>(),
    getByIdSuccess: props<{ employee: Employee; }>(),
    getByIdFailure: props<{ error: unknown }>(),
    getByIdClear: props<{ employee?: Employee }>(),

    create: props<{ employee: Employee }>(),
    createSuccess: props<{ employee: Employee }>(),
    createFailure: props<{ error: unknown }>(),

    update: props<{ id: string; changes: Partial<Employee> }>(),
    updateSuccess: props<{ employee?: Employee }>(),
    updateFailure: props<{ error: unknown }>(),

    delete: props<{ id: string }>(),
    deleteSuccess: emptyProps(),
    deleteFailure: props<{ error: unknown }>(),

    setPage: props<{ pageIndex: number; pageSize: number }>(),
  },
});
