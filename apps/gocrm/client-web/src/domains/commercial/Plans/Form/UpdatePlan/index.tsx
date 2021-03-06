import { useRouter } from 'next/router'
import { useForm, Controller } from 'react-hook-form'

import rotas from '&crm/domains/routes'

import * as common from '@comigo/ui-common'
import * as blocks from '@comigo/ui-blocks'

import * as plans from '&crm/domains/commercial/Plans'
import * as utils from '@comigo/utils'

import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'

type ComboItensType = {
  name: string
  MembershipPrice?: string
  RecurrencePrice?: string
  type: string
}

export const UpdatePlan = () => {
  const [plansItens, setPlansItens] = useState<ComboItensType[]>([])
  const [totalValue, setTotalValue] = useState(0)
  const router = useRouter()

  const {
    plansData,
    createPlanPrice,
    createPlanPriceLoading,
    updatePlan,
    updatePlanLoading,
    plansRefetch,
    planSchema,
    runProductQuery,
    runServiceQuery,
    setSlidePanelState
  } = plans.useUpdate()
  const { control, handleSubmit, watch, reset, register } = useForm({
    resolver: yupResolver(planSchema)
  })
  async function onSubmit(data: {
    ValorDeAdesao: string
    ValorDeRecorrencia: string
    Nome: string
  }) {
    try {
      await updatePlan({
        variables: {
          Nome: data.Nome
        }
      }).then(() => {
        plansRefetch()
        router.push(rotas.comercial.planos)
        utils.notification('Plano editado com sucesso', 'success')
      })
      if (plansData?.Precos.length === 0) {
        await createPlanPrice({
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
            plansData?.Precos?.[0].ValorDeAdesao?.toString() as string
          ) ||
        data.ValorDeRecorrencia !==
          utils.BRLMoneyInputDefaultFormat(
            plansData?.Precos?.[0].ValorDeRecorrencia?.toString() as string
          )
      ) {
        await createPlanPrice({
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
      updatePlanLoading ||
      createPlanPriceLoading ||
      watch('ValorDeRecorrencia') === undefined ||
      watch('ValorDeRecorrencia') === '' ||
      watch('ValorDeAdesao') === undefined ||
      watch('ValorDeAdesao') === '' ||
      watch('Nome') === undefined ||
      watch('Nome') === ''
    )
  }

  useEffect(() => {
    if (plansData) {
      let totalValue = 0
      const itens = plansData.Servicos.map((service) => {
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
          type: 'Servi??o'
        }
      })

      itens.push(
        ...plansData.Produtos.map((product) => {
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
      setPlansItens(itens)
      setTotalValue(totalValue)

      if (plansData?.Precos.length > 0) {
        reset({
          Nome: plansData.Nome,
          ValorDeAdesao: utils.BRLMoneyInputDefaultFormat(
            Number(plansData.Precos[0].ValorDeAdesao).toFixed(2)
          ),
          ValorDeRecorrencia: utils.BRLMoneyInputDefaultFormat(
            Number(plansData.Precos[0].ValorDeRecorrencia).toFixed(2)
          )
        })
        return
      }
      reset({
        Nome: plansData.Nome,
        ValorDeAdesao: 0,
        ValorDeRecorrencia: 0
      })
    }
  }, [plansData])

  return (
    <common.Card>
      <form>
        <div className="flex justify-between">
          <common.GenericTitle title="Dados do plano" subtitle="Nome e Pre??o" />
          <common.Dropdown
            title={'+'}
            handler={() => null}
            titleClassName={`bg-success py-2 px-4 rounded-lg`}
            noChevronDownIcon
            items={[
              {
                title: 'Adicionar Servi??o',
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
                  title={`Pre??o de Ades??o`}
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
                  title={`Pre??o de Recorr??ncia`}
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
            title="Itens do plano"
            subtitle="Produtos e servi??os do plano"
          />
          <common.Separator />
          <blocks.BorderLessTable
            colection={plansItens}
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
                title: 'Ades??o (R$)',
                fieldName: 'MembershipPrice',
                type: 'handler',
                handler: (value) =>
                  value !== undefined ? utils.BRLMoneyFormat(Number(value)) : ''
              },
              {
                title: 'Recorr??ncia (R$)',
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
          loading={updatePlanLoading || createPlanPriceLoading}
        />
      </div>
      <plans.UpdateSlidePanel />
    </common.Card>
  )
}
