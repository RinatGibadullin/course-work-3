export interface ListResponse<T> extends Array<T> {
  meta?: {
    total?: number
    responseStatus?: number
  }
}