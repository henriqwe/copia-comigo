import { InfoDetails } from '../../InfoDetails'
import * as blocks from '@comigo/ui-blocks'
import { useEffect, useState } from 'react'
import * as queries from '../../../../operations/queries'
import * as utils from '@comigo/utils'
export function ProductsList({ produtos, title }) {
  const [productsForTable, setProductsForTable] = useState<any[]>()

  useEffect(() => {
    getDataForTabel()
  }, [])

  async function getDataForTabel() {
    const arrayStep = []

    await Promise.all(
      produtos.map(async (produto) => {
        if (produto.TipoDeIdentificavel_Id === 'kitsDeInstalacao') {
          const kit = await queries.getInstallationKitsIdentifierByItemId(
            produto.Identificavel_Id,
            undefined,
            true
          )

          arrayStep.push({ ...produto, Produto: { Nome: 'Kit de Instalação' } })

          arrayStep.push(
            {
              Produto: { Nome: <span className="ml-8">Equipamento</span> },
              item: kit[0].Rastreador.Equipamento.Imei
            },
            {
              Produto: { Nome: <span className="ml-8">Chip</span> },
              item: utils.phoneFormat(kit[0].Rastreador.Chip.NumeroDaLinha)
            },
            {
              Produto: { Nome: <span className="ml-8">Insumos</span> }
            }
          )

          kit[0].KitDeInsumo.Itens.map((item) => {
            arrayStep.push({
              Produto: {
                Nome: <span className="ml-16">{item.Item.Produto.Nome}</span>
              },
              Quantidade: item.Quantidade
            })
          })
          return
        }
        arrayStep.push(produto)
      })
    )
    setProductsForTable(arrayStep)
  }

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12">
        <InfoDetails title={''} subtitle={title} />
      </div>
      <div className="col-span-12 grid grid-cols-2 grid-flow-row gap-1 items-center">
        {productsForTable && (
          <blocks.BorderLessTable
            colection={productsForTable}
            columnTitles={[
              {
                title: 'Descrição',
                fieldName: 'Produto',
                type: 'handler',
                handler: (Produto) => {
                  return Produto?.Nome
                }
              },
              {
                title: 'Item',
                fieldName: 'item',
                type: 'handler',
                handler: (item) => {
                  return item
                }
              },
              {
                title: 'Quantidade',
                fieldName: 'Quantidade'
              }
            ]}
          />
        )}
      </div>
    </div>
  )
}
