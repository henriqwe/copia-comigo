import { useForm } from 'react-hook-form'

import * as common from '@comigo/ui-common'
 
 
import * as identifiers from '&crm/domains/production/identifiable/Identifiers'

import { useEffect } from 'react'
import { GraphQLTypes } from '&crm/graphql/generated/zeus'
import { yupResolver } from '@hookform/resolvers/yup'
 import * as utils from '@comigo/utils'
  

export default function UpdateIdentifier() {
  const {
    updateIdentifierLoading,
    updateIdentifier,
    setSlidePanelState,
    slidePanelState,
    identifiersRefetch,
    identifierSchema
  } = identifiers.useIdentifier()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(identifierSchema)
  })
  const onSubmit = (formData: GraphQLTypes['producao_Identificadores']) => {
    updateIdentifier({
      variables: {
        Id: slidePanelState.data?.Id,
        CodigoIdentificador: formData.CodigoIdentificador
      }
    })
      .then(() => {
        identifiersRefetch()
        setSlidePanelState((oldState) => {
          return { ...oldState, open: false }
        })
          utils.notification(
          formData.CodigoIdentificador + ' editado com sucesso',
          'success'
        )
      })
      .catch((err) => {
        utils.showError(err)
      })
  }

  useEffect(() => {
    reset({
      CodigoIdentificador: slidePanelState.data?.CodigoIdentificador || ''
    })
  }, [slidePanelState.data, reset])

  return (
    <form      onSubmit={handleSubmit(onSubmit)}
      data-testid="editForm"
      className="flex flex-col items-end"
    >
      <div className="flex flex-col w-full gap-2 mb-2">
        <common.form.Input
          fieldName="CodigoIdentificador"
          register={register}
          title="Número do Código"
          error={errors.CodigoIdentificador}
        />
      </div>
      <common.Separator />
      <common.buttons.PrimaryButton
        title="Editar"
        disabled={updateIdentifierLoading}
        loading={updateIdentifierLoading}
      />
    </form>
  )
}
