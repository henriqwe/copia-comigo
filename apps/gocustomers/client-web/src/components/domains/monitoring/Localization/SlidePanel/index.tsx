import * as blocks from '@comigo/ui-blocks';
import * as localizations from '../index';

export default function SlidePanel() {
  const { slidePanelState, setSlidePanelState } =
    localizations.useLocalization();
  return (
    <blocks.SlidePanel
      title={'Histórico'}
      open={slidePanelState.open}
      handler={setSlidePanelState}
      formContent={<localizations.HistoricLocalization />}
    />
  );
}