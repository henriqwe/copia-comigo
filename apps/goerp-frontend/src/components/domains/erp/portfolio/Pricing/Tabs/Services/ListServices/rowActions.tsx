import { GraphQLTypes } from 'graphql/generated/zeus'
import * as table from '@/blocks/Table/itens'
import * as form from '@/common/Form'
import * as icons from '@/common/Icons'
import * as services from '@/domains/erp/portfolio/Pricing/Tabs/Services'
import * as providers from '@/domains/erp/portfolio/Pricing'
import { useState, useEffect } from 'react'

export default function RowActions({
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
          <form.Switch
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
        icon: <icons.BurguerIcon />
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
        icon: <icons.DollarIcon />
      }
    )
  }

  useEffect(() => {
    setActive(provider.length > 0 && provider[0].deleted_at === null)
  }, [provider])

  return <table.ActionsRow actions={actions} data-testid="acoesPorRegistro" />
}
