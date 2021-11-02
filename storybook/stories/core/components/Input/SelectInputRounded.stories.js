import SelectInput from '@orangehrm/oxd/core/components/Input/Select/SelectInput';
import {
    BOTTOM,
    DROPDOWN_POSITIONS,
} from '@orangehrm/oxd/core/components/Input/types';
import { h, ref } from 'vue';

export default {
    title: 'Example/SelectInputRounded',
    component: SelectInput,
    argTypes: {
        style: { control: { type: 'object' } },
        hasError: { control: { type: 'boolean' } },
        dropdownPosition: {
            options: DROPDOWN_POSITIONS,
            defaultValue: BOTTOM,
        },
        options: {
            control: { type: 'array' },
            defaultValue: [],
        },
    },
};

const options = [
    {
        id: 1,
        label: '10',
    },
    {
        id: 2,
        label: '20',
    },
    {
        id: 3,
        label: '30',
    },
    {
        id: 4,
        label: '40',
    },
];

const Template = args => ({
    setup() {
        const selected = ref(null);
        return { args, selected };
    },
    render() {
        return h(SelectInput, {
            ...this.args,
            modelValue: this.selected,
            'onUpdate:modelValue': value => {
                this.selected = value;
            },
        });
    },
});

export const Default = Template.bind({});
Default.args = {
    options: options,
    isRounded: true,
};