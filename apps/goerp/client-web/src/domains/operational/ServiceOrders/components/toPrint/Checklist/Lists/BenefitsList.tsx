import { InfoDetails } from '../../InfoDetails'
import { ListItens } from './ListItens'
import * as queries from '../../../../operations/queries'
import { useEffect, useState } from 'react'

export function BenefitsList({ benefits, title }) {
  const [benefetisNames, setBenefetisNames] = useState([])
  useEffect(() => {
    benefits?.forEach(async (benefit) => {
      switch (benefit.TipoPortfolio) {
        case 'plano':
          await queries.getPlanByIdOnlyId(benefit.Portfolio_Id).then((res) => {
            setBenefetisNames((old) => {
              return [...old, res.plan.Nome]
            })
          })
          break
        case 'combo':
          await queries.getComboByIdOnlyId(benefit.Portfolio_Id).then((res) => {
            setBenefetisNames((old) => {
              return [...old, res.combo.Nome]
            })
          })
          break
        case 'serviço':
          await queries
            .getServiceByIdOnlyId(benefit.Portfolio_Id)
            .then((res) => {
              setBenefetisNames((old) => {
                return [...old, res.service.Nome]
              })
            })
          break
      }
    })
  }, [])

  return (
    <div className="flex flex-col">
      <div className="">
        <InfoDetails title={''} subtitle={title} />
      </div>
      <div className="grid grid-cols-2 grid-flow-row gap-2">
        {benefetisNames.map((name, index) => {
          return (
            <div key={index}>
              <ListItens title={name} subtitle={''} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
