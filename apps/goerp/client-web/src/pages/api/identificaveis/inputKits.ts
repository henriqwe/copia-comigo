import nc from 'next-connect'
import cors from 'cors'
import type { NextApiRequest, NextApiResponse } from 'next'
import { useTypedClientQuery } from '&erp/graphql/generated/zeus/apollo'

const handler = nc<NextApiRequest, NextApiResponse>()

handler.use(cors()).get(async (req, res) => {
  try {
    const { data } = await useTypedClientQuery({
      producao_KitsDeInsumo_by_pk: [
        {
          Id: req.query.Id
        },
        {
          Id: true,
          CodigoReferencia: true,
          Item: {
            Produto: {
              Nome: true
            }
          }
        }
      ]
    })

    return res.status(200).json({ data: data?.producao_KitsDeInsumo_by_pk })
  } catch (err) {
    res.status(400).json({ err })
  }
})

export const config = {
  api: {
    bodyParser: true
  }
}

export default handler
