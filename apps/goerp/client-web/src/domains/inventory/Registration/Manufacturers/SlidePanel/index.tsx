import * as blocks from '@comigo/ui-blocks';
import * as manufacturers from '&erp/domains/inventory/Registration/Manufacturers';

export function SlidePanel() {
  const { slidePanelState, setSlidePanelState } =
    manufacturers.useManufacturer();
  return (
    <blocks.SlidePanel
      title={
        slidePanelState.type === 'create'
          ? 'Cadastrar Fabricante'
          : 'Editar Fabricante'
      }
      open={slidePanelState.open}
      handler={setSlidePanelState}
      formContent={
        slidePanelState.type === 'create' ? (
          <manufacturers.Create />
        ) : (
          <manufacturers.Update />
        )
      }
    />
  );
}
