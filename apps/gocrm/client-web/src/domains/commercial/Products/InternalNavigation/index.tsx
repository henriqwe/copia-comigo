import * as common from '@comigo/ui-common';
import * as products from '&crm/domains/commercial/Products';

import { Actions } from './actions';
import { Filters } from './filters';
import { links } from './links';

const InternalNavigation = () => {
  const { filters, setFilters } = products.useProduct();
  return (
    <common.MainMenu
      LinkGroup={links}
      ActionsGroup={Actions()}
      FiltersGroup={Filters()}
      filters={filters}
      setFilters={setFilters}
    />
  );
};

export default InternalNavigation;
