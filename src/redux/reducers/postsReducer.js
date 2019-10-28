import Axios from "axios";

const initialState = {
  //   posts: [],
  user: [],
  loading: false
};

//constants
const GET_USERS_POSTS = "GET_USERS_POSTS";

//action creator
export function getUsersPosts(username) {
  return {
    type: GET_USERS_POSTS,
    payload: Axios.get(`/api/posts/user/${username}`)
  };
}

export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case `${GET_USERS_POSTS}_PENDING`: {
      return {
        ...state,
        loading: true
      };
    }
    case `${GET_USERS_POSTS}_FULFILLED`: {
      console.log(payload.data);
      return {
        ...state,
        // posts: payload.data,
        user: payload.data
      };
    }
    default:
      return true;
  }
}
