const INITIAL_STATE = {
  user: null
};

const SET_USER = "SET_USER";

export default function(state = INITIAL_STATE, action) {
  // console.log("reducer hit", action.type);
  switch (action.type) {
    case SET_USER:
      // console.log(action.payload);
      return Object.assign({}, state, { user: action.payload });
    default:
      return state;
  }
}

export function setUser(user) {
  // console.log(user);
  return {
    type: SET_USER,
    payload: user
  };
}

// export function selectAnimal(XXXXXXXXXX) {
//   return {
//     type: SELECT_ANIMAL,
//     payload: XXXXXXXXXXXXXX
//   };
// }
