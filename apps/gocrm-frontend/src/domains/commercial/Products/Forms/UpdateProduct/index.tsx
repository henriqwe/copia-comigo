import { useEffect, useState } from 'react'

import * as common from '@comigo/ui-common'
 
 
import * as products from '&crm/domains/commercial/Products'
import * as services from '&crm/domains/commercial/Services'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
 import * as utils from '@comigo/utils'
 

type FormData = {
  Nome: string
  Categorias: SelectItem[]
  Tipo: SelectItem
  ServicoDeInstalacao_Id: SelectItem
  ServicoDeDesinstalacao_Id: SelectItem
}

type SelectItem = {
  key: string
  title: string
}

export default function UpdateProduct() {
  const [activeEdit, setActiveEdit] = useState(false)
  const {
    updateProductLoading,
    updateProduct,
    productData,
    productRefetch,
    productSchema,
    vehicleCategoriesData,
    productTypesData
  } = products.useUpdate()
  const { servicesData } = services.useService()

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control
  } = useForm({ resolver: yupResolver(productSchema) })

  function onSubmit(formData: FormData) {
    updateProduct({
      variables: {
        Id: productData?.Id,
        Nome: formData.Nome,
        Categorias: formData.Categorias,
        Tipo_Id: formData.Tipo.key,
        ServicoDeInstalacao_Id:
          formData.ServicoDeInstalacao_Id.key !== ''
            ? formData.ServicoDeInstalacao_Id.key
            : null,
        ServicoDeDesinstalacao_Id:
          formData.ServicoDeDesinstalacao_Id.key !== ''
            ? formData.ServicoDeDesinstalacao_Id.key
            : null
      }
    })
      .then(() => {
        productRefetch()
        setActiveEdit(false)
          utils.notification(formData.Nome + ' editado com sucesso', 'success')
      })
      .catch((err) => {
        utils.showError(err)
      })
  }

  useEffect(() => {
    reset({
      Nome: productData?.Nome || [],
      Categorias: productData?.Categorias || [],
      Tipo: {
        key: productData?.Tipo.Valor || '',
        title: productData?.Tipo.Comentario || ''
      },
      ServicoDeInstalacao_Id: {
        key: productData?.ServicoDeInstalacao?.Id || '',
        title: productData?.ServicoDeInstalacao?.Nome || ''
      },
      ServicoDeDesinstalacao_Id: {
        key: productData?.ServicoDeDesinstalacao?.Id || '',
        title: productData?.ServicoDeDesinstalacao?.Nome || ''
      }
    })
  }, [productData, reset])

  return (
    <div className="flex flex-col gap-4">
      <common.Card>
        <common.GenericTitle
          title="Dados gerais"
          subtitle="Dados básicos do produto"
          className="px-6"
        />
        <common.Separator className="mb-0" />
        <form>          <common.form.FormLine position={1} grid={3}>
            <common.form.Input
              fieldName="Nome"
              title="Nome"
              register={register}
              error={errors.Nome}
              disabled={!activeEdit}
            />
            <Controller
              control={control}
              name="Categorias"
              render={({ field: { onChange, value } }) => (
                <div>
                  <common.form.MultiSelect
                    itens={
                      vehicleCategoriesData
                        ? vehicleCategoriesData.map((vehicleCategory) => {
                          return {
                            key: vehicleCategory.Id,
                            title: vehicleCategory.Nome
                          }
                        })
                        : []
                    }
                    value={value}
                    onChange={onChange}
                    error={errors.Categorias}
                    disabled={!activeEdit}
                    label="Categorias"
                    edit={true}
                  />
                </div>
              )}
            />
            <Controller
              control={control}
              name="Tipo"
              render={({ field: { onChange, value } }) => (
                <div>
                  <common.form.Select
                    itens={
                      productTypesData
                        ? productTypesData.map((productType) => {
                          return {
                            key: productType.Valor,
                            title: productType.Comentario
                          }
                        })
                        : []
                    }
                    value={value}
                    onChange={onChange}
                    error={errors.Tipo}
                    label="Tipo"
                    disabled={!activeEdit}
                  />
                </div>
              )}
            />
          </common.form.FormLine>
          <common.form.FormLine position={1} grid={2}>
            <Controller
              control={control}
              name="ServicoDeInstalacao_Id"
              render={({ field: { onChange, value } }) => (
                <div>
                  <common.form.Select
                    itens={
                      servicesData
                        ? servicesData.map((service) => {
                          return {
                            key: service.Id,
                            title: service.Nome
                          }
                        })
                        : []
                    }
                    value={value}
                    disabled={!activeEdit}
                    onChange={onChange}
                    label="Serviço de instalação (opcional)"
                  />
                </div>
              )}
            />
            <Controller
              control={control}
              name="ServicoDeDesinstalacao_Id"
              render={({ field: { onChange, value } }) => (
                <div>
                  <common.form.Select
                    itens={
                      servicesData
                        ? servicesData.map((service) => {
                          return {
                            key: service.Id,
                            title: service.Nome
                          }
                        })
                        : []
                    }
                    value={value}
                    disabled={!activeEdit}
                    onChange={onChange}
                    label="Serviço de desinstalação (opcional)"
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
                disabled={updateProductLoading}
                loading={updateProductLoading}
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
