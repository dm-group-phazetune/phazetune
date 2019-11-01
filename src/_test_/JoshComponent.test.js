import React from 'react';
import Enzyme, {shallow} from "enzyme";
import {Provider} from "react-redux";
Enzyme.configure({ adapter: new Adapter() })
import ConfigureMockStore from "redux-mock-store";
import Adapter from "enzyme-adapter-react-16";

import Chat from "../Components/Chat/Chat";
import EditPost from '../Components/EditPost/EditPost';
import AddPost from "../Components/AddPost/AddPost";
import Newsfeed from "../Components/Newsfeed/Newsfeed";
import ProducersChat from "../Components/ProducersChat/ProducersChat";

const mockStore = ConfigureMockStore();
const store = mockStore({
});

describe("component test", () => {
    test("can render all properly" , () => {
        expect(
            shallow(
                <Provider store= {store}>
                    <Chat />
                </Provider>
            ).exists()
        ).toBe(true)
    })
    test("can render all properly" , () => {
        expect(
            shallow(
                <Provider store= {store}>
                    <EditPost />
                </Provider>
            ).exists()
        ).toBe(true)
    })
    test("can render all properly" , () => {
        expect(
            shallow(
                <Provider store= {store}>
                    <AddPost />
                </Provider>
            ).exists()
        ).toBe(true)
    })
    test("can render all properly" , () => {
        expect(
            shallow(
                <Provider store= {store}>
                    <Newsfeed />
                </Provider>
            ).exists()
        ).toBe(true)
    })
    test("can render all properly" , () => {
        expect(
            shallow(
                <Provider store= {store}>
                    <ProducersChat />
                </Provider>
            ).exists()
        ).toBe(true)
    })





})
