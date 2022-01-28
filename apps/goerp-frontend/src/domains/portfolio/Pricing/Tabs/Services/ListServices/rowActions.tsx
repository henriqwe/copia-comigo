import { GraphQLTypes } from '&erp/graphql/generated/zeus'
import * as blocks from '@comigo/ui-blocks'

import * as common from '@comigo/ui-common'
import * as services from '&erp/domains/portfolio/Pricing/Tabs/Services'
import * as providers from '&erp/domains/portfolio/Pricing'
import { useState, useEffect } from 'react'

export function RowActions({
  item
}: {
  item: GraphQLTypes['comercial_Servicos']
}) {
  const { configData } = providers.useUpdate()
  const provider = item.PrestadoresDeServicos.filter(
    (provider) =>
      provider.Servico_Id === item.Id &&
      configData?.Valor[0] === provider.Prestador_Id
  )
  const [active, setActive] = useState(false)
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

  useEffect(() => {
    setActive(provider.length > 0 && provider[0].deleted_at === null)
  }, [provider])

  return <blocks.table.ActionsRow actions={actions} data-testid="acoesPorRegistro" />
}
