import {
  SET_CURRENT_RENTAL,
  GET_CURRENT_RENTAL,
  SET_RENTAL_TO_ADD,
  GET_RENTAL_TO_ADD,
  FIND_BY_TITLE,
  FIND_BY_TITLE_SUCCESSFUL,
  SET_SEARCH_TITLE,
  GET_SEARCH_TITLE,
  SET_CURRENT_INDEX,
  GET_CURRENT_INDEX,
  SET_MESSAGE,
  GET_MESSAGE,
  SET_SUBMITTED,
  GET_SUBMITTED,
  SET_RENTALS,
  GET_RENTALS,
  GET_RENTALS_SUCCESSFUL,
  GET_RENTAL,
  ADD_RENTAL,
  ADD_RENTAL_SUCCESSFUL,
  UPDATE_RENTAL,
  UPDATE_RENTAL_SUCCESSFUL,
  DELETE_RENTAL,
  DELETE_RENTAL_SUCCESSFUL,
  DELETE_RENTALS,
  DELETE_RENTALS_SUCCESSFUL,
  API_ERRORED,
  CREATE_GENERAL_MESSAGE,
  CREATE_GENERAL_MESSAGE_SUCCESSFUL,
  GET_MESSAGES,
  GET_MESSAGES_SUCCESSFUL,
  DELETE_MESSAGE,
  DELETE_MESSAGE_SUCCESSFUL
} from "../constants/action.types";


const createGeneralMessage = (payload) => {
  return { type: CREATE_GENERAL_MESSAGE, payload }
};

const createGeneralMessageSuccessful = (payload) => {
  return { type: CREATE_GENERAL_MESSAGE_SUCCESSFUL, payload };
};

const getMessages = () => {
  return { type: GET_MESSAGES };
};

const getMessagesSuccessful = (payload) => {
  return { type: GET_MESSAGES_SUCCESSFUL, payload };
};

const deleteMessage = (payload) => {
  return { type: DELETE_MESSAGE, payload };
};

const deleteMessageSuccessful = () => {
  return { type: DELETE_MESSAGE_SUCCESSFUL };
};



const setCurrentRental = (payload) => {
  return { type: SET_CURRENT_RENTAL, payload };
};

const getCurrentRental = (payload) => {
  return { type: GET_CURRENT_RENTAL };
};

const setRentalToAdd = (payload) => {
  return { type: SET_RENTAL_TO_ADD, payload };
};

const getRentalToAdd = (payload) => {
  return { type: GET_RENTAL_TO_ADD };
};

const findByTitle = (payload) => {
  return { type: FIND_BY_TITLE, payload };
};

const findByTitleSuccessful = (payload) => {
  return { type: FIND_BY_TITLE_SUCCESSFUL, payload };
};

const setSearchTitle = (payload) => {
  return { type: SET_SEARCH_TITLE, payload };
};

const getSearchTitle = (payload) => {
  return { type: GET_SEARCH_TITLE };
};

const setCurrentIndex = (payload) => {
  return { type: SET_CURRENT_INDEX, payload };
};

const getCurrentIndex = (payload) => {
  return { type: GET_CURRENT_INDEX };
};

const setMessage = (payload) => {
  return { type: SET_MESSAGE, payload };
};

const getMessage = (payload) => {
  return { type: GET_MESSAGE };
};

const setSubmitted = (payload) => {
  return { type: SET_SUBMITTED, payload };
};

const getSubmitted = (payload) => {
  return { type: GET_SUBMITTED };
};

const setRentals = (payload) => {
  return { type: SET_RENTALS, payload };
};

const getRentals = (payload) => {
  return { type: GET_RENTALS };
};

const getRentalsSuccessful = (payload) => {
  return { type: GET_RENTALS_SUCCESSFUL };
};

const getRental = (payload) => {
  return { type: GET_RENTAL, payload };
};

const addRental = (payload) => {
  return { type: ADD_RENTAL, payload };
};

const addRentalSuccessful = (payload) => {
  return { type: ADD_RENTAL_SUCCESSFUL, payload };
};

const updateRental = (payload) => {
  return { type: UPDATE_RENTAL, payload };
};

const updateRentalSuccessful = (payload) => {
  return { type: UPDATE_RENTAL_SUCCESSFUL, payload };
};

const deleteRental = (payload) => {
  return { type: DELETE_RENTAL, payload };
};

const deleteRentalSuccessful = (payload) => {
  return { type: DELETE_RENTAL_SUCCESSFUL, payload };
};

const deleteRentals = (payload) => {
  return { type: DELETE_RENTALS };
};

const deleteRentalsSuccessful = (payload) => {
  return { type: DELETE_RENTALS_SUCCESSFUL, payload };
};

const apiErrored = (payload) => {
  return { type: API_ERRORED, payload };
};

export {
  createGeneralMessage,
  createGeneralMessageSuccessful,
  getMessages,
  getMessagesSuccessful,
  deleteMessage,
  deleteMessageSuccessful,

  setCurrentRental,
  getCurrentRental,
  setRentalToAdd,
  getRentalToAdd,
  findByTitle,
  setSearchTitle,
  getSearchTitle,
  setCurrentIndex,
  getCurrentIndex,
  setMessage,
  getMessage,
  setSubmitted,
  getSubmitted,
  setRentals,
  getRentals,
  getRentalsSuccessful,
  deleteRentalsSuccessful,
  updateRentalSuccessful,
  deleteRentalSuccessful,
  addRentalSuccessful,
  findByTitleSuccessful,
  getRental,
  addRental,
  updateRental,
  deleteRental,
  deleteRentals,
  apiErrored,
};
