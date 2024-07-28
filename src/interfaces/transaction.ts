export interface Transaction {
  nit: string
  name: string
  detail: string
  extra: string
  value: number
  category?: string
}

export enum Status {
  Pending,
  Success,
  Error
}