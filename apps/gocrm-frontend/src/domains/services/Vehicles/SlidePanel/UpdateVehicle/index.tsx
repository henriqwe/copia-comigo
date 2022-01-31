import { Controller, useForm } from 'react-hook-form'

import * as common from '@comigo/ui-common'
 
 
import * as vehicles from '&crm/domains/services/Vehicles'
import * as clients from '&crm/domains/identities/Clients'

import { useEffect, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'

export default function UpdateVehicle() {
  const [category, setCategory] = useState<{ key: string; title: string }>()
  const {
    updateVehicleLoading,
    slidePanelState,
    vehicleSchema,
    getVehicleCategoryById
  } = vehicles.useVehicle()
  const { clientsData } = clients.useList()
  const {
    handleSubmit,
    reset,
    formState: { errors },
    control,
    register
  } = useForm({
    resolver: yupResolver(vehicleSchema)
  })

  useEffect(() => {
    getVehicleCategoryById(slidePanelState.data?.Categoria_Id).then(
      (category) => {
        setCategory({
          key: category?.Id as string,
          title: category?.Nome as string
        })
      }
    )
  }, [slidePanelState.data, reset])

  useEffect(() => {
    reset({
      Placa: slidePanelState.data?.Placa || '',
      Cliente_Id: {
        key: slidePanelState.data?.Cliente?.Id || '',
        title: slidePanelState.data?.Cliente?.Pessoa.Nome || ''
      },
      Categoria_Id: {
        key: category?.key || '',
        title: category?.title || ''
      },
      Apelido: slidePanelState.data?.Apelido || '',
      Chassi: slidePanelState.data?.NumeroDoChassi || ''
    })
  }, [slidePanelState.data, reset])

  return (
    <form data-testid="editForm" className="flex flex-col items-end">
      <div className="flex flex-col w-full gap-2 mb-2">
        {slidePanelState.data?.Placa ? (
          <common.form.LicensePlateInput
            control={control}
            register={register}
            error={errors.Placa}
            onChange={() => null}
            disabled
          />
        ) : (
          <common.form.Input
            fieldName={'Chassi'}
            title={`Número do chassi`}
            register={register}
            disabled
          />
        )}

        <Controller
          control={control}
          name="Categoria_Id"
          render={({ field: { onChange, value } }) => (
            <div>
              <common.form.Select
                itens={[]}
                value={value}
                onChange={onChange}
                error={errors.Categoria_Id}
                label="Categoria"
                disabled
              />
            </div>
          )}
        />
        <common.form.Input
          fieldName={'Apelido'}
          title={`Apelido`}
          register={register}
          disabled
        />
        <Controller
          control={control}
          name="Cliente_Id"
          render={({ field: { onChange, value } }) => (
            <div>
              <common.form.Select
                itens={[]}
                value={value}
                onChange={onChange}
                error={errors.Cliente_Id}
                label="Cliente"
                disabled
              />
            </div>
          )}
        />
        {slidePanelState.data?.NumeroDoChassi && (
          <common.UploadFilePDF
            Id={''}
            path="vehicle"
            documentName="NOTAFISCAL"
            title="Clique para fazer upload da sua Nota fiscal em PDF"
            apiRoute="/api/upload/veiculo"
            disabled
          />
        )}
      </div>
    </form>
  )
}
