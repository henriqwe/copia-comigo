import * as common from '&test/components/common'
import * as activities from '&test/components/domains/erp/operational/ServiceOrders/Tabs/Activities'
import { ptBRtimeStamp } from '&test/utils/formaters'
export default function List() {
  const { serviceOrderActivitiesData } = activities.useActivities()
  return serviceOrderActivitiesData ? (
    <div className="relative mt-5 report-timeline">
      {serviceOrderActivitiesData.map((activity) => (
        <common.ActivityCard
          key={activity.Id}
          title={`Nome da Pessoa`}
          date={ptBRtimeStamp(activity.created_at)}
          description={
            <div>
              <p>Situação: {activity.Situacao.Comentario}</p>
              {activity.MotivoRecusado ? (
                <p>Motivo da recusa: {activity.MotivoRecusado}</p>
              ) : null}
            </div>
          }
        />
      ))}
    </div>
  ) : (
    <common.EmptyContent />
  )
}
