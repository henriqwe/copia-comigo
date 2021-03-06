import React, { Dispatch, SetStateAction, useState } from 'react'
import Actions from './Actions'
import Filters from './Filters'
import Links from './Links'
import { useRouter } from 'next/router'
import * as common from '@comigo/ui-common'
import * as blocks from '@comigo/ui-blocks'

type MainMenuProps = {
  LinkGroup?: {
    title: string
    url: string
  }[]
  FiltersGroup?: {
    title: string
    children?: {
      url?: string
      handler?: (reset?: boolean) => any
      title: string
    }[]
  }[]
  ActionsGroup?: {
    title: string
    url?: string
    handler?: () => void
  }[]
  search?: { field: string[]; where: any }
  filters?: {
    where: any
  }
  setFilters?: Dispatch<SetStateAction<any>>
}

export function MainMenu({
  LinkGroup = [],
  FiltersGroup = [],
  ActionsGroup = [],
  filters,
  setFilters = () => null,
  search
}: MainMenuProps) {
  const [disabledAll, setDisabledAll] = useState(false)
  const router = useRouter()
  return (
    <div className="p-5 intro-y box">
      <div
        className="pb-4 mb-3 border-b border-gray-300 dark:border-dark-5"
        data-testid="ações"
      >
        {ActionsGroup.length
          ? ActionsGroup.map((item, index) => (
              <Actions
                active={item.url === router.asPath}
                item={item}
                key={`left-side-nav-filter-${index}`}
              />
            ))
          : null}
      </div>

      {LinkGroup.length ? (
        <div data-testid="links">
          {LinkGroup.map((item, index) => (
            <Links
              active={item.url === router.asPath}
              item={item}
              key={`left-side-nav-item-${index}`}
            />
          ))}
        </div>
      ) : null}

      {search && (
        <>
          <blocks.table.Search
            search={search}
            pagination={{
              filters: filters as {
                limit: number
                offset: number
                currentPage: number
                where: any
              },
              setFilters
            }}
            sideBar
          />
          <common.Separator />
        </>
      )}

      <div
        className={`mt-3 ${
          LinkGroup.length ? 'pt-4 border-t border-gray-300' : ''
        } dark:border-dark-5`}
        data-testid="filtros"
      >
        {/* {filters ? (
          filters.where ? (
            Object.keys(filters.where).length > 1 ? (
              <common.buttons.CancelButton
                title="Remover filtros"
                icon={
                  <common.icons.DeleteIcon className="w-5 h-5 mr-2 text-white" />
                }
                onClick={() => {
                  setFilters((old: { limit: number }) => {
                    return {
                      currentPage: 1,
                      limit: old.limit,
                      offset: 0,
                      where: {
                        deleted_at: { _is_null: true }
                      }
                    }
                  })
                  setDisabledAll(!disabledAll)
                }}
                iconPosition="left"
                className="w-full"
              />
            ) : null
          ) : null
        ) : null} */}

        {FiltersGroup.length
          ? FiltersGroup.map((item, index) => {
              if (index === 0) {
                return (
                  <Filters
                    noSeparator
                    item={item}
                    key={`left-side-nav-filter-${index}`}
                    disabledAll={disabledAll}
                  />
                )
              }
              return (
                <Filters
                  item={item}
                  key={`left-side-nav-filter-${index}`}
                  disabledAll={disabledAll}
                />
              )
            })
          : ''}
      </div>
    </div>
  )
}
