import * as blocks from '@comigo/ui-blocks';
import * as sellers from '&crm/domains/Providers/Tabs/Sellers';

export default function SlidePanel() {
  const { slidePanelState, setSlidePanelState } = sellers.useSeller();
  return (
    <blocks.SlidePanel
      title={
        slidePanelState.type === 'create'
          ? 'Cadastrar vendedor'
          : 'Editar vendedor'
      }
      open={slidePanelState.open}
      handler={setSlidePanelState}
      formContent={
        slidePanelState.type === 'create' ? (
          <sellers.Create />
        ) : (
          <sellers.Update />
        )
      }
    />
  );
}
