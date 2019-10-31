import React from 'react'
import Enzyme, {shallow} from 'enzyme'
import {Provider} from "react-redux";
import ConfigureMockStore from "redux-mock-store";
import Adapter from "enzyme-adapter-react-16";
import ReactDOM from 'react-dom'
import { act } from "react-dom/test-utils"


import AudioPlayer from '../Components/FooterNav/AudioPlayer'
import Explore from '../Components/Explore/Explore'
import AudioUpload from '../Components/FooterNav/AudioUpload';
import ArtistChat from '../Components/ArtistsChat/ArtistsChat'
import ChatNav from '../Components/ChatNav/ChatNav'

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
                    <Explore/>
                </Provider>
            )
        )
    })
    test('can render Properly', () => {
        expect(
            shallow(
                <Provider store ={store} >
                    <AudioPlayer/>
                </Provider>

            )
        )
    })
    test('can render Properly', () => {
        expect(
            shallow(
                <Provider store ={store} >
                    <AudioUpload/>
                </Provider>
            )
        )
    })
    test('can render Properly', () => {
        expect(
            shallow(
                <Provider store ={store} >
                    <ArtistChat />
                </Provider>
            )
        )
    })
    test('can render Properly', () => {
        expect(
            shallow(
                <Provider store ={store} >
                    <ChatNav />
                </Provider>
            )
        )
    })
    // test('can render Properly', () => {
    //     expect(
    //         shallow(
    //             <Provider store ={store} >
    //                 <FireBase />
    //             </Provider>
    //         )
    //     )
    // })
})

