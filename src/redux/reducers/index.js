import {
  SET_CURRENT_RENTAL,
  SET_RENTAL_TO_ADD,
  SET_SEARCH_TITLE,
  SET_CURRENT_INDEX,
  SET_MESSAGE,
  SET_SUBMITTED,
  SET_RENTALS,
  // DATA_LOADED,
  IS_FETCHING,
  IS_ADDING,
  IS_DELETING,
  IS_DELETING_ALL,
  IS_FINDING,
  IS_UPDATING,
  API_ERRORED,
  GET_RENTALS_SUCCESSFUL,
  DELETE_RENTALS_SUCCESSFUL,
  UPDATE_RENTAL_SUCCESSFUL,
  DELETE_RENTAL_SUCCESSFUL,
  ADD_RENTAL_SUCCESSFUL,
  FIND_BY_TITLE_SUCCESSFUL,

  CREATE_GENERAL_MESSAGE,
  DELETE_MESSAGE,
  DELETE_MESSAGE_SUCCESSFUL,
  GET_MESSAGES_SUCCESSFUL,
} from "../constants/action.types";
import { deepCopy } from '../utils';

const initialState = {
  generalMessages: [],

  rentals: [],
  currentRental: null,
  todoToAdd: null,
  searchTitle: "",
  currentIndex: -1,
  message: "",
  submitted: false,
  error: '',
  isLoading: false,
  isAdding: false,
  isUpdating: false,
  isDeleting: false,
  isDeletingAll: false,
  isFinding: false,
};

function rootReducer(state = initialState, action) {
  let mappings = null;

  switch (action.type) {
    case SET_CURRENT_RENTAL:
      if (!action.payload) return { ...state, currentRental: null };
      return {
        ...state,
        currentRental: { ...state.currentRental, ...action.payload }
      };

    case SET_RENTAL_TO_ADD:
      if (!action.payload) return { ...state, todoToAdd: null };
      return { ...state, todoToAdd: action.payload };

    case SET_SEARCH_TITLE:
      return { ...state, searchTitle: action.payload };

    case FIND_BY_TITLE_SUCCESSFUL:
      return { ...state, isFinding: false, rentals: action.payload };

    case SET_CURRENT_INDEX:
      return { ...state, currentIndex: action.payload };

    case SET_MESSAGE:
      return { ...state, message: action.payload };

    case SET_SUBMITTED:
      return { ...state, submitted: action.payload };

    case SET_RENTALS:
      return { ...state, rentals: action.payload };

    case GET_RENTALS_SUCCESSFUL:
      return { ...state, isLoading: false, rentals: action.payload };


    case CREATE_GENERAL_MESSAGE:
      return { ...state, rentals: state.generalMessages.concat(action.payload) };

    case GET_MESSAGES_SUCCESSFUL:
      return { ...state, isFetching: false, generalMessages: action.payload };

    case DELETE_MESSAGE:
      mappings = state.generalMessages.filter((t) => t._id !== action.payload);
      return { ...state, isDeleting: false, generalMessages: mappings };

    case DELETE_MESSAGE_SUCCESSFUL:
      return { ...state, isDeletingAll: false, generalMessages: action.payload };


    case ADD_RENTAL_SUCCESSFUL:
      return { ...state, isAdding: false, rentals: state.rentals.concat(action.payload) };

    case UPDATE_RENTAL_SUCCESSFUL:
      mappings = deepCopy(state.rentals);
      const idx = mappings.findIndex((t) => t._id === action.payload.id);

      if (mappings && mappings[idx]) {
        let todo = action.payload.todo;
        todo.dueDate = todo.dueDate.toISOString();
        delete todo.id;
        mappings[idx] = { ...mappings[idx], ...todo };
      }

      return { ...state, isUpdating: false, rentals: mappings };

    case DELETE_RENTAL_SUCCESSFUL:
      mappings = state.rentals.filter((t) => t._id !== action.payload.id);
      return { ...state, isDeleting: false, rentals: mappings };

    case DELETE_RENTALS_SUCCESSFUL:
      return { ...state, isDeletingAll: false, rentals: action.payload };

    // case DATA_LOADED:
    //   return { ...state, isLoading: false };
    
    case IS_FETCHING:
      return { ...state, isLoading: true };

    case IS_ADDING:
      return { ...state, isAdding: true };

    case IS_UPDATING:
      return { ...state, isUpdating: true };

    case IS_DELETING:
      return { ...state, isDeleting: true };

    case IS_DELETING_ALL:
      return { ...state, isDeletingAll: true };

    case IS_FINDING:
      return { ...state, isFinding: true };

    case API_ERRORED:
      // return { ...state, error: state.error = 'yes' }
      return { ...state, error: action.payload };

    default:
      return state;
  }
}

export default rootReducer;
