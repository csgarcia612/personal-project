const INITIAL_STATE = {
  user: null
};

const SET_USER = "SET_USER";

export default function(state = INITIAL_STATE, action) {
  console.log("reducer hit", action);
  switch (action.type) {
    case SET_USER:
      return Object.assign({}, state, { user: action.payload });
    default:
      return state;
  }
}

export function setUser(user) {
  return {
    type: SET_USER,
    payload: user
  };
}
