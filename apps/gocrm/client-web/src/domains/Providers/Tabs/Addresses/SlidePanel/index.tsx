import * as blocks from '@comigo/ui-blocks';
import * as addresses from '&crm/domains/Providers/Tabs/Addresses';

export default function SlidePanel() {
  const { slidePanelState, setSlidePanelState } = addresses.useAdress();
  return (
    <blocks.SlidePanel
      title={
        slidePanelState.type === 'create'
          ? 'Cadastrar endereço'
          : 'Editar endereço'
      }
      open={slidePanelState.open}
      handler={setSlidePanelState}
      formContent={
        slidePanelState.type === 'create' ? (
          <addresses.Create />
        ) : (
          <addresses.Update />
        )
      }
    />
  );
}
