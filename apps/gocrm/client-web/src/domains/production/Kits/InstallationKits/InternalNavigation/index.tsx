import * as common from '@comigo/ui-common';

import { Actions } from './actions';

const InternalNavigation = () => {
  return (
    <common.MainMenu
      ActionsGroup={Actions()}
      FiltersGroup={[{ title: 'test', url: '/' }]}
      LinkGroup={[]}
    />
  );
};

export default InternalNavigation;
