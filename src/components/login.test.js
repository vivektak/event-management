import React from 'react';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import Login from './login';

Enzyme.configure({ adapter: new EnzymeAdapter() });

test('should render component ', () => {
    const wrapper = shallow(<Login />)
    const element = wrapper.find(`[data-test="login-component"]`);
    expect(element.length).toBe(1)
});
