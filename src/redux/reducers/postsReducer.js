import Axios from "axios"

const initialState = {
        posts: []
}

//constants

const ADD_POST = "ADD_POST"


//action creator

export function addPost() {
    return{
    type: ADD_POST,
    payload: Axios.post("/api/posts")
    }
}

export default function reducer(state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
        case `${ADD_POST}_PENDING`: {
            return {
                ...state,
                loading: true
            };
        }
        case `${ADD_POST}_FULFILLED`: {
            return {
                ...state,
                loading: true
            };
        }
    }
    
}