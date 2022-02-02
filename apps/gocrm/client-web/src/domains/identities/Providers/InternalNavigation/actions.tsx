import rotas from '&crm/domains/routes';

export function Actions() {
  const actions = [
    {
      title: 'Fornecedor',
      url: rotas.identidades.fornecedores.cadastrar,
    },
  ];
  return actions;
}
