<template>
  <div class="car">
    <div>filter</div>
<!--    <div class="car-filter">-->
<!--      <h1>Filter Model</h1>-->
<!--      <h2>Vehicle type</h2>-->
<!--      <div @click="handleFiler">-->
<!--        <input type="checkbox" id="petrol" value="petrol" v-model="checkedFilters">-->
<!--        <label for="petrol">Petrol</label>-->
<!--      </div>-->
<!--      <div @click="handleFiler">-->
<!--        <input type="checkbox" id="natural-gas" value="natural-gas" v-model="checkedFilters">-->
<!--        <label for="natural-gas">Natural Gas</label>-->
<!--      </div>-->
<!--      <div @click="handleFiler">-->
<!--        <input type="checkbox" id="electric" value="electric" v-model="checkedFilters">-->
<!--        <label for="electric">Eletric</label>-->
<!--      </div>-->
<!--      <span>Checked names: {{ checkedFilters }}</span>-->
<!--    </div>-->
    <h1 v-if="cars.length == 0">
      Loading...
    </h1>
    <div v-else class="car-grid">
      <div v-for="car in cars" :key="car.id"
           class="car-grid-box"
           :class="{'car-grid-box__active': selectedCar === car}"
           @click="selectedCar=car"
      >
        <img :src="car.image" />
        <div>{{car.name}}</div>
        <div>{{car.label}}</div>
        <div>{{car.price}}</div>
      </div>
    </div>
    <section v-if="selectedCar">
      {{ selectedCar.name }}
      {{ selectedCar.label }}
      <div>
        <label for="show">
          <input type="checkbox" id="show" v-model="showMore">
          Show More
        </label>
        <div v-show="showMore">
          {{ selectedCar.description }}
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { mapGetters, mapState } from 'vuex';

@Component({
  props: {
    loading: String
  },
  data() {
    return {
      selectedCar: undefined,
      showMore: false
    }
  },
  computed: {
  ...mapState({
      cars: 'cars',
      checkedFilters: 'checkedFilters'
    }),
    ...mapGetters([
      'checkedFilters',
    ])
  }
})
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;

  mounted() {
    setTimeout(() =>   this.$store.commit('fetchCars'), 2000)
  }

  handleFiler(event: MouseEvent) {
    this.$store.commit('filterCars', event.target.value);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.car {
  display: grid;
  grid-template-columns: 1fr 4fr 4fr;
}

.car-filter {
  display: grid;
  justify-content: flex-end;
  justify-items: start;
}

.car-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  max-width: 1024px;
  margin: 0 auto;
}

.car-grid-box {
  display: grid;
  border: 1px solid black;
  grid-template-columns: 1fr;
  justify-items: center;
  height: 200px;
  width: 200px;
  padding: 1rem;

  img {
    width: 100%;
  }

  &:hover {
    background: blue;
    color: white;
  }
}

.car-grid-box__active {
  background-color: blue;
  color: white
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
