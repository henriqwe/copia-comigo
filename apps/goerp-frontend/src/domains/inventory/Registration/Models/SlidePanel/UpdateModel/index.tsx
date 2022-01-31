import { useForm, Controller } from 'react-hook-form'

import * as common from '@comigo/ui-common'
import * as utils from '@comigo/utils'

import * as models from '&erp/domains/inventory/Registration/Models'
import * as products from '&erp/domains/purchases/Products'
import * as manufacturers from '&erp/domains/inventory/Registration/Manufacturers'

import { useEffect } from 'react'
import { GraphQLTypes } from '&erp/graphql/generated/zeus'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import rotas from '&erp/domains/routes'

export function Update() {
  const router = useRouter()
  const {
    updateModelLoading,
    updateModel,
    setSlidePanelState,
    slidePanelState,
    modelsRefetch,
    modelSchema
  } = models.useModel()
  const { productsData } = products.useList()
  const { manufacturersData } = manufacturers.useManufacturer()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control
  } = useForm({
    resolver: yupResolver(modelSchema)
  })
  const onSubmit = (formData: GraphQLTypes['estoque_Modelos']) => {
    updateModel({
      variables: {
        Id: slidePanelState.data?.Id,
        Nome: formData.Nome,
        Descricao: formData.Descricao,
        Produto_Id: formData.Produto_Id.key,
        Fabricante_Id: formData.Fabricante_Id.key
      }
    })
      .then(() => {
        modelsRefetch()
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
      Nome: slidePanelState.data?.Nome,
      Descricao: slidePanelState.data?.Descricao,
      Produto_Id: {
        key: slidePanelState.data?.Produto.Id,
        title: slidePanelState.data?.Produto.Nome
      },
      Fabricante_Id: {
        key: slidePanelState.data?.Fabricante.Id,
        title: slidePanelState.data?.Fabricante.Nome
      }
    })
  }, [slidePanelState.data, reset])

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
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
        <common.form.Input
          fieldName="Descricao"
          register={register}
          title="Descrição"
          error={errors.Descricao}
          data-testid="editDescricao"
        />
        <Controller
          control={control}
          name="Produto_Id"
          render={({ field: { onChange, value } }) => (
            <div>
              <common.form.Select
                itens={
                  productsData
                    ? productsData.map((item) => {
                      return {
                        key: item,
                        title: item.Nome
                      }
                    })
                    : []
                }
                value={value}
                onChange={onChange}
                error={errors.Produto}
                label="Produto"
              />
              <common.OpenModalLink
                onClick={() => {
                  router.push(rotas.compras.produtos.cadastrar)
                }}
              >
                Cadastrar produto
              </common.OpenModalLink>
            </div>
          )}
        />
        <Controller
          control={control}
          name="Fabricante_Id"
          render={({ field: { onChange, value } }) => (
            <div>
              <common.form.Select
                itens={
                  manufacturersData
                    ? manufacturersData.map((item) => {
                      return { key: item.Id, title: item.Nome }
                    })
                    : []
                }
                value={value}
                onChange={onChange}
                error={errors.Fabricante}
                label="Fabricante"
              />
              <common.OpenModalLink
                onClick={() => {
                  router.push(rotas.estoque.cadastros.fabricantes)
                }}
              >
                Cadastrar fabricante
              </common.OpenModalLink>
            </div>
          )}
        />
      </div>
      <common.Separator />
      <common.buttons.PrimaryButton
        title="Salvar"
        disabled={updateModelLoading}
        loading={updateModelLoading}
      />
    </form>
  )
}
