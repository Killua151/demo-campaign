export type TAction = {
  type: string | symbol;
  response?: any;
};

export type TActionRequest<T> = {
  type: string | symbol;
  params?: T;
};
