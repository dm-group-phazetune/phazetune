import Axios from "axios";

const initialState = {
  user: [],
  loading: false
};

//constants
const GET_USERS_POSTS = "GET_USERS_POSTS";
const EDIT_POST = "EDIT_POST";
const DELETE_POST = "DELETE_POST";

//action creator
export function getUsersPosts(username) {
  return {
    type: GET_USERS_POSTS,
    payload: Axios.get(`/api/posts/user/${username}`)
  };
}

export function editPost(post_id, editedRoutine) {
  return {
    type: EDIT_POST,
    payload: Axios.put(`/api/posts/${post_id}`, editedRoutine)
  };
}

export function deletePost(post_id) {
  return {
    type: DELETE_POST,
    payload: Axios.delete(`/api/posts/${post_id}`)
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
        user: payload.data
      };
    }
    case `${EDIT_POST}_PENDING`: {
      return {
        ...state,
        loading: true
      };
    }
    case `${EDIT_POST}_FULFILLED`: {
      return {
        ...state,
        user: payload.data
      };
    }
    case `${DELETE_POST}_PENDING`: {
      return {
        ...state,
        loading: true
      };
    }
    case `${DELETE_POST}_FULFILLED`: {
      return {
        ...state,
        user: payload.data
      };
    }
    default:
      return true;
  }
}
