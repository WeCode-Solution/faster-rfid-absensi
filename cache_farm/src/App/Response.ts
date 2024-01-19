interface QueryResponse<T> {
  message: string
  data?: T
}

export default function <T> (message: string, data?: T): QueryResponse<T> {
  return {
    message,
    data
  }
}
