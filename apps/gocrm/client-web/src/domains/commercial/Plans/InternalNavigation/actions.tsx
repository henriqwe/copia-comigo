import * as plans from '&crm/domains/commercial/Plans'

export function Actions() {
  const { setSlidePanelState } = plans.useList()
  const actions = [
    {
      title: 'Plano',
      handler: () => {
        event?.preventDefault();
        setSlidePanelState({ open: true });
      }
    },
  ];
  return actions;
}
