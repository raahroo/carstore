import Vue from "vue";
import Vuex from "vuex";
import set = Reflect.set;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const CarsData = require("../../../car-store/src/store/cars.json");

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cars: [{ itemId: "", fuel: "" }],
    filters: ["all"],
    activeCars: [{ itemId: "", fuel: "" }]
  },
  getters: {
    //make easier to pull pieces of data
    getElectricCars: state =>
      state.activeCars.filter(car => car.fuel.includes("electric"))
  },
  mutations: {
    resetCars(state) {
      state.activeCars = state.cars;
    },
    setCars(state, payload) {
      state.cars = payload;
    },
    setActiveCars(state, payload) {
      state.activeCars = payload;
    },
    setActiveGreenCars(state) {
      state.activeCars = state.cars.filter(car =>
        car.fuel.includes("electric")
      );
    }
  },
  actions: {
    getCars: context => {
      setTimeout(() => {
        context.commit("setCars", CarsData);
        context.commit("setActiveCars", CarsData);
      }, 2000);
    }
  },
  modules: {}
});
