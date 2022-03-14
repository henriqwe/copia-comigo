import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import * as common from '@comigo/ui-common'
import * as mutations from '../../../operations/mutations'
import * as queries from '../../../operations/queries'

import * as serviceOrders from '&erp/domains/operational/ServiceOrders'

import * as utils from '@comigo/utils'
import { useEffect, useState } from 'react'
import { datetimeFormat } from '@comigo/utils'
import { useRouter } from 'next/router'

type FormData = {
  Agendamento: Date
  Colaborador_Id: {
    key: string
    title: string
  }
  Responsavel: string
  Telefone: string
  Bairro: string
  Logradouro: string
  Cep: string
  Cidade: string
  Estado: string
  Numero: string
  Complemento: string
}

export function Schedule() {
  const [loading, setLoading] = useState(false)
  const [CEPData, setCEPData] = useState({
    bairro: '',
    logradouro: '',
    localidade: '',
    uf: ''
  })
  const [CEP, setCEP] = useState('')
  const router = useRouter()
  const [valueDatePicker, setValueDatePicker] = useState(undefined)
  const {
    serviceOrderData,
    serviceOrderRefetch,
    serviceOrdersSchema,
    setSlidePanelState,
    serviceOrderActivitiesRefetch,
    collaboratorsData
  } = serviceOrders.useUpdate()

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
    watch
  } = useForm({ resolver: yupResolver(serviceOrdersSchema) })

  async function onSubmit(formData: FormData) {
    setLoading(true)

    if (formData.Agendamento < new Date()) {
      setLoading(false)
      return utils.notification(
        'Data de agendamento deve ser superior a data e hora atual',
        'error'
      )
    }
    let inventoryValidation = false
    const identifiers: { type: string; id: string; productId: string }[] = []

    const Itens = await Promise.all(
      serviceOrderData.Produtos.map(async (product) => {
        const item = await queries.getItemIdByProductId(product.Produto.Id)
        let saldo = 0
        switch (item[0].TipoDeItem_Id) {
          case 'chips':
            await queries
              .getChipIdentifierByItemId(undefined, item[0].Item_Id)
              .then(async (chip) => {
                if (chip.length === 0) {
                  inventoryValidation = true
                  return
                }
                await mutations.updateChip({
                  Id: chip[0].Id,
                  Ativo: true
                })
                identifiers.push({
                  type: 'chips',
                  id: chip[0].Id,
                  productId: product.Id
                })
              })
            break
          case 'equipamentos':
            await queries
              .getEquipmentIdentifierByItemId(undefined, item[0].Item_Id)
              .then(async (equipment) => {
                if (equipment.length === 0) {
                  inventoryValidation = true
                  return
                }
                await mutations.updateEquipment({
                  Id: equipment[0].Id,
                  Ativo: true
                })
                identifiers.push({
                  type: 'equipamentos',
                  id: equipment[0].Id,
                  productId: product.Id
                })
              })
            break
          case 'identificadores':
            await queries
              .getIdentifierByItemId(undefined, item[0].Item_Id)
              .then(async (identifierResponse) => {
                if (identifierResponse.length === 0) {
                  inventoryValidation = true
                  return
                }
                await mutations.updateIdentifier({
                  Id: identifierResponse[0].Id,
                  Ativo: true
                })
                identifiers.push({
                  type: 'identificadores',
                  id: identifierResponse[0].Id,
                  productId: product.Id
                })
              })
            break
          case 'rastreadores':
            await queries
              .getTrackerIdentifierByItemId(undefined, item[0].Item_Id)
              .then(async (tracker) => {
                if (tracker.length === 0) {
                  inventoryValidation = true
                  return
                }
                await mutations.updateTracker({
                  Id: tracker[0].Id,
                  Ativo: true
                })
                identifiers.push({
                  type: 'rastreadores',
                  id: tracker[0].Id,
                  productId: product.Id
                })
              })

            break
          case 'kitsDeInsumo':
            await queries
              .getInputKitsIdentifierByItemId(undefined, item[0].Item_Id)
              .then(async (inputKit) => {
                if (inputKit.length === 0) {
                  inventoryValidation = true
                  return
                }
                await mutations.updateInputKit({
                  Id: inputKit[0].Id,
                  Ativo: true
                })
                identifiers.push({
                  type: 'kitsDeInsumo',
                  id: inputKit[0].Id,
                  productId: product.Id
                })
              })
            break
          case 'kitsDeInstalacao':
            inventoryValidation = await handleInstallationKit({
              identifiers,
              item_Id: item[0].Item_Id,
              product
            })
            // await queries
            //   .getInstallationKitsIdentifierByItemId(undefined, item[0].Item_Id)
            //   .then(async (installationKit) => {
            //     if (installationKit.length === 0) {
            //       inventoryValidation = true
            //       return
            //     }
            //     await mutations.updateInstallationKit({
            //       Id: installationKit[0].Id,
            //       Ativo: true
            //     })
            //     identifiers.push({
            //       type: 'kitsDeInstalacao',
            //       id: installationKit[0].Id,
            //       productId: product.Id
            //     })

            //     console.log(installationKit)
            //   })
            // console.log('passou')
            break
          default:
            await queries.getItemById(item[0].Item_Id).then((response) => {
              response.Movimentacoes.map((movimentacao) => {
                if (movimentacao.Tipo === 'saida') {
                  saldo = saldo - movimentacao.Quantidade
                  return
                }
                saldo = saldo + movimentacao.Quantidade
              })
            })

            if (saldo <= 0) {
              inventoryValidation = true
            }
            break
        }
        return {
          Produto_Id: product.Produto.Id,
          Item_Id: item[0].Item_Id,
          RetiradoDoEstoque: false
        }
      })
    )

    if (inventoryValidation) {
      setLoading(false)
      return utils.notification(
        'Há itens que não estão disponíveis no estoque',
        'error'
      )
    }

    const { Agendamento, Colaborador_Id, Telefone, Responsavel, ...rest } =
      formData
    await mutations
      .updateServiceOrders({
        Agendamento,
        Contato: utils.phoneUnformat(Telefone),
        Responsavel,
        Endereco: rest,
        Colaborador_Id: Colaborador_Id.key,
        Itens,
        OS_Id: router.query.id as string
      })
      .then(async () => {
        await Promise.all(
          identifiers.map(async (identifier) => {
            await mutations.updateServiceOrdersProduct({
              Id: identifier.productId,
              Identificavel_Id: identifier.id,
              TipoDeIdentificavel_Id: identifier.type
            })
          })
        )
        setLoading(false)
        serviceOrderRefetch()
        serviceOrderActivitiesRefetch()
        setSlidePanelState({
          open: false,
          type: 'schedule'
        })
        utils.notification('Ordem de serviço agendada com sucesso', 'success')
      })
      .catch((err) => {
        setLoading(false)
        utils.showError(err)
      })
  }

  async function handleInstallationKit({ item_Id, identifiers, product }) {
    const installationKit = await queries.getInstallationKitsIdentifierByItemId(
      undefined,
      item_Id
    )

    if (installationKit.length === 0) {
      return true
    }
    await mutations.updateInstallationKit({
      Id: installationKit[0].Id,
      Ativo: true
    })
    identifiers.push({
      type: 'kitsDeInstalacao',
      id: installationKit[0].Id,
      productId: product.Id
    })
  }

  useEffect(() => {
    if (serviceOrderData) {
      const resetObject = {
        Agendamento:
          serviceOrderData.Agendamentos.length > 0
            ? datetimeFormat(serviceOrderData.Agendamentos[0].Agendamento)
            : valueDatePicker,
        Colaborador_Id: watch('Colaborador_Id')
      }
      if (CEPData.bairro !== '') {
        reset({
          ...resetObject,
          Bairro: CEPData.bairro,
          Logradouro: CEPData.logradouro,
          Cep: CEP,
          Cidade: CEPData.localidade,
          Estado: CEPData.uf
        })
        return
      }
      reset(resetObject)
    }
  }, [reset, CEPData, serviceOrderData])

  useEffect(() => {
    if (CEP !== '') {
      setCEP(CEP.split('-').join(''))
      fetch(`http://viacep.com.br/ws/${CEP}/json/`)
        .then((response) => response.json())
        .then((data) => setCEPData(data))
        .catch((err) => utils.showError(err))
    }
  }, [CEP])
  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      data-testid="inserirForm"
      className="flex flex-col items-end"
    >
      <div className="flex flex-col w-full gap-2 mb-2">
        <Controller
          name={'Agendamento'}
          control={control}
          defaultValue={valueDatePicker}
          render={({ field: { onChange, value } }) => {
            return (
              <DatePickerComponent
                onChange={onChange}
                value={valueDatePicker}
                setValueDatePicker={setValueDatePicker}
              />
            )
          }}
        />
        <common.form.Input
          fieldName="Responsavel"
          register={register}
          title="Responsável"
          error={errors.Responsavel}
        />
        <common.form.BRPhoneInput
          control={control}
          error={errors.Contato}
          register={register}
        />
        <Controller
          control={control}
          name="Colaborador_Id"
          render={({ field: { onChange, value } }) => (
            <div>
              <common.form.Select
                itens={
                  collaboratorsData
                    ? collaboratorsData.map((item) => {
                        return {
                          key: item.Id,
                          title: item.Pessoa.Nome
                        }
                      })
                    : []
                }
                value={value}
                onChange={onChange}
                error={errors.Colaborador_Id}
                label="Técnico"
              />
            </div>
          )}
        />

        <common.Separator />
        <p className="text-lg text-gray-600">Endereço</p>
        <div className="flex flex-col w-full gap-2 mb-2">
          <common.form.ZipCodeInput
            register={register}
            error={errors.Cep}
            control={control}
            onCompleteZipCode={setCEP}
          />
          <common.Separator />
          <common.form.Input
            fieldName="Logradouro"
            register={register}
            title="Logradouro"
            error={errors.Logradouro}
            disabled
          />
          <common.form.Input
            fieldName="Bairro"
            register={register}
            title="Bairro"
            error={errors.Bairro}
            disabled
          />
          <common.form.Input
            fieldName="Cidade"
            register={register}
            title="Cidade"
            error={errors.Cidade}
            disabled
          />
          <common.form.Input
            fieldName="Estado"
            register={register}
            title="Estado"
            error={errors.Estado}
            disabled
          />
          <common.form.Input
            fieldName="Numero"
            register={register}
            title="Número"
            error={errors.Numero}
          />

          <common.form.Input
            fieldName="Complemento"
            register={register}
            title="Complemento"
            error={errors.Complemento}
          />
        </div>
      </div>
      <common.Separator />
      <common.buttons.PrimaryButton
        title="Enviar"
        disabled={loading}
        loading={loading}
      />
    </form>
  )
}

function DatePickerComponent({ value, onChange, setValueDatePicker }) {
  const isWeekday = (date) => {
    const day = date.getDay()
    return day !== 0
  }

  const filterPassedTime = (time) => {
    const currentDate = new Date()
    const selectedDate = new Date(time)
    return currentDate.getTime() < selectedDate.getTime()
  }
  return (
    <>
      <DatePicker
        selected={value}
        onChange={(e) => {
          onChange(e)
          setValueDatePicker(e)
        }}
        showTimeSelect
        timeFormat="p"
        dateFormat="Pp"
        timeIntervals={15}
        minDate={new Date()}
        filterDate={isWeekday}
        filterTime={filterPassedTime}
        className="w-full"
        title="Data do agendamento"
        customInput={<common.form.Input fieldName="Data do agendamento" />}
      />
    </>
  )
}
