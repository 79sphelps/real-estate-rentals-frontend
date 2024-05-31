import { createSelector } from "reselect";


const getState = createSelector((state) => state, (state) => state);


const selectGeneralMessages = (
  [getState],
  (state) => state.generalMessages
);



const selectRentals = createSelector(
  [getState],
  (state) => state.rentals
);

const selectCurrentRental = createSelector(
  [getState],
  (state) => state.currentRental
);

const selectRentalToAdd = createSelector(
  [getState],
  (state) => state.rentalToAdd
);

const selectCurrentIndex = createSelector(
  [getState],
  (state) => state.currentIndex
);

const selectSearchTitle = createSelector(
  [getState],
  (state) => state.searchTitle
);

const selectMessage = createSelector(
  [getState],
  (state) => state.message
);

const selectSubmitted = createSelector(
  [getState],
  (state) => state.submitted
);

export {
  selectGeneralMessages,
  selectRentals,
  selectCurrentRental,
  selectRentalToAdd,
  selectCurrentIndex,
  selectSearchTitle,
  selectMessage,
  selectSubmitted,
};
