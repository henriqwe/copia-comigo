import rotas from '&crm/domains/routes';

export const links = [
  {
    title: 'Perguntas',
    url: rotas.atendimento.cadastros.perguntas.index,
  },
  {
    title: 'Grupos de perguntas',
    url: rotas.atendimento.cadastros.perguntas.grupos.index,
  },
];
