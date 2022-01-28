import { useForm } from 'react-hook-form'

import * as common from '@comigo/ui-common'


import * as operators from '&erp/domains/production/identifiable/Chips/Operators'

import { useEffect } from 'react'
import { GraphQLTypes } from '&erp/graphql/generated/zeus'
import { yupResolver } from '@hookform/resolvers/yup'
import { notification } from 'utils/notification'

export default function UpdateOperator() {
  const {
    updateOperatorLoading,
    updateOperator,
    setSlidePanelState,
    slidePanelState,
    operatorsRefetch,
    operatorSchema
  } = operators.useOperator()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(operatorSchema)
  })
  const onSubmit = (formData: GraphQLTypes['Operadoras']) => {
    updateOperator({
      variables: {
        Id: slidePanelState.data?.Id,
        Nome: formData.Nome,
        Apn: formData.Apn,
        Usuario: formData.Usuario,
        Senha: formData.Senha
      }
    })
      .then(() => {
        operatorsRefetch()
        setSlidePanelState((oldState) => {
          return { ...oldState, open: false }
        })
        utils.notification(formData.Nome + ' editado com sucesso', 'success')
      })
      .catch((err) => {
        utils.notification(err.message, 'error')
      })
  }

  useEffect(() => {
    reset({
      Nome: slidePanelState.data?.Nome || '',
      Apn: slidePanelState.data?.Apn || '',
      Usuario: slidePanelState.data?.Usuario || '',
      Senha: slidePanelState.data?.Senha || ''
    })
  }, [slidePanelState.data, reset])
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
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
          fieldName="Apn"
          register={register}
          title="Apn"
          error={errors.Apn}
          data-testid="inserirApn"
        />
        <common.form.Input
          fieldName="Usuario"
          register={register}
          title="Usuário"
          error={errors.Usuario}
          data-testid="inserirUsuario"
        />
        <common.form.Input
          fieldName="Senha"
          register={register}
          title="Senha"
          error={errors.Senha}
          data-testid="inserirSenha"
        />
      </div>
      <common.Separator />
      <common.buttons.PrimaryButton
        title="Editar"
        disabled={updateOperatorLoading}
        loading={updateOperatorLoading}
      />
    </form>
  )
}
