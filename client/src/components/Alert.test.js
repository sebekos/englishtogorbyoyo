import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Alert from './Alert'

Enzyme.configure({ adapter: new Adapter() });

describe('<Alert />', () => {
    it('<Alert/> Should display message and danger alert', () => {
        const wrapper = shallow(<Alert alert={{ msg: 'test', type: 'danger' }} />)
        expect(wrapper.find('div p').text()).toBe('test')
    })
    it('<Alert/> Alert should have class danger', () => {
        const wrapper = shallow(<Alert alert={{ msg: 'test', type: 'danger' }} />)
        expect(wrapper.find('div').hasClass('danger')).toBe(true)
    })
});