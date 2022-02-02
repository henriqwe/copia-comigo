import * as common from '@comigo/ui-common';
import { Actions } from './actions';
import { links } from './links';

export const InternalNavigation = () => {
  return <common.MainMenu LinkGroup={links} ActionsGroup={Actions()} />;
};
