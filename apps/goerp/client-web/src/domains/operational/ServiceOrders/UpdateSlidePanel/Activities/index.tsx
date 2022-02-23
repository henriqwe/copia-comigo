import * as common from '@comigo/ui-common'
import * as activities from '&erp/domains/operational/ServiceOrders'
import { getActivityUser } from '../../operations/queries'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { ptBRtimeStamp } from '@comigo/utils'

export function Activities() {
  const { serviceOrderActivitiesData } = activities.useUpdate()
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
    <div className="relative mt-5 before:block before:absolute before:w-px before:h-[85%] before:bg-slate-200 before:dark:bg-darkmode-400 before:ml-5 before:mt-5">
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
