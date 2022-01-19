import { Story, Meta } from '@storybook/react';
import { ComponenteGerado, ComponenteGeradoProps } from './componente-gerado';

export default {
  component: ComponenteGerado,
  title: 'ComponenteGerado',
} as Meta;

const Template: Story<ComponenteGeradoProps> = (args) => (
  <ComponenteGerado {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
