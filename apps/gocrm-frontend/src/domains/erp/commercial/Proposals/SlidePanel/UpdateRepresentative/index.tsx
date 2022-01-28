import { Documents } from '../../../Documents'
import * as representatives from '&crm/domains/erp/identities/Clients/Tabs/Representative'

export default function UpdateRepresentative() {
  const { slidePanelState } = representatives.useRepresentative()

  return <Documents Id={slidePanelState.data?.Id} />
}
