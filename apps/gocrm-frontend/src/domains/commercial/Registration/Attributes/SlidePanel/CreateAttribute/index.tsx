import { useForm } from 'react-hook-form'

import * as common from '@comigo/ui-common'
 
 
import * as attributes from '&crm/domains/commercial/Registration/Attributes'

import { yupResolver } from '@hookform/resolvers/yup'
 import * as utils from '@comigo/utils'
 

type FormData = {
  Id: string
  Nome: string
}

export default function CreateAttribute() {
  const {
    createAttributeLoading,
    createAttribute,
    setSlidePanelState,
    attributeRefetch,
    attributeSchema
  } = attributes.useAttribute()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(attributeSchema)
  })
  const onSubmit = (formData: FormData) => {
    createAttribute({
      variables: {
        Nome: formData.Nome
      }
    })
      .then(() => {
        attributeRefetch()
        setSlidePanelState((oldState) => {
          return { ...oldState, open: false }
        })
          utils.notification(formData.Nome + ' cadastrado com sucesso', 'success')
      })
      .catch((err) => {
        utils.showError(err)
      })
  }

  return (
    <form      onSubmit={handleSubmit(onSubmit)}
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
        disabled={createAttributeLoading}
        loading={createAttributeLoading}
      />
    </form>
  )
}
