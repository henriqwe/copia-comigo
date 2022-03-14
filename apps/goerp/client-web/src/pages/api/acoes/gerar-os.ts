import nc from 'next-connect'
import cors from 'cors'
import type { NextApiRequest, NextApiResponse } from 'next'
import { useTypedClientQuery } from '&erp/graphql/generated/zeus/apollo'
import { operacional_OrdemDeServico_Tipo_enum } from '&erp/graphql/generated/zeus'
import { gerarOs } from '&erp/core/domains/OS/gerarOS'

const handler = nc<NextApiRequest, NextApiResponse>()

handler.use(cors()).get(async (req, res) => {
  try {
    const type = req.query.type as operacional_OrdemDeServico_Tipo_enum
    const proposalId = req.query.proposalId
    const vehicles = JSON.parse(req.query.vehicles as string)

    const proposal = await getProposal(proposalId as string)

    const response = await gerarOs({
      proposal,
      type,
      vehicles
    })

    return res.status(200).json({
      response
    })
  } catch (error) {
    console.log(error)
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
              PossuiGNV: true,
              PropostasCombos: [
                {
                  where: { deleted_at: { _is_null: true } }
                },
                {
                  Id: true,
                  PropostaVeiculo_Id: true,
                  created_at: true,
                  Combo: {
                    Id: true
                  },
                  ComboPreco_Id: true,
                  PropostasPlanos: [
                    {
                      where: {
                        deleted_at: { _is_null: true }
                      }
                    },
                    {
                      Id: true,
                      created_at: true,
                      Plano: {
                        Id: true
                      },
                      PropostasProdutos: [
                        {
                          where: { deleted_at: { _is_null: true } }
                        },
                        {
                          Id: true,
                          Quantidade: true,
                          PrecoAdesao: {
                            Id: true,
                            TipoDePreco: { Valor: true }
                          },
                          PrecoRecorrencia: {
                            Id: true,
                            TipoDePreco: { Valor: true }
                          },
                          PropostaCombo_Id: true,
                          PropostaPlano_Id: true,
                          Produto: {
                            Id: true,
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
                                Itens: [
                                  { where: { deleted_at: { _is_null: true } } },
                                  {
                                    TipoDeItem_Id: true,
                                    Item_Id: true
                                  }
                                ]
                              }
                            ]
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
                          PropostaCombo_Id: true,
                          PropostaPlano_Id: true,
                          PrecoDeAdesao: {
                            Id: true,
                            TipoDePreco: { Valor: true }
                          },
                          PrecoDeRecorrencia: {
                            Id: true,
                            TipoDePreco: { Valor: true }
                          }
                        }
                      ],
                      PlanoPreco: {
                        Id: true
                      },
                      PropostaCombo_Id: true
                    }
                  ],
                  PropostasProdutos: [
                    {
                      where: { deleted_at: { _is_null: true } }
                    },
                    {
                      Id: true,
                      Quantidade: true,
                      PrecoAdesao: {
                        Id: true,
                        TipoDePreco: { Valor: true }
                      },
                      PrecoRecorrencia: {
                        Id: true,
                        TipoDePreco: { Valor: true }
                      },
                      PropostaCombo_Id: true,
                      PropostaPlano_Id: true,
                      Produto: {
                        Id: true,
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
                            Itens: [
                              { where: { deleted_at: { _is_null: true } } },
                              {
                                TipoDeItem_Id: true,
                                Item_Id: true
                              }
                            ]
                          }
                        ]
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
                      PropostaCombo_Id: true,
                      PropostaPlano_Id: true,
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
              PropostasPlanos: [
                {
                  where: {
                    deleted_at: { _is_null: true },
                    PropostaCombo_Id: { _is_null: true }
                  }
                },
                {
                  Id: true,
                  created_at: true,
                  Plano: {
                    Id: true
                  },
                  PropostasProdutos: [
                    {
                      where: { deleted_at: { _is_null: true } }
                    },
                    {
                      Id: true,
                      Quantidade: true,
                      PrecoAdesao: {
                        Id: true,
                        TipoDePreco: { Valor: true }
                      },
                      PrecoRecorrencia: {
                        Id: true,
                        TipoDePreco: { Valor: true }
                      },
                      PropostaCombo_Id: true,
                      PropostaPlano_Id: true,
                      Produto: {
                        Id: true,
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
                            Itens: [
                              { where: { deleted_at: { _is_null: true } } },
                              {
                                TipoDeItem_Id: true,
                                Item_Id: true
                              }
                            ]
                          }
                        ]
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
                      PropostaCombo_Id: true,
                      PropostaPlano_Id: true,
                      PrecoDeAdesao: {
                        Id: true,
                        TipoDePreco: { Valor: true }
                      },
                      PrecoDeRecorrencia: {
                        Id: true,
                        TipoDePreco: { Valor: true }
                      }
                    }
                  ],
                  PlanoPreco: {
                    Id: true
                  },
                  PropostaCombo_Id: true
                }
              ],
              PropostasProdutos: [
                {
                  where: {
                    deleted_at: { _is_null: true },
                    PropostaCombo_Id: { _is_null: true },
                    PropostaPlano_Id: { _is_null: true }
                  }
                },
                {
                  Id: true,
                  Quantidade: true,
                  PrecoAdesao: {
                    Id: true,
                    TipoDePreco: { Valor: true }
                  },
                  PrecoRecorrencia: {
                    Id: true,
                    TipoDePreco: { Valor: true }
                  },
                  PropostaCombo_Id: true,
                  PropostaPlano_Id: true,
                  Produto: {
                    Id: true,
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
                        Itens: [
                          { where: { deleted_at: { _is_null: true } } },
                          {
                            TipoDeItem_Id: true,
                            Item_Id: true
                          }
                        ]
                      }
                    ]
                  },
                  PropostaVeiculo_Id: true,
                  created_at: true
                }
              ],
              PropostasServicos: [
                {
                  where: {
                    deleted_at: { _is_null: true },
                    PropostaCombo_Id: { _is_null: true },
                    PropostaPlano_Id: { _is_null: true }
                  }
                },
                {
                  Id: true,
                  created_at: true,
                  Servico: {
                    Id: true,
                    Nome: true,
                    GeraOS: true
                  },
                  PropostaCombo_Id: true,
                  PropostaPlano_Id: true,
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
