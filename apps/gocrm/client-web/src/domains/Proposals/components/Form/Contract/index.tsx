import * as common from '@comigo/ui-common'
import * as proposals from '&crm/domains/Proposals'
import {
  concludeNewProposal,
  concludeProposalForChangeOwner,
  concludeProposalForChangeVehicle,
  concludeProposalForExistentVehicle
} from '&crm/domains/Proposals/api/acceptProposal'
import { useRouter } from 'next/router'

export function Contract() {
  const router = useRouter()
  const { setCurrentStage, currentStage, proposalData, proposalRefetch } =
    proposals.useUpdate()

  async function proposalValidation() {
    switch (router.query.origin) {
      case 'changeOwnership':
        await concludeProposalForChangeOwner(
          proposalData,
          proposalRefetch
        )
        break
      case 'changeVehicle':
        await concludeProposalForChangeVehicle(
          proposalData,
          router.query,
          proposalRefetch
        )
        break
      case 'activeVehicleProposal':
        await concludeProposalForExistentVehicle(
          proposalData,
          router.query,
          proposalRefetch
        )
        break
      default:
        await concludeNewProposal(proposalData, router.query, proposalRefetch)
        break
    }

    setCurrentStage(currentStage + 1)
  }

  return (
    <common.Card className="flex flex-col items-center justify-center">
      <p className="text-2xl font-bold">Termo de Adesão do contrato</p>
      <div className="w-3/4">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam,
          voluptas? Quis cupiditate quo obcaecati saepe officia error qui
          tempore eligendi culpa modi rem, earum ducimus commodi non autem in
          nesciunt!
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque et
          reiciendis at a enim. Et libero magnam soluta rem sapiente, ex odio
          ipsum eum placeat ab quo nemo cum quod?
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam,
          voluptas? Quis cupiditate quo obcaecati saepe officia error qui
          tempore eligendi culpa modi rem, earum ducimus commodi non autem in
          nesciunt!
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque et
          reiciendis at a enim. Et libero magnam soluta rem sapiente, ex odio
          ipsum eum placeat ab quo nemo cum quod?
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam,
          voluptas? Quis cupiditate quo obcaecati saepe officia error qui
          tempore eligendi culpa modi rem, earum ducimus commodi non autem in
          nesciunt!
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque et
          reiciendis at a enim. Et libero magnam soluta rem sapiente, ex odio
          ipsum eum placeat ab quo nemo cum quod?
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam,
          voluptas? Quis cupiditate quo obcaecati saepe officia error qui
          tempore eligendi culpa modi rem, earum ducimus commodi non autem in
          nesciunt!
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque et
          reiciendis at a enim. Et libero magnam soluta rem sapiente, ex odio
          ipsum eum placeat ab quo nemo cum quod?
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam,
          voluptas? Quis cupiditate quo obcaecati saepe officia error qui
          tempore eligendi culpa modi rem, earum ducimus commodi non autem in
          nesciunt!
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque et
          reiciendis at a enim. Et libero magnam soluta rem sapiente, ex odio
          ipsum eum placeat ab quo nemo cum quod?
        </p>
      </div>
      <div className="flex items-end justify-end w-full">
        <common.buttons.PrimaryButton
          title="Aceitar contrato"
          onClick={proposalValidation}
        />
      </div>
    </common.Card>
  )
}
