import * as flowStages from '&crm/domains/erp/services/Registration/Flows/Stage'

export function Actions() {
  const { setSlidePanelState } = flowStages.useStage()
  const actions = [
    {
      title: 'Etapa de Fluxo',
      handler: () => {
        event?.preventDefault()
        setSlidePanelState({ open: true, type: 'create' })
      }
    }
  ]
  return actions
}
