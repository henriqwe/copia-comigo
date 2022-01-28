import { useForm } from 'react-hook-form'

import * as common from '@comigo/ui-common'
import * as utils from '@comigo/utils'

import * as operators from '&erp/domains/production/identifiable/Chips/Operators'

import { yupResolver } from '@hookform/resolvers/yup'
import { GraphQLTypes } from '&erp/graphql/generated/zeus'

export function Create() {
  const {
    createOperatorLoading,
    createOperator,
    setSlidePanelState,
    operatorsRefetch,
    operatorSchema
  } = operators.useOperator()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(operatorSchema)
  })
  const onSubmit = (formData: GraphQLTypes['Operadoras']) => {
    createOperator({
      variables: {
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
        utils.notification(formData.Nome + ' cadastrado com sucesso', 'success')
      })
      .catch((err) => {
        utils.notification(err.message, 'error')
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
          data-testid="inserirNome"
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
        title="Enviar"
        disabled={createOperatorLoading}
        loading={createOperatorLoading}
      />
    </form>
  )
}
