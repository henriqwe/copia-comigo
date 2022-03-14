import { order_by } from '&erp/graphql/generated/zeus'
import { useTypedClientQuery } from '&erp/graphql/generated/zeus/apollo'

type Combo = {
  Nome: string
  Precos: {
    ValorDeAdesao: string
    ValorDeRecorrencia: string
  }[]

  Planos: {
    Plano: {
      Produtos: {
        Produto_Id: string
      }[]

      Servicos: {
        Servico_Id: string
      }[]
    }
    Produtos: {
      Produto_Id: string
    }[]

    Servicos: {
      Servico_Id: string
    }[]
  }[]

  Produtos: {
    Produto_Id: string
  }[]

  Servicos: {
    Servico_Id: string
  }[]
}

export async function getComboByIdOnlyId(comboId: string) {
  const { data } = await useTypedClientQuery({
    comercial_Combos_by_pk: [
      {
        Id: comboId
      },
      {
        Nome: true,
        Precos: [
          {
            order_by: [{ created_at: order_by.desc }],
            where: { deleted_at: { _is_null: true } }
          },
          {
            ValorDeAdesao: true,
            ValorDeRecorrencia: true
          }
        ],
        Planos: [
          { where: { deleted_at: { _is_null: true } } },
          {
            Plano: {
              Produtos: [
                { where: { deleted_at: { _is_null: true } } },
                {
                  Produto_Id: true
                }
              ],
              Servicos: [
                { where: { deleted_at: { _is_null: true } } },
                {
                  Servico_Id: true
                }
              ]
            },
            Produtos: [
              { where: { deleted_at: { _is_null: true } } },
              {
                Produto_Id: true
              }
            ],
            Servicos: [
              { where: { deleted_at: { _is_null: true } } },
              {
                Servico_Id: true
              }
            ]
          }
        ],
        Produtos: [
          { where: { deleted_at: { _is_null: true } } },
          {
            Produto_Id: true
          }
        ],
        Servicos: [
          { where: { deleted_at: { _is_null: true } } },
          {
            Servico_Id: true
          }
        ]
      }
    ]
  })

  return {
    combo: data.comercial_Combos_by_pk as Combo
  }
}
