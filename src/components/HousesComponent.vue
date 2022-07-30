<template>
  <div class="container-houses">
    <section class="house-items">
      <ul>
        <h1 v-if="inputVal" :class="housesFoundNum == 0 ? 'hide' : ''">
          {{ housesFoundNum }} results found
        </h1>
        <div class="noresults-msg" v-if="!housesFoundNum">
          <img
            :src="require('../assets/images/img_empty_houses.png')"
            @click="this.getHouseById(house.id)"
            alt="edit"
          />
          <p>No results found.</p>
          <p>Please try another keyword.</p>
        </div>
        <HouseCardComponent
          v-for="house in filterHouses"
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
    ...mapGetters({ houses: "getStateHouses", inputVal: "getInputCharacter" }),
    filterHouses() {
      return this.houses.filter((house) => {
        return (
          house.location.city
            .toLowerCase()
            .match(this.inputVal.toLowerCase()) ||
          house.location.street
            .toLowerCase()
            .match(this.inputVal.toLowerCase()) ||
          house.location.zip.toLowerCase().match(this.inputVal.toLowerCase())
        );
      });
    },
    housesFoundNum() {
      const searchResultsNum = this.filterHouses.length;
      return searchResultsNum;
    },
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
/******** Montserrat font *****/
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap");
* {
  font-family: "Montserrat";
  font-size: 18px;
}

.container-houses {
  margin-top: 5px;
}

.noresults-msg {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 12%;
}
.noresults-msg p:first-of-type {
  margin-top: 30px;
}
.noresults-msg p {
  font-size: 18px;
}
.noresults-msg img {
  width: 450px;
}
.hide {
  display: none;
}
</style>
