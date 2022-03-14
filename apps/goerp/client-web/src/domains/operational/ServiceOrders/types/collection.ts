import { ReactNode } from "react"

export type CollectionType = {
  Name: ReactNode
  MembershipPrice: string | number
  RecurrencePrice: string | number
  Type: string
}
