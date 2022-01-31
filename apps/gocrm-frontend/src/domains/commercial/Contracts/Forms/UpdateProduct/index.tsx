import { useEffect, useState } from 'react'

import * as common from '@comigo/ui-common'
 
 
import * as contracts from '&crm/domains/commercial/Contracts'
import * as partners from '&crm/domains/commercial/Providers'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
 import * as utils from '@comigo/utils'
 

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
          utils.notification(formData.Nome + ' editado com sucesso', 'success')
      })
      .catch((err) => {
        utils.showError(err)
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
        <form>          <common.form.FormLine position={1} grid={2}>
            <common.form.Input
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
                  <common.form.Select
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
          </common.form.FormLine>

          <div className="flex items-center justify-between w-full px-6">
            <common.buttons.GoBackButton />
            <div className="flex gap-2">
              {activeEdit && (
                <common.buttons.CancelButton
                  onClick={() => {
                    setActiveEdit(false)
                  }}
                />
              )}
              <common.buttons.PrimaryButton
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
