import rotas from '&crm/domains/routes';

export function Actions() {
  const actions = [
    {
      title: 'Kit de insumo',
      url: rotas.producao.kits.kitsDeInsumo.cadastrar,
    },
  ];
  return actions;
}
