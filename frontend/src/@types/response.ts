type Response<T, U> = Success<T> | Error<U>;

export type Success<T> = {
    status: string;
    message: string;
    data: T;
};
export type Error<U> = {
    status: string;
    message: U;
};

export default Response;
