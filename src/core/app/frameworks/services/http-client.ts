import {
  HttpClientEmptyRequest,
  HttpClientEmptyResponse,
  HttpClientRequest,
  HttpClientResponse,
  IHttpClient,
} from '@app/use-cases/services/http-client'

// TODO: implement whatever lib we want :-)
export class HttpClient implements IHttpClient {
  get<T>(request: HttpClientEmptyRequest): Promise<HttpClientResponse<T>> {
    throw new Error('Method not implemented.')
  }
  post<T>(request: HttpClientRequest<T>): Promise<HttpClientResponse<T>> {
    throw new Error('Method not implemented.')
  }
  put<T>(
    request: HttpClientRequest<Partial<T>>
  ): Promise<HttpClientResponse<T>> {
    throw new Error('Method not implemented.')
  }
  delete(request: HttpClientEmptyRequest): Promise<HttpClientEmptyResponse> {
    throw new Error('Method not implemented.')
  }
}
