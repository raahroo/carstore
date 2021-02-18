import Vue from "vue";
import Vuex from "vuex";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const CarsData = require("../../../car-store/src/store/cars.json");

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cars: []
  },
  mutations: {
    fetchCars(state) {
      state.cars = CarsData
    },
  },
  modules: {}
});
