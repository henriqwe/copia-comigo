import { ChipIcon, DeviceMobileIcon, HomeIcon } from '@heroicons/react/outline'
import React from 'react'
import rotas from './routes'

export default [
  {
    title: 'Início',
    icon: <HomeIcon className="w-4 h-4 mx-4" />,
    url: rotas.home,
    children: []
  },
  {
    title: 'Pedidos de Saída',
    icon: <HomeIcon className="w-4 h-4 mx-4" />,
    url: rotas.pedidosDeSaida.index,
    children: []
  },
  {
    title: 'Estoque',
    url: rotas.estoque.index,
    children: [
      {
        title: 'Cadastros',
        url: rotas.estoque.cadastros.index,
        icon: <ChipIcon className="w-4 h-4 mx-4" />,
        children: [
          {
            title: 'Grupos',
            url: rotas.estoque.cadastros.grupos,
            icon: <ChipIcon className="w-4 h-4 mx-4" />
          },
          {
            title: 'Famílias',
            url: rotas.estoque.cadastros.familias,
            icon: <ChipIcon className="w-4 h-4 mx-4" />
          },
          {
            title: 'Fabricantes',
            url: rotas.estoque.cadastros.fabricantes,
            icon: <ChipIcon className="w-4 h-4 mx-4" />
          },
          {
            title: 'Endereçamentos',
            url: rotas.estoque.cadastros.enderecamentos.index,
            icon: <ChipIcon className="w-4 h-4 mx-4" />
          },
          {
            title: 'Modelos',
            url: rotas.estoque.cadastros.modelos,
            icon: <ChipIcon className="w-4 h-4 mx-4" />
          }
        ]
      },
      {
        title: 'Itens',
        url: rotas.estoque.itens.index,
        icon: <DeviceMobileIcon className="w-4 h-4 mx-4" />
      },
      {
        title: 'Movimentações',
        url: rotas.estoque.movimentacoes.index,
        icon: <ChipIcon className="w-4 h-4 mx-4" />
      }
    ],
    icon: <HomeIcon className="w-4 h-4 mx-4" />
  },
  {
    title: 'Compras',
    url: rotas.compras.index,
    children: [
      {
        title: 'Pedidos',
        url: rotas.compras.pedidos.index,
        icon: <ChipIcon className="w-4 h-4 mx-4" />
      },
      {
        title: 'Produtos',
        url: rotas.compras.produtos.index,
        icon: <ChipIcon className="w-4 h-4 mx-4" />
      }
    ],
    icon: <HomeIcon className="w-4 h-4 mx-4" />
  },
  {
    title: 'Produção',
    url: rotas.producao.index,
    icon: <DeviceMobileIcon className="w-4 h-4 mx-4" />,
    children: [
      {
        title: 'Identificáveis',
        url: rotas.producao.identificaveis.index,
        children: [
          {
            title: 'Chips',
            url: rotas.producao.identificaveis.chips.index,
            icon: <ChipIcon className="w-4 h-4 mx-4" />
          },
          {
            title: 'Identificadores',
            url: rotas.producao.identificaveis.identificadores.index,
            icon: <ChipIcon className="w-4 h-4 mx-4" />
          },
          {
            title: 'Equipamentos',
            url: rotas.producao.identificaveis.equipamentos.index,
            icon: <ChipIcon className="w-4 h-4 mx-4" />
          }
        ],
        icon: <ChipIcon className="w-4 h-4 mx-4" />
      },
      {
        title: 'Kits',
        url: rotas.producao.kits.index,
        children: [
          {
            title: 'Kits de insumo',
            url: rotas.producao.kits.kitsDeInsumo.index,
            icon: <ChipIcon className="w-4 h-4 mx-4" />
          },
          {
            title: 'Kits de instalação',
            url: rotas.producao.kits.kitsDeInstalacao.index,
            icon: <ChipIcon className="w-4 h-4 mx-4" />
          }
        ],
        icon: <ChipIcon className="w-4 h-4 mx-4" />
      },
      {
        title: 'Rastreadores',
        url: rotas.producao.rastreadores.index,
        icon: <ChipIcon className="w-4 h-4 mx-4" />
      }
    ]
  },
  {
    title: 'Operacional',
    url: rotas.operacional.index,
    children: [
      {
        title: 'Calendário',
        url: rotas.operacional.calendario,
        icon: <ChipIcon className="w-4 h-4 mx-4" />
      },
      {
        title: 'Ordens de serviços',
        url: rotas.operacional.ordensDeServico,
        icon: <ChipIcon className="w-4 h-4 mx-4" />
      }
    ],
    icon: <HomeIcon className="w-4 h-4 mx-4" />
  },
  {
    title: 'Portfolio',
    url: rotas.portfolio.index,
    children: [
      {
        title: 'Precificação',
        url: rotas.portfolio.precificacao,
        icon: <ChipIcon className="w-4 h-4 mx-4" />
      }
    ],
    icon: <HomeIcon className="w-4 h-4 mx-4" />
  },
  {
    title: 'Configurações',
    icon: <HomeIcon className="w-4 h-4 mx-4" />,
    url: rotas.configuracoes.index,
    children: []
  }
]
