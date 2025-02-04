import api from "./api";
import { errorHandler, isAxiosError } from './errorHandler.ts';

const GET_RENTALS_ENDPOINT = `/api/rentals`;

class RentalService {
  getGeneralMessages() {
    try {
      return api.get(`${GET_RENTALS_ENDPOINT}/generalmessages`);
    } catch (error) {
      if (isAxiosError(error)) {
        const { message } = errorHandler(error);
          throw new Error(message);
      } else {
          // some other type of Error
      }
    }
  }

  addGeneralMessage(data) {
    try {
      return api.post(`${GET_RENTALS_ENDPOINT}/generalmessages`, data);
    } catch (error) {
      if (isAxiosError(error)) {
        const { message } = errorHandler(error);
          throw new Error(message);
      } else {
          // some other type of Error
      }
    }
  }

  deleteGeneralMessage(id) {
    try {
      return api.delete(`${GET_RENTALS_ENDPOINT}/generalmessages/${id}`);
    } catch (error) {
      if (isAxiosError(error)) {
        const { message } = errorHandler(error);
          throw new Error(message);
      } else {
          // some other type of Error
      }
    }
  }

  //--------------------------------------------

  getRentals() {
    try {
      return api.get(GET_RENTALS_ENDPOINT);
    } catch (error) {
      if (isAxiosError(error)) {
        const { message } = errorHandler(error);
          throw new Error(message);
      } else {
          // some other type of Error
      }
    }
  }

  getRental(id) {
    try {
      return api.get(`${GET_RENTALS_ENDPOINT}/${id}`);
    } catch (error) {
      if (isAxiosError(error)) {
        const { message } = errorHandler(error);
          throw new Error(message);
      } else {
          // some other type of Error
      }
    }
  }

  addRental(data) {
    try {
      return api.post(GET_RENTALS_ENDPOINT, data);
    } catch (error) {
      if (isAxiosError(error)) {
        const { message } = errorHandler(error);
          throw new Error(message);
      } else {
          // some other type of Error
      }
    }
  }

  updateRental(id, data) {
    try {
      return api.put(`${GET_RENTALS_ENDPOINT}/${data.id}`, data);
    } catch (error) {
      if (isAxiosError(error)) {
        const { message } = errorHandler(error);
          throw new Error(message);
      } else {
          // some other type of Error
      }
    }
  }

  deleteRental(id) {
    try {
      return api.delete(`${GET_RENTALS_ENDPOINT}/${id}`);
    } catch (error) {
      if (isAxiosError(error)) {
        const { message } = errorHandler(error);
          throw new Error(message);
      } else {
          // some other type of Error
      }
    }
  }

  deleteRentals() {
    try {
      return api.delete(GET_RENTALS_ENDPOINT);
    } catch (error) {
      if (isAxiosError(error)) {
        const { message } = errorHandler(error);
          throw new Error(message);
      } else {
          // some other type of Error
      }
    }
  }

  findByTitle(title) {
    try {
      return api.get(`${GET_RENTALS_ENDPOINT}?title=${title}`);
    } catch (error) {
      if (isAxiosError(error)) {
        const { message } = errorHandler(error);
          throw new Error(message);
      } else {
          // some other type of Error
      }
    }
  }
}

const RentalDataService = new RentalService()

// export default new RentalDataService();
export default RentalDataService;