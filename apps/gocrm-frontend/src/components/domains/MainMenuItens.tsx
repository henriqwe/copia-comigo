import { ChipIcon, DeviceMobileIcon, HomeIcon } from '@heroicons/react/outline'
import React from 'react'
import rotas from './routes'

export default {
  erp: [
    {
      title: 'Início',
      icon: <HomeIcon className="w-4 h-4 mx-4" />,
      url: rotas.erp.home,
      children: []
    },
    {
      title: 'Atendimento',
      url: rotas.erp.atendimento.index,
      icon: <DeviceMobileIcon className="w-4 h-4 mx-4" />,
      children: [
        {
          title: 'Cadastros',
          url: rotas.erp.atendimento.cadastros.index,
          children: [
            {
              title: 'Fluxos',
              url: rotas.erp.atendimento.cadastros.fluxos.index,
              icon: <ChipIcon className="w-4 h-4 mx-4" />
            },
            {
              title: 'Perguntas',
              url: rotas.erp.atendimento.cadastros.perguntas.index,
              icon: <ChipIcon className="w-4 h-4 mx-4" />
            },
            {
              title: 'Ações',
              url: rotas.erp.atendimento.cadastros.acoes,
              icon: <ChipIcon className="w-4 h-4 mx-4" />
            }
          ],
          icon: <ChipIcon className="w-4 h-4 mx-4" />
        },
        {
          title: 'Leads',
          url: rotas.erp.atendimento.leads,
          icon: <ChipIcon className="w-4 h-4 mx-4" />
        },
        {
          title: 'Tickets',
          url: rotas.erp.atendimento.tickets,
          icon: <ChipIcon className="w-4 h-4 mx-4" />
        },
        {
          title: 'Perfis Comerciais',
          url: rotas.erp.atendimento.perfisComerciais.index,
          icon: <ChipIcon className="w-4 h-4 mx-4" />
        },
        {
          title: 'Veículos',
          url: rotas.erp.atendimento.vehicles,
          icon: <ChipIcon className="w-4 h-4 mx-4" />
        }
      ]
    },
    {
      title: 'Identidades',
      url: rotas.erp.identidades.index,
      children: [
        {
          title: 'Clientes',
          url: rotas.erp.identidades.clientes.index,
          icon: <ChipIcon className="w-4 h-4 mx-4" />
        },
        {
          title: 'Colaboradores',
          url: rotas.erp.identidades.colaboradores,
          icon: <ChipIcon className="w-4 h-4 mx-4" />
        },
        {
          title: 'Fornecedores',
          url: rotas.erp.identidades.fornecedores.index,
          icon: <ChipIcon className="w-4 h-4 mx-4" />
        },
        {
          title: 'Usuários',
          url: rotas.erp.identidades.usuarios,
          icon: <ChipIcon className="w-4 h-4 mx-4" />
        }
      ],
      icon: <HomeIcon className="w-4 h-4 mx-4" />
    },
    {
      title: 'Comercial',
      url: rotas.erp.comercial.index,
      children: [
        {
          title: 'Cadastros',
          url: rotas.erp.comercial.cadastros.index,
          children: [
            {
              title: 'Condicionais',
              url: rotas.erp.comercial.cadastros.condicionais,
              icon: <ChipIcon className="w-4 h-4 mx-4" />
            },
            {
              title: 'Coberturas',
              url: rotas.erp.comercial.cadastros.coberturas,
              icon: <ChipIcon className="w-4 h-4 mx-4" />
            },
            {
              title: 'Atributos',
              url: rotas.erp.comercial.cadastros.atributos,
              icon: <ChipIcon className="w-4 h-4 mx-4" />
            },
            {
              title: 'Tarifas',
              url: rotas.erp.comercial.cadastros.tarifas,
              icon: <ChipIcon className="w-4 h-4 mx-4" />
            }
          ],
          icon: <ChipIcon className="w-4 h-4 mx-4" />
        },
        {
          title: 'Parceiros',
          url: rotas.erp.comercial.fornecedores,
          icon: <ChipIcon className="w-4 h-4 mx-4" />
        },
        {
          title: 'Produtos',
          url: rotas.erp.comercial.produtos,
          icon: <ChipIcon className="w-4 h-4 mx-4" />
        },
        {
          title: 'Serviços',
          url: rotas.erp.comercial.servicos,
          icon: <ChipIcon className="w-4 h-4 mx-4" />
        },
        {
          title: 'Planos',
          url: rotas.erp.comercial.planos.index,
          icon: <ChipIcon className="w-4 h-4 mx-4" />
        },
        {
          title: 'Combos',
          url: rotas.erp.comercial.combos.index,
          icon: <ChipIcon className="w-4 h-4 mx-4" />
        },
        {
          title: 'Propostas',
          url: rotas.erp.comercial.propostas.index,
          icon: <ChipIcon className="w-4 h-4 mx-4" />
        },
        {
          title: 'Contratos',
          url: rotas.erp.comercial.contratos,
          icon: <ChipIcon className="w-4 h-4 mx-4" />
        }
      ],
      icon: <HomeIcon className="w-4 h-4 mx-4" />
    },
    {
      title: 'Clientes',
      url: rotas.erp.clientes,
      icon: <ChipIcon className="w-4 h-4 mx-4" />
    },
    {
      title: 'Kanban',
      url: rotas.erp.kanban,
      icon: <ChipIcon className="w-4 h-4 mx-4" />
    }
  ],
  rastreamento: [
    {
      title: 'Início',
      icon: <HomeIcon className="w-4 h-4 mx-4" />,
      url: rotas.erp.home,
      children: []
    }
  ],
  assistencia: [
    {
      title: 'Início',
      icon: <HomeIcon className="w-4 h-4 mx-4" />,
      url: rotas.assistencia.home,
      children: []
    }
  ]
}
