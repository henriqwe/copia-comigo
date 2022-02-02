import rotas from '&crm/domains/routes';

export function Actions() {
  const actions = [
    {
      title: 'Combo',
      url: rotas.comercial.combos.cadastrar,
    },
  ];
  return actions;
}
