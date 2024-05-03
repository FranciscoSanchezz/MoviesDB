import {Meta, StoryFn} from '@storybook/react';

import { IPill } from './types';
import Pill from './Pill';
import React from 'react';

const meta = {
    title: 'Components/Pill',
    component: Pill,
    parameters: {
        layout : 'centered',
        docs: {
            story:{
                inline: false,
                iframeHeight: 400,
            }
        }
    },
    argTypes:{
        title: {
            control: 'text',
            description: 'The title of the pill'
            
        },
        color: {
            control: 'radio',
            options: ['red', 'yellow', 'green'],
            description: 'The color of the pill'
        }
    },
    tags: ["autodocs"],
}as Meta;

export default meta;

const Template: StoryFn<IPill> = (args) => <Pill {...args} />;

/**
 * A default pill with all the props
 */

export const Default = Template.bind({});

Default.args = {
    title: 'Pill',
    color: 'red',
};

