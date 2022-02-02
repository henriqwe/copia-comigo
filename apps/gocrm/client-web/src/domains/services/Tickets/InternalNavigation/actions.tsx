import * as tickets from '&crm/domains/services/Tickets';

export function Actions() {
  const { setSlidePanelState } = tickets.useTicket();
  const actions = [
    {
      title: 'Ticket',
      handler: () => {
        event?.preventDefault();
        setSlidePanelState({ open: true, type: 'create' });
      },
    },
  ];
  return actions;
}
