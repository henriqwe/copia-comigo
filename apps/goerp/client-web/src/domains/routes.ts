export default {
  home: '/',
  pedidosDeSaida: {
    index: '/pedidos-de-saida',
    cadastrar: '/pedidos-de-saida/cadastrar',
  },
  estoque: {
    cadastros: {
      grupos: '/estoque/cadastros/grupos',
      familias: '/estoque/cadastros/familias',
      fabricantes: '/estoque/cadastros/fabricantes',
      enderecamentos: {
        index: '/estoque/cadastros/enderecamentos',
        tipos: '/estoque/cadastros/enderecamentos/tipos',
      },
      modelos: '/estoque/cadastros/modelos',
      index: '/estoque/cadastros',
    },

    itens: {
      index: '/estoque/itens',
      cadastrar: '/estoque/itens/cadastrar',
    },
    movimentacoes: {
      entradas: {
        index: '/estoque/movimentacoes/entradas',
      },
      saidas: {
        index: '/estoque/movimentacoes/saidas',
      },
      index: '/estoque/movimentacoes',
    },
    index: '/estoque',
  },
  compras: {
    pedidos: {
      index: '/compras/pedidos',
      cadastrar: '/compras/pedidos/cadastrar',
    },
    produtos: {
      index: '/compras/produtos',
      cadastrar: '/compras/produtos/cadastrar',
    },
    index: '/compras',
  },
  operacional: {
    calendario: '/operacional/calendario',
    ordensDeServico: '/operacional/ordens-de-servico',
    index: '/operacional',
  },
  portfolio: {
    precificacao: '/portfolio/precificacao',
    index: '/portfolio',
  },
  configuracoes: {
    index: '/configuracoes',
  },
  index: '/',
  login: '/login/',
} as const;
