import {getSession, registerUser, loginUser, logoutUser} from "../redux/reducers/authReducer";
import { getProfile } from "../redux/reducers/profReducer";

//Unit Test

describe("auth reducer test", () => {
    test("get session returns right type", () => {
        expect(getSession({}).type).toBe("GET_SESSION")
    })
    test("register user returns right type", () => {
        expect(registerUser({}).type).toBe("REGISTER_USER")
    })
    test("login user returns right type", () => {
        expect(loginUser({}).type).toBe("LOGIN_USER")
    })
    test("logout user returns right type", () => {
        expect(logoutUser().type).toBe("LOGOUT_USER")
    })
    test("get profile returns right type", () => {
        expect(getProfile([]).type).toBe("GET_PROFILE")
    })
})


