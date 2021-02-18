<template>
  <div class="hello">
    <h1 v-if="cars.length == 0">
      Loading...
    </h1>
    <div v-else class="car-grid">
      <div v-for="car in cars" :key="car.id" class="car-box">
        <img :src="car.image" />
        <div>{{car.name}}</div>
        <div>{{car.year}}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { mapState } from 'vuex';


@Component({
  props: {
    loading: String
  },
  computed: {
  ...mapState({
      cars: 'cars'
    })
  }
})
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;

  mounted() {
    setTimeout(() =>   this.$store.commit('fetchCars'), 2000)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.car-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  max-width: 1024px;
  margin: 0 auto;
}

.car-box {
  display: grid;
  border: 1px solid black;
  grid-template-columns: 1fr;
  justify-items: center;
  height: 200px;
  width: 200px;
  padding: 1rem;
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
