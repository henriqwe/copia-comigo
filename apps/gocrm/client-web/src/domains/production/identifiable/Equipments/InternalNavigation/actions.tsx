import rotas from '&crm/domains/routes';

export function Actions() {
  const actions = [
    {
      title: 'Equipamento',
      url: rotas.producao.identificaveis.equipamentos.cadastrar,
    },
  ];
  return actions;
}
