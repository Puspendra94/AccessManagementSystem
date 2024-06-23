import { IRequestData } from "./IRequestData.interface";

export interface IAxiosOption {
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    requestData?: IRequestData,
    headers?: Record<string, any>,
}