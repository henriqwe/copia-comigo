import { useEffect, useState } from 'react'

import * as blocks from '@/blocks'
import * as clients from '@/domains/erp/clients'
import * as common from '@/common'
import { BRLMoneyFormat, CNPJFormat, CPFFormat } from 'utils/formaters'

export default function ClientVehiclesResume() {
  const price: number[] = [0]
  const [totalValue, setTotalValue] = useState(0)
  const [vehiclesGroup, setVehiclesGroup] = useState<
    {
      Id: null | string
      content: {
        title: string
        subtitle: string
      }
      position: number
    }[]
  >([
    {
      Id: null,
      content: {
        title: '',
        subtitle: 'Visão Geral'
      },
      position: 1
    }
  ])
  const [selectedVehicle, setSelectedVehicle] = useState<{
    Id: null | string
    content: {
      title: string
      subtitle: string
    }
    position: number
  }>({
    Id: null,
    content: {
      title: '',
      subtitle: 'Visão Geral'
    },
    position: 1
  })

  1
  const {
    clientData,
    setSlidePanelState,
    getServiceById,
    getProductById,
    getPlanById,
    getComboById
  } = clients.useUpdate()
  const clientVehicles = clientData?.VeiculosAtivos.filter((vehicle) => {
    if (vehicle.Id === selectedVehicle.Id) {
      return true
    }
    if (selectedVehicle.Id === null) {
      return true
    }
  })

  async function getTotalPrice() {
    clientData?.VeiculosAtivos.map((vehicle) => {
      const benefits = vehicle.Beneficios.map(async (benefit) => {
        switch (benefit.TipoPortfolio) {
          case 'serviço':
            return await getServiceById(
              benefit.Portfolio_Id,
              benefit.PortfolioPreco_Id
            ).then((response) => {
              return Number(response.price?.Valor)
            })
          case 'produto':
            return await getProductById(
              benefit.Portfolio_Id,
              benefit.PortfolioPreco_Id
            ).then((response) => {
              return Number(response.price?.Valor)
            })
          case 'plano':
            return await getPlanById(
              benefit.Portfolio_Id,
              benefit.PortfolioPreco_Id
            ).then((response) => {
              const value = response?.price?.ValorPraticado
                ? Number(response?.price?.ValorPraticado) +
                  Number(response.price?.ValorBase)
                : Number(response?.price?.ValorBase) +
                  Number(response.price?.ServicoPreco.Valor)
              return value
            })
          case 'combo':
            return await getComboById(
              benefit.Portfolio_Id,
              benefit.PortfolioPreco_Id
            ).then((response) => {
              let comboPrice = response?.price?.ValorBase
              response?.combo?.Planos.map((plan) => {
                comboPrice += plan.ValorPraticado
              })
              response?.combo?.Produtos.map((product) => {
                comboPrice += product.ValorPraticado
              })
              response?.combo?.Servicos.map((services) => {
                comboPrice += services.ValorPraticado
              })
              return Number(comboPrice)
            })
        }
      })

      ;(async () => {
        const benefitsPrices = await Promise.all(benefits as any)
        price.push(...benefitsPrices)
        let total = 0
        price.map((price) => (total += price))
        setTotalValue(total)
      })()
    })
  }

  useEffect(() => {
    if ((clientData?.VeiculosAtivos.length ?? 0) > 0) {
      const vehicles = clientData?.VeiculosAtivos.map((vehicle, index) => {
        vehicle.Beneficios
        return {
          Id: vehicle.Id || null,
          content: {
            title: 'Veículo ',
            subtitle: `${vehicle.Veiculo.Apelido} - ${
              vehicle.Veiculo.Placa !== null
                ? vehicle.Veiculo.Placa
                : vehicle.Veiculo.NumeroDoChassi?.substring(0, 10)
            }`
          },
          position: index
        }
      })
      vehicles?.unshift(selectedVehicle)
      setVehiclesGroup(vehicles as any)
      setSelectedVehicle(vehicles?.[0] as any)
    }
  }, [clientData])

  useEffect(() => {
    getTotalPrice()
  }, [clientData])

  return (
    <div className="grid grid-cols-12 col-span-12 gap-8">
      <div className="col-span-3">
        <blocks.SideBarTabs
          array={vehiclesGroup}
          setArray={setVehiclesGroup}
          onChange={setSelectedVehicle}
          allowAdding={true}
          addFunction={() => {
            setSlidePanelState({
              open: true,
              type: 'proposal'
            })
          }}
          selectedItem={selectedVehicle}
          loading={clientData === undefined}
        />
      </div>
      <div className="col-span-9">
        <header className="flex justify-between mb-4">
          <div>
            <h3 className="text-xs text-gray-600">Detalhes do cliente</h3>
            <p className="text-base font-bold">{clientData?.Pessoa.Nome}</p>
            <p className="text-xs dark:text-gray-300">
              {clientData?.Pessoa.PessoaJuridica ? 'CNPJ: ' : 'CPF: '}{' '}
              {clientData?.Pessoa.PessoaJuridica
                ? CNPJFormat(clientData?.Pessoa.Identificador)
                : CPFFormat(clientData?.Pessoa.Identificador as string)}
            </p>
          </div>
          <div className="flex flex-col items-end">
            <h3 className="text-sm text-gray-600">Recorrência mensal</h3>
            <p className="text-2xl font-bold">{BRLMoneyFormat(totalValue)}</p>
          </div>
        </header>

        {clientVehicles?.map((vehicle) => (
          <clients.ClientVehicle
            vehicle={vehicle}
            selectedVehicle={selectedVehicle}
            key={vehicle.Id}
          />
        ))}
      </div>
      <clients.SlidePanel />
    </div>
  )
}
