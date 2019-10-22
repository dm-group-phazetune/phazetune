import Axios from "axios";

const initialState = {
  user_id: null,
  first_name: "",
  last_name: "",
  username: "",
  location: "",
  photo: "",
  bio: "",
  loading: false
};

const GET_SESSION = "GET_SESSION";
const REGISTER_USER = "REGISTER_USER";
const LOGIN_USER = "LOGIN_USER";
const LOGOUT_USER = "LOGOUT_USER";

export function getSession() {
  return {
    type: GET_SESSION,
    payload: Axios.get("/auth/user")
  };
}

export function registerUser(newUser) {
  return {
    type: REGISTER_USER,
    payload: Axios.post("/auth/register", newUser)
  };
}

export function loginUser(user) {
  return {
    type: LOGIN_USER,
    payload: Axios.post("/auth/login", user)
  };
}

export function logoutUser() {
  Axios.post("/auth/logout");
  return {
    type: LOGOUT_USER
  };
}

export default function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case `${GET_SESSION}_LOADING`: {
      return {
        ...state,
        loading: true
      };
    }
    case `${GET_SESSION}_FULFILLED`: {
      return {
        ...state,
        user_id: payload.data.user_id,
        first_name: payload.data.first_name,
        last_name: payload.data.last_name,
        username: payload.data.username,
        location: payload.data.location,
        photo: payload.data.photo,
        bio: payload.data.bio
      };
    }
    case `${REGISTER_USER}_LOADING`: {
      return {
        ...state,
        loading: true
      };
    }
    case `${REGISTER_USER}_FULFILLED`: {
      return {
        ...state,
        user_id: payload.data.user_id,
        first_name: payload.data.first_name,
        last_name: payload.data.last_name,
        username: payload.data.username,
        location: payload.data.location,
        photo: payload.data.photo,
        bio: payload.data.bio
      };
    }
    case `${LOGIN_USER}_LOADING`: {
      return {
        ...state,
        loading: true
      };
    }
    case `${LOGIN_USER}_FULFILLED`: {
      return {
        ...state,
        user_id: payload.data.user_id,
        first_name: payload.data.first_name,
        last_name: payload.data.last_name,
        username: payload.data.username,
        location: payload.data.location,
        photo: payload.data.photo,
        bio: payload.data.bio
      };
    }
    default:
      return state;
  }
}
