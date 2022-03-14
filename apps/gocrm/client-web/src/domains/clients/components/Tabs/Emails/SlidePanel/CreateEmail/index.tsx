import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { GraphQLTypes } from '&crm/graphql/generated/zeus'

import * as utils from '@comigo/utils'
import * as common from '@comigo/ui-common'

import * as client from '&crm/domains/clients'
import * as emails from '&crm/domains/clients/components/Tabs/Emails'

export function Create() {
  const {
    setSlidePanelState,
    createEmail,
    createEmailLoading,
    emailsRefetch,
    emailSchema
  } = emails.useEmail()
  const { clientData } = client.useUpdate()
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(emailSchema)
  })
  const onSubmit = (formData: GraphQLTypes['contatos_Emails']) => {
    createEmail({
      variables: {
        Email: formData.Email,
        Categorias: [`${formData.Categorias.key}`],
        NomeDoResponsavel: formData.NomeDoResponsavel,
        Identidades: { cliente: clientData?.Id }
      }
    })
      .then(() => {
        emailsRefetch()
        setSlidePanelState((oldState) => {
          return { ...oldState, open: false }
        })
        utils.notification('Email cadastrado com sucesso', 'success')
      })
      .catch((erros) => {
        utils.showError(erros)
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
          fieldName="Email"
          register={register}
          title="Email"
          error={errors.Email}
          data-testid="createEmail"
        />
      </div>
      <div className="flex flex-col w-full gap-2 mb-2">
        <common.form.Input
          fieldName="NomeDoResponsavel"
          register={register}
          title="Responsável"
          error={errors.NomeDoResponsavel}
          data-testid="cadastrarNomeDoResponsavel"
        />
      </div>

      <Controller
        control={control}
        name="Categorias"
        render={({ field: { onChange, value } }) => (
          <div className="flex flex-col w-full gap-2 mb-2">
            <common.form.Select
              itens={[
                { key: 'financeiro', title: 'Financeiro' },
                { key: 'base', title: 'base' }
              ]}
              value={value}
              onChange={onChange}
              error={errors.Categorias}
              label="Categorias"
            />
          </div>
        )}
      />

      <common.Separator />

      <common.buttons.PrimaryButton
        title="Cadastrar"
        disabled={createEmailLoading}
        loading={createEmailLoading}
      />

      <div className="w-full">
        <div className="mb-3">
          <p className="text-lg">Emails obsoletos</p>
          <p className="text-xs text-gray-500">
            Clique em um email para acelerar o cadastro
          </p>
        </div>
        {clientData.Pessoa.DadosDaApi.emails.map((email) => (
          <div key={email.id} className="mt-2 ml-3">
            <p
              onClick={() => {
                setValue('Email', email.email)
              }}
              className="cursor-pointer hover:text-blue-400"
            >
              {email.email}
            </p>
          </div>
        ))}
      </div>
    </form>
  )
}
