import { useRouter } from 'next/router'
import { useForm, Controller } from 'react-hook-form'

import rotas from '&crm/domains/routes'

import * as common from '@comigo/ui-common'
import * as blocks from '@comigo/ui-blocks'

import * as combos from '&crm/domains/commercial/Combos'
import * as utils from '@comigo/utils'

import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'

type ComboItensType = {
  name: string
  MembershipPrice?: string
  RecurrencePrice?: string
  type: string
}

export const ViewCombo = () => {
  const [comboItens, setComboItens] = useState<ComboItensType[]>([])
  const [totalValue, setTotalValue] = useState(0)
  const router = useRouter()

  const {
    comboData,
    createComboPrice,
    createComboPriceLoading,
    updateCombo,
    updateComboLoading,
    comboRefetch,
    comboSchema,
    runProductQuery,
    runServiceQuery,
    runPlanQuery,
    setSlidePanelState
  } = combos.useView()
  const { control, handleSubmit, watch, reset, register } = useForm({
    resolver: yupResolver(comboSchema)
  })
  async function onSubmit(data: {
    ValorDeAdesao: string
    ValorDeRecorrencia: string
    Nome: string
  }) {
    try {
      await updateCombo({
        variables: {
          Nome: data.Nome
        }
      }).then(() => {
        comboRefetch()
        router.push(rotas.comercial.combos)
        utils.notification('Combo editado com sucesso', 'success')
      })
      if (comboData?.Precos.length === 0) {
        await createComboPrice({
          variables: {
            ValorDeAdesao: Number(
              utils.BRLMoneyUnformat(data.ValorDeAdesao)
            ).toFixed(2),
            ValorDeRecorrencia: Number(
              utils.BRLMoneyUnformat(data.ValorDeRecorrencia)
            ).toFixed(2)
          }
        })
        return
      }
      if (
        data.ValorDeAdesao !==
          utils.BRLMoneyInputDefaultFormat(
            comboData?.Precos?.[0].ValorDeAdesao?.toString() as string
          ) ||
        data.ValorDeRecorrencia !==
          utils.BRLMoneyInputDefaultFormat(
            comboData?.Precos?.[0].ValorDeRecorrencia?.toString() as string
          )
      ) {
        await createComboPrice({
          variables: {
            ValorDeAdesao: Number(
              utils.BRLMoneyUnformat(data.ValorDeAdesao)
            ).toFixed(2),
            ValorDeRecorrencia: Number(
              utils.BRLMoneyUnformat(data.ValorDeRecorrencia)
            ).toFixed(2)
          }
        })
      }
    } catch (err) {
      utils.showError(err)
    }
  }

  function disableMainButton() {
    return (
      updateComboLoading ||
      createComboPriceLoading ||
      watch('ValorDeAdesao') === undefined ||
      watch('ValorDeAdesao') === '' ||
      watch('ValorDeRecorrencia') === undefined ||
      watch('ValorDeRecorrencia') === '' ||
      watch('Nome') === undefined ||
      watch('Nome') === ''
    )
  }

  useEffect(() => {
    if (comboData) {
      let totalValue = 0
      const itens = comboData.Servicos.map((service) => {
        totalValue += Number(
          service.Servico.PrestadoresDeServicos.length > 0
            ? service.Servico.PrestadoresDeServicos[0].Precos.filter(
                (price) => price.TipoDePreco.Valor === 'recorrencia'
              )[0]?.Valor || '0'
            : '0'
        )
        return {
          name: service.Servico.Nome,
          MembershipPrice:
            service.Servico.PrestadoresDeServicos.length > 0
              ? service.Servico.PrestadoresDeServicos[0].Precos.filter(
                  (price) => price.TipoDePreco.Valor === 'adesao'
                )[0]?.Valor || '0'
              : '0',
          RecurrencePrice:
            service.Servico.PrestadoresDeServicos.length > 0
              ? service.Servico.PrestadoresDeServicos[0].Precos.filter(
                  (price) => price.TipoDePreco.Valor === 'recorrencia'
                )[0]?.Valor || '0'
              : '0',
          type: 'Serviço'
        }
      })

      itens.push(
        ...comboData.Produtos.map((product) => {
          totalValue += Number(
            product.Produto.Fornecedores.length > 0
              ? product.Produto.Fornecedores[0].Precos.filter(
                  (price) => price.TipoDePreco.Valor === 'recorrencia'
                )[0]?.Valor || '0'
              : '0'
          )
          return {
            name: product.Produto.Nome,
            MembershipPrice:
              product.Produto.Fornecedores.length > 0
                ? product.Produto.Fornecedores[0].Precos.filter(
                    (price) => price.TipoDePreco.Valor === 'adesao'
                  )[0]?.Valor || '0'
                : '0',
            RecurrencePrice:
              product.Produto.Fornecedores.length > 0
                ? product.Produto.Fornecedores[0].Precos.filter(
                    (price) => price.TipoDePreco.Valor === 'recorrencia'
                  )[0]?.Valor || '0'
                : '0',
            type: 'Produto'
          }
        })
      )

      itens.push(
        ...comboData.Planos.map((plans) => {
          totalValue += Number(plans.PlanoPreco.ValorDeRecorrencia)
          return {
            name: plans.Plano.Nome,
            MembershipPrice: plans.PlanoPreco.ValorDeAdesao,
            RecurrencePrice: plans.PlanoPreco.ValorDeRecorrencia,
            type: 'Plano'
          }
        })
      )
      setComboItens(itens)
      setTotalValue(totalValue)

      if (comboData?.Precos.length > 0) {
        reset({
          Nome: comboData.Nome,
          ValorDeAdesao: utils.BRLMoneyInputDefaultFormat(
            Number(comboData.Precos[0].ValorDeAdesao).toFixed(2)
          ),
          ValorDeRecorrencia: utils.BRLMoneyInputDefaultFormat(
            Number(comboData.Precos[0].ValorDeRecorrencia).toFixed(2)
          )
        })
        return
      }
      reset({
        Nome: comboData.Nome,
        ValorDeAdesao: 0,
        ValorDeRecorrencia: 0
      })
    }
  }, [comboData])

  return (
    <common.Card>
      <form>
        <div className="flex justify-between">
          <common.GenericTitle title="Dados do combo" subtitle="Nome e Preço" />
          <common.Dropdown
            title={'+'}
            handler={() => null}
            titleClassName={`bg-success py-2 px-4 rounded-lg`}
            noChevronDownIcon
            items={[
              {
                title: 'Adicionar Serviço',
                action: async () => {
                  await runServiceQuery()
                  setSlidePanelState({ open: true, type: 'service' })
                }
              },
              {
                title: 'Adicionar Produto',
                action: async () => {
                  await runProductQuery()
                  setSlidePanelState({ open: true, type: 'product' })
                }
              },
              {
                title: 'Adicionar Plano',
                action: async () => {
                  await runPlanQuery()
                  setSlidePanelState({ open: true, type: 'plan' })
                }
              }
            ]}
          />
        </div>
        <common.Separator />
        <common.form.FormLine grid={3} position={0}>
          <div>
            <common.form.Input
              fieldName="Nome"
              title="Nome"
              register={register}
            />
          </div>
          <Controller
            control={control}
            name={'ValorDeAdesao'}
            render={({ field: { onChange, value } }) => (
              <div>
                <common.form.Input
                  fieldName={'ValorDeAdesao'}
                  title={`Preço de Adesão`}
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
            name={'ValorDeRecorrencia'}
            render={({ field: { onChange, value } }) => (
              <div>
                <common.form.Input
                  fieldName={'ValorDeRecorrencia'}
                  title={`Preço de Recorrência`}
                  value={value}
                  onChange={(e) => {
                    onChange(utils.BRLMoneyInputFormat(e))
                  }}
                  icon="R$"
                />
              </div>
            )}
          />
        </common.form.FormLine>
        <div className="mt-2">
          <common.GenericTitle
            title="Itens do combo"
            subtitle="Produtos, serviços e planos do combo"
          />
          <common.Separator />
          <blocks.BorderLessTable
            colection={comboItens}
            columnTitles={[
              {
                title: 'Nome',
                fieldName: 'name'
              },
              {
                title: 'Tipo',
                fieldName: 'type'
              },
              {
                title: 'Adesão (R$)',
                fieldName: 'MembershipPrice',
                type: 'handler',
                handler: (value) =>
                  value !== undefined ? utils.BRLMoneyFormat(Number(value)) : ''
              },
              {
                title: 'Recorrência (R$)',
                fieldName: 'RecurrencePrice',
                type: 'handler',
                handler: (value) =>
                  value !== undefined ? utils.BRLMoneyFormat(Number(value)) : ''
              }
            ]}
          />
          <p className="mt-2 text-right text-gray-500">
            Valor total do itens adicionados: {utils.BRLMoneyFormat(totalValue)}
          </p>
        </div>
      </form>
      <div className="flex items-center justify-between w-full mt-4">
        <common.buttons.GoBackButton />
        <common.buttons.PrimaryButton
          title="Atualizar"
          disabled={disableMainButton()}
          onClick={handleSubmit(onSubmit)}
          loading={updateComboLoading || createComboPriceLoading}
        />
      </div>
      <combos.UpdateSlidePanel />
    </common.Card>
  )
}
