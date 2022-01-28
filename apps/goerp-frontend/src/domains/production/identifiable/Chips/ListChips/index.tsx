import * as chips from '&erp/domains/production/identifiable/Chips'
import * as blocks from '@comigo/ui-blocks'
import { phoneFormat } from '@comigo/utils'

export default function List() {
  const { chipsData } = chips.useChips()
  return chipsData ? (
    <blocks.Table
      colection={chipsData}
      columnTitles={[
        { title: 'ICCID', fieldName: 'Iccid' },
        {
          title: 'Número da linha',
          fieldName: 'NumeroDaLinha',
          type: 'handler',
          handler: (numero) => {
            return phoneFormat(numero)
          }
        },
        {
          title: 'Operadora',
          fieldName: 'Nome',
          type: 'relationship',
          relationshipName: 'Operadora'
        },
        {
          title: 'Situação',
          fieldName: 'Situacao',
          type: 'handler',
          handler: (situacao) => {
            return situacao ? situacao.Comentario : ''
          }
        }
      ]}
      actions={chips.rowActions}
    />
  ) : (
    <blocks.TableSkeleton />
  )
}
