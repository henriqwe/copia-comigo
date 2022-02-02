import * as blocks from '@comigo/ui-blocks';
import * as products from '&erp/domains/portfolio/Pricing/Tabs/Products';

export function SlidePanel() {
  const { slidePanelState, setSlidePanelState } = products.useProduct();
  return (
    <blocks.SlidePanel
      title={
        slidePanelState.type === 'pricing'
          ? 'Precificar produto'
          : 'Vincular item'
      }
      open={slidePanelState.open}
      handler={setSlidePanelState}
      formContent={
        slidePanelState.type === 'pricing' ? (
          <products.Price />
        ) : (
          <products.ItemLink />
        )
      }
    />
  );
}
