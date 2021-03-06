import * as blocks from '@comigo/ui-blocks'
import * as services from '&crm/domains/commercial/Services'

export default function List() {
  const { filteredServices, filters, setFilters } = services.useService()
  return filteredServices ? (
    <div className="mt-4">
      <blocks.Table
        colection={filteredServices}
        search={{
          field: ['Nome', 'Tipo'],
          where: (inputValue: string) => {
            return {
              _or: [
                { Nome: { _ilike: `%${inputValue}%` } },
                { Tipo: { Comentario: { _ilike: `%${inputValue}%` } } }
              ]
            }
          }
        }}
        tableName="comercial_Servicos"
        columnTitles={[
          { title: 'Nome', fieldName: 'Nome' },
          {
            title: 'Tipo',
            fieldName: 'Comentario',
            type: 'relationship',
            relationshipName: 'Tipo'
          }
        ]}
        actions={services.RowActions}
        pagination={{ filters, setFilters }}
      />
    </div>
  ) : (
    <div className="mt-4">
      <blocks.TableSkeleton />
    </div>
  )
}
