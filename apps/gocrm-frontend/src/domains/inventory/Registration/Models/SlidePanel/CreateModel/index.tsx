import { useForm, Controller } from 'react-hook-form'

import * as common from '@comigo/ui-common'
 
 
import * as models from '&crm/domains/inventory/Registration/Models'
import * as produtos from '&crm/domains/purchases/Products'
import * as manufacturers from '&crm/domains/inventory/Registration/Manufacturers'

import { yupResolver } from '@hookform/resolvers/yup'
import { GraphQLTypes } from '&crm/graphql/generated/zeus'
 import * as utils from '@comigo/utils'
  
import { useRouter } from 'next/router'
import rotas from '&crm/domains/routes'

type CreateModelProps = {
  extra?: () => void
}

export default function CreateModel({ extra = () => null }: CreateModelProps) {
  const router = useRouter()
  const {
    createModelLoading,
    createModel,
    setSlidePanelState,
    modelsRefetch,
    modelSchema
  } = models.useModel()
  const { productsData } = produtos.useList()
  const { manufacturersData } = manufacturers.useManufacturer()
  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useForm({
    resolver: yupResolver(modelSchema)
  })
  const onSubmit = (formData: GraphQLTypes['estoque_Modelos']) => {
    createModel({
      variables: {
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
          utils.notification(formData.Nome + ' cadastrado com sucesso', 'success')
        extra()
      })
      .catch((err) => {
        utils.showError(err)
      })
  }
  return (
    <form      onSubmit={handleSubmit(onSubmit)}
      data-testid="inserirForm"
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
        <common.form.Input
          fieldName="Descricao"
          register={register}
          title="Descrição"
          error={errors.Descricao}
          data-testid="inserirDescricao"
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
                        key: item.Id,
                        title: item.Nome
                      }
                    })
                    : []
                }
                value={value}
                onChange={onChange}
                error={errors.Produto_Id}
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
                error={errors.Fabricante_Id}
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
        title="Enviar"
        disabled={createModelLoading}
        loading={createModelLoading}
      />
    </form>
  )
}
