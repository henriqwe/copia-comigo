import * as blocks from '@comigo/ui-blocks'
import { SearchIcon } from '@heroicons/react/outline'
import { useState } from 'react'

export function PendingCommands() {
  const [filters, setFilters] = useState({
    limit: 10,
    offset: 0,
    currentPage: 1,
    where: { deleted_at: { _is_null: true } }
  })
  const colection = {
    veiculos: [
      {
        Veículo: 'Ford Ka',
        Placa: 'ABC-123',
        Imei: '123123123',
        Comando: 'Travar veículo',
        Usuario: 'user@email.com',
        Data: '01/01/2022',
        Ações: (
          <button
            className="col-span-3 justify-center items-center flex   rounded-sm    px-2 py-1   "
            onClick={() => {
              console.log('a')
            }}
          >
            <SearchIcon className="w-5 h-5 " />
          </button>
        )
      },
      {
        Veículo: 'Amarok',
        Placa: 'QGN-7097',
        Imei: '123123123',
        Comando: 'Travar veículo',
        Usuario: 'user@email.com',
        Data: '01/01/2022',
        Ações: (
          <button
            className="col-span-3 justify-center items-center flex   rounded-sm    px-2 py-1   "
            onClick={() => {
              console.log('a')
            }}
          >
            <SearchIcon className="w-5 h-5  " />
          </button>
        )
      },
      {
        Veículo: 'Stralis',
        Placa: 'NNT-0793',
        Imei: '123123123',
        Comando: 'Travar veículo',
        Usuario: 'user@email.com',
        Data: '01/01/2022',
        Ações: (
          <button
            className="col-span-3 justify-center items-center flex   rounded-sm    px-2 py-1   "
            onClick={() => {
              console.log('a')
            }}
          >
            <SearchIcon className="w-5 h-5  " />
          </button>
        )
      },
      {
        Veículo: 'CAT 924F',
        Placa: 'CAT-924F',
        Imei: '123123123',
        Comando: 'Travar veículo',
        Usuario: 'user@email.com',
        Data: '01/01/2022',
        Ações: (
          <button
            className="col-span-3 justify-center items-center flex   rounded-sm    px-2 py-1   "
            onClick={() => {
              console.log('a')
            }}
          >
            <SearchIcon className="w-5 h-5  " />
          </button>
        )
      },
      {
        Veículo: 'Stralis',
        Placa: 'NNT-0793',
        Imei: '123123123',
        Comando: 'Travar veículo',
        Usuario: 'user@email.com',
        Data: '01/01/2022',
        Ações: (
          <button
            className="col-span-3 justify-center items-center flex   rounded-sm    px-2 py-1   "
            onClick={() => {
              console.log('a')
            }}
          >
            <SearchIcon className="w-5 h-5  " />
          </button>
        )
      }
    ],
    veiculos_aggregate: {
      nodes: [1, 2, 3, 4, 5],
      aggregate: { count: 5 }
    }
  }
  return (
    <blocks.Table
      tableName="veiculos"
      colection={colection}
      columnTitles={[
        {
          title: 'Veículo',
          fieldName: 'Veículo'
        },
        {
          title: 'Placa',
          fieldName: 'Placa'
        },
        {
          title: 'Imei',
          fieldName: 'Imei'
        },
        {
          title: 'Comando',
          fieldName: 'Comando'
        },
        {
          title: 'Usuário',
          fieldName: 'Usuario'
        },
        {
          title: 'Data',
          fieldName: 'Data'
        },

        {
          title: 'Ações',
          fieldName: 'Ações'
        }
      ]}
      pagination={{ filters, setFilters }}
      search={{
        field: ['Veículo', 'Placa'],
        where: (inputValue: string) => {
          return {
            _or: [
              { Nome: { _ilike: `%${inputValue}%` } },
              { Tipo: { Comentario: { _ilike: `%${inputValue}%` } } }
            ]
          }
        }
      }}
    ></blocks.Table>
  )
}
