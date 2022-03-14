import nc from 'next-connect'
import cors from 'cors'
import type { NextApiRequest, NextApiResponse } from 'next'
import { useTypedClientQuery } from '&erp/graphql/generated/zeus/apollo'
import { gerarOSDesinstalacao } from '&erp/core/domains/OS/gerarOSDesinstalacao'

const handler = nc<NextApiRequest, NextApiResponse>()

handler.use(cors()).get(async (req, res) => {
  try {
    const vehicleId = req.query.vehicleId

    const vehicle = await getVehicleById(vehicleId as string)

    const response = await gerarOSDesinstalacao({
      vehicle
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

async function getVehicleById(activeVehicleId: string) {
  const {
    data: { clientes_VeiculosAtivos_by_pk }
  } = await useTypedClientQuery(
    {
      clientes_VeiculosAtivos_by_pk: [
        {
          Id: activeVehicleId
        },
        {
          Id: true,
          PossuiGNV: true,
          Cliente_Id: true,
          OS_Id: true,
          Situacao_Id: true,
          Veiculo_Id: true,
          Produtos: [
            {
              where: {
                deleted_at: { _is_null: true },
                Ativo: { _eq: true }
              }
            },
            {
              PrecoDeAdesao_Id: true,
              PrecoDeRecorrencia_Id: true,
              Produto_Id: true,
              Identificador: true,
              TipoItem_Id: true
            }
          ],
          Situacao: {
            Comentario: true,
            Valor: true
          },
          Franquia_Id: true,
          Veiculo: {
            Id: true,
            Apelido: true,
            Placa: true,
            NumeroDoChassi: true
          }
        }
      ]
    },
    { fetchPolicy: 'no-cache', notifyOnNetworkStatusChange: true }
  )
  return clientes_VeiculosAtivos_by_pk
}

export const config = {
  api: {
    bodyParser: true
  }
}

export default handler
