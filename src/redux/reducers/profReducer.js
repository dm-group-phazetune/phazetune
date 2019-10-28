import axios from "axios";

const initialState = {
    user_id: null,
    first_name: "",
    last_name: "",
    username: "",
    city: "",
    photo: "",
    bio: "",
    loading: false
};

const GET_PROFILE = "GET_PROFILE";
const EDIT_PROFILE = "EDIT_PROFILE";

export function getProfile() {
    return {
    type: GET_PROFILE,
    payload: axios.get("/api/profile/user/:user_id")
    };
}

export function editProfile() {
    return {
    type: EDIT_PROFILE,
    payload: axios.put("/api/profile/user")
    };
}

export default function reducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
    case `${EDIT_PROFILE}_PENDING`: {
        return {
        ...state,
        loading: true
        };
    }
    case `${EDIT_PROFILE}_FULFILLED`: {
        return {
        ...state,
        first_name: payload.data.first_name,
        last_name: payload.data.last_name,
        city: payload.data.city,
        photo: payload.data.photo,
        bio: payload.data.bio
        };
    }
    case `${GET_PROFILE}_FULFILLED`: {
        return {
        ...state,
        user_id: payload.data.user_id,
        first_name: payload.data.first_name,
        last_name: payload.data.last_name,
        username: payload.data.username,
        city: payload.data.city,
        photo: payload.data.photo,
        bio: payload.data.bio
        };
    }
    default:
        return true;
    }
}
