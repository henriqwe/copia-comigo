import { useForm } from 'react-hook-form'

import * as common from '@comigo/ui-common'
 
 
import * as manufacturers from '&crm/domains/inventory/Registration/Manufacturers'

import { useEffect } from 'react'
import { GraphQLTypes } from '&crm/graphql/generated/zeus'
import { yupResolver } from '@hookform/resolvers/yup'
 import * as utils from '@comigo/utils'
  

export default function UpdateManufacturer() {
  const {
    updateManufacturerLoading,
    updateManufacturer,
    setSlidePanelState,
    slidePanelState,
    manufacturersRefetch,
    manufacturerSchema
  } = manufacturers.useManufacturer()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(manufacturerSchema)
  })
  const onSubmit = (formData: GraphQLTypes['estoque_Fabricantes']) => {
    updateManufacturer({
      variables: {
        Id: slidePanelState.data?.Id,
        Nome: formData.Nome,
        Descricao: formData.Descricao
      }
    })
      .then(() => {
        manufacturersRefetch()
        setSlidePanelState((oldState) => {
          return { ...oldState, open: false }
        })
          utils.notification(formData.Nome + ' editado com sucesso', 'success')
      })
      .catch((err) => {
        utils.showError(err)
      })
  }
  useEffect(() => {
    reset({
      Nome: slidePanelState.data?.Nome,
      Descricao: slidePanelState.data?.Descricao
    })
  }, [slidePanelState.data, reset])
  return (
    <form      onSubmit={handleSubmit(onSubmit)}
      data-testid="editForm"
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
        <common.form.Input
          fieldName="Descricao"
          register={register}
          title="Descrição"
          error={errors.Descricao}
          data-testid="editDescricao"
        />
      </div>
      <common.Separator />
      <common.buttons.PrimaryButton
        title="Salvar"
        disabled={updateManufacturerLoading}
        loading={updateManufacturerLoading}
      />
    </form>
  )
}
