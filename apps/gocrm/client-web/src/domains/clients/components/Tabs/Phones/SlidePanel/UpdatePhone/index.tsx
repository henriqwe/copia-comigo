import { Controller, useForm } from 'react-hook-form'
import React, { useEffect } from 'react'

import { GraphQLTypes } from '&crm/graphql/generated/zeus'
import { yupResolver } from '@hookform/resolvers/yup'

import * as utils from '@comigo/utils'

import * as common from '@comigo/ui-common'

import * as clients from '&crm/domains/clients'
import * as phones from '&crm/domains/clients/components/Tabs/Phones'

export function Update() {
  const {
    setSlidePanelState,
    slidePanelState,
    updatePhone,
    phoneSchema,
    phonesRefetch,
    phonesLoading
  } = phones.usePhone()
  const { clientData } = clients.useUpdate()
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(phoneSchema)
  })
  const onSubmit = (formData: GraphQLTypes['contatos_Telefones']) => {
    updatePhone({
      variables: {
        Id: slidePanelState.data?.Id,
        Telefone: utils.phoneUnformat(formData.Telefone),
        Categorias: [`${formData.Categorias.key}`],
        NomeDoResponsavel: formData.NomeDoResponsavel
      }
    })
      .then(() => {
        phonesRefetch()
        setSlidePanelState((oldState) => {
          return { ...oldState, open: false }
        })
        utils.notification('Telefone editado com sucesso', 'success')
      })
      .catch((err) => {
        utils.showError(err)
      })
  }

  useEffect(() => {
    reset({
      Telefone: utils.phoneFormat(slidePanelState.data?.Telefone) || '',
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
        <common.form.BRPhoneInput
          error={errors.Telefone}
          register={register}
          control={control}
        />

        <div className="flex flex-col w-full gap-2 mb-2">
          <common.form.Input
            fieldName="NomeDoResponsavel"
            register={register}
            title="Responsável"
            error={errors.NomeDoResponsavel}
            data-testid="cadastrarNomeDoResponsavel"
          />
        </div>
      </div>

      <Controller
        control={control}
        name="Categorias"
        render={({ field: { onChange, value } }) => (
          <div className="flex flex-col w-full gap-2 mb-2">
            <common.form.Select
              itens={[
                { key: 'comercial', title: 'Comercial' },
                { key: 'residencial', title: 'Residencial' }
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
        disabled={phonesLoading}
        loading={phonesLoading}
      />

      <div className="w-full">
        <p className="text-lg">Telefones recomendados</p>
        {clientData.Pessoa.DadosDaApi.telefones.map((phone) => (
          <div key={phone.id} className="mt-2">
            <p
              onClick={() => {
                setValue('Telefone', phone.telefone)
              }}
              className="cursor-pointer hover:text-blue-400"
            >
              {utils.phoneFormat(phone.telefone)}
            </p>
          </div>
        ))}
      </div>
    </form>
  )
}
