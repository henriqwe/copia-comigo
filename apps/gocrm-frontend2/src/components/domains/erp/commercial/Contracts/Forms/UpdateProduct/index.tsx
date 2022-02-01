import { useEffect, useState } from 'react'

import * as common from '&test/components/common'
import * as buttons from '&test/components/common/Buttons'
import * as form from '&test/components/common/Form'
import * as contracts from '&test/components/domains/erp/commercial/Contracts'
import * as partners from '&test/components/domains/erp/commercial/Providers'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { notification } from '&test/utils/notification'
import { showError } from '&test/utils/showError'

type FormData = {
  Nome: string
  Parceiro: {
    key: string
    title: string
  }
}

export default function UpdateContract() {
  const [activeEdit, setActiveEdit] = useState(false)
  const {
    updateContractLoading,
    updateContract,
    baseContractData,
    baseContractRefetch,
    baseContractSchema,
    getParceiroById
  } = contracts.useUpdate()
  const { providersData } = partners.useProvider()

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control
  } = useForm({ resolver: yupResolver(baseContractSchema) })

  function onSubmit(formData: FormData) {
    updateContract({
      variables: {
        Nome: formData.Nome,
        Parceiro_Id: formData.Parceiro.key
      }
    })
      .then(() => {
        baseContractRefetch()
        setActiveEdit(false)
        notification(formData.Nome + ' editado com sucesso', 'success')
      })
      .catch((err) => {
        showError(err)
      })
  }

  useEffect(() => {
    async function setValues() {
      const partner = await getParceiroById(
        baseContractData?.Parceiro_Id as string
      )
      reset({
        Nome: baseContractData?.Nome || '',
        Parceiro: {
          key: partner?.Id || '',
          title: partner?.Nome || ''
        }
      })
    }
    baseContractData && setValues()
  }, [baseContractData, reset])

  return (
    <div className="flex flex-col gap-4">
      <common.Card>
        <common.GenericTitle
          title="Dados gerais"
          subtitle="Dados básicos do produto"
          className="px-6"
        />
        <common.Separator className="mb-0" />
        <form>
          <form.FormLine position={1} grid={2}>
            <form.Input
              fieldName="Nome"
              title="Nome"
              register={register}
              error={errors.Nome}
              disabled={!activeEdit}
            />
            <Controller
              control={control}
              name="Parceiro"
              render={({ field: { onChange, value } }) => (
                <div>
                  <form.Select
                    itens={
                      providersData
                        ? providersData.map((partner) => {
                          return {
                            key: partner.Id,
                            title: partner.Nome
                          }
                        })
                        : []
                    }
                    value={value}
                    onChange={onChange}
                    error={errors.Parceiro}
                    disabled={!activeEdit}
                    label="Parceiro"
                  />
                </div>
              )}
            />
          </form.FormLine>

          <div className="flex items-center justify-between w-full px-6">
            <buttons.GoBackButton />
            <div className="flex gap-2">
              {activeEdit && (
                <buttons.CancelButton
                  onClick={() => {
                    setActiveEdit(false)
                  }}
                />
              )}
              <buttons.PrimaryButton
                title={activeEdit ? 'Atualizar' : 'Editar'}
                disabled={updateContractLoading}
                loading={updateContractLoading}
                onClick={() => {
                  event?.preventDefault()
                  if (!activeEdit) {
                    setActiveEdit(true)
                    return
                  }
                  handleSubmit(onSubmit)()
                }}
              />
            </div>
          </div>
        </form>
      </common.Card>
    </div>
  )
}