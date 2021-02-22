<template>
  <div class="car">
    <h1 v-if="activeCars.length === 1">
      Loading
    </h1>
    <section v-else>
      <div>
        <label for="green-cars">
          <input
            type="checkbox"
            name="green-cars"
            value="green-cars"
            id="green-cars"
            @click="handleFilter"
          />
          Show only green cars
        </label>
      </div>
      <div class="main">
        <div class="car-grid car-grid-all">
          <div
            v-for="car in activeCars"
            :key="car.id"
            class="car-grid-box"
            :class="{ 'car-grid-box__active': selectedCar === car }"
            @click="selectedCar = car"
          >
            <img :src="car.image" />
            <div>{{ car.name }}</div>
            <div>{{ car.label }}</div>
            <div>{{ car.price }}</div>
          </div>
        </div>
        <section v-if="selectedCar" class="selected-car">
          {{ selectedCar.name }}
          {{ selectedCar.label }}
          <img :src="selectedCar.image" />
          <div>
            <label for="show">
              <input type="checkbox" id="show" v-model="showMore" />
              Show More
            </label>
            <div v-show="showMore">
              {{ selectedCar.description }}
            </div>
          </div>
        </section>
      </div>
    </section>
    <div>
      <p>Electric Cars</p>
      <div class="car-grid">
        <div v-for="car in getElectricCars" :key="car.id" class="car-grid-box">
          <img :src="car.image" />
          <div>{{ car.name }}</div>
          <div>{{ car.label }}</div>
          <div>{{ car.price }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import "./CarView.scss";
import { Component, Prop, Vue } from "vue-property-decorator";
import { mapState, mapGetters } from "vuex";

@Component({
  props: {
    loading: String
  },
  data() {
    return {
      selectedCar: undefined,
      showMore: false
    };
  },
  computed: {
    ...mapState(["activeCars"]),
    ...mapGetters(["getElectricCars"])
  }
})
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;

  mounted() {
    this.$store.dispatch("getCars");
  }

  handleFilter(event) {
    if (event.target.checked) {
      this.$store.commit("setActiveGreenCars");
    } else {
      this.$store.commit("resetCars");
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
