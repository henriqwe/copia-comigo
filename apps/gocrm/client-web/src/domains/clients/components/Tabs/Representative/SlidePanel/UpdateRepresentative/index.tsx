import { Documents } from '../../../Documents'
import * as representatives from '&crm/domains/clients/components/Tabs/Representative'

export function Update() {
  const { slidePanelState } = representatives.useRepresentative()

  return (
    <Documents Id={slidePanelState.data?.Pessoa.Id} path="representative" />
  )
}
