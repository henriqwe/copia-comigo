import * as blocks from '@comigo/ui-blocks'
import * as models from '&erp/domains/inventory/Registration/Models'

type ModeloSlide = {
  extra?: () => void
}

export function SlidePanel({ extra }: ModeloSlide) {
  const { slidePanelState, setSlidePanelState } = models.useModel()
  return (
    <blocks.Modal
      title={
        slidePanelState.type === 'create' ? 'Cadastrar Modelo' : 'Editar Modelo'
      }
      open={slidePanelState.open}
      handler={setSlidePanelState}
      formContent={
        slidePanelState.type === 'create' ? (
          <models.Create extra={extra} />
        ) : (
          <models.Update />
        )
      }
    />
  )
}
