import {
  REQUEST_COMMENTS,
  SUCCESS_FETCH_COMMENTS,
  FAIL_FETCH_COMMENTS,
} from '../actions/actionTypes';

const initialState = {
  comments: {},
  fetchingComments: false,
  fetchCommentsError: '',
};

export default function fetchComments(state = initialState, action) {
  switch (action.type) {
    case REQUEST_COMMENTS:
      return { ...state, fetchingComments: true };
    case SUCCESS_FETCH_COMMENTS:
      return {
        ...state,
        fetchingComments: false,
        comments: {...state.comments, ...action.payload},
        fetchCommentsError: '',
      };
    case FAIL_FETCH_COMMENTS:
      return {
        ...state,
        fetchingComments: false,
        fetchCommentsError: action.payload,
      };
    default:
      return state;
  }
}