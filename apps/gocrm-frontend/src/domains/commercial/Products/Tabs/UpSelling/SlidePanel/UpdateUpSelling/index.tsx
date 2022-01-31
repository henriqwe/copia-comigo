import { useForm, Controller } from 'react-hook-form'

import * as common from '@comigo/ui-common'
 
 
import * as upSelling from '&crm/domains/commercial/Products/Tabs/UpSelling'
import * as combos from '&crm/domains/commercial/Combos'

import { useEffect } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
 import * as utils from '@comigo/utils'
 
import router from 'next/router'
import rotas from '&crm/domains/routes'


type FormData = {
  Nome: string
  Combo_Id: {
    key: string
    title: string
  }
  Valor: string
  Servico_Id: {
    key: string
    title: string
  }
}

export default function UpdateUpSelling() {
  const { combosData } = combos.useList()
  const {
    updateUpSellingLoading,
    updateUpSelling,
    setSlidePanelState,
    upSellingRefetch,
    upSellingSchema,
    slidePanelState
  } = upSelling.useUpSelling()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control
  } = useForm({
    resolver: yupResolver(upSellingSchema)
  })
  const onSubmit = (formData: FormData) => {
    updateUpSelling({
      variables: {
        Id: slidePanelState.data?.Id,
        Nome: formData.Nome,
        Combo_Id: formData.Combo_Id.key,
        Valor: utils.BRLMoneyUnformat(formData.Valor)
      }
    })
      .then(() => {
        upSellingRefetch()
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
      Nome: slidePanelState.data?.Nome || '',
      Valor: slidePanelState.data?.Valor
        ? utils.BRLMoneyInputDefaultFormat(          slidePanelState.data?.Valor.toFixed(2).toString()
        )
        : '',
      Combo_Id: {
        key: slidePanelState.data?.Combo.Id || '',
        title: slidePanelState.data?.Combo.Nome || ''
      }
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
          data-testid="inserirNome"
        />
        <Controller
          control={control}
          name="Combo_Id"
          render={({ field: { onChange, value } }) => (
            <div>
              <common.form.Select
                itens={
                  combosData
                    ? combosData.map((item) => {
                      return { key: item.Id, title: item.Nome }
                    })
                    : []
                }
                value={value}
                onChange={onChange}
                error={errors.Combo_Id}
                label="Combo"
              />
              <common.OpenModalLink
                onClick={() =>
                  router.push(rotas.comercial.combos.cadastrar)
                }
              >
                Cadastrar combo
              </common.OpenModalLink>
            </div>
          )}
        />
        <Controller
          control={control}
          name="Valor"
          render={({ field: { onChange, value } }) => (
            <div>
              <common.form.Input
                fieldName="Valor"
                register={register}
                title="Valor"
                value={value}
                error={errors.Valor}
                onChange={(e) => {
                  onChange(utils.BRLMoneyInputFormat(e))
                }}
              />
            </div>
          )}
        />
      </div>
      <common.Separator />
      <common.buttons.PrimaryButton
        title="Editar"
        disabled={updateUpSellingLoading}
        loading={updateUpSellingLoading}
      />
    </form>
  )
}
