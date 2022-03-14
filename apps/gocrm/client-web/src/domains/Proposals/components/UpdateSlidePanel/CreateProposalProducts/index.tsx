import { Controller, useForm } from 'react-hook-form'
import * as common from '@comigo/ui-common'
import * as proposals from '&crm/domains/Proposals'
import * as utils from '@comigo/utils'
import { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'

type FormData = {
  Product_Id: {
    key: {
      Id: string
      Categorias: string[]
      Nome: string
      Tipo: {
        Valor: string
        Comentario: string
      }
      RegrasETermosDeUsos: {
        Id: string
        Mensagem: string
      }[]
      Fornecedores: {
        Precos: {
          Id: string
          Valor: string
          TipoDePreco?: { Valor: string }
        }[]
      }[]
      ServicoDeInstalacao?: {
        Id: string
        Nome: string
        RegrasETermosDeUsos: {
          Id: string
          Mensagem: string
        }[]
        PrestadoresDeServicos: {
          Precos: {
            Id: string
            Valor: string
            TipoDePreco?: { Valor: string }
          }[]
        }[]
      }
    }
  }
  Quantidade: string
}

export function CreateProposalProducts() {
  const [addInstalation, setAddInstalation] = useState(false)
  const [hasInstallation, setHasInstallation] = useState(false)
  const {
    setSlidePanelState,
    productsData,
    insertProposalProduct,
    insertProposalProductLoading,
    insertProposalService,
    insertProposalServiceLoading,
    selectedTab,
    proposalRefetch,
    proposalData,
    insertProposalAlert,
    createProductSchema
  } = proposals.useUpdate()
  const [insertForAll, setInsertForAll] = useState(
    selectedTab.type === 'Resume'
  )
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
    register
  } = useForm({ resolver: yupResolver(createProductSchema) })

  const onSubmit = async (formData: FormData) => {
    try {
      const price = formData.Product_Id.key.Fornecedores[0].Precos
      if (insertForAll) {
        await Promise.all(
          proposalData.Veiculos.map(async (vehicle) => {
            await insertProposalProduct({
              variables: {
                Produto_Id: formData.Product_Id.key.Id,
                PropostaVeiculo_Id: vehicle.Id,
                PrecoDeAdesao_Id: price.filter(
                  (price) => price.TipoDePreco.Valor === 'adesao'
                )[0].Id,
                PrecoDeRecorrencia_Id: price.filter(
                  (price) => price.TipoDePreco.Valor === 'recorrencia'
                )[0].Id,
                Quantidade: formData.Quantidade
              }
            })
          })
        )
      }
      if (!insertForAll) {
        await insertProposalProduct({
          variables: {
            Produto_Id: formData.Product_Id.key.Id,
            PropostaVeiculo_Id: selectedTab.id,
            PrecoDeAdesao_Id: price.filter(
              (price) => price.TipoDePreco.Valor === 'adesao'
            )[0].Id,
            PrecoDeRecorrencia_Id: price.filter(
              (price) => price.TipoDePreco.Valor === 'recorrencia'
            )[0].Id,
            Quantidade: formData.Quantidade
          }
        })
      }

      const existentsProductsAlerts = proposalData.RegrasETermosDeUsos.map(
        (alert) => alert.ProdutoRegrasETermosDeUso?.Produto_Id
      )

      if (!existentsProductsAlerts.includes(formData.Product_Id.key.Id)) {
        await Promise.all(
          formData.Product_Id.key.RegrasETermosDeUsos.map(async (alert) => {
            await insertProposalAlert({
              variables: {
                Produto_RegraETermosDeUso_Id: alert.Id
              }
            })
          })
        )
      }

      if (addInstalation) {
        const servicePrice =
          formData.Product_Id.key.ServicoDeInstalacao.PrestadoresDeServicos[0]
            .Precos
        if (insertForAll) {
          await Promise.all(
            proposalData.Veiculos.map(async (vehicle) => {
              await insertProposalService({
                variables: {
                  Servico_Id: formData.Product_Id.key.ServicoDeInstalacao.Id,
                  PropostaVeiculo_Id: vehicle.Id,
                  PrecoDeAdesao_Id: servicePrice.filter(
                    (price) => price.TipoDePreco.Valor === 'adesao'
                  )[0]?.Id,
                  PrecoDeRecorrencia_Id: servicePrice.filter(
                    (price) => price.TipoDePreco.Valor === 'recorrencia'
                  )[0]?.Id
                }
              })
            })
          )
        }

        if (!insertForAll) {
          await insertProposalService({
            variables: {
              Servico_Id: formData.Product_Id.key.ServicoDeInstalacao.Id,
              PropostaVeiculo_Id: selectedTab.id,
              PrecoDeAdesao_Id: servicePrice.filter(
                (price) => price.TipoDePreco.Valor === 'adesao'
              )[0]?.Id,
              PrecoDeRecorrencia_Id: servicePrice.filter(
                (price) => price.TipoDePreco.Valor === 'recorrencia'
              )[0]?.Id
            }
          })
        }

        const existentsServicesAlerts = proposalData.RegrasETermosDeUsos.map(
          (alert) => alert.ServicoRegrasETermosDeUso?.Servico_Id
        )
        if (
          !existentsServicesAlerts.includes(
            formData.Product_Id.key.ServicoDeInstalacao.Id
          )
        ) {
          await Promise.all(
            formData.Product_Id.key.ServicoDeInstalacao.RegrasETermosDeUsos.map(
              async (alert) => {
                await insertProposalAlert({
                  variables: {
                    Servico_RegraETermosDeUso_Id: alert.Id
                  }
                })
              }
            )
          )
        }
      }
      proposalRefetch()
      utils.notification(
        formData.Product_Id.key.Nome + ' cadastrado com sucesso',
        'success'
      )
      setSlidePanelState((oldState) => {
        return { ...oldState, open: false }
      })
    } catch (err) {
      utils.showError(err)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      data-testid="inserirForm"
      className="flex flex-col items-end"
    >
      <div className="flex flex-col w-full gap-2 mb-2">
        <Controller
          control={control}
          name="Product_Id"
          render={({ field: { onChange, value } }) => (
            <div>
              <common.form.Select
                itens={
                  productsData
                    ? productsData.map((product) => {
                        return {
                          key: product,
                          title: product.Nome as string
                        }
                      })
                    : []
                }
                value={value}
                onChange={(e) => {
                  if (e.key.ServicoDeInstalacao) {
                    setHasInstallation(true)
                    setAddInstalation(true)
                  }
                  onChange(e)
                }}
                error={errors.Product_Id}
                label="Produto"
              />
            </div>
          )}
        />
        <common.form.Input
          fieldName="Quantidade"
          title="Quantidade"
          register={register}
          error={errors.Quantidade}
        />
        <div className="flex items-center justify-between">
          <p>Adicionar este produto para todos os veículos</p>
          <common.form.Switch
            onChange={() => setInsertForAll(!insertForAll)}
            value={insertForAll}
            disabled={selectedTab.type === 'Resume'}
          />
        </div>
        {watch('Product_Id') !== undefined && (
          <div>
            <p>Tipo: {watch('Product_Id').key.Tipo.Comentario}</p>
            <p>
              Categorias:{' '}
              {watch('Product_Id').key.Categorias.map(
                (category: { title: string }) => category.title
              )}
            </p>
            {watch('Product_Id').key.ServicoDeInstalacao !== null && (
              <div>
                <div className="flex items-center justify-between w-full">
                  <p>Adicionar instalação do produto?</p>
                  <common.form.Switch
                    onChange={() => setAddInstalation(!addInstalation)}
                    value={addInstalation}
                    disabled={hasInstallation}
                  />
                </div>
                {addInstalation && (
                  <div>
                    <p>{watch('Product_Id').key.ServicoDeInstalacao.Nome}</p>
                    <p>
                      Preço:{' '}
                      {utils.BRLMoneyFormat(
                        watch('Product_Id').key.ServicoDeInstalacao
                          .PrestadoresDeServicos[0].Precos[0].Valor
                      )}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
      <common.Separator />
      <common.buttons.PrimaryButton
        title="Enviar"
        disabled={insertProposalProductLoading || insertProposalServiceLoading}
        loading={insertProposalProductLoading || insertProposalServiceLoading}
      />
    </form>
  )
}
