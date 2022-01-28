export default {
  erp: {
    home: '/erp',
    pedidosDeSaida: {
      index: '/erp/pedidos-de-saida',
      cadastrar: '/erp/pedidos-de-saida/cadastrar'
    },
    estoque: {
      cadastros: {
        grupos: '/erp/estoque/cadastros/grupos',
        familias: '/erp/estoque/cadastros/familias',
        fabricantes: '/erp/estoque/cadastros/fabricantes',
        enderecamentos: {
          index: '/erp/estoque/cadastros/enderecamentos',
          tipos: '/erp/estoque/cadastros/enderecamentos/tipos'
        },
        modelos: '/erp/estoque/cadastros/modelos',
        index: '/erp/estoque/cadastros'
      },

      itens: {
        index: '/erp/estoque/itens',
        cadastrar: '/erp/estoque/itens/cadastrar'
      },
      movimentacoes: {
        entradas: {
          index: '/erp/estoque/movimentacoes/entradas'
        },
        saidas: {
          index: '/erp/estoque/movimentacoes/saidas'
        },
        index: '/erp/estoque/movimentacoes'
      },
      index: '/erp/estoque'
    },
    compras: {
      pedidos: {
        index: '/erp/compras/pedidos',
        cadastrar: '/erp/compras/pedidos/cadastrar'
      },
      produtos: {
        index: '/erp/compras/produtos',
        cadastrar: '/erp/compras/produtos/cadastrar'
      },
      index: '/erp/compras'
    },
    operacional: {
      calendario: '/erp/operacional/calendario',
      ordensDeServico: '/erp/operacional/ordens-de-servico',
      index: '/erp/operacional'
    },
    portfolio: {
      precificacao: '/erp/portfolio/precificacao',
      index: '/erp/portfolio'
    },
    configuracoes: {
      index: '/erp/configuracoes'
    },
    index: '/erp'
  },
  assistencia: {
    home: '/assistencia/',
    index: '/assistencia/'
  },
  rastreamento: {
    home: '/rastreamento/',
    index: '/rastreamento/'
  },
  login: '/login/'
} as const
