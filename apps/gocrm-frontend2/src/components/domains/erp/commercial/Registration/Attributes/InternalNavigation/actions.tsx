import * as attributes from '&test/components/domains/erp/commercial/Registration/Attributes'

export function Actions() {
  const { setSlidePanelState } = attributes.useAttribute()
  const actions = [
    {
      title: 'Atributo',
      handler: () => {
        event?.preventDefault()
        setSlidePanelState({ open: true, type: 'create' })
      }
    }
  ]
  return actions
}
