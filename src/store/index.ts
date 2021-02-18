import Vue from "vue";
import Vuex from "vuex";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const CarsData = require("../../../car-store/src/store/cars.json");

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cars: [],
    checkedFilters: []
  },
  getters: {
    checkedFilters: (state) => (filter: (this: void, value: never, index: number, obj: never[]) => value is never) => {
      if(state.checkedFilters.find(filter)) {
        return state.checkedFilters.filter( stateFilter => stateFilter !== filter )
      } else {
        return [...state.checkedFilters, filter];
      }
    }
  },
  mutations: {
    fetchCars(state) {
      state.cars = CarsData
    },
    filterCars(state: any, fuel) {
      console.log(fuel, 'fuel')
      state.cars = (state: any )=> state.cars.filter((car: any) => car.fuel.contains(fuel))
    }
  },
  modules: {}
});
