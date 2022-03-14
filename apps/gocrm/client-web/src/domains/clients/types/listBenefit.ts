import { ReactNode } from "react"

export type ListBenefitType = {
  Name: ReactNode
  MembershipPrice: string
  RecurrencePrice: string
  Active: boolean
}