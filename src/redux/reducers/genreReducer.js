import axios from 'axios'

const initialState = {
    genre: ''
}

const GET_GENRE = 'GET_GENRE'


export function getGenre(genre){
    return {
        type: GET_GENRE,
        payload: axios.get(`/api/posts/genre?genre=${genre}`)
    }
}

export default function render(state=initialState, action) {
    const {type, payload} = action
    switch(type){
        case `${GET_GENRE}_FULFILLED`:
            return {
                ...state,
                genre: payload.data
            }
            default: return state
    }
}