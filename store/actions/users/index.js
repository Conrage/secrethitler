import { SET_USER, RESET_USER } from "../";

export const userUpdate = (user) => ({
  type: SET_USER,
  payload: user,
});

export const userReset = () => {
  return {
    type: RESET_USER,
  };
};