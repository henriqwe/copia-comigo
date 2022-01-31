import { useRouter } from 'next/router'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import rotas from '&erp/domains/routes'

import * as common from '@comigo/ui-common'


import * as products from '&erp/domains/purchases/Products'
import * as utils from '@comigo/utils'

type FormData = {
  Nome: string
  Descricao: string
  Utilizacao: string
  UnidadeMedida: { key: string; titulo: string }
  NCM: number
}

export const Create = () => {
  const router = useRouter()
  const {
    productSchema,
    createProductLoading,
    createProduct,
    unitsOfMeasureData
  } = products.useCreate()
  const {
    register,
    formState: { errors },
    control,
    handleSubmit
  } = useForm({ resolver: yupResolver(productSchema) })

  async function onSubmit(data: FormData) {
    await createProduct({
      variables: {
        Nome: data.Nome,
        NCM: data.NCM,
        // Descricao: data.Descricao,
        Utilizacao: data.Utilizacao,
        UnidadeDeMedida_Id: data.UnidadeMedida.key
      }
    })
      .then(() => {
        router.push(rotas.compras.produtos.index)
        utils.notification(data.Nome + ' cadastrado com sucesso', 'success')
      })
      .catch((err) => {
        utils.showError(err)
      })
  }

  return (
    <common.Card>
      <common.GenericTitle
        title="Identificação do produto"
        subtitle="Nome, descrição e utilização"
        className="px-6"
      />

      <common.Separator />
      <form onSubmit={handleSubmit(onSubmit)}>
        <common.form.FormLine position={1} grid={3}>
          <common.form.Input
            fieldName="Nome"
            title="Nome"
            register={register}
            error={errors.Nome}
          />

          {/* <div className="col-span-2">
            <common.Input
              nomeDoCampo="Descricao"
              titulo="Descrição"
              register={register}
              error={errors.Descricao}
            />
          </div> */}
          <div className="col-span-2">
            <common.form.Input
              fieldName="Utilizacao"
              title="Utilização"
              register={register}
              error={errors.Utilizacao}
            />
          </div>
        </common.form.FormLine>
        {/* <common.LinhaDeFormulario posicao={2} grid={7}>

        </common.LinhaDeFormulario> */}

        <div className="mt-4">
          <common.GenericTitle
            title="Outros dados"
            subtitle="Unidade de medida"
            className="px-6"
          />

          <common.Separator />
        </div>
        <common.form.FormLine position={1} grid={2}>
          <Controller
            control={control}
            name="UnidadeMedida"
            render={({ field: { onChange, value } }) => (
              <div>
                <common.form.Select
                  itens={
                    unitsOfMeasureData
                      ? unitsOfMeasureData.UnidadesDeMedidas.map((item) => {
                        return { key: item.Valor, title: item.Comentario }
                      })
                      : []
                  }
                  value={value}
                  onChange={onChange}
                  error={errors.UnidadeMedida}
                  label="Unidade de medida"
                />
              </div>
            )}
          />

          <common.form.Input
            fieldName="NCM"
            title="NCM"
            register={register}
            error={errors.NCM}
            type="number"
          />
        </common.form.FormLine>
        <div className="flex items-center justify-between w-full px-6 mt-4">
          <common.buttons.GoBackButton />
          <common.buttons.PrimaryButton
            title="Cadastrar"
            disabled={createProductLoading}
            loading={createProductLoading}
          />
        </div>
      </form>
    </common.Card>
  )
}
