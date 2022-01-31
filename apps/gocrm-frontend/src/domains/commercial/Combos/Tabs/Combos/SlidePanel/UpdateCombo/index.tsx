import { Controller, useForm } from 'react-hook-form'

import * as common from '@comigo/ui-common'
 
 
import * as combos from '&crm/domains/commercial/Combos/Tabs/Combos'
import * as mainCombo from '&crm/domains/commercial/Combos'

import { useEffect } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
 import * as utils from '@comigo/utils'
 


type FormData = {
  Valor: string
  Combo: {
    key: string
    title: string
  }
}

export default function UpdateCombo() {
  const {
    updateDependenceComboLoading,
    updateDependenceCombo,
    setSlidePanelState,
    slidePanelState,
    combosRefetch,
    dependenceComboSchema,
    combosData,
    dependenciesCombosRefetch
  } = combos.useDependenceCombo()
  const { comboRefetch } = mainCombo.useView()
  const {
    handleSubmit,
    reset,
    formState: { errors },
    control
  } = useForm({
    resolver: yupResolver(dependenceComboSchema)
  })
  const onSubmit = (formData: FormData) => {
    updateDependenceCombo({
      variables: {
        Id: slidePanelState.data?.Id,
        Valor: utils.BRLMoneyUnformat(formData.Valor),
        Combo_Id: formData.Combo.key
      }
    })
      .then(() => {
        combosRefetch()
        dependenciesCombosRefetch()
        comboRefetch()
        setSlidePanelState((oldState) => {
          return { ...oldState, open: false }
        })
          utils.notification(formData.Combo.title + ' editado com sucesso', 'success')
      })
      .catch((err) => {
        utils.showError(err)
      })
  }

  useEffect(() => {
    reset({
      Valor:
        utils.BRLMoneyInputDefaultFormat(          slidePanelState.data?.Valor.toFixed(2).toString()
        ) || '',
      Combo: {
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
        <Controller
          control={control}
          name={'Valor'}
          render={({ field: { onChange, value } }) => (
            <div>
              <common.form.Input
                fieldName={'Valor'}
                title={`Valor`}
                value={value}
                onChange={(e) => {
                  onChange(utils.BRLMoneyInputFormat(e))
                }}
                icon="R$"
              />
            </div>
          )}
        />
        <Controller
          control={control}
          name="Combo"
          render={({ field: { onChange, value } }) => (
            <common.form.Select
              itens={
                combosData
                  ? combosData
                    .filter((combo) => combo.Combos.length === 0)
                    .map((combo) => {
                      return {
                        key: combo.Id,
                        title: combo.Nome
                      }
                    })
                  : []
              }
              value={value}
              onChange={onChange}
              error={errors.Combo}
              label="Combo"
            />
          )}
        />
      </div>
      <common.Separator />
      <common.buttons.PrimaryButton
        title="Editar"
        disabled={updateDependenceComboLoading}
        loading={updateDependenceComboLoading}
      />
    </form>
  )
}
