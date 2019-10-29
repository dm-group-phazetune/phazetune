import React from 'react'
import Enzyme, {shallow} from "enzyme";
import {Provider} from "react-redux";
import ConfigureMockStore from "redux-mock-store";
import Adapter from "enzyme-adapter-react-16";

import Login from "../Components/Login/Login";
import Register from "../Components/Register/Register";
import Profile from "../Components/Profile/Profile";
import FooterNav from "../Components/FooterNav/FooterNav";
import Header from "../Components/Header/Header";

import authReducer from "../redux/reducers/authReducer";
import profReducer from  "../redux/reducers/profReducer";


Enzyme.configure({ adapter: new Adapter() })

const mockStore = ConfigureMockStore();
const store = mockStore({
    authReducer:{},
    profReducer:{}
});

describe("component test", () => {
    test("can render all properly" , () => {
        expect(
            shallow(
                <Provider store= {store}>
                    <Login />
                </Provider>
            ).exists()
        ).toBe(true)
    })
    test("can render all properly" , () => {
        expect(
            shallow(
                <Provider store= {store}>
                    <Register />
                </Provider>
            ).exists()
        ).toBe(true)
    })
    test("can render all properly" , () => {
        expect(
            shallow(
                <Provider store= {store}>
                    <FooterNav />
                </Provider>
            ).exists()
        ).toBe(true)
    })
    test("can render all properly" , () => {
        expect(
            shallow(
                <Provider store= {store}>
                    <Header />
                </Provider>
            ).exists()
        ).toBe(true)
    })
    test("can render all properly" , () => {
        expect(
            shallow(
                <Provider store= {store}>
                    <Profile />
                </Provider>
            ).exists()
        ).toBe(true)
    })
})