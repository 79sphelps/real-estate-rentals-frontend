import http from "../../http-common";

class RentalService {
  getRentals() {
    return http.get(`/api/rentals`);
  }

  getRental(id) {
    return http.get(`/api/rentals/${id}`);
  }

  addRental(data) {
    return http.post(`/api/rentals`, data);
  }

  updateRental(data) {
    return http.put(`/api/rentals/${data.id}`, data);
  }

  deleteRental(id) {
    return http.delete(`/api/rentals/${id}`);
  }

  deleteRentals() {
    return http.delete(`/api/rentals`);
  }

  findByTitle(title) {
    return http.get(`/api/rentals?title=${title}`);
  }

  addGeneralMessage(data) {
    return http.post(`/api/rentals/generalmessages`, data);
  }

  getGeneralMessages() {
    return http.get(`/api/rentals/generalmessages`);
  }

  deleteGeneralMessage(id) {
    return http.delete(`/api/rentals/generalmessages/${id}`);
  }
}

const RentalDataService = new RentalService()

// export default new RentalDataService();
export default RentalDataService;
