import * as common from '@/common'
import * as activities from '@/domains/erp/operational/ServiceOrders'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { ptBRtimeStamp } from 'utils/formaters'
export default function List() {
  const { serviceOrderActivitiesData, getActivityUser } = activities.useUpdate()
  const { setValue, watch } = useForm()
  useEffect(() => {
    serviceOrderActivitiesData?.map((activity) => {
      getActivityUser(activity.Usuario_Id).then((user) => {
        if (user === null) {
          setValue('Nome' + activity.Id, 'Nome da Pessoa')
          return
        }
        if (user?.Cliente) {
          setValue('Nome' + activity.Id, user.Cliente.Pessoa.Nome)
          return
        }
        setValue('Nome' + activity.Id, user?.Colaborador?.Pessoa.Nome)
      })
    })
  }, [serviceOrderActivitiesData])

  return serviceOrderActivitiesData ? (
    <div className="relative mt-5 report-timeline">
      {serviceOrderActivitiesData.map((activity) => {
        return (
          <common.ActivityCard
            key={activity.Id}
            title={watch('Nome' + activity.Id)}
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
        )
      })}
    </div>
  ) : (
    <common.EmptyContent />
  )
}
