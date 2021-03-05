import { HYDRATE } from "next-redux-wrapper";
import { SET_USER, RESET_USER } from "../../actions";

const initialState = {
  name:null,
  gameName:null,
  auth:false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload.user };
    case SET_USER:
      const newState = { ...state, ...action.payload };
      return newState;
    case RESET_USER:
      return initialState;
    default:
      return state;
  }
};

export default reducer;