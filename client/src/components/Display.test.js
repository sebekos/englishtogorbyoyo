import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Display from './Display'

Enzyme.configure({ adapter: new Adapter() });

describe('<Display />', () => {
    it('<Display/> Should be empty', () => {
        const wrapper = shallow(<Display db={{ translation: [], text: 'test' }} />)
        expect(wrapper.find('div div').isEmpty()).toBe(true)
    })
    it('<Display/> Should display two <p/>', () => {
        const wrapper = shallow(<Display db={{ translation: ['1d3d3'], text: 'test' }} />)
        expect(wrapper.find('p')).toHaveLength(2)
    })
});