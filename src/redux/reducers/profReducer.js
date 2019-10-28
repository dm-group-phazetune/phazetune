import axios from "axios";

const initialState = {
  user: {},
  loading: false
};

const GET_PROFILE = "GET_PROFILE";
const EDIT_PROFILE = "EDIT_PROFILE";

export function getProfile(username) {
  return {
    type: GET_PROFILE,
    payload: axios.get(`/api/profile/user/${username}`)
  };
}

export function editProfile(profile) {
  return {
    type: EDIT_PROFILE,
    payload: axios.put("/api/profile/user", profile)
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
    case `${GET_PROFILE}_PENDING`: {
      return {
        ...state,
        loading: true
      };
    }
    case `${GET_PROFILE}_FULFILLED`: {
      console.log(payload.data);
      return {
        ...state,
        user: payload.data
      };
    }
    default:
      return true;
  }
}
