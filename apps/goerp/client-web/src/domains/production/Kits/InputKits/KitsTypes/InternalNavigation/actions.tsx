import rotas from '&erp/domains/routes';

export function Actions() {
  const actions = [
    {
      title: 'Tipo de kit',
      url: rotas.producao.kits.kitsDeInsumo.tipos.cadastrar,
    },
  ];
  return actions;
}
