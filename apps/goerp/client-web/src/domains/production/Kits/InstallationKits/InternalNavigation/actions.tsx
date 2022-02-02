import rotas from '&erp/domains/routes';

export function Actions() {
  const actions = [
    {
      title: 'Kit de instalação',
      url: rotas.producao.kits.kitsDeInstalacao.cadastrar,
    },
  ];
  return actions;
}
