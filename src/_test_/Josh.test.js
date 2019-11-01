import {resetAction} from "../redux/reducers/profReducer";
import {followUser, checkFollow, unFollowUser, followCount} from "../redux/reducers/followReducer";
import {handleSubmit} from "../Components/Header/Header";
import Enzyme, {shallow} from "enzyme";
import Login from "../Components/Login/Login";
import React from "react";

import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({adapter: new Adapter() })


test("resetAction returns right type", () => {
    expect(resetAction({}).type).toBe('RESET_ACTION')
})
test("followUser returns right type", () => {
    expect(followUser({}).type).toBe('FOLLOW_USER')
})
test("checkFollow returns right type", () => {
    expect(checkFollow({}).type).toBe('CHECK_FOLLOW')
})
test("unFollowUser returns right type", () => {
    expect(unFollowUser({}).type).toBe('UNFOLLOW_USER')
})
test("followCount returns right type", () => {
    expect(followCount({}).type).toBe('FOLLOW_COUNT')
})

// test('has been called', () => {
//     const handleSubmit = jest.fn()
//     const wrapper = shallow(<Login startLogin ={handleSubmit}/>)
//     wrapper.find('button').at(1).simulate('click')
//     expect(handleSubmit).toHaveBeenCalled();
// })
