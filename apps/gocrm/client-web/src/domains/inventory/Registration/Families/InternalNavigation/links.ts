import rotas from '&crm/domains/routes';

export const links = [
  { title: 'Grupos', url: rotas.estoque.cadastros.grupos },
  { title: 'Famílias', url: rotas.estoque.cadastros.familias },
  {
    title: 'Fabricantes',
    url: rotas.estoque.cadastros.fabricantes,
  },
  {
    title: 'Endereçamentos',
    url: rotas.estoque.cadastros.enderecamentos.index,
  },
  {
    title: 'Modelo',
    url: rotas.estoque.cadastros.modelos,
  },
];
