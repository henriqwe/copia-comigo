import * as common from '&test/components/common'
import * as icons from '&test/components/common/Icons'
import * as proposals from '&test/components/domains/erp/commercial/Proposals'
import { BRLMoneyFormat } from '&test/utils/formaters'
import { useRef, useState, useEffect } from 'react'
import ReactToPrint from 'react-to-print'

type ProposalsVehicles = proposals.ProposalsArray & {
  Id: string
  position: number
  content: {
    title: string
    subtitle: string
  }
}

const GenerateProposal = () => {
  const [proposalsVehicles, setProposalsVehicles] = useState<
    ProposalsVehicles[]
  >([])
  const [lead, setLead] = useState<{ Nome: string }>()
  const [user, setUser] = useState<{
    Id: string
    Colaborador?: {
      Pessoa: {
        Nome: string
      }
    }
  }>()
  const componentRef = useRef(null)

  const {
    proposalData,
    proposalInstallationsData,
    getLeadById,
    getUserById,
    getVehicleById
  } = proposals.useView()

  async function filterProposalDataByVehiclePostion() {
    if (proposalData) {
      const vehiclesArray: number[] = []
      const vehiclesLicensePlate: string[] = []
      await Promise.all(
        proposalData.Combos.map(async (combo) => {
          if (!vehiclesArray.includes(combo.Veiculo)) {
            vehiclesArray.push(combo.Veiculo)
            const vehicle =
              combo.Veiculo_Id !== null
                ? await getVehicleById(combo.Veiculo_Id as string)
                : undefined
            vehiclesLicensePlate.push(vehicle?.data?.Placa as string)
          }
        })
      )
      await Promise.all(
        proposalData.Planos.map(async (plan) => {
          if (!vehiclesArray.includes(plan.Veiculo)) {
            vehiclesArray.push(plan.Veiculo)
            const vehicle =
              plan.Veiculo_Id !== null
                ? await getVehicleById(plan.Veiculo_Id as string)
                : undefined
            vehiclesLicensePlate.push(vehicle?.data?.Placa as string)
          }
        })
      )
      await Promise.all(
        proposalData.Produtos.map(async (product) => {
          if (!vehiclesArray.includes(product.Veiculo)) {
            vehiclesArray.push(product.Veiculo)
            const vehicle =
              product.Veiculo_Id !== null
                ? await getVehicleById(product.Veiculo_Id as string)
                : undefined
            vehiclesLicensePlate.push(vehicle?.data?.Placa as string)
          }
        })
      )
      await Promise.all(
        proposalData.Servicos.map(async (service) => {
          if (!vehiclesArray.includes(service.Veiculo)) {
            vehiclesArray.push(service.Veiculo)
            const vehicle =
              service.Veiculo_Id !== null
                ? await getVehicleById(service.Veiculo_Id as string)
                : undefined
            vehiclesLicensePlate.push(vehicle?.data?.Placa as string)
          }
        })
      )
      const vehicleGroup = vehiclesArray.map((position, index) => {
        return {
          content: {
            title: 'Veículo ',
            subtitle:
              vehiclesLicensePlate[index] !== undefined
                ? vehiclesLicensePlate[index]
                : 'Sem vínculo'
          },
          position,
          Combos: proposalData.Combos.filter(
            (combo) => combo.Veiculo === position
          ),
          Planos: proposalData.Planos.filter(
            (plan) => plan.Veiculo === position
          ),
          Produtos: proposalData.Produtos.filter(
            (product) => product.Veiculo === position
          ),
          Servicos: proposalData.Servicos.filter(
            (service) => service.Veiculo === position
          ),
          Oportunidades: proposalData.Oportunidades.filter(
            (upSelling) => upSelling.Veiculo === position
          ),
          Id: '',
          Situacao: { Comentario: '', Valor: '' }
        }
      })

      setProposalsVehicles(
        vehicleGroup.sort((item1, item2) => item1.position - item2.position)
      )
    }
    proposalData?.Combos.map((combo) => combo.Veiculo)
  }

  function getTotalValue() {
    let totalPrice = 0

    proposalsVehicles.map((vehicle) => {
      vehicle?.Combos.map((combo) => {
        combo.Combo.Planos.map((plan: { ValorPraticado: string }) => {
          totalPrice += Number(plan.ValorPraticado)
        })
        combo.Combo.Produtos.map((product: { ValorPraticado: string }) => {
          totalPrice += Number(product.ValorPraticado)
        })
        combo.Combo.Servicos.map((service: { ValorPraticado: string }) => {
          totalPrice += Number(service.ValorPraticado)
        })
        combo.Combo.Combos.map((combo: { Valor: string }) => {
          totalPrice += Number(combo.Valor)
        })
        totalPrice += Number(combo.ComboPreco.ValorBase)
      })

      vehicle.Planos.map((plans) => {
        totalPrice += Number(
          plans.PlanoPreco.ValorPraticado
            ? plans.PlanoPreco.ValorPraticado + plans.PlanoPreco.ValorBase
            : plans.PlanoPreco.ValorBase + plans.PlanoPreco.ServicoPreco.Valor
        )
      })

      vehicle.Produtos.map((product) => {
        totalPrice += Number(product.ProdutoPreco.Valor)
      })

      vehicle.Servicos.map((service) => {
        totalPrice += Number(service.ServicosPreco.Valor)
      })
    })

    return BRLMoneyFormat(totalPrice)
  }

  function getComboValue(combo: {
    Combo: {
      Planos: {
        ValorPraticado: string
      }[]
      Produtos: {
        ValorPraticado: string
      }[]
      Servicos: {
        ValorPraticado: string
      }[]
      Combos: {
        Valor: string
      }[]
    }
    ComboPreco: { ValorBase: string }
  }) {
    let totalPrice = 0
    combo.Combo.Planos.map((plan: { ValorPraticado: string }) => {
      totalPrice += Number(plan.ValorPraticado)
    })
    combo.Combo.Produtos.map((product: { ValorPraticado: string }) => {
      totalPrice += Number(product.ValorPraticado)
    })
    combo.Combo.Servicos.map((service: { ValorPraticado: string }) => {
      totalPrice += Number(service.ValorPraticado)
    })
    combo.Combo.Combos.map((combo: { Valor: string }) => {
      totalPrice += Number(combo.Valor)
    })
    totalPrice += Number(combo.ComboPreco.ValorBase)
    return totalPrice
  }

  function getServicesDependencies(value: any, type: string) {
    let array = []
    switch (type) {
      case 'plans':
        return `Serviços inclusos: ${value.Servico.Nome}`

      case 'products':
        array = value.Servicos_Produtos.map(
          (item: {
            Servico: {
              Nome: string
            }
          }) => item.Servico.Nome
        )
        if (array.length === 0) return
        return `Serviços inclusos: ${array.map((item: string) => ' ' + item)}`

      case 'services':
        array = value.servicosServicos.map(
          (item: {
            Servico: {
              Nome: string
            }
          }) => item.Servico.Nome
        )
        if (array.length === 0) return
        return `Serviços inclusos: ${array.map((item: string) => ' ' + item)}`

      case 'combos':
        array = value.Servicos.map(
          (item: {
            Servico: {
              Nome: string
            }
          }) => item.Servico.Nome
        )
        if (array.length === 0) return
        return `Serviços inclusos: ${array.map((item: string) => ' ' + item)}`
    }

    return
  }

  function getProductsDependencies(value: any, type: string) {
    let array = []
    switch (type) {
      case 'products':
        array = value.ProdutosQueDependo.map(
          (item: {
            ProdutoDependente: {
              Nome: string
            }
          }) => item.ProdutoDependente.Nome
        )
        if (array.length === 0) return
        return `Produtos inclusos: ${array.map((item: string) => ' ' + item)}`

      case 'services':
        array = value.Produtos_Servicos.map(
          (item: {
            Produto: {
              Nome: string
            }
          }) => item.Produto.Nome
        )
        if (array.length === 0) return
        return `Produtos inclusos: ${array.map((item: string) => ' ' + item)}`

      case 'combos':
        array = value.Produtos.map(
          (item: {
            Produto: {
              Nome: string
            }
          }) => item.Produto.Nome
        )
        if (array.length === 0) return
        return `Produtos inclusos: ${array.map((item: string) => ' ' + item)}`
    }
    return
  }

  function getPlansDependencies(value: any) {
    let array = []

    array = value.Planos.map(
      (item: {
        Plano: {
          Nome: string
        }
      }) => item.Plano.Nome
    )

    if (array.length === 0) return
    return `Planos inclusos: ${array.map((item: string) => ' ' + item)}`
  }

  function renderDependencies(item: any, type: string) {
    return (
      <div>
        {type === 'combos' && (
          <div>
            <p>{getPlansDependencies(item)}</p>
          </div>
        )}
        <div>
          <p>{getServicesDependencies(item, type)}</p>
        </div>

        {type !== 'plans' && <p>{getProductsDependencies(item, type)}</p>}
      </div>
    )
  }

  function renderUpSellings(combo: any) {
    return (
      <>
        {(
          combo.OportunidadesDeProdutos
            ? combo.OportunidadesDeProdutos.length > 0
            : false || combo.OportunidadesDeServicos
              ? combo.OportunidadesDeServicos.length > 0
              : false
        ) ? (
          <common.Separator className="my-0" />
        ) : null}

        <div className="grid grid-cols-2 gap-4">
          {combo.OportunidadesDeProdutos ? (
            combo.OportunidadesDeProdutos.length > 0 ? (
              <div>
                <p className="text-lg">Oportunidades de produtos</p>
                {combo.OportunidadesDeProdutos.map(
                  (item: { Id: string; Nome: string; Valor: string }) => (
                    <div key={item.Id}>
                      <div className="w-full border-b border-gray-200 dark:border-dark-5 my-0.5" />
                      <div className="flex items-center justify-between gap-4 mt-2">
                        <div className="flex gap-4">
                          <p>{item.Nome}</p>
                          <p>{BRLMoneyFormat(item.Valor)}</p>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            ) : null
          ) : null}

          {combo.OportunidadesDeServicos ? (
            combo.OportunidadesDeServicos.length > 0 ? (
              <div>
                <p className="text-lg">Oportunidades de serviços</p>
                {combo.OportunidadesDeServicos.map(
                  (item: { Id: string; Nome: string; Valor: string }) => (
                    <div key={item.Id}>
                      <div className="w-full border-b border-gray-200 dark:border-dark-5 my-0.5" />
                      <div className="flex items-center justify-between gap-4 mt-2">
                        <div className="flex gap-4">
                          <p>{item.Nome}</p>
                          <p>{BRLMoneyFormat(item.Valor)}</p>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            ) : null
          ) : null}
        </div>
      </>
    )
  }

  useEffect(() => {
    if (proposalData?.Lead_Id) {
      getLeadById(proposalData?.Lead_Id).then((lead) => {
        setLead(lead)
      })
    }

    if (proposalData?.Usuario_Id) {
      getUserById(proposalData.Usuario_Id).then((user) => {
        setUser(user)
      })
    }
  }, [proposalData])

  useEffect(() => {
    filterProposalDataByVehiclePostion()
  }, [])

  // colocar map nas instalações
  // colocar os itens com um filter pelo apelido do veiculo
  // colocar para os veiculos que não tem placa o chassi com 10 caracteres

  return (
    <common.Card>
      <div ref={componentRef}>
        <div className="flex items-end justify-between">
          <common.GenericTitle
            title={`Itens da proposta`}
            subtitle="Lead, Colaborador, Combos, Planos, Serviços e Produtos"
            className="px-6"
          />
          <div className="mx-6">
            <ReactToPrint
              trigger={() => (
                <button
                  type="button"
                  className={`flex items-center px-3 py-2 transition rounded-md bg-theme-9 bg-opacity-70 hover:bg-theme-9 hover:opacity-100`}
                >
                  <icons.PrinterIcon />
                </button>
              )}
              content={() => componentRef.current}
            />
          </div>
        </div>
        <common.Separator />
        <div className="mx-6">
          <div className="flex justify-between mb-4">
            {lead ? (
              <common.TitleWithSubTitleAtTheTop
                title={lead.Nome as string}
                subtitle="Lead"
              />
            ) : null}

            <common.TitleWithSubTitleAtTheTop
              title={getTotalValue()}
              subtitle="Preço Total"
            />

            <common.TitleWithSubTitleAtTheTop
              title={user?.Colaborador?.Pessoa.Nome as string}
              subtitle="Colaborador"
            />
          </div>
          {proposalInstallationsData?.map((installation, index) => {
            let installationVehicle:
              | {
                Id: string
                Placa?: string
                NumeroDoChassi?: string
                Categoria_Id: string
                Apelido?: string
              }
              | undefined
            installation.Veiculo_Id !== null &&
              getVehicleById(installation.Veiculo_Id as string).then(
                (vehicle) => {
                  installationVehicle = vehicle.data
                }
              )
            return (
              <div key={index}>
                <p className="text-2xl">
                  {installation.Veiculo_Id
                    ? installationVehicle?.Placa
                    : 'Veículo'}
                  {' - '}
                  {/* {installation.Veiculo_Id
                    ? installation.VeiculoRelacionamento.Placa
                      ? installation.VeiculoRelacionamento.Placa
                      : installation.VeiculoRelacionamento.NumeroDoChassi?.substring(
                          0,
                          10
                        )
                    : installation.Veiculo} */}
                  {' - '}
                  {`${installation.Endereco.Logradouro} - ${installation.Endereco.Numero
                    } ${installation.Endereco.Complemento
                      ? `- installation.Endereco.Complemento`
                      : ''
                    } - ${installation.Endereco.Bairro} - ${installation.Endereco.Cidade
                    } - ${installation.Endereco.Estado}`}
                </p>
                <common.Separator />
                {proposalData?.Planos.filter(
                  (plan) =>
                    plan.Veiculo_Id === installation.Veiculo_Id &&
                    plan.Proposta_Id === installation.Proposta_Id
                ).map((plan, index) => (
                  <div key={index}>
                    <common.TitleWithSubTitleAtTheTop
                      title={`${plan.Plano.Nome} | ${BRLMoneyFormat(
                        plan.PlanoPreco.ValorPraticado
                          ? plan.PlanoPreco.ValorPraticado +
                          plan.PlanoPreco.ValorBase
                          : plan.PlanoPreco.ValorBase +
                          plan.PlanoPreco.ServicoPreco.Valor
                      )}`}
                      subtitle={`Plano`}
                    />
                    {renderDependencies(plan.Plano, 'plans')}
                    <common.Separator />
                  </div>
                ))}

                {proposalData?.Produtos.filter(
                  (product) =>
                    product.Veiculo_Id === installation.Veiculo_Id &&
                    product.Proposta_Id === installation.Proposta_Id
                ).map((product, index) => (
                  <div key={index}>
                    <common.TitleWithSubTitleAtTheTop
                      title={`${product.Produto.Nome} | ${BRLMoneyFormat(
                        product.ProdutoPreco.Valor
                      )}`}
                      subtitle="Produto"
                    />
                    {renderDependencies(product.Produto, 'products')}
                    <common.Separator />
                  </div>
                ))}
                {proposalData?.Servicos.filter(
                  (service) =>
                    service.Veiculo_Id === installation.Veiculo_Id &&
                    service.Proposta_Id === installation.Proposta_Id
                ).map((service, index) => (
                  <div key={index}>
                    <common.TitleWithSubTitleAtTheTop
                      title={`${service.Servico.Nome} | ${BRLMoneyFormat(
                        service.ServicosPreco.Valor
                      )}`}
                      subtitle="Serviço"
                    />
                    {renderDependencies(service.Servico, 'services')}
                    <common.Separator />
                  </div>
                ))}
                {proposalData?.Combos.filter(
                  (combo) =>
                    combo.Veiculo_Id === installation.Veiculo_Id &&
                    combo.Proposta_Id === installation.Proposta_Id
                ).map((combo, index) => (
                  <div key={index}>
                    <common.TitleWithSubTitleAtTheTop
                      title={`${combo.Combo.Nome} | ${BRLMoneyFormat(
                        getComboValue(combo)
                      )}`}
                      subtitle={`Combo`}
                    />
                    {renderDependencies(combo.Combo, 'combos')}
                    {renderUpSellings(combo.Combo)}
                    <common.Separator />
                  </div>
                ))}
              </div>
            )
          })}
        </div>
      </div>
    </common.Card>
  )
}

export default GenerateProposal
