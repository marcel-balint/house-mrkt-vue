<template>
  <div class="container-houses">
    <section class="house-items">
      <ul>
        <HouseCardComponent
          v-for="house in this.houses"
          :key="house.id"
          :house="house"
        />
      </ul>
    </section>
  </div>
</template>

<script>
import HouseCardComponent from "./HouseCardComponent";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({ houses: "getStateHouses" }),
  },

  created() {
    this.$store.dispatch("getHouses");
  },

  components: {
    HouseCardComponent,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  font-family: "Montserrat";
  font-size: 18px;
}

.container-houses {
  margin-top: 5px;
}
</style>
