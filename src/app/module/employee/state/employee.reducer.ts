import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {createFeature, createReducer, createSelector, on} from '@ngrx/store';
import {Employee} from '../model';
import {EmployeeAction} from './employee.action';

export const EMPLOYEE_FEATURE_KEY = 'employee';

export interface EmployeeState extends EntityState<Employee> {
  loading: boolean;
  pageIndex: number;
  pageSize: number;
  total: number;
}

const adapter = createEntityAdapter<Employee>({selectId: e => e.id});

const initialState: EmployeeState = adapter.getInitialState({
  loading: false,
  pageIndex: 0,
  pageSize: 10,
  total: 0,
});

const reducer = createReducer(
  initialState,

  on(EmployeeAction.load, (state, {pageIndex, pageSize}) => ({
    ...state, loading: true, pageIndex, pageSize
  })),
  on(EmployeeAction.loadSuccess, (state, {items, total}) => {
    const s = adapter.setAll(items, state);
    return {...s, loading: false, total};
  }),
  on(EmployeeAction.loadFailure, state => ({...state, loading: false})),


  on(EmployeeAction.getById, (state, {id}) => ({
    ...state, loading: true, id
  })),
  on(EmployeeAction.getByIdSuccess, (state, {employee}) => {
    return {...state, loading: false, employee};
  }),
  on(EmployeeAction.getByIdFailure, state => ({...state, employee: undefined, loading: false})),
  on(EmployeeAction.getByIdClear, state => ({...state, employee: undefined, loading: false})),

  on(EmployeeAction.create, state => ({...state, loading: true})),
  on(EmployeeAction.createSuccess, (state, {employee}) => {
    const s = adapter.addOne(employee, state);
    return {...s, loading: false, total: state.total + 1};
  }),
  on(EmployeeAction.createFailure, state => ({...state, loading: false})),

  on(EmployeeAction.update, state => ({...state, loading: true})),
  on(EmployeeAction.updateSuccess, (state, {employee}) => {
    if (!employee) return {...state, loading: false};
    const s = adapter.upsertOne(employee, state);
    return {...s, loading: false};
  }),
  on(EmployeeAction.updateFailure, state => ({...state, loading: false})),

  on(EmployeeAction.delete, state => ({...state, loading: true})),
  on(EmployeeAction.deleteSuccess, state => ({...state, loading: false})),
  on(EmployeeAction.deleteFailure, state => ({...state, loading: false})),

  on(EmployeeAction.setPage, (state, {pageIndex, pageSize}) => ({...state, pageIndex, pageSize})),
);

export const employeeFeature = createFeature({
  name: EMPLOYEE_FEATURE_KEY,
  reducer,
  extraSelectors: ({selectEmployeeState}) => {
    const selectStateSafe = (state: any) => selectEmployeeState(state) ?? initialState;

    const {
      selectAll,
      selectEntities,
      selectIds,
      selectTotal,
    } = adapter.getSelectors(selectStateSafe);

    const selectLoading = createSelector(selectStateSafe, s => s.loading);
    const selectPageIndex = createSelector(selectStateSafe, s => s.pageIndex);
    const selectPageSize = createSelector(selectStateSafe, s => s.pageSize);
    const selectTotalCount = createSelector(selectStateSafe, s => s.total);
    const selectSelectedId = createSelector(selectStateSafe, s => (s as any).id as string | undefined);
    const currentEmployee = createSelector(selectStateSafe, s => (s as any).employee);

    const selectViewModel = createSelector(
      selectAll, selectTotalCount, selectPageIndex, selectPageSize, selectLoading,
      (items, total, pageIndex, pageSize, loading) => ({items, total, pageIndex, pageSize, loading})
    );

    return {
      selectAllEmployee: selectAll,
      selectEmployeeEntities: selectEntities,
      selectEmployeeIds: selectIds,
      selectEmployeeCount: selectTotal,
      selectEmployeeLoading: selectLoading,
      selectEmployeePageIndex: selectPageIndex,
      selectEmployeePageSize: selectPageSize,
      selectEmployeeTotal: selectTotalCount,
      selectSelectedEmployeeId: selectSelectedId,
      selectCurrentEmployee: currentEmployee,
      selectViewModel,
    };
  },
});
