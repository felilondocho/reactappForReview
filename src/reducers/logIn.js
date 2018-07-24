import { LOG_IN_REQUEST,
  LOG_IN_SUCCESSFUL,
  LOG_IN_FAIL,
  CHECK_INITIAL_TOKEN,
} from '../actions/actionTypes';

const initialState = {
  logInLoading: false,
  loggedIn: false,
  logInError: '',
};

export default function logIn(state = initialState, action) {
  switch (action.type) {
    case CHECK_INITIAL_TOKEN:
      return { ...state, loggedIn: action.payload };
    case LOG_IN_REQUEST:
      return {
        ...state,
        logInLoading: true,
      };
    case LOG_IN_SUCCESSFUL:
      return {
        ...state,
        loggedIn: true,
        logInError: '',
        logInLoading: false,
      };
    case LOG_IN_FAIL:
      return {
        ...state,
        loggedIn: false,
        logInError: action.payload,
        logInLoading: false,
      };
    default:
      return state;
  }
}