import axios from 'axios'


const initialState = {
    first_name: '',
    last_name: '',
    city: '',
    bio: '',
    loading: false
}


const GET_PROFILE = 'GET_PROFILE'
const EDIT_PROFILE = 'EDIT_PROFILE'


export function getProfile(){
    return {
        type: GET_PROFILE,
        payload: axios.get("/api/profile/user")
    }
}

export function editProfile() {
    return {
        type: EDIT_PROFILE,
        payload: axios.put("/api/profile/user")
    }
}

export default function reducer(state = initialState, action){
    const{type, payload} = action;
    switch(type) {
        case `${GET_PROFILE}_PENDING`: {
            return {
                ...state,
                loading: true
            }
        }
        case `${GET_PROFILE}_FULFILLED`: {
            return{
                ...state,
                first_name: payload.data.first_name,
                last_name: payload.data.last_name,
                city: payload.data.city,
                bio: payload.data.bio,
            }
        }
    }
}
