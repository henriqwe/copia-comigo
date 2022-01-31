import { useForm } from 'react-hook-form'

import * as common from '@comigo/ui-common'
 
 
import * as coverages from '&crm/domains/commercial/Registration/Coverages'

import { useEffect } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
 import * as utils from '@comigo/utils'
  

type FormData = {
  Id: string
  Nome: string
}

export default function UpdateCoverage() {
  const {
    updateCoverageLoading,
    updateCoverage,
    setSlidePanelState,
    slidePanelState,
    coveragesRefetch,
    coverageSchema
  } = coverages.useCoverage()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(coverageSchema)
  })
  const onSubmit = (formData: FormData) => {
    updateCoverage({
      variables: {
        Id: slidePanelState.data?.Id,
        Nome: formData.Nome
      }
    })
      .then(() => {
        coveragesRefetch()
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
      Nome: slidePanelState.data?.Nome || ''
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
      </div>
      <common.Separator />
      <common.buttons.PrimaryButton
        title="Editar"
        disabled={updateCoverageLoading}
        loading={updateCoverageLoading}
      />
    </form>
  )
}
