import * as families from '&erp/domains/inventory/Registration/Families';

export function Actions() {
  const { setSlidePanelState } = families.useFamily();
  const actions = [
    {
      title: 'Familia',
      handler: () => {
        event?.preventDefault();
        setSlidePanelState({ open: true, type: 'create' });
      },
    },
  ];
  return actions;
}
