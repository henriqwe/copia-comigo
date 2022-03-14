import { Controller, useForm } from 'react-hook-form'
import React, { useEffect } from 'react'

import { GraphQLTypes } from '&crm/graphql/generated/zeus'
import { yupResolver } from '@hookform/resolvers/yup'

import * as utils from '@comigo/utils'

import * as common from '@comigo/ui-common'

import * as emails from '&crm/domains/clients/components/Tabs/Emails'
import * as client from '&crm/domains/clients'

export function Update() {
  const {
    setSlidePanelState,
    slidePanelState,
    updateEmail,
    emailSchema,
    emailsRefetch,
    emailsLoading
  } = emails.useEmail()
  const { clientData } = client.useUpdate()
  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(emailSchema)
  })
  const onSubmit = (formData: GraphQLTypes['contatos_Emails']) => {
    updateEmail({
      variables: {
        Id: slidePanelState.data?.Id,
        Email: formData.Email,
        Categorias: [`${formData.Categorias.key}`],
        NomeDoResponsavel: formData.NomeDoResponsavel
      }
    })
      .then(() => {
        emailsRefetch()
        setSlidePanelState((oldState) => {
          return { ...oldState, open: false }
        })
        utils.notification('Email editado com sucesso', 'success')
      })
      .catch((err) => {
        utils.showError(err)
      })
  }

  useEffect(() => {
    reset({
      Email: slidePanelState.data?.Email || '',
      NomeDoResponsavel: slidePanelState.data?.NomeDoResponsavel || '',
      Categorias: {
        key: slidePanelState.data?.Categorias[0],
        title: utils.capitalizeWord(slidePanelState.data?.Categorias[0])
      }
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
          fieldName="Email"
          register={register}
          title="Email"
          error={errors.Email}
          data-testid="cadastrarEmail"
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
        title="Salvar"
        disabled={emailsLoading}
        loading={emailsLoading}
      />

      <div className="w-full">
        <p className="text-lg">Emails recomendados</p>
        {clientData.Pessoa.DadosDaApi.emails.map((email) => (
          <div key={email.id} className="mt-2">
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
