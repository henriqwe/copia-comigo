type ColumnTitleProps = {
  columns: { title: string; fieldName: string }[]
  disableActions: boolean
}

export function ColumnTitle({
  columns = [],
  disableActions
}: ColumnTitleProps) {
  return (
    <tr>
      {columns.length ? (
        columns.map((item, index) => (
          <th
            key={`table-title-${index}`}
            className={`${
              index !== 0 ? 'text-left' : ''
            } border-b-2 dark:border-dark-5 whitespace-nowrap !px-1`}
          >
            {item.title}
          </th>
        ))
      ) : (
        <th className="text-right border-b-2 dark:border-dark-5 whitespace-nowrap">
          Sem colunas
        </th>
      )}
      {!disableActions && (
        <th
          className="text-right border-b-2 dark:border-dark-5 whitespace-nowrap"
          data-testid="semações"
        >
          Ações
        </th>
      )}
    </tr>
  )
}
