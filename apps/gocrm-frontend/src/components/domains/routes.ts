export default {
  erp: {
    home: '/erp',
    atendimento: {
      cadastros: {
        fluxos: {
          index: '/erp/atendimento/cadastros/fluxos',
          etapas: '/erp/atendimento/cadastros/fluxos/etapas'
        },
        perguntas: {
          index: '/erp/atendimento/cadastros/perguntas',
          grupos: {
            index: '/erp/atendimento/cadastros/perguntas/grupos',
            cadastrar: '/erp/atendimento/cadastros/perguntas/grupos/cadastrar'
          }
        },
        acoes: '/erp/atendimento/cadastros/acoes',
        index: '/erp/atendimento/cadastros'
      },
      leads: '/erp/atendimento/leads',
      tickets: '/erp/atendimento/tickets',
      perfisComerciais: {
        cadastrar: '/erp/atendimento/perfis-comerciais/cadastrar',
        index: '/erp/atendimento/perfis-comerciais'
      },
      vehicles: '/erp/atendimento/veiculos',
      index: '/erp/atendimento'
    },
    identidades: {
      clientes: {
        index: '/erp/identidades/clientes',
        cadastrar: '/erp/identidades/clientes/cadastrar'
      },
      fornecedores: {
        index: '/erp/identidades/fornecedores',
        cadastrar: '/erp/identidades/fornecedores/cadastrar'
      },
      usuarios: '/erp/identidades/usuarios',
      colaboradores: '/erp/identidades/colaboradores',
      index: '/erp/identidades'
    },
    comercial: {
      cadastros: {
        condicionais: '/erp/comercial/cadastros/condicionais',
        coberturas: '/erp/comercial/cadastros/coberturas',
        atributos: '/erp/comercial/cadastros/atributos',
        tarifas: '/erp/comercial/cadastros/tarifas',
        index: '/erp/comercial/cadastros'
      },
      planos: {
        cadastrar: '/erp/comercial/planos/cadastrar',
        index: '/erp/comercial/planos'
      },
      combos: {
        cadastrar: '/erp/comercial/combos/cadastrar',
        index: '/erp/comercial/combos'
      },
      propostas: {
        cadastrar: '/erp/comercial/propostas/cadastrar',
        index: '/erp/comercial/propostas'
      },
      contratos: '/erp/comercial/contratos',
      fornecedores: '/erp/comercial/fornecedores',
      produtos: '/erp/comercial/produtos',
      servicos: '/erp/comercial/servicos',
      index: '/erp/comercial'
    },
    clientes: '/erp/clientes',
    operacional: {
      calendario: '/erp/operacional/calendario',
      ordensDeServico: '/erp/operacional/ordens-de-servico',
      index: '/erp/operacional'
    },
    compras: {
      produtos: {
        index: '/erp/compras/produtos',
        cadastrar: '/erp/compras/produtos/cadastrar'
      },
      index: '/erp/compras'
    },
    configuracoes: {
      index: '/erp/configuracoes'
    },
    kanban: '/erp/kanban',
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
