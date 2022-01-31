import { useState, useEffect } from 'react'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

 import * as utils from '@comigo/utils'
 
import * as common from '@comigo/ui-common'
 
 
import * as proposals from '&crm/domains/commercial/Proposals'

type FormData = {
  Bairro: string
  Logradouro: string
  Cep: string
  Cidade: string
  Estado: string
  Numero: string
  Complemento: string
}

export default function CreateAddress() {
  const [CEPData, setCEPData] = useState({
    bairro: '',
    logradouro: '',
    localidade: '',
    uf: ''
  })
  const [CEP, setCEP] = useState('')
  const {
    createProposalInstalation,
    createProposalInstalationLoading,
    proposalRefetch,
    setSlidePanelState,
    addressSchema,
    slidePanelState,
    proposalInstallationsRefetch
  } = proposals.useView()
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset
  } = useForm({
    resolver: yupResolver(addressSchema)
  })
  const onSubmit = (formData: FormData) => {
    createProposalInstalation({
      variables: {
        Endereco: formData,
        Veiculo_Id: slidePanelState.data?.Veiculo_Id,
        PosicaoDoVeiculo: slidePanelState.data?.Veiculo
      }
    })
      .then(() => {
        proposalRefetch()
        proposalInstallationsRefetch()
        setSlidePanelState((oldState) => {
          return { ...oldState, open: false }
        })
          utils.notification('Endereço definido com sucesso', 'success')
      })
      .catch((err) => {
        utils.showError(err)
      })
  }

  useEffect(() => {
    if (CEPData.bairro !== '') {
      reset({
        Bairro: CEPData.bairro,
        Logradouro: CEPData.logradouro,
        Cep: CEP,
        Cidade: CEPData.localidade,
        Estado: CEPData.uf
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
    <form      onSubmit={handleSubmit(onSubmit)}
      data-testid="inserirForm"
      className="flex flex-col items-end"
    >
      <div className="flex flex-col w-full gap-2 mb-2">
        <common.form.ZipCodeInput
          register={register}
          error={errors.Cep}
          control={control}
          onCompleteZipCode={setCEP}
        />
        <common.Separator />
        <common.form.Input
          fieldName="Logradouro"
          register={register}
          title="Logradouro"
          error={errors.Logradouro}
          disabled
        />
        <common.form.Input
          fieldName="Bairro"
          register={register}
          title="Bairro"
          error={errors.Bairro}
          disabled
        />
        <common.form.Input
          fieldName="Cidade"
          register={register}
          title="Cidade"
          error={errors.Cidade}
          disabled
        />
        <common.form.Input
          fieldName="Estado"
          register={register}
          title="Estado"
          error={errors.Estado}
          disabled
        />
        <common.form.Input
          fieldName="Numero"
          register={register}
          title="Número"
          error={errors.Numero}
        />

        <common.form.Input
          fieldName="Complemento"
          register={register}
          title="Complemento"
          error={errors.Complemento}
        />
      </div>

      <common.Separator />

      <common.buttons.PrimaryButton
        title="Enviar"
        disabled={createProposalInstalationLoading}
        loading={createProposalInstalationLoading}
      />
    </form>
  )
}
