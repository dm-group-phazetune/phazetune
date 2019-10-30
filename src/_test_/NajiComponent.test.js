import React from 'react'
import Enzyme, {shallow} from 'enzyme'
import {Provider} from "react-redux";
import ConfigureMockStore from "redux-mock-store";
import Adapter from "enzyme-adapter-react-16";

import Profile from '../Components/Profile/Profile'

Enzyme.configure({ adapter: new Adapter() })

const mockStore = ConfigureMockStore();
const store = mockStore({
    postReducer:{}
});

describe("component test", () => {
    test('can render all properly', () => {
        expect (
            shallow(
                <Provider store ={store} >
                    <Profile />
                </Provider>
            )
        )
    })
})