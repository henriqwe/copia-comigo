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
      title: 'Pedidos de Saída',
      icon: <HomeIcon className="w-4 h-4 mx-4" />,
      url: rotas.erp.pedidosDeSaida.index,
      children: []
    },
    {
      title: 'Estoque',
      url: rotas.erp.estoque.index,
      children: [
        {
          title: 'Cadastros',
          url: rotas.erp.estoque.cadastros.index,
          icon: <ChipIcon className="w-4 h-4 mx-4" />,
          children: [
            {
              title: 'Grupos',
              url: rotas.erp.estoque.cadastros.grupos,
              icon: <ChipIcon className="w-4 h-4 mx-4" />
            },
            {
              title: 'Famílias',
              url: rotas.erp.estoque.cadastros.familias,
              icon: <ChipIcon className="w-4 h-4 mx-4" />
            },
            {
              title: 'Fabricantes',
              url: rotas.erp.estoque.cadastros.fabricantes,
              icon: <ChipIcon className="w-4 h-4 mx-4" />
            },
            {
              title: 'Endereçamentos',
              url: rotas.erp.estoque.cadastros.enderecamentos.index,
              icon: <ChipIcon className="w-4 h-4 mx-4" />
            },
            {
              title: 'Modelos',
              url: rotas.erp.estoque.cadastros.modelos,
              icon: <ChipIcon className="w-4 h-4 mx-4" />
            }
          ]
        },
        {
          title: 'Itens',
          url: rotas.erp.estoque.itens.index,
          icon: <DeviceMobileIcon className="w-4 h-4 mx-4" />
        },
        {
          title: 'Movimentações',
          url: rotas.erp.estoque.movimentacoes.index,
          icon: <ChipIcon className="w-4 h-4 mx-4" />
        }
      ],
      icon: <HomeIcon className="w-4 h-4 mx-4" />
    },
    {
      title: 'Compras',
      url: rotas.erp.compras.index,
      children: [
        {
          title: 'Pedidos',
          url: rotas.erp.compras.pedidos.index,
          icon: <ChipIcon className="w-4 h-4 mx-4" />
        },
        {
          title: 'Produtos',
          url: rotas.erp.compras.produtos.index,
          icon: <ChipIcon className="w-4 h-4 mx-4" />
        }
      ],
      icon: <HomeIcon className="w-4 h-4 mx-4" />
    },
    {
      title: 'Operacional',
      url: rotas.erp.operacional.index,
      children: [
        {
          title: 'Calendário',
          url: rotas.erp.operacional.calendario,
          icon: <ChipIcon className="w-4 h-4 mx-4" />
        },
        {
          title: 'Ordens de serviços',
          url: rotas.erp.operacional.ordensDeServico,
          icon: <ChipIcon className="w-4 h-4 mx-4" />
        }
      ],
      icon: <HomeIcon className="w-4 h-4 mx-4" />
    },
    {
      title: 'Portfolio',
      url: rotas.erp.portfolio.index,
      children: [
        {
          title: 'Precificação',
          url: rotas.erp.portfolio.precificacao,
          icon: <ChipIcon className="w-4 h-4 mx-4" />
        }
      ],
      icon: <HomeIcon className="w-4 h-4 mx-4" />
    },
    {
      title: 'Configurações',
      icon: <HomeIcon className="w-4 h-4 mx-4" />,
      url: rotas.erp.configuracoes.index,
      children: []
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
