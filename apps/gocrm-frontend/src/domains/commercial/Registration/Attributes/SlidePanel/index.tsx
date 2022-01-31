import * as blocks from '@comigo/ui-blocks'
import * as attributes from '&crm/domains/commercial/Registration/Attributes'

export default function SlidePanel() {
  const { slidePanelState, setSlidePanelState } = attributes.useAttribute()
  return (
    <blocks.Modal
      title={
        slidePanelState.type === 'create'
          ? 'Cadastrar Atributo'
          : 'Editar Atributo'
      }
      open={slidePanelState.open}
      handler={setSlidePanelState}
      formContent={
        slidePanelState.type === 'create' ? (
          <attributes.Create />
        ) : (
          <attributes.Update />
        )
      }
    />
  )
}
