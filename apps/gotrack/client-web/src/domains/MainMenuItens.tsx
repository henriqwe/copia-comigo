import { MapIcon, HomeIcon } from '@heroicons/react/outline'

import React from 'react'
import rotas from './routes'

export default [
  {
    title: 'Início',
    icon: <HomeIcon className="w-4 h-4 mx-2" />,
    url: rotas.home
  },
  {
    title: 'Monitoramento',
    url: rotas.monitoramento,
    icon: <MapIcon className="w-4 h-4 mx-2" />
  }
]
