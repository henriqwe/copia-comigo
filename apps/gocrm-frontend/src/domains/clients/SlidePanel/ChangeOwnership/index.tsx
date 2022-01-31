import { Controller, useForm } from 'react-hook-form'

import * as common from '@comigo/ui-common'
 
 
import * as activeVehicles from '&crm/domains/clients'
import * as clients from '&crm/domains/identities/Clients'

import * as utils from '@comigo/utils'
 
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import rotas from '&crm/domains/routes'

export default function ChangeOwnership() {
  const router = useRouter()
  const [vehiclesGroup, setVehiclesGroup] = useState([1])
  const [lastNumber, setlastNumber] = useState(0)
  const [reload, setReload] = useState(false)
  const {
    clientData,
    createProposal,
    createProposalLoading,
    userAndTicketData,
    getUserByClientId,
    getComboById
  } = activeVehicles.useUpdate()
  const { clientsData } = clients.useList()
  const {
    handleSubmit,
    formState: { errors },
    control
  } = useForm()
  const onSubmit = async (formData: any) => {
    console.log(formData)
    const plans: {
      Plano_Id: string
      Veiculo_Id: string
      Veiculo: number
      PlanoPreco_Id: string
    }[] = []
    const products: {
      Veiculo: number
      Veiculo_Id: string
      Produto_Id: string
      ProdutoPreco_Id: string
    }[] = []
    const service: {
      Servico_Id: string
      Veiculo_Id: string
      Veiculo: number
      ServicosPreco_Id: string
    }[] = []
    const combos: {
      Combo_Id: string
      Veiculo_Id: string
      Veiculo: number
      ComboPreco_Id: string
    }[] = []
    const validation = vehiclesGroup
      .filter((vehicle) => vehicle !== 0)
      .map((vehicle, index) => {
        console.log('passou')
        if (!formData['Veiculo' + vehicle] || !formData['Cliente']) {
          return
        }

        const comboPlansIds: string[] = []
        const comboServicesIds: string[] = []
        const comboProductsIds: string[] = []

        formData['Veiculo' + vehicle].key.Beneficios.filter(
          (item: { TipoPortfolio: string }) => item.TipoPortfolio === 'combo'
        ).map((item: { Portfolio_Id: string; PortfolioPreco_Id: string }) => {
          getComboById(item.Portfolio_Id, item.PortfolioPreco_Id).then(
            (combo) => {
              // ids dos planos dos combos
              combo.combo?.Planos.map((plan) => {
                comboPlansIds.push(plan.Plano_Id)
              })
              // ids dos produtos dos combos
              combo.combo?.Produtos.map((products) => {
                comboProductsIds.push(products.Produto_Id)
              })
              // ids dos serviços dos combos
              combo.combo?.Servicos.map((services) => {
                comboServicesIds.push(services.Servico_Id)
              })
            }
          )
        })

        // adicionando planos no array
        formData['Veiculo' + vehicle].key.Beneficios.filter(
          (item: { TipoPortfolio: string; Portfolio_Id: string }) =>
            item.TipoPortfolio === 'plano' &&
            !comboPlansIds.includes(item.Portfolio_Id)
        ).map((item: { Portfolio_Id: string; PortfolioPreco_Id: string }) => {
          plans.push({
            PlanoPreco_Id: item.PortfolioPreco_Id,
            Plano_Id: item.Portfolio_Id,
            Veiculo_Id: formData['Veiculo' + vehicle].key.Veiculo.Id,
            Veiculo: index + 1
          })
        })

        // adicionando produtos dos beneficios no array
        formData['Veiculo' + vehicle].key.Beneficios.filter(
          (item: { TipoPortfolio: string; Portfolio_Id: string }) =>
            item.TipoPortfolio === 'produto' &&
            !comboProductsIds.includes(item.Portfolio_Id)
        ).map((item: { Portfolio_Id: string; PortfolioPreco_Id: string }) => {
          products.push({
            ProdutoPreco_Id: item.PortfolioPreco_Id,
            Produto_Id: item.Portfolio_Id,
            Veiculo_Id: formData['Veiculo' + vehicle].key.Veiculo.Id,
            Veiculo: index + 1
          })
        })

        // adicionando produtos do veiculo no array
        formData['Veiculo' + vehicle].key.Produtos.filter(
          (item: { Produto_Id: string }) =>
            !comboProductsIds.includes(item.Produto_Id)
        ).map((item: { Produto_Id: string; ProdutoPreco_Id: string }) => {
          products.push({
            ProdutoPreco_Id: item.ProdutoPreco_Id,
            Produto_Id: item.Produto_Id,
            Veiculo_Id: formData['Veiculo' + vehicle].key.Veiculo.Id,
            Veiculo: index + 1
          })
        })

        // adicionando serviços dos beneficios no array
        formData['Veiculo' + vehicle].key.Beneficios.filter(
          (item: { TipoPortfolio: string; Portfolio_Id: string }) =>
            item.TipoPortfolio === 'serviço' &&
            !comboServicesIds.includes(item.Portfolio_Id)
        ).map((item: { Portfolio_Id: string; PortfolioPreco_Id: string }) => {
          service.push({
            ServicosPreco_Id: item.PortfolioPreco_Id,
            Servico_Id: item.Portfolio_Id,
            Veiculo_Id: formData['Veiculo' + vehicle].key.Veiculo.Id,
            Veiculo: index + 1
          })
        })

        // adicionando serviços do veiculo no array
        formData['Veiculo' + vehicle].key.Servicos.filter(
          (item: { Servico_Id: string }) =>
            !comboServicesIds.includes(item.Servico_Id)
        ).map((item: { Servico_Id: string; ServicoPreco_Id: string }) => {
          service.push({
            ServicosPreco_Id: item.ServicoPreco_Id,
            Servico_Id: item.Servico_Id,
            Veiculo_Id: formData['Veiculo' + vehicle].key.Veiculo.Id,
            Veiculo: index + 1
          })
        })

        // adicionando combos no array
        formData['Veiculo' + vehicle].key.Beneficios.filter(
          (item: { TipoPortfolio: string; Portfolio_Id: string }) =>
            item.TipoPortfolio === 'combo'
        ).map((item: { Portfolio_Id: string; PortfolioPreco_Id: string }) => {
          combos.push({
            ComboPreco_Id: item.PortfolioPreco_Id,
            Combo_Id: item.Portfolio_Id,
            Veiculo_Id: formData['Veiculo' + vehicle].key.Veiculo.Id,
            Veiculo: index + 1
          })
        })

        return true
      })

    if (validation.includes(undefined)) {
      return   utils.notification('Preencha todos os campos para continuar', 'error')
    }

    const userId = await getUserByClientId(formData['Cliente'].key)

    await createProposal({
      variables: {
        Lead_Id: null,
        Ticket_Id: userAndTicketData?.atendimentos_Tickets?.[0].Id,
        TipoDePagamento_Id: 'boleto',
        TipoDeRecorrencia_Id: 'mensal',
        Usuario_Id: userId[0].Id,
        Cliente_Id: formData['Cliente'].key,
        planosData: plans,
        produtosData: products,
        servicosData: service,
        combosData: combos
        // oportunidadesData: []
      }
    })
      .then((response) => {
        router.push(
          rotas.comercial.propostas.index +
            '/' +
            response?.data.insert_propostas_Propostas_one.Id +
            '?origin=changeOwnership'
        )
          utils.notification('Proposta do novo veiculo criada com sucesso', 'success')
      })
      .catch((error) => utils.showError(error))
  }

  useEffect(() => {
    if (vehiclesGroup[vehiclesGroup.length - 1] > lastNumber) {
      setlastNumber(vehiclesGroup[vehiclesGroup.length - 1])
    }
  }, [vehiclesGroup])

  return (
    <form      onSubmit={handleSubmit(onSubmit)}
      data-testid="inserirForm"
      className="flex flex-col items-end"
    >
      <div className="flex flex-col w-full gap-2 mb-2">
        <Controller
          control={control}
          name={'Cliente'}
          render={({ field: { onChange, value } }) => (
            <div className="col-span-4">
              <common.form.Select
                itens={
                  clientsData
                    ? clientsData
                        .filter((client) => client.Id !== router.query.id)
                        .map((client) => {
                          return {
                            key: client.Id,
                            title: client.Pessoa?.Nome as string
                          }
                        })
                    : []
                }
                value={value}
                onChange={onChange}
                error={errors.Cliente}
                label="Novo cliente"
              />
            </div>
          )}
        />
        {vehiclesGroup.map(
          (vehicleGroupPosition, index) =>
            vehicleGroupPosition !== 0 && (
              <div key={index}>
                {index > 0 && <common.Separator />}
                <div className="grid grid-cols-9 gap-2">
                  <Controller
                    control={control}
                    name={'Veiculo' + vehicleGroupPosition}
                    render={({ field: { onChange, value } }) => (
                      <div
                        className={`${
                          index === 0 ? 'col-span-9' : 'col-span-8'
                        }`}
                      >
                        <common.form.Select
                          itens={
                            clientData
                              ? clientData.VeiculosAtivos.filter(
                                  (vehicle) =>
                                    vehicle.Situacao.Valor === 'ativo'
                                ).map((activeVehicle) => {
                                  return {
                                    key: activeVehicle,
                                    title: `${
                                      activeVehicle.Veiculo.Placa
                                        ? activeVehicle.Veiculo.Placa
                                        : activeVehicle.Veiculo.NumeroDoChassi
                                    } - ${activeVehicle.Veiculo.Apelido}`
                                  }
                                })
                              : []
                          }
                          value={value}
                          onChange={onChange}
                          error={errors.Veiculo}
                          label="Veiculo que vai ser movido"
                        />
                      </div>
                    )}
                  />

                  {vehicleGroupPosition !== 1 && (
                    <common.buttons.DeleteButton
                      onClick={() => {
                        vehiclesGroup[index] = 0
                        setReload(!reload)
                      }}
                    />
                  )}
                </div>
              </div>
            )
        )}
        {true && (
          <common.AddForm
            array={vehiclesGroup}
            setArray={setVehiclesGroup}
            lastNumber={lastNumber}
          >
            Adicionar veiculo
          </common.AddForm>
        )}
      </div>
      <common.Separator />
      <common.buttons.PrimaryButton
        title="Enviar"
        disabled={createProposalLoading}
        loading={createProposalLoading}
      />
    </form>  )
}
