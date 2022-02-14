import { Controller, useForm } from 'react-hook-form'
import * as common from '@comigo/ui-common'
import * as proposals from '&crm/domains/Proposals'
import * as utils from '@comigo/utils'
import { useState } from 'react'

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
      Fornecedores: {
        Precos: {
          Id: string
          Valor: string
        }[]
      }[]
      ServicoDeInstalacao?: {
        Id: string
        Nome: string
        PrestadoresDeServicos: {
          Precos: {
            Id: string
            Valor: string
          }[]
        }[]
      }
    }
  }
}

export function CreateProposalProducts() {
  const [addInstalation, setAddInstalation] = useState(false)
  const {
    setSlidePanelState,
    productsData,
    insertProposalProduct,
    insertProposalProductLoading,
    insertProposalService,
    insertProposalServiceLoading,
    selectedCategory,
    proposalRefetch
  } = proposals.useUpdate()
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch
  } = useForm()

  const onSubmit = async (formData: FormData) => {
    try {
      await insertProposalProduct({
        variables: {
          ProdutoPreco_Id: formData.Product_Id.key.Fornecedores[0].Precos[0].Id,
          Produto_Id: formData.Product_Id.key.Id,
          PropostaVeiculo_Id: selectedCategory.id
        }
      })

      if (addInstalation) {
        await insertProposalService({
          variables: {
            Servico_Id: formData.Product_Id.key.ServicoDeInstalacao.Id,
            ServicosPreco_Id:
              formData.Product_Id.key.ServicoDeInstalacao.PrestadoresDeServicos[0].Precos[0].Id,
            PropostaVeiculo_Id: selectedCategory.id
          }
        })
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
                onChange={onChange}
                error={errors.Product_Id}
                label="Produto"
              />
            </div>
          )}
        />
        {watch('Product_Id') !== undefined && (
          <div>
            <p>Tipo: {watch('Product_Id').key.Tipo.Comentario}</p>
            <p>
              Categorias:{' '}
              {watch('Product_Id').key.Categorias.map(
                (category: { title: string }) => category.title
              )}
            </p>
            {watch('Product_Id').key.ServicoDeInstalacao !== undefined && (
              <div>
                <div className="flex items-center justify-between w-full">
                  <p>Adicionar instalação do produto?</p>
                  <common.form.Switch
                    onChange={() => setAddInstalation(!addInstalation)}
                    value={addInstalation}
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
