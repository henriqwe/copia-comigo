import { Controller, useForm } from 'react-hook-form'

import * as common from '@comigo/ui-common'

import * as vehicles from '&crm/domains/services/Vehicles'
import * as client from '&crm/domains/clients'
import * as mutations from '&crm/domains/clients/operations/mutations'

import { yupResolver } from '@hookform/resolvers/yup'
import { v4 as uuid } from 'uuid'
import * as utils from '@comigo/utils'

import axios from 'axios'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import routes from '&crm/domains/routes'

type FormData = {
  Id: string
  Placa: string
  Categoria_Id: {
    key: string
    title: string
  }
  Cliente_Id: {
    key: string
    title: string
  }
  Apelido: string
  Chassi: string
}

export function CreateVehicle() {
  const router = useRouter()
  const [apiData, setApiData] = useState([])
  const [loading, setLoading] = useState(false)
  const {
    vehiclesTypeData,
    vehicleSchema,
    vehicleCategory,
    setVehicleCategory,
    createVehicle,
    createVehicleLoading
  } = vehicles.useVehicle()
  const {
    setSlidePanelState,
    userAndTicketData
  } = client.useUpdate()
  const {
    handleSubmit,
    formState: { errors },
    control,
    register,
    setValue,
    watch
  } = useForm({
    resolver: yupResolver(vehicleSchema)
  })
  const onSubmit = async (formData: FormData) => {
    createVehicle({
      variables: {
        Placa: vehicleCategory === 'placa' ? formData.Placa : null,
        Categoria_Id: '3f5d1306-5201-4a7e-ae95-85fe1a22d894',
        Cliente_Id: formData.Cliente_Id ? formData.Cliente_Id.key : null,
        DadosDaApi: apiData,
        Apelido: formData.Apelido,
        NumeroDoChassi: vehicleCategory === 'chassi' ? formData.Chassi : null
      }
    })
      .then(async (response) => {
        try {
          const proposalUUID = uuid()
          await mutations.createProposal({
            variables: {
              Id: proposalUUID,
              Lead_Id: null,
              Ticket_Id: null,
              Usuario_Id: userAndTicketData.autenticacao_Usuarios[0].Id,
              Cliente_Id: router.query.id as string,
              veiculosData: [
                {
                  Veiculo_Id: response.data.insert_clientes_Veiculos_one.Id
                }
              ]

              // oportunidadesData: []
            }
          })
          utils.notification(
            formData.Apelido + ' cadastrado com sucesso',
            'success'
          )
          router.push(routes.propostas + '/' + proposalUUID)
        } catch (err) {
          utils.showError(err)
        }
      })
      .catch((error) => utils.showError(error))
  }

  function disableSearchButton() {
    if (loading) {
      return true
    }
    if (watch('Placa')) {
      if (watch('Placa')[7] !== '_') {
        return false
      }
    }
    return true
  }

  useEffect(() => {
    setValue('Categoria_Id', undefined)
  }, [vehicleCategory])

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      data-testid="inserirForm"
      className="flex flex-col items-end"
    >
      <div className="flex flex-col w-full gap-2 mb-2">
        <common.ListRadioGroup
          options={[
            {
              value: 'placa',
              content: (
                <div className="inline-flex items-center gap-4">
                  <p className="text-sm">Placa</p>
                </div>
              )
            },
            {
              value: 'chassi',
              content: (
                <div className="inline-flex items-center gap-4">
                  <p className="text-sm">Chassi</p>
                </div>
              )
            }
          ]}
          horizontal
          selectedValue={{
            value: 'placa',
            content: (
              <div className="inline-flex items-center gap-4">
                <p className="text-sm">Placa</p>
              </div>
            )
          }}
          setSelectedOption={setVehicleCategory}
        />
        {vehicleCategory === 'placa' ? (
          <div className="flex items-start gap-2">
            <div className="flex-1">
              <common.form.LicensePlateInput
                control={control}
                register={register}
                error={errors.Placa}
              />
            </div>
            <common.buttons.SecondaryButton
              type="button"
              handler={async () => {
                setLoading(true)
                await axios
                  .get(
                    `${process.env.NEXT_PUBLIC_INFOCAR_URL}/api/acoes/cadastrar-veiculo`,
                    {
                      params: {
                        licensePlate: watch('Placa').split('-').join('')
                      }
                    }
                  )
                  .then((response: { data: any }) => {
                    setValue('Categoria_Id', {
                      key: response.data.data[0][0].CATEGORIA_VEICULO[0],
                      title: response.data.data[0][0].CATEGORIA_VEICULO[0]
                    })
                    setApiData(response.data.data)
                  })
                  .catch((err) => {
                    setValue('Categoria_Id', undefined)
                    utils.showError(err)
                  })
                setLoading(false)
              }}
              title={<common.icons.ViewIcon />}
              disabled={disableSearchButton()}
              loading={loading}
              buttonClassName="h-10"
            />
          </div>
        ) : (
          <common.form.Input
            fieldName={'Chassi'}
            title={`N??mero do chassi`}
            register={register}
          />
        )}

        <Controller
          control={control}
          name="Categoria_Id"
          render={({ field: { onChange, value } }) => (
            <div>
              <common.form.Select
                itens={
                  vehiclesTypeData
                    ? vehiclesTypeData.map((item) => {
                        return {
                          key: item.Id,
                          title: item.Nome as string
                        }
                      })
                    : []
                }
                value={value}
                onChange={onChange}
                error={errors.Categoria_Id}
                label="Categoria"
                disabled={vehicleCategory === 'placa'}
              />
            </div>
          )}
        />
        <common.form.Input
          fieldName={'Apelido'}
          title={`Apelido`}
          register={register}
        />
      </div>
      <common.Separator />
      <div className="flex items-center justify-between w-full">
        <common.buttons.CancelButton
          onClick={() => {
            setSlidePanelState((old) => {
              return {
                ...old,
                type: 'proposal'
              }
            })
          }}
        />
        <common.buttons.PrimaryButton
          title="Enviar"
          disabled={createVehicleLoading}
          loading={createVehicleLoading}
        />
      </div>
    </form>
  )
}
