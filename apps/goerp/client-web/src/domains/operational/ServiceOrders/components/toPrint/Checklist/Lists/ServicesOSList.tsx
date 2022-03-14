import { InfoDetails } from '../../InfoDetails'
import { ListItens } from './ListItens'

export function ServicesOSList({ services, title }) {
  return (
    <div className="flex flex-col">
      <div className="">
        <InfoDetails title={''} subtitle={title} />
      </div>
      <div className="grid grid-cols-2 grid-flow-row gap-2">
        {services.map((service, index) => (
          <div key={index}>
            <ListItens title={service.Servico.Nome} subtitle={''} />
          </div>
        ))}
      </div>
    </div>
  )
}
