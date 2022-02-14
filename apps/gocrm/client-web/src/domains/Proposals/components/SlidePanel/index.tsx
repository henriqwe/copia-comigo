import * as blocks from '@comigo/ui-blocks';
import { Dispatch, SetStateAction } from 'react';
import { CreateProposal } from './CreateProposal'

type SlidePanelProps = {
  slidePanelState: { open: boolean }
  setSlidePanelState: Dispatch<SetStateAction<{ open: boolean }>>
}

export default function SlidePanel({ slidePanelState, setSlidePanelState }: SlidePanelProps) {
  return (
    <blocks.SlidePanel
      title={'Criar proposta'}
      open={slidePanelState.open}
      handler={setSlidePanelState}
      formContent={<CreateProposal />}
    />
  );
}
