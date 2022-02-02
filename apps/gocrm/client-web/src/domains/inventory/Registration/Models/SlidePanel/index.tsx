import * as blocks from '@comigo/ui-blocks';
import * as models from '&crm/domains/inventory/Registration/Models';

type ModeloSlide = {
  extra?: () => void;
};

export default function SlidePanel({ extra }: ModeloSlide) {
  const { slidePanelState, setSlidePanelState } = models.useModel();
  return (
    <blocks.SlidePanel
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
  );
}
