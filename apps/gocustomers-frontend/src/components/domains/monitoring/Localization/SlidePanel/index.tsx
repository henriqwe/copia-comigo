import {blocks} from '@comigo/ui-shared-components'
import * as localizations from '../index'

export default function SlidePanel() {
  const { slidePanelState, setSlidePanelState } =
    localizations.useLocalization()
  return (
    <blocks.Modal
      title={'Histórico'}
      open={slidePanelState.open}
      handler={setSlidePanelState}
      formContent={<localizations.HistoricLocalization />}
      chevronDoubleRightIcon
      noOverlay
    />
  )
}
