export default {
  home: '/',
  atendimento: {
    cadastros: {
      fluxos: {
        index: '/atendimento/cadastros/fluxos',
        etapas: '/atendimento/cadastros/fluxos/etapas'
      },
      perguntas: {
        index: '/atendimento/cadastros/perguntas',
        grupos: {
          index: '/atendimento/cadastros/perguntas/grupos',
          cadastrar: '/atendimento/cadastros/perguntas/grupos/cadastrar'
        }
      },
      acoes: '/atendimento/cadastros/acoes',
      index: '/atendimento/cadastros'
    },
    leads: '/atendimento/leads',
    tickets: '/atendimento/tickets',
    perfisComerciais: {
      cadastrar: '/atendimento/perfis-comerciais/cadastrar',
      index: '/atendimento/perfis-comerciais'
    },
    vehicles: '/atendimento/veiculos',
    index: '/atendimento'
  },
  identidades: {
    clientes: {
      index: '/identidades/clients',
      cadastrar: '/identidades/clients/cadastrar'
    },
    fornecedores: {
      index: '/identidades/fornecedores',
      cadastrar: '/identidades/fornecedores/cadastrar'
    },
    usuarios: '/identidades/usuarios',
    colaboradores: '/identidades/colaboradores',
    index: '/identidades'
  },
  propostas: '/propostas',
  comercial: {
    cadastros: {
      condicionais: '/comercial/cadastros/condicionais',
      coberturas: '/comercial/cadastros/coberturas',
      atributos: '/comercial/cadastros/atributos',
      tarifas: '/comercial/cadastros/tarifas',
      index: '/comercial/cadastros'
    },
    planos: '/comercial/planos',
    combos: '/comercial/combos',
    propostas: {
      cadastrar: '/comercial/propostas/cadastrar',
      index: '/comercial/propostas'
    },
    contratos: '/comercial/contratos',
    fornecedores: '/comercial/fornecedores',
    produtos: '/comercial/produtos',
    servicos: '/comercial/servicos',
    index: '/comercial'
  },
  clientes: '/clientes',
  configuracoes: {
    index: '/configuracoes'
  },
  kanban: '/kanban',
  index: '/',
  login: '/login/'
} as const
