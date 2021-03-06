import { useRouter } from 'next/router'
import { useForm, Controller } from 'react-hook-form'

import rotas from '&erp/domains/routes'

import * as common from '@comigo/ui-common'

import * as installationKits from '&erp/domains/production/Kits/InstallationKits'
import * as trackers from '&erp/domains/production/Trackers'
import { useEffect, useState } from 'react'
import * as utils from '@comigo/utils'

type itens = {
  Id: string
  Produto: {
    Id: string
    Nome: string
  }
  Fabricante: {
    Id: string
    Nome: string
  }
  Modelo?: {
    Id: string
    Nome: string
  }
  Grupo: {
    Nome: string
  }
  Familia: { Nome: string }
}

type InputKit = {
  Id: string
  CodigoReferencia: number
  Itens: {
    Id: string
    Item: {
      Id: string
    }
  }[]
  TiposDeKitDeInsumo: {
    Id: string
    Nome: string
  }
  Item: {
    Id: string
    Produto: {
      Nome: string
    }
  }
}

type Tracker = {
  Id: string
  CodigoReferencia: number
  Chip: {
    Id: string
    Iccid: string
    Item?: { Id: string }
  }
  Equipamento: {
    Id: string
    Identificador: number
    Item: { Id: string }
  }
  Item: {
    Id: string
    Produto: { Nome: string }
    Fabricante: { Nome: string }
    Modelo?: { Nome: string }
    Movimentacoes: { Tipo: string; Quantidade: number }[]
  }
  KitsDeInstalacao: {
    Id: string
  }[]
}

export const Create = () => {
  const [lastNumber, setLastNumber] = useState(0)
  const [trackersGroup, setTrackersGroup] = useState<number[]>([1])
  const [itensPerFamily, setitensPerFamily] = useState<itens[]>([])
  const [inputKitsData, setInputKitsData] = useState<InputKit[]>([])
  const [filteredTrackers, setFilteredTrackers] = useState<Tracker[]>([])
  const [reload, setReload] = useState(false)
  const router = useRouter()
  const { trackersData } = trackers.useList()
  const {
    createInstallationKit,
    createInstallationKitLoading,
    moveStock,
    configData,
    getItensPerFamily,
    kitsTypesData,
    getInputKitByType
  } = installationKits.useCreate()
  const { control, handleSubmit, watch } = useForm()

  async function onSubmit(data: any) {
    try {
      const filteredItensGroup = trackersGroup.filter((item) => item !== 0)
      const valoresDoKit = filteredItensGroup.map((chip) => {
        if (!data['Rastreador_Id' + chip] || !data['KitDeInsumo_Id' + chip]) {
          return
        }

        return {
          Rastreador_Id: data['Rastreador_Id' + chip].key.Id,
          KitDeInsumo_Id: data['KitDeInsumo_Id' + chip].key.Id,
          Item_Id: data['Item_Id'].key
        }
      })

      if (valoresDoKit.includes(undefined)) {
        throw new Error('Preencha todos os campos para continuar')
      }

      await createInstallationKit({
        variables: {
          data: valoresDoKit
        }
      }).then(async () => {
        filteredItensGroup.map(async (rastreador) => {
          await moveStock({
            variables: {
              Item_Id: data['Item_Id'].key,
              ItemRastreador_Id:
                data['Rastreador_Id' + rastreador].key.Item?.Id,
              ItemKitDeInsumo_Id:
                data['KitDeInsumo_Id' + rastreador].key.Item.Id
            }
          })
        })
        router.push(rotas.producao.kits.kitsDeInstalacao.index)
        utils.notification('Kit de instala????o criado com sucesso', 'success')
      })
    } catch (err: any) {
      utils.showError(err)
    }
  }

  function disableMainButton() {
    return watch('Item_Id') === undefined || createInstallationKitLoading
  }

  function trackersFilter() {
    const filter = trackersData?.filter((rastreador) => {
      let balance = 0
      rastreador.Item.Movimentacoes.map((movimentacao) => {
        if (movimentacao.Tipo === 'saida') {
          balance = balance - movimentacao.Quantidade
          return
        }
        balance = balance + movimentacao.Quantidade
      })
      return balance > 0 && rastreador.KitsDeInstalacao.length === 0
    })
    setFilteredTrackers(filter || [])
  }

  useEffect(() => {
    trackersFilter()
    getItensPerFamily().then((itens) => {
      setitensPerFamily(itens)
    })
  }, [getItensPerFamily, trackersData])

  function initialGrid() {
    if (kitsTypesData?.length === 0) {
      return 1
    }

    if(!configData?.Valor[0]){
      return 1
    }

    if (configData?.Valor[0] || filteredTrackers?.length !== 0) {
      return 3
    }
    return 1
  }

  useEffect(() => {
    if (watch('Tipo_Id') !== undefined) {
      getInputKitByType(watch('Tipo_Id').key.Id).then((valor) => {
        const filtro = valor.filter((kitDeInsumo) => {
          let saldo = 0
          kitDeInsumo.Item.Movimentacoes.map((movimentacao) => {
            if (movimentacao.Tipo === 'saida') {
              saldo = saldo - movimentacao.Quantidade
              return
            }
            saldo = saldo + movimentacao.Quantidade
          })
          return saldo > 0 && kitDeInsumo.KitsDeInstalacao.length === 0
        })
        setInputKitsData(filtro)
      })
    }
  }, [watch('Tipo_Id')])

  useEffect(() => {
    if (trackersGroup[trackersGroup.length - 1] > lastNumber) {
      setLastNumber(trackersGroup[trackersGroup.length - 1])
    }
  }, [trackersGroup])

  return (
    <common.Card>
      <common.GenericTitle
        title="Item pertencente"
        subtitle="Selecione o item que os kits de instala????o pertencem"
        className="px-6"
      />
      <common.Separator />
      <form>
        <common.form.FormLine position={1} grid={initialGrid()}>
          {!configData?.Valor[0] ? (
            <common.ConfigMessage rotas={rotas}>
              Selecione a fam??lia de itens para kits de instala????o em
              configura????es primeiro
            </common.ConfigMessage>
          ) : trackersData?.length === 0 || kitsTypesData?.length === 0 ? (
            <div className="flex items-center justify-center my-8">
              <p className="text-xl">
                Sem{' '}
                {trackersData?.length === 0
                  ? 'rastreadores no estoque'
                  : 'tipos de kit de insumos cadastrados'}
              </p>
            </div>
          ) : (
            <>
              <Controller
                control={control}
                name="Tipo_Id"
                render={({ field: { onChange, value } }) => (
                  <div>
                    <common.form.Select
                      itens={
                        kitsTypesData
                          ? kitsTypesData.map((item) => {
                              return {
                                key: item,
                                title: item.Nome
                              }
                            })
                          : []
                      }
                      value={value}
                      onChange={(e) => {
                        onChange(e)
                      }}
                      label="Selecione o tipo do kit de insumo"
                    />
                    <common.OpenModalLink
                      onClick={() =>
                        router.push(
                          rotas.producao.kits.kitsDeInsumo.tipos.cadastrar
                        )
                      }
                    >
                      * Itens pr??-definidos
                    </common.OpenModalLink>
                  </div>
                )}
              />

              <Controller
                name="Item_Id"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <div className="col-span-2">
                    <common.form.Select
                      itens={
                        itensPerFamily
                          ? itensPerFamily.map((item) => {
                              return {
                                key: item.Id,
                                title:
                                  item.Produto.Nome +
                                  ' - ' +
                                  item.Fabricante.Nome +
                                  ' - ' +
                                  item.Modelo?.Nome +
                                  ' - ' +
                                  item.Grupo.Nome +
                                  ' - ' +
                                  item.Familia.Nome
                              }
                            })
                          : []
                      }
                      value={value}
                      onChange={onChange}
                      disabled={watch('Tipo_Id') === undefined}
                      label="Item"
                    />
                    <common.OpenModalLink onClick={() => null}>
                      * Item a ser movimentado
                    </common.OpenModalLink>
                  </div>
                )}
              />
            </>
          )}
        </common.form.FormLine>

        {watch('Tipo_Id') === undefined ? (
          <div />
        ) : inputKitsData.length === 0 || filteredTrackers?.length === 0 ? (
          <div className="flex items-center justify-center my-8">
            <p className="text-xl">
              Sem{' '}
              {filteredTrackers?.length === 0
                ? 'rastreadores no estoque'
                : `kit de insumo no estoque`}
            </p>
          </div>
        ) : (
          <>
            <div className="mt-2">
              <common.GenericTitle
                title="Dados dos kits de instala????o"
                subtitle="Rastreador e Kit de insumo"
                className="px-6"
              />
              <common.Separator />
            </div>

            {trackersGroup.map(
              (item, index) =>
                item !== 0 && (
                  <common.form.FormLine position={item} grid={9} key={index}>
                    <Controller
                      name={'Rastreador_Id' + item}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <div className="col-span-4">
                          <common.form.Select
                            itens={
                              filteredTrackers
                                ? filteredTrackers
                                    .filter((tracker) => {
                                      const trackersIds = trackersGroup.map(
                                        (_, index) => {
                                          return watch('Rastreador_Id' + index)
                                            ? watch('Rastreador_Id' + index).key
                                                .Id
                                            : ''
                                        }
                                      )
                                      return !trackersIds.includes(tracker.Id)
                                    })
                                    .map((rastreador) => {
                                      return {
                                        key: rastreador,
                                        title:
                                          rastreador.CodigoReferencia +
                                          ' - ' +
                                          rastreador.Item.Produto.Nome +
                                          ' - ' +
                                          rastreador.Item.Fabricante.Nome +
                                          ' - ' +
                                          rastreador.Item.Modelo?.Nome +
                                          ' - ' +
                                          rastreador.Chip.Iccid
                                      }
                                    })
                                : []
                            }
                            value={value}
                            onChange={onChange}
                            label="Rastreador"
                          />
                          <common.OpenModalLink
                            onClick={() =>
                              router.push(rotas.producao.rastreadores.cadastrar)
                            }
                          >
                            Cadastrar rastreador
                          </common.OpenModalLink>
                        </div>
                      )}
                    />

                    <Controller
                      name={'KitDeInsumo_Id' + item}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <div className="col-span-4">
                          <common.form.Select
                            itens={
                              inputKitsData
                                ? inputKitsData
                                    .filter((inputKit) => {
                                      const inputKitIds = trackersGroup.map(
                                        (_, index) => {
                                          return watch('KitDeInsumo_Id' + index)
                                            ? watch('KitDeInsumo_Id' + index)
                                                .key.Id
                                            : ''
                                        }
                                      )
                                      return !inputKitIds.includes(inputKit.Id)
                                    })
                                    .map((kitDeInsumo) => {
                                      return {
                                        key: kitDeInsumo,
                                        title:
                                          kitDeInsumo.CodigoReferencia +
                                          ' - ' +
                                          kitDeInsumo.Item.Produto.Nome +
                                          ' - ' +
                                          kitDeInsumo.TiposDeKitDeInsumo.Nome
                                      }
                                    })
                                : []
                            }
                            value={value}
                            onChange={onChange}
                            disabled={watch('Tipo_Id') === undefined}
                            label="Kit de insumo"
                          />
                          <common.OpenModalLink
                            onClick={() =>
                              router.push(
                                rotas.producao.kits.kitsDeInsumo.cadastrar
                              )
                            }
                          >
                            Cadastrar kit de insumo
                          </common.OpenModalLink>
                        </div>
                      )}
                    />

                    {item !== 1 && (
                      <common.buttons.DeleteButton
                        onClick={() => {
                          trackersGroup[index] = 0
                          setReload(!reload)
                        }}
                      />
                    )}
                  </common.form.FormLine>
                )
            )}

            {!createInstallationKitLoading && (
              <common.AddForm
                array={trackersGroup}
                setArray={setTrackersGroup}
                lastNumber={lastNumber}
              >
                Adicionar outro kit de instala????o
              </common.AddForm>
            )}
          </>
        )}
      </form>
      <div className="flex items-center justify-between w-full px-6 mt-4">
        <common.buttons.GoBackButton />
        <common.buttons.PrimaryButton
          title="Cadastrar"
          disabled={disableMainButton()}
          onClick={handleSubmit(onSubmit)}
          loading={createInstallationKitLoading}
        />
      </div>
    </common.Card>
  )
}
