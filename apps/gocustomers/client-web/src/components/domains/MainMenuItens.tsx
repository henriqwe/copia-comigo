import { ChipIcon, HomeIcon } from '@heroicons/react/outline';

import React from 'react';
import rotas from './routes';

export default [
  {
    title: 'Início',
    icon: <HomeIcon className="w-4 h-4 mx-2" />,
    url: rotas.home,
    children: [],
  },
  {
    title: 'Monitoramento',
    url: rotas.monitoramento.index,
    icon: <ChipIcon className="w-4 h-4 mx-2" />,
    children: [
      {
        title: 'Localização',
        url: rotas.monitoramento.localizacao,
        icon: <ChipIcon className="w-4 h-4 mx-2" />,
      },
      {
        title: 'Trajetos',
        url: rotas.monitoramento.trajetos,
        icon: <ChipIcon className="w-4 h-4 mx-2" />,
      },
      {
        title: 'Comandos',
        url: rotas.monitoramento.comandos,
        icon: <ChipIcon className="w-4 h-4 mx-2" />,
      },
    ],
  },
];
