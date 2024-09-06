export interface IAuthUser {
    name: string;
    email: string;
    _id: string
}

export interface CustomHttpResponse<T> {
    status: number;
    error: boolean;
    data: T
}