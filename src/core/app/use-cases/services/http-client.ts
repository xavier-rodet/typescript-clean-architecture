import { Hash } from '@ts-extension/hash'
import { EHttpStatus } from '@ts-extension/http'

export type HttpClientRequest<T> = {
  url: string
  query?: Hash
  payload: T
}

export type HttpClientEmptyRequest = Omit<HttpClientRequest<never>, 'payload'>

// TODO: create safe guard method, 4xx/5xx => Error message instead of T
export type HttpClientResponse<T> = {
  data: T
  status: EHttpStatus
  error?: string
}

export type HttpClientEmptyResponse = Omit<HttpClientResponse<never>, 'data'>

export interface IHttpClient {
  get<T>(request: HttpClientEmptyRequest): Promise<HttpClientResponse<T>>
  post<T>(request: HttpClientRequest<T>): Promise<HttpClientResponse<T>>
  put<T>(request: HttpClientRequest<Partial<T>>): Promise<HttpClientResponse<T>>
  delete(request: HttpClientEmptyRequest): Promise<HttpClientEmptyResponse>
}
