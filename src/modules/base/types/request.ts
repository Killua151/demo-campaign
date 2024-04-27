export interface IResponse<T> {
  status: string;
  data: T;
  trace_id?: number | string;
}
