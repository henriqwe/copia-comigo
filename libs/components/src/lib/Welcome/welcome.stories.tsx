import { Story, Meta } from '@storybook/react';
import { Welcome, ComponentsProps } from './welcome';

export default {
  component: Welcome,
  title: 'Welcome',
} as Meta;

const Template: Story<ComponentsProps> = (args) => <Welcome {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
