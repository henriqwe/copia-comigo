import { Dispatch, SetStateAction } from 'react'
import * as types from '&crm/domains/clients/types'

type GetRecurrenceTotalValueProps = {
  benefits: types.ListBenefitType[]
  setTotalValue: Dispatch<SetStateAction<number>>
}

export async function getRecurrenceTotalValue({
  benefits,
  setTotalValue
}: GetRecurrenceTotalValueProps) {
  let total = 0
  benefits.filter(benefit => benefit.Active).map((benefit) => {
    if (benefit.RecurrencePrice) {
      total += Number(benefit.RecurrencePrice)
    }
  })
  setTotalValue(total)
}
