import { EHttpStatus } from '@ts-extension/http'

export type ApiResponse<T> = {
  status: EHttpStatus
  data: T | ApiErrorResponse
}

export type ApiErrorResponse = {
  error: string
}

// export function isApiErrorResponse<T>(
//   response: ApiResponse<T>
// ): response is ApiResponse<T> {
//   return (response.data as ApiErrorResponse).error !== undefined
// }
