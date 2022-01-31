import { useEffect, useState } from 'react'

import * as common from '@comigo/ui-common'
 
 
import * as providers from '&crm/domains/identities/Providers'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
 import * as utils from '@comigo/utils'
 
import { BRLMoneyInputFormat, BRLMoneyUnformat } from 'utils/formaters'

type FormData = {
  Nome: string
  Identificador: string
  RazaoSocial: string
  PrecoDoKm: number
}

export default function UpdatePerson() {
  const {
    providerData,
    providerLoading,
    providerRefetch,
    updatePerson,
    updatePersonLoading,
    pessoaSchema
  } = providers.useUpdate()

  const [activeUpdate, setActiveUpdate] = useState(false)
  const [activeSwitch, setActiveSwitch] = useState(false)

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm({ resolver: yupResolver(pessoaSchema) })

  function enviaDadosParaEdicao(formData: FormData) {
    try {
      if (activeSwitch) {
        if (formData.PrecoDoKm === null) {
          throw new Error('Preencha todos os campos para salvar')
        }
      }
      providerData!.Pessoa.DadosDaApi.razaoSocial = formData.RazaoSocial
      updatePerson({
        variables: {
          Id: providerData?.Pessoa.Id,
          Nome: formData.Nome,
          Identificador: formData.Identificador,
          DadosDaApi: providerData!.Pessoa.DadosDaApi,
          Fornecedor_Id: providerData?.Id,
          PrecoDoKm: formData.PrecoDoKm
            ? utils.BRLMoneyUnformat(formData.PrecoDoKm)
            : null,
          PrestadorDeServico: activeSwitch
        }
      }).then(() => {
        providerRefetch()
        setActiveUpdate(false)
          utils.notification(formData.Nome + ' editado com sucesso', 'success')
      })
    } catch (err: any) {
      utils.showError(err)
    }
  }

  useEffect(() => {
    setActiveSwitch(providerData?.PrestadorDeServico as boolean)
    if (providerData?.Pessoa.PessoaJuridica) {
      reset({
        Nome: providerData?.Pessoa.Nome || '',
        Identificador: providerData?.Pessoa.Identificador || '',
        RazaoSocial: providerData?.Pessoa.DadosDaApi.alias || '',
        PrecoDoKm: providerData?.PrecoDoKm || null
      })
      return
    }
    reset({
      Nome: providerData?.Pessoa.Nome || '',
      Identificador: providerData?.Pessoa.Identificador || '',
      RazaoSocial: providerData?.Pessoa.DadosDaApi.razaoSocial || '',
      PrecoDoKm: providerData?.PrecoDoKm || null
    })
  }, [providerData, reset])

  return (
    <common.Card>
      <common.GenericTitle
        title="Dados gerais"
        subtitle="Dados básicos do fornecedor"
        className="px-6"
      />
      <common.Separator className="mb-0" />
      <form>        <common.form.FormLine position={1} grid={2}>
          <common.form.Input
            fieldName="Nome"
            title="Nome"
            register={register}
            error={errors.Nome}
            disabled={!activeUpdate}
          />
          {providerData?.Pessoa.PessoaJuridica ? (
            <common.form.CNPJInput
              register={register}
              error={errors.Identificador}
              control={control}
              disabled={true}
            />
          ) : (
            <common.form.CPFInput
              register={register}
              error={errors.Identificador}
              control={control}
              disabled={true}
            />
          )}
        </common.form.FormLine>
        <common.form.FormLine grid={1} position={2}>
          {providerData?.Pessoa.PessoaJuridica && (
            <common.form.Input
              fieldName="RazaoSocial"
              title="Razão social"
              register={register}
              error={errors.razaoSocial}
              disabled={!activeUpdate}
            />
          )}
        </common.form.FormLine>

        <common.Separator />
        <common.GenericTitle
          title="Prestador de serviço"
          subtitle="Dados do endereço"
          className="px-6"
        />
        <common.Separator className="mb-0" />

        <common.form.FormLine position={1} grid={3}>
          <p className="col-span-2">
            Este fornecedor é um prestador de serviço?
          </p>
          <common.form.Switch
            onChange={() => {
              setActiveSwitch(!activeSwitch)
              setActiveUpdate(true)
            }}
            value={activeSwitch}
          />
        </common.form.FormLine>

        <common.form.FormLine position={0} grid={3}>
          {activeSwitch && (
            <Controller
              control={control}
              name="PrecoDoKm"
              render={({ field: { onChange, value } }) => (
                <common.form.Input
                  fieldName="PrecoDoKm"
                  title="Preco do Km (R$)"
                  value={value}
                  onChange={(e) => {
                    onChange(utils.BRLMoneyInputFormat(e))
                  }}
                  disabled={!activeUpdate}
                />
              )}
            />
          )}
        </common.form.FormLine>

        <div className="flex items-center justify-between w-full px-6 mt-4">
          <common.buttons.GoBackButton />
          <div className="flex gap-2">
            {activeUpdate && (
              <common.buttons.CancelButton
                onClick={() => {
                  setActiveUpdate(false)
                }}
              />
            )}
            <common.buttons.PrimaryButton
              title={activeUpdate ? 'Atualizar' : 'Editar'}
              disabled={providerLoading || updatePersonLoading}
              loading={providerLoading || updatePersonLoading}
              onClick={() => {
                event?.preventDefault()
                if (!activeUpdate) {
                  setActiveUpdate(true)
                  return
                }
                handleSubmit(enviaDadosParaEdicao)()
              }}
            />
          </div>
        </div>
      </form>
    </common.Card>
  )
}
