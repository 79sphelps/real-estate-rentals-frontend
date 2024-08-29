import { takeEvery, call, put } from "redux-saga/effects";
import RentalDataService from "../services/rental.service.js";
import {
  SET_CURRENT_RENTAL,
  FIND_BY_TITLE,
  SET_CURRENT_INDEX,
  SET_MESSAGE,
  SET_SUBMITTED,
  GET_RENTALS_SUCCESSFUL,
  SET_RENTAL_TO_ADD,
  GET_RENTALS,
  GET_RENTAL,
  ADD_RENTAL,
  UPDATE_RENTAL,
  DELETE_RENTAL,
  DELETE_RENTALS,
  DELETE_RENTALS_SUCCESSFUL,
  API_ERRORED,
  UPDATE_RENTAL_SUCCESSFUL,
  DELETE_RENTAL_SUCCESSFUL,
  ADD_RENTAL_SUCCESSFUL,
  FIND_BY_TITLE_SUCCESSFUL,
  IS_FETCHING,
  IS_DELETING_ALL,
  IS_FINDING,
  IS_UPDATING,
  IS_DELETING,
  IS_ADDING,
  CREATE_GENERAL_MESSAGE,
  CREATE_GENERAL_MESSAGE_SUCCESSFUL,
  GET_MESSAGES,
  GET_MESSAGES_SUCCESSFUL,
  DELETE_MESSAGE,
  DELETE_MESSAGE_SUCCESSFUL,
} from "../constants/action.types.js";

/*
redux-saga is a library that aims to make application side effects (i.e. asynchronous things like data
fetching and impure things like accessing the browser cache) easier to manage, more efficient to
execute, simple to test, and better at handling failures.

Generators can pause and restart — be exited and re-entered — and actually remember the context/state
of the function over time.

Each yield in a generator basically represents an asynchronous step in a more synchronous/sequential
process — somewhat like await in an async function.

Basic Flow:
- a watcherSaga is a saga that watches for an action to be dispatched to the Store, triggering a
  workerSaga.
- takeLatest is a helper function provided by redux-saga that will trigger a new workerSaga when
  it sees an GET_RENTALS, while cancelling any previously triggered workerSaga still in process.
- getRentals simply uses axios to request the todo list from the rentals API and returns a Promise
  for the response.
- workerSaga attempts to getRentals, using another redux-saga helper function call, and stores the
  result (a resolved or failed Promise) in a response variable.
- If getRentals was a success, we extract the todo list from the response and dispatch an
  GET_RENTALS_SUCCESS action with todo list in the payload to the Store, using ANOTHER redux-saga
  helper function put.
- If there was an error with getRentals, we let the Store know about it by dispatching an
  API_ERRORED action with the error.
*/

export default function* watcherSaga() {
  yield takeEvery(GET_RENTALS, getRentalsWorkerSaga);
  yield takeEvery(GET_RENTAL, getRentalWorkerSaga);
  yield takeEvery(DELETE_RENTALS, deleteRentalsWorkerSaga);
  yield takeEvery(FIND_BY_TITLE, findByTitleWorkerSaga);
  yield takeEvery(UPDATE_RENTAL, updateRentalWorkerSaga);
  yield takeEvery(DELETE_RENTAL, deleteRentalWorkerSaga);
  yield takeEvery(ADD_RENTAL, addRentalWorkerSaga);
  yield takeEvery(CREATE_GENERAL_MESSAGE, createGeneralMessageWorkerSaga);
  yield takeEvery(GET_MESSAGES, getMessagesWorkerSaga);
  yield takeEvery(DELETE_MESSAGE, deleteMessageWorkerSaga);
}

export function* getRentalsWorkerSaga() {
  try {
    yield put({ type: IS_FETCHING });
    const payload = yield call(getRentals);
    yield put({ type: GET_RENTALS_SUCCESSFUL, payload });
  } catch (e) {
    yield put({ type: API_ERRORED, payload: e });
  }
}

export function* getRentalWorkerSaga(action) {
  try {
    yield put({ type: IS_FINDING });
    const payload = yield call(getRental, action.payload);
    yield put({ type: FIND_BY_TITLE_SUCCESSFUL, payload });
    // yield put({ type: SET_CURRENT_RENTAL, payload: null });
    yield put({ type: SET_CURRENT_RENTAL, payload: payload });
    yield put({ type: SET_CURRENT_INDEX, payload: -1 });
  } catch (e) {
    yield put({ type: API_ERRORED, payload: e });
  }
}

export function* deleteRentalsWorkerSaga(action) {
  try {
    yield put({ type: IS_DELETING_ALL });
    yield call(deleteRentals);
    let ary = [];
    yield put({ type: DELETE_RENTALS_SUCCESSFUL, ary });
  } catch (e) {
    yield put({ type: API_ERRORED, payload: e });
  }
}

export function* findByTitleWorkerSaga(action) {
  try {
    yield put({ type: IS_FINDING });
    const payload = yield call(findByTitle, action.payload);
    yield put({ type: FIND_BY_TITLE_SUCCESSFUL, payload });
    yield put({ type: SET_CURRENT_RENTAL, payload: null });
    yield put({ type: SET_CURRENT_INDEX, payload: -1 });
  } catch (e) {
    yield put({ type: API_ERRORED, payload: e });
  }
}

export function* updateRentalWorkerSaga(action) {
  try {
    yield put({ type: IS_UPDATING });
    yield call(updateRental, action.payload);
    const payload = action.payload;
    yield put({ type: UPDATE_RENTAL_SUCCESSFUL, payload });
    const message = "The property was updated successfully!";
    yield put({ type: SET_MESSAGE, payload: message });
  } catch (e) {
    yield put({ type: API_ERRORED, payload: e });
  }
}

export function* deleteRentalWorkerSaga(action) {
  try {
    yield put({ type: IS_DELETING });
    yield call(deleteRental, action.payload);
    const payload = action.payload;
    yield put({ type: DELETE_RENTAL_SUCCESSFUL, payload });
    const message = "The property was deleted successfully!";
    yield put({ type: SET_MESSAGE, payload: message });
    yield put({ type: SET_CURRENT_RENTAL, payload: null });
    yield put({ type: SET_CURRENT_INDEX, payload: -1 });
    // yield put(push('/rentals'));
  } catch (e) {
    yield put({ type: API_ERRORED, payload: e });
  }
}

export function* addRentalWorkerSaga(action) {
  try {
    yield put({ type: IS_ADDING });
    const payload = yield call(addRental, action.payload);
    yield put({ type: ADD_RENTAL_SUCCESSFUL, payload });
    yield put({ type: SET_SUBMITTED, payload: true });
    yield put({ type: SET_RENTAL_TO_ADD, payload: null });
  } catch (e) {
    yield put({ type: API_ERRORED, payload: e });
  }
}


export function* createGeneralMessageWorkerSaga(action) {
  try {
    // yield put({ type: IS_ADDING });
    const payload = yield call(createGeneralMessage, action.payload);
    yield put({ type: CREATE_GENERAL_MESSAGE_SUCCESSFUL, payload });
    // yield put({ type: SET_SUBMITTED, payload: true });
    // yield put({ type: SET_RENTAL_TO_ADD, payload: null });
  } catch (e) {
    yield put({ type: API_ERRORED, payload: e });
  }
}

export function* getMessagesWorkerSaga() {
  try {
    yield put({ type: IS_FETCHING });
    const payload = yield call(getMessages);
    yield put({ type: GET_MESSAGES_SUCCESSFUL, payload });
  } catch (e) {
    yield put({ type: API_ERRORED, payload: e });
  }
}

export function* deleteMessageWorkerSaga(action) {
  try {
    yield put({ type: IS_DELETING });
    yield call(deleteMessage, action.payload);
    const payload = action.payload;
    yield put({ type: DELETE_MESSAGE_SUCCESSFUL, payload });
    const message = "The message was deleted successfully!";
    yield put({ type: SET_MESSAGE, payload: message });
    // yield put({ type: SET_CURRENT_RENTAL, payload: null });
    // yield put({ type: SET_CURRENT_INDEX, payload: -1 });
    // yield put(push('/rentals'));
  } catch (e) {
    yield put({ type: API_ERRORED, payload: e });
  }
}



const createGeneralMessage = (data) => {
  return RentalDataService.addGeneralMessage(data)
    .then((response) => response.data)
    .catch((e) => console.log(e));
};

const getMessages = () => {
  return RentalDataService.getGeneralMessages()
    .then((response) => response.data)
    .catch((e) => console.log(e));
};

const deleteMessage = (id) => {
  return RentalDataService.deleteGeneralMessage(id)
  .then((response) => response.data)
  .catch((e) => console.log(e));
}



const getRentals = () => {
  return RentalDataService.getRentals()
    .then((response) => response.data)
    .catch((e) => console.log(e));
};

const getRental = (id) => {
  return RentalDataService.getRental(id)
    .then((response) => response.data)
    .catch((e) => console.log(e));
};

const addRental = (data) => {
  return RentalDataService.addRental(data)
    .then((response) => response.data)
    .catch((e) => console.log(e));
};

const updateRental = (payload) => {
  return RentalDataService.updateRental(payload)
    .then((response) => response.data)
    .catch((e) => console.log(e));
};

const deleteRental = (id) => {
  return RentalDataService.deleteRental(id)
    .then((response) => response.data)
    .catch((e) => console.log(e));
};

const deleteRentals = () => {
  return RentalDataService.deleteRentals()
    .then((response) => response.data)
    .catch((e) => console.log(e));
};

const findByTitle = (title) => {
  return RentalDataService.findByTitle(title)
    .then((response) => response.data)
    .catch((e) => console.log(e));
};
