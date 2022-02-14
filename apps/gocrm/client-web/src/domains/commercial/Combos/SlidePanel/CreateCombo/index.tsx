import { useForm } from 'react-hook-form'

import * as common from '@comigo/ui-common'
import * as combos from '&crm/domains/commercial/Combos'
import * as utils from '@comigo/utils'

import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import routes from '&crm/domains/routes'

type FormData = {
  Nome: string
}

export function CreateCombo() {
  const router = useRouter()
  const {
    createCombo,
    createComboLoading,
    comboSchema,
    setSlidePanelState,
    combosRefetch
  } = combos.useList()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(comboSchema)
  })
  const onSubmit = (formData: FormData) => {
    createCombo({
      variables: {
        Nome: formData.Nome
      }
    })
      .then((response) => {
        setSlidePanelState((oldState) => {
          return { ...oldState, open: false }
        })
        combosRefetch()
        utils.notification(formData.Nome + ' cadastrado com sucesso', 'success')
        router.push(
          routes.comercial.combos +
            '/' +
            response.data.insert_comercial_Combos_one.Id
        )
      })
      .catch((err) => {
        utils.showError(err)
      })
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      data-testid="inserirForm"
      className="flex flex-col items-end"
    >
      <div className="flex flex-col w-full gap-2 mb-2">
        <common.form.Input
          fieldName="Nome"
          register={register}
          title="Nome"
          error={errors.Nome}
          data-testid="editNome"
        />
      </div>
      <common.Separator />
      <common.buttons.PrimaryButton
        title="Enviar"
        disabled={createComboLoading}
        loading={createComboLoading}
      />
    </form>
  )
}
