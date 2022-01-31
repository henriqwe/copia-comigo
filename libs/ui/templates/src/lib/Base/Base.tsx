import { ReactNode, useState } from 'react'

import * as common from '@comigo/ui-common'
import * as blocks from '@comigo/ui-blocks'

type BaseTemplateProps = {
  children: ReactNode
  title?: string
  reload?: {
    action: () => void
    state: boolean
  }
  noGrid?: boolean
  currentLocation?: { title: string; url: string }[]
  theme: string
  mainMenuItens: any
  rotas: any
  companies: {
    name: string,
    ram: string,
    cpus: string,
    disk: string,
    active?: boolean
  }[]
  imageUrl: string
}

export function Base({
  children,
  title = 'Dashboard',
  reload = { action: () => null, state: false },
  noGrid = false,
  currentLocation = [],
  theme,
  mainMenuItens,
  rotas,
  companies,
  imageUrl
}: BaseTemplateProps) {
  const [disabled, setDisabled] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [open, setOpen] = useState(false)
  const [empresa, setEmpresa] = useState('GoCRM')
  return (
    <div className="flex">
      <blocks.MainNavigation mainMenuItens={mainMenuItens} rotas={rotas} imageUrl={imageUrl} />
      <div className="content">
        <div className="z-10 top-bar">
          <common.Breadcrumb
            title={title}
            reload={reload}
            currentLocation={currentLocation}
            setOpen={setOpen}
            setShowModal={setShowModal}
            theme={theme}
          />
        </div>
        {noGrid ? (
          <div>{children}</div>
        ) : (
          <div className="grid grid-cols-12 gap-6 mt-5">{children}</div>
        )}
      </div>
      <blocks.ChangeCompany
        empresa={empresa}
        setEmpresa={setEmpresa}
        open={open}
        setOpen={setOpen}
        companies={companies}
      />
      <blocks.Logout
        disabled={disabled}
        open={showModal}
        setDisabled={setDisabled}
        setOpen={setShowModal}
        rotas={rotas}
      />
    </div>
  )
}
