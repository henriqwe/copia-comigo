import { ChipIcon, DeviceMobileIcon, HomeIcon } from '@heroicons/react/outline'
import React from 'react'
import rotas from './routes'

// TODO refatorar para ser gerado com arquivo de rotas
export default [
  {
    title: 'Início',
    icon: <HomeIcon className="w-4 h-4 mx-4" />,
    url: rotas.home,
    children: []
  },
  {
    title: 'Propostas',
    url: rotas.propostas,
    icon: <DeviceMobileIcon className="w-4 h-4 mx-4" />,
    children: [
      {
        title: 'Listar',
        url: rotas.propostas,
        icon: <ChipIcon className="w-4 h-4 mx-4" />
      }
    ]
  },
  {
    title: 'Atendimento',
    url: rotas.atendimento.index,
    icon: <DeviceMobileIcon className="w-4 h-4 mx-4" />,
    children: [
      {
        title: 'Cadastros',
        url: rotas.atendimento.cadastros.index,
        children: [
          {
            title: 'Fluxos',
            url: rotas.atendimento.cadastros.fluxos.index,
            icon: <ChipIcon className="w-4 h-4 mx-4" />
          },
          {
            title: 'Perguntas',
            url: rotas.atendimento.cadastros.perguntas.index,
            icon: <ChipIcon className="w-4 h-4 mx-4" />
          },
          {
            title: 'Ações',
            url: rotas.atendimento.cadastros.acoes,
            icon: <ChipIcon className="w-4 h-4 mx-4" />
          }
        ],
        icon: <ChipIcon className="w-4 h-4 mx-4" />
      },
      {
        title: 'Leads',
        url: rotas.atendimento.leads,
        icon: <ChipIcon className="w-4 h-4 mx-4" />
      },
      {
        title: 'Tickets',
        url: rotas.atendimento.tickets,
        icon: <ChipIcon className="w-4 h-4 mx-4" />
      },
      {
        title: 'Perfis Comerciais',
        url: rotas.atendimento.perfisComerciais.index,
        icon: <ChipIcon className="w-4 h-4 mx-4" />
      },
      {
        title: 'Veículos',
        url: rotas.atendimento.vehicles,
        icon: <ChipIcon className="w-4 h-4 mx-4" />
      }
    ]
  },
  {
    title: 'Identidades',
    url: rotas.identidades.index,
    children: [
      {
        title: 'Clientes',
        url: rotas.identidades.clientes.index,
        icon: <ChipIcon className="w-4 h-4 mx-4" />
      },
      {
        title: 'Colaboradores',
        url: rotas.identidades.colaboradores,
        icon: <ChipIcon className="w-4 h-4 mx-4" />
      },
      {
        title: 'Fornecedores',
        url: rotas.identidades.fornecedores.index,
        icon: <ChipIcon className="w-4 h-4 mx-4" />
      },
      {
        title: 'Usuários',
        url: rotas.identidades.usuarios,
        icon: <ChipIcon className="w-4 h-4 mx-4" />
      }
    ],
    icon: <HomeIcon className="w-4 h-4 mx-4" />
  },
  {
    title: 'Comercial',
    url: rotas.comercial.index,
    children: [
      {
        title: 'Cadastros',
        url: rotas.comercial.cadastros.index,
        children: [
          {
            title: 'Condicionais',
            url: rotas.comercial.cadastros.condicionais,
            icon: <ChipIcon className="w-4 h-4 mx-4" />
          },
          {
            title: 'Coberturas',
            url: rotas.comercial.cadastros.coberturas,
            icon: <ChipIcon className="w-4 h-4 mx-4" />
          },
          {
            title: 'Atributos',
            url: rotas.comercial.cadastros.atributos,
            icon: <ChipIcon className="w-4 h-4 mx-4" />
          },
          {
            title: 'Tarifas',
            url: rotas.comercial.cadastros.tarifas,
            icon: <ChipIcon className="w-4 h-4 mx-4" />
          }
        ],
        icon: <ChipIcon className="w-4 h-4 mx-4" />
      },
      {
        title: 'Parceiros',
        url: rotas.comercial.fornecedores,
        icon: <ChipIcon className="w-4 h-4 mx-4" />
      },
      {
        title: 'Produtos',
        url: rotas.comercial.produtos,
        icon: <ChipIcon className="w-4 h-4 mx-4" />
      },
      {
        title: 'Serviços',
        url: rotas.comercial.servicos,
        icon: <ChipIcon className="w-4 h-4 mx-4" />
      },
      {
        title: 'Planos',
        url: rotas.comercial.planos,
        icon: <ChipIcon className="w-4 h-4 mx-4" />
      },
      {
        title: 'Combos',
        url: rotas.comercial.combos,
        icon: <ChipIcon className="w-4 h-4 mx-4" />
      },
      {
        title: 'Contratos',
        url: rotas.comercial.contratos,
        icon: <ChipIcon className="w-4 h-4 mx-4" />
      }
    ],
    icon: <HomeIcon className="w-4 h-4 mx-4" />
  },
  {
    title: 'Clientes',
    url: rotas.clientes,
    icon: <ChipIcon className="w-4 h-4 mx-4" />
  },
  {
    title: 'Kanban',
    url: rotas.kanban,
    icon: <ChipIcon className="w-4 h-4 mx-4" />
  }
]
