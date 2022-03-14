import { useState, useEffect } from 'react'

import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { GraphQLTypes } from '&crm/graphql/generated/zeus'

import * as utils from '@comigo/utils'

import * as common from '@comigo/ui-common'

import * as addresses from '&crm/domains/clients/components/Tabs/Addresses'
import * as clients from '&crm/domains/clients'

export function Create() {
  const [cities, setCities] = useState<{ Id: string; Nome: string }[]>([])
  const [CEPData, setCEPData] = useState({ bairro: '', logradouro: '' })
  const [stateId, setstateId] = useState('')
  const [CEP, setCEP] = useState('')
  const {
    setSlidePanelState,
    createAddress,
    createAddressLoading,
    addressesRefetch,
    addressSchema,
    statesData,
    getCities
  } = addresses.useAddress()
  const { clientData } = clients.useUpdate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    setValue
  } = useForm({
    resolver: yupResolver(addressSchema)
  })
  const onSubmit = (formData: GraphQLTypes['contatos_Enderecos']) => {
    createAddress({
      variables: {
        Bairro: formData.Bairro,
        Logradouro: formData.Logradouro,
        Numero: formData.Numero,
        Cep: formData.Cep,
        Complemento: formData.Complemento,
        Estado_Id: formData.Estado_Id.key,
        Cidade_Id: formData.Cidade_Id.key,
        Identidades: { cliente: clientData?.Id }
      }
    })
      .then(() => {
        addressesRefetch()
        setSlidePanelState((oldState) => {
          return { ...oldState, open: false }
        })
        utils.notification('Endereço cadastrado com sucesso', 'success')
      })
      .catch((err) => {
        utils.showError(err)
      })
  }

  useEffect(() => {
    if (stateId !== '') {
      getCities(stateId).then((data) => {
        setCities(data)
      })
    }
  }, [getCities, stateId])

  useEffect(() => {
    if (CEPData.bairro !== '') {
      reset({
        Bairro: CEPData.bairro,
        Logradouro: CEPData.logradouro,
        Cep: CEP
        // Estado_Id: {
        //   key: CEPData.estado,
        //   titulo: CEPData.uf
        // }
      })
    }
  }, [reset, CEPData])

  useEffect(() => {
    if (CEP !== '') {
      setCEP(CEP.split('-').join(''))
      fetch(`http://viacep.com.br/ws/${CEP}/json/`)
        .then((response) => response.json())
        .then((data) => setCEPData(data))
        .catch((err) => utils.showError(err))
    }
  }, [CEP])

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      data-testid="inserirForm"
      className="flex flex-col items-end"
    >
      <div className="flex flex-col w-full gap-2 mb-2">
        <common.form.ZipCodeInput
          register={register}
          error={errors.Cep}
          data-testid="inserirCep"
          control={control}
          onCompleteZipCode={setCEP}
        />
        <common.Separator />
        <common.form.Input
          fieldName="Bairro"
          register={register}
          title="Bairro"
          error={errors.Bairro}
          data-testid="inserirBairro"
        />
        <common.form.Input
          fieldName="Logradouro"
          register={register}
          title="Logradouro"
          error={errors.Logradouro}
          data-testid="inserirLogradouro"
        />
        <common.form.Input
          fieldName="Numero"
          register={register}
          title="Número"
          error={errors.Numero}
          data-testid="inserirNumero"
        />

        <common.form.Input
          fieldName="Complemento"
          register={register}
          title="Complemento"
          error={errors.Complemento}
          data-testid="inserirComplemento"
        />

        <Controller
          control={control}
          name="Estado_Id"
          render={({ field: { onChange, value } }) => (
            <div className="col-span-3">
              <common.form.Select
                itens={
                  statesData
                    ? statesData.map((item) => {
                        return { key: item.Id, title: item.Nome }
                      })
                    : []
                }
                value={value}
                onChange={(estado) => {
                  setstateId(estado.key as string)
                  onChange(estado)
                }}
                error={errors.Estado_Id}
                label="Estado"
              />
            </div>
          )}
        />

        <Controller
          control={control}
          name="Cidade_Id"
          render={({ field: { onChange, value } }) => (
            <div className="col-span-3">
              <common.form.Select
                itens={
                  cities
                    ? cities.map((item) => {
                        return { key: item.Id, title: item.Nome }
                      })
                    : []
                }
                value={value}
                onChange={onChange}
                error={errors.Cidade_Id}
                disabled={stateId === ''}
                label="Cidade"
              />
            </div>
          )}
        />
      </div>

      <common.Separator />

      <common.buttons.PrimaryButton
        title="Enviar"
        disabled={createAddressLoading}
        loading={createAddressLoading}
      />

      <div className="w-full">
        <div className="mb-3">
          <p className="text-lg">Endereços obsoletos</p>
          <p className="text-xs text-gray-500">
            Clique em um endereço para acelerar o cadastro
          </p>
        </div>

        {clientData.Pessoa.DadosDaApi.enderecos.map((address) => (
          <div key={address.id} className="mt-2 ml-3">
            <p
              onClick={() => {
                setValue('Cep', address.cep)
                setValue('Bairro', utils.camelCaseFormat(address.bairro))
                setValue(
                  'Logradouro',
                  utils.camelCaseFormat(address.logradouro)
                )
                setValue('Numero', address.numero)
                setValue(
                  'Estado_Id',
                  statesData.filter(
                    (state) =>
                      state.Nome.toLowerCase() === address.estado.toLowerCase()
                  ).length > 0
                    ? {
                        key: statesData.filter(
                          (state) =>
                            state.Nome.toLowerCase() ===
                            address.estado.toLowerCase()
                        )?.[0]?.Id,
                        title: statesData.filter(
                          (state) =>
                            state.Nome.toLowerCase() ===
                            address.estado.toLowerCase()
                        )?.[0]?.Nome
                      }
                    : undefined
                )
                setValue(
                  'Cidade_Id',
                  cities.filter(
                    (state) =>
                      state.Nome.toLowerCase() === address.cidade.toLowerCase()
                  ).length > 0
                    ? {
                        key: cities.filter(
                          (state) =>
                            state.Nome.toLowerCase() ===
                            address.cidade.toLowerCase()
                        )?.[0]?.Id,
                        title: cities.filter(
                          (state) =>
                            state.Nome.toLowerCase() ===
                            address.cidade.toLowerCase()
                        )?.[0]?.Nome
                      }
                    : undefined
                )
              }}
              className="cursor-pointer hover:text-blue-400"
            >
              {utils.camelCaseFormat(address.logradouro)} - {address.numero} -{' '}
              {utils.camelCaseFormat(address.bairro)} -{' '}
              {utils.camelCaseFormat(address.cidade)} - {address.estado}
            </p>
          </div>
        ))}
      </div>
    </form>
  )
}
