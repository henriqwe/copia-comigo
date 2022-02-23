import nc from 'next-connect'
import cors from 'cors'
import type { NextApiRequest, NextApiResponse } from 'next'
import { useTypedClientQuery } from '&erp/graphql/generated/zeus/apollo'
import { order_by } from '&erp/graphql/generated/zeus'
import { gerarOSMudarVeiculo } from '&erp/core/domains/OS/gerarOSMudarVeiculo'

const handler = nc<NextApiRequest, NextApiResponse>()

handler.use(cors()).get(async (req, res) => {
  try {
    const proposalId = req.query.proposalId

    const proposal = await getProposal(proposalId as string)

    const response = await gerarOSMudarVeiculo({
      proposal
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
                          Id: true,
                          PrestadoresDeServicos: [
                            {
                              where: {
                                deleted_at: { _is_null: true },
                                Prestador_Id: {
                                  _eq: '6fde7f19-6697-4076-befc-b9b73f03b3f5'
                                }
                              }
                            },
                            {
                              Precos: [
                                {
                                  where: { deleted_at: { _is_null: true } },
                                  order_by: [{ created_at: order_by.desc }]
                                },
                                {
                                  Id: true,
                                  TipoDePreco: { Valor: true }
                                }
                              ]
                            }
                          ]
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
                              {
                                where: {
                                  deleted_at: { _is_null: true },
                                  Prestador_Id: {
                                    _eq: '6fde7f19-6697-4076-befc-b9b73f03b3f5'
                                  }
                                }
                              },
                              {
                                Prestador_Id: true,
                                Precos: [
                                  {
                                    where: { deleted_at: { _is_null: true } },
                                    order_by: [{ created_at: order_by.desc }]
                                  },
                                  {
                                    Id: true,
                                    TipoDePreco: { Valor: true }
                                  }
                                ]
                              }
                            ]
                          },
                          Fornecedores: [
                            {
                              where: {
                                deleted_at: { _is_null: true },
                                Fornecedor_Id: {
                                  _eq: '6fde7f19-6697-4076-befc-b9b73f03b3f5'
                                }
                              }
                            },
                            {
                              Precos: [
                                {
                                  where: { deleted_at: { _is_null: true } },
                                  order_by: [{ created_at: order_by.desc }]
                                },
                                {
                                  Id: true,
                                  Valor: true,
                                  TipoDePreco: { Valor: true }
                                }
                              ]
                            }
                          ]
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
                                        deleted_at: { _is_null: true },
                                        Prestador_Id: {
                                          _eq: '6fde7f19-6697-4076-befc-b9b73f03b3f5'
                                        }
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
                                          Id: true,
                                          TipoDePreco: { Valor: true }
                                        }
                                      ]
                                    }
                                  ]
                                },
                                Fornecedores: [
                                  {
                                    where: {
                                      deleted_at: { _is_null: true },
                                      Fornecedor_Id: {
                                        _eq: '6fde7f19-6697-4076-befc-b9b73f03b3f5'
                                      }
                                    }
                                  },
                                  {
                                    Precos: [
                                      {
                                        where: {
                                          deleted_at: { _is_null: true }
                                        },
                                        order_by: [
                                          { created_at: order_by.desc }
                                        ]
                                      },
                                      {
                                        Id: true,
                                        Valor: true,
                                        TipoDePreco: { Valor: true }
                                      }
                                    ]
                                  }
                                ]
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
                                GeraOS: true,
                                PrestadoresDeServicos: [
                                  {
                                    where: {
                                      deleted_at: { _is_null: true },
                                      Prestador_Id: {
                                        _eq: '6fde7f19-6697-4076-befc-b9b73f03b3f5'
                                      }
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
                                        Id: true,
                                        TipoDePreco: { Valor: true }
                                      }
                                    ]
                                  }
                                ]
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
                              {
                                where: {
                                  deleted_at: { _is_null: true },
                                  Prestador_Id: {
                                    _eq: '6fde7f19-6697-4076-befc-b9b73f03b3f5'
                                  }
                                }
                              },
                              {
                                Prestador_Id: true,
                                Precos: [
                                  {
                                    where: { deleted_at: { _is_null: true } }
                                  },
                                  {
                                    Id: true,
                                    TipoDePreco: { Valor: true }
                                  }
                                ]
                              }
                            ]
                          },
                          Fornecedores: [
                            {
                              where: {
                                deleted_at: { _is_null: true },
                                Fornecedor_Id: {
                                  _eq: '6fde7f19-6697-4076-befc-b9b73f03b3f5'
                                }
                              }
                            },
                            {
                              Precos: [
                                {
                                  where: { deleted_at: { _is_null: true } },
                                  order_by: [{ created_at: order_by.desc }]
                                },
                                {
                                  Id: true,
                                  Valor: true,
                                  TipoDePreco: { Valor: true }
                                }
                              ]
                            }
                          ]
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
                          GeraOS: true,
                          PrestadoresDeServicos: [
                            {
                              where: {
                                deleted_at: { _is_null: true },
                                Prestador_Id: {
                                  _eq: '6fde7f19-6697-4076-befc-b9b73f03b3f5'
                                }
                              }
                            },
                            {
                              Prestador_Id: true,
                              Precos: [
                                {
                                  where: { deleted_at: { _is_null: true } }
                                },
                                {
                                  Id: true,
                                  TipoDePreco: { Valor: true }
                                }
                              ]
                            }
                          ]
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
                  PrecoAdesao: {
                    Id: true,
                    TipoDePreco: { Valor: true }
                  },
                  PrecoRecorrencia: {
                    Id: true,
                    TipoDePreco: { Valor: true }
                  },
                  Produto: {
                    Id: true,
                    ServicoDeDesinstalacao: {
                      Id: true,
                      PrestadoresDeServicos: [
                        {
                          where: {
                            deleted_at: { _is_null: true },
                            Prestador_Id: {
                              _eq: '6fde7f19-6697-4076-befc-b9b73f03b3f5'
                            }
                          }
                        },
                        {
                          Prestador_Id: true,
                          Precos: [
                            {
                              where: { deleted_at: { _is_null: true } }
                            },
                            {
                              Id: true,
                              TipoDePreco: { Valor: true }
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
                  PrecoDeAdesao: {
                    Id: true,
                    TipoDePreco: { Valor: true }
                  },
                  PrecoDeRecorrencia: {
                    Id: true,
                    TipoDePreco: { Valor: true }
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
