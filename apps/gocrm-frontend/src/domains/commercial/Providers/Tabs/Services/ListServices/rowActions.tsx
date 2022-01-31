import { GraphQLTypes } from '&crm/graphql/generated/zeus'

 

import * as services from '&crm/domains/commercial/Providers/Tabs/Services'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function RowActions({
  item
}: {
  item: GraphQLTypes['comercial_Servicos']
}) {
  const router = useRouter()
  const provider = item.PrestadoresDeServicos.filter(
    (provider) =>
      provider.Servico_Id === item.Id &&
      router.query.id === provider.Prestador_Id
  )
  const [active, setActive] = useState(
    provider.length > 0 && provider[0].deleted_at === null
  )
  const {
    activeService,
    removeService,
    servicesRefetch,
    setSlidePanelState,
    reactivateService
  } = services.useService()
  const actions = [
    {
      title: 'Ativar',
      handler: async () => {
        event?.preventDefault()
      },
      icon: (
        <>
          <common.form.Switch
            onChange={async () => {
              if (active) {
                await removeService({
                  variables: {
                    Id: item.PrestadoresDeServicos[0].Id
                  }
                }).then(() => {
                  setActive(false)
                  servicesRefetch()
                })
                return
              }

              if (provider.length > 0) {
                if (provider[0].deleted_at === null) {
                  await activeService({
                    variables: {
                      Servico_Id: item.Id
                    }
                  }).then(() => {
                    setActive(true)
                    servicesRefetch()
                  })
                  return
                }

                await reactivateService({
                  variables: {
                    Id: item.PrestadoresDeServicos[0].Id
                  }
                }).then(() => {
                  setActive(true)
                  servicesRefetch()
                })
                return
              }

              await activeService({
                variables: {
                  Servico_Id: item.Id
                }
              }).then(() => {
                setActive(true)
                servicesRefetch()
              })
            }}
            value={active}
            size="small"
          />
        </>
      )
    }
  ]

  if (active) {
    actions.push(
      {
        title: 'Editar',
        handler: async () => {
          event?.preventDefault()
          setSlidePanelState({
            open: true,
            data: item,
            type: 'tariff'
          })
        },
        icon: <common.icons.BurguerIcon />
      },
      {
        title: 'Precificar',
        handler: async () => {
          event?.preventDefault()
          setSlidePanelState({
            open: true,
            data: item,
            type: 'pricing'
          })
        },
        icon: <common.icons.DollarIcon />
      }
    )
  }

  return <blocks.table.ActionsRow actions={actions} data-testid="acoesPorRegistro" />
}
