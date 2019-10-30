import axios from "axios";

const initialState = {
    following: false,
    loading: false,
    users: [],
    followerCount: []
};

const FOLLOW_USER = "FOLLOW_USER";
const CHECK_FOLLOW = "CHECK_FOLLOW";
const UNFOLLOW_USER = "UNFOLLOW_USER";

export const followUser = id => {
    return {
        type: FOLLOW_USER,
        payload: axios.post(`/api/follow/${id}`)
    };
};

export const checkFollow = id => {
    return {
        type: CHECK_FOLLOW,
        payload: axios.get(`/api/follow/${id}`)
    };
};

export const unFollowUser = id => {
    return {
        type: UNFOLLOW_USER,
        payload: axios.delete(`/api/follow/${id}`)
    };
};


export function followsReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case `${FOLLOW_USER}_PENDING`:
            return { ...state, loading: true, following: false };
        case `${FOLLOW_USER}_FULFILLED`:
            return { ...state, loading: false, following: payload.data.followed };
    
        case `${CHECK_FOLLOW}_PENDING`:
            return { ...state, loading: true, following: false };
        case `${CHECK_FOLLOW}_FULFILLED`:
            return { ...state, loading: false, following: payload.data };

        case `${UNFOLLOW_USER}_PENDING`:
            return{ ...state, loading: true, following: false};
        case `${UNFOLLOW_USER}_FULFILLED`:
            return { ...state, loading: true, following: payload.data.following}
        default:
            return state;

    }
        }