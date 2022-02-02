import * as blocks from '@comigo/ui-blocks';
import * as families from '&erp/domains/inventory/Registration/Families';

export function SlidePanel() {
  const { setSlidePanelState, slidePanelState } = families.useFamily();
  return (
    <blocks.SlidePanel
      title={
        slidePanelState.type === 'create'
          ? 'Cadastrar Família'
          : 'Editar Família'
      }
      open={slidePanelState.open}
      handler={setSlidePanelState}
      formContent={
        slidePanelState.type === 'create' ? (
          <families.Create />
        ) : (
          <families.Update />
        )
      }
    />
  );
}
