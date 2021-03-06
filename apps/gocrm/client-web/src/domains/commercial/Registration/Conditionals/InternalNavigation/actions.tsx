import * as conditionals from '&crm/domains/commercial/Registration/Conditionals';

export function Actions() {
  const { setSlidePanelState } = conditionals.useConditional();
  const actions = [
    {
      title: 'Condicional',
      handler: () => {
        event?.preventDefault();
        setSlidePanelState({ open: true, type: 'create' });
      },
    },
  ];
  return actions;
}
