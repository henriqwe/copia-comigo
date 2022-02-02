import rotas from '&crm/domains/routes';

export function Actions() {
  const actions = [
    {
      title: 'Pedido',
      url: rotas.compras.pedidos.cadastrar,
    },
  ];
  return actions;
}
