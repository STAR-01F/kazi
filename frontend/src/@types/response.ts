type Response<T, U> = Success<T> | Error<U>;

export type Success<T> = {
  status: 'Success';
  message: string;
  data: T;
};
export type Error<U> = {
  status: 'Error';
  message: U;
};

export default Response;
