import nc from 'next-connect'
import type { NextApiRequest, NextApiResponse } from 'next'
import { useTypedClientQuery } from '&erp/graphql/generated/zeus/apollo'
import {
  operacional_OrdemDeServico_Tipo_enum,
  order_by
} from '&erp/graphql/generated/zeus'
import { gerarOs } from '&erp/core/domains/OS/gerarOS'

const handler = nc<NextApiRequest, NextApiResponse>()

handler.get(async (req, res) => {
  try {
    const type = req.query.type as operacional_OrdemDeServico_Tipo_enum
    const proposalId = req.query.proposalId

    const proposal = await getProposal(proposalId as string)

    const response = await gerarOs({
      proposal,
      type
    })

    return res.status(200).json({
      response
    })
  } catch (error) {
    return res
      .status(400)
      .json({ message: 'Não foi possivel se comunicar com a api', error })
  }
})

async function getProposal(proposalId: string) {
  const {
    data: { propostas_Propostas_by_pk }
  } = await useTypedClientQuery(
    {
      propostas_Propostas_by_pk: [
        {
          Id: proposalId
        },
        {
          Id: true,
          Cliente_Id: true,
          Veiculos: [
            { where: { deleted_at: { _is_null: true } } },
            {
              Veiculo_Id: true,
              PropostasCombos: [
                {
                  where: { deleted_at: { _is_null: true } }
                },
                {
                  Id: true,
                  PropostaVeiculo_Id: true,
                  created_at: true,
                  Combo: {
                    Id: true,
                    Servicos: [
                      { where: { deleted_at: { _is_null: true } } },
                      {
                        Servico: {
                          GeraOS: true,
                          Id: true
                        },
                        ServicosPreco: {
                          Id: true
                        }
                      }
                    ],
                    Produtos: [
                      { where: { deleted_at: { _is_null: true } } },
                      {
                        Id: true,
                        Produto: {
                          Id: true,
                          ServicoDeDesinstalacao: {
                            Id: true,
                            PrestadoresDeServicos: [
                              { where: { deleted_at: { _is_null: true } } },
                              {
                                Prestador_Id: true,
                                Precos: [
                                  {
                                    where: { deleted_at: { _is_null: true } },
                                    order_by: [{ created_at: order_by.desc }]
                                  },
                                  {
                                    Id: true
                                  }
                                ]
                              }
                            ]
                          }
                        },
                        ProdutoPreco: {
                          Id: true,
                          TipoDeRecorrencia_Id: true
                        }
                      }
                    ],
                    Planos: [
                      { where: { deleted_at: { _is_null: true } } },
                      {
                        Id: true,
                        created_at: true,
                        Plano: {
                          Id: true,
                          Produtos: [
                            { where: { deleted_at: { _is_null: true } } },
                            {
                              Produto: {
                                Id: true,
                                ServicoDeDesinstalacao: {
                                  Id: true,
                                  PrestadoresDeServicos: [
                                    {
                                      where: {
                                        deleted_at: { _is_null: true }
                                      }
                                    },
                                    {
                                      Prestador_Id: true,
                                      Precos: [
                                        {
                                          where: {
                                            deleted_at: { _is_null: true }
                                          }
                                        },
                                        {
                                          Id: true
                                        }
                                      ]
                                    }
                                  ]
                                }
                              },
                              ProdutoPreco: {
                                Id: true,
                                TipoDeRecorrencia_Id: true
                              }
                            }
                          ],
                          Servicos: [
                            { where: { deleted_at: { _is_null: true } } },
                            {
                              Id: true,
                              created_at: true,
                              Servico: {
                                Id: true,
                                Nome: true,
                                GeraOS: true
                              },
                              ServicoPreco: {
                                Id: true,
                                created_at: true
                              }
                            }
                          ]
                        },
                        PlanoPreco: {
                          Id: true
                        }
                      }
                    ]
                  },
                  ComboPreco_Id: true
                }
              ],
              PropostasPlanos: [
                { where: { deleted_at: { _is_null: true } } },
                {
                  Id: true,
                  created_at: true,
                  Plano: {
                    Id: true,
                    Produtos: [
                      { where: { deleted_at: { _is_null: true } } },
                      {
                        Produto: {
                          Id: true,
                          ServicoDeDesinstalacao: {
                            Id: true,
                            PrestadoresDeServicos: [
                              { where: { deleted_at: { _is_null: true } } },
                              {
                                Prestador_Id: true,
                                Precos: [
                                  {
                                    where: { deleted_at: { _is_null: true } }
                                  },
                                  {
                                    Id: true
                                  }
                                ]
                              }
                            ]
                          }
                        },
                        ProdutoPreco: {
                          Id: true,
                          TipoDeRecorrencia_Id: true
                        }
                      }
                    ],
                    Servicos: [
                      { where: { deleted_at: { _is_null: true } } },
                      {
                        Id: true,
                        created_at: true,
                        Servico: {
                          Id: true,
                          Nome: true,
                          GeraOS: true
                        },
                        ServicoPreco: {
                          Id: true,
                          created_at: true
                        }
                      }
                    ]
                  },
                  PlanoPreco: {
                    Id: true
                  }
                }
              ],
              PropostasProdutos: [
                { where: { deleted_at: { _is_null: true } } },
                {
                  Id: true,
                  ProdutoPreco: {
                    Id: true,
                    TipoDeRecorrencia_Id: true
                  },
                  Produto: {
                    Id: true,
                    ServicoDeDesinstalacao: {
                      Id: true,
                      PrestadoresDeServicos: [
                        { where: { deleted_at: { _is_null: true } } },
                        {
                          Prestador_Id: true,
                          Precos: [
                            {
                              where: { deleted_at: { _is_null: true } }
                            },
                            {
                              Id: true
                            }
                          ]
                        }
                      ]
                    }
                  },
                  PropostaVeiculo_Id: true,
                  created_at: true
                }
              ],
              PropostasServicos: [
                { where: { deleted_at: { _is_null: true } } },
                {
                  Id: true,
                  created_at: true,
                  Servico: {
                    Id: true,
                    Nome: true,
                    GeraOS: true
                  },
                  ServicosPreco: {
                    Id: true,
                    created_at: true
                  }
                }
              ]
            }
          ],
          created_at: true
        }
      ]
    },
    { fetchPolicy: 'no-cache', notifyOnNetworkStatusChange: true }
  )
  return propostas_Propostas_by_pk
}

export const config = {
  api: {
    bodyParser: true
  }
}

export default handler
