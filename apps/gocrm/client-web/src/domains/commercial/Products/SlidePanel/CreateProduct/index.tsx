import { Controller, useForm } from 'react-hook-form'

import * as common from '@comigo/ui-common'

import * as products from '&crm/domains/commercial/Products'
import * as services from '&crm/domains/commercial/Services'

import { yupResolver } from '@hookform/resolvers/yup'
import * as utils from '@comigo/utils'

import { useState } from 'react'

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

export default function CreateProduct() {
  const [activeToggle, setActiveToggle] = useState(false)
  const {
    createProductLoading,
    createProduct,
    setSlidePanelState,
    productsRefetch,
    productSchema,
    vehicleCategoriesData,
    productTypesData
  } = products.useProduct()
  const { servicesData } = services.useService()
  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useForm({
    resolver: yupResolver(productSchema)
  })
  const onSubmit = (formData: FormData) => {
    if (activeToggle && formData.ServicoDeInstalacao_Id === undefined) {
      return utils.notification(
        'Selecione o serviço de instalação para continuar',
        'error'
      )
    }
    createProduct({
      variables: {
        Nome: formData.Nome,
        Categorias: formData.Categorias,
        Tipo_Id: formData.Tipo.key,
        ServicoDeInstalacao_Id: activeToggle
          ? formData.ServicoDeInstalacao_Id.key
          : null,
        ServicoDeDesinstalacao_Id: activeToggle
          ? formData.ServicoDeDesinstalacao_Id.key
          : null
      }
    })
      .then(() => {
        productsRefetch()
        setSlidePanelState((oldState) => {
          return { ...oldState, open: false }
        })
        utils.notification(formData.Nome + ' cadastrado com sucesso', 'success')
      })
      .catch((err) => {
        utils.showError(err)
      })
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      data-testid="inserirForm"
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

        <Controller
          control={control}
          name="Categorias"
          render={({ field: { onChange, value } }) => (
            <div className="col-span-2">
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
                label="Categorias"
              />
            </div>
          )}
        />

        <Controller
          control={control}
          name="Tipo"
          render={({ field: { onChange, value } }) => (
            <div className="col-span-2">
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
              />
            </div>
          )}
        />

        <div>
          <div className="flex items-center justify-between mb-2">
            <p>Este produto precisa de instalação?</p>
            <common.form.Switch
              onChange={() => setActiveToggle(!activeToggle)}
              value={activeToggle}
              size="medium"
            />
          </div>
          <Controller
            control={control}
            name="ServicoDeInstalacao_Id"
            render={({ field: { onChange, value } }) => (
              <div className="col-span-2 mb-2">
                <common.form.Select
                  itens={
                    servicesData
                      ? servicesData
                          .filter((service) => {
                            if (service.PrestadoresDeServicos.length > 0) {
                              return (
                                (service.PrestadoresDeServicos[0].Precos
                                  .length || 0) > 0
                              )
                            }
                          })
                          .map((service) => {
                            return {
                              key: service.Id,
                              title: service.Nome
                            }
                          })
                      : []
                  }
                  value={value}
                  disabled={!activeToggle}
                  onChange={onChange}
                  label="Serviço de instalação"
                />
              </div>
            )}
          />
          <Controller
            control={control}
            name="ServicoDeDesinstalacao_Id"
            render={({ field: { onChange, value } }) => (
              <div className="col-span-2">
                <common.form.Select
                  itens={
                    servicesData
                      ? servicesData
                          .filter((service) => {
                            if (service.PrestadoresDeServicos.length > 0) {
                              return (
                                (service.PrestadoresDeServicos[0].Precos
                                  .length || 0) > 0
                              )
                            }
                          })
                          .map((service) => {
                            return {
                              key: service.Id,
                              title: service.Nome
                            }
                          })
                      : []
                  }
                  value={value}
                  disabled={!activeToggle}
                  onChange={onChange}
                  label="Serviço de desinstalação"
                />
              </div>
            )}
          />
        </div>
      </div>
      <common.Separator />
      <common.buttons.PrimaryButton
        title="Enviar"
        disabled={createProductLoading}
        loading={createProductLoading}
      />
    </form>
  )
}
