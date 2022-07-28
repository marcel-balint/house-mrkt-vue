<template>
  <div class="container">
    <div class="conatiner-house-view">
      <main class="house-detail">
        <div class="back-icon">
          <span>
            <router-link to="/">
              <img
                :src="require('../assets/images/ic_back_grey.png')"
                alt="back" /></router-link
            >Back to overwiev</span
          >
        </div>
        <div class="house-detail-body">
          <div class="house-detail-image">
            <div class="image-box">
              <img :src="getHouse.image" alt="houseImage" />
            </div>
          </div>

          <div class="house-detail-description">
            <div class="house-title">
              <h1 class="house-title">
                {{ getHouse.location.street.replace("-", "") }}
              </h1>

              <div class="house-detail-change" v-if="getHouse.madeByMe">
                <span class="edit"
                  ><router-link :to="`/house/edit/${getHouse.id}`"
                    ><img
                      :src="require('../assets/images/ic_edit.png')"
                      @click="this.getHouseById(getHouse.id)"
                      alt="edit" /></router-link
                ></span>
                <span class="delete cursor-pointer" @click="this.toggleModal"
                  ><img
                    :src="require('../assets/images/ic_delete.png')"
                    alt="delete"
                /></span>
              </div>
            </div>
            <p class="location">
              <img
                :src="require('../assets/images/ic_location.png')"
                alt="location"
              />
              {{ getHouse.location.city }}
            </p>
            <p class="middle-row">
              <span class="price"
                ><img
                  :src="require('../assets/images/ic_price.png')"
                  alt="price"
                />{{ this.formatNumber(getHouse.price) }}</span
              >
              <span class="size"
                ><img
                  :src="require('../assets/images/ic_size.png')"
                  alt="size"
                />{{ getHouse.size + " m2" }}</span
              >
              <span class="year"
                ><img
                  :src="require('../assets/images/ic_construction_date.png')"
                  alt="year"
                />{{ getHouse.constructionYear }}</span
              >
            </p>

            <p class="bottom-row">
              <span class="bed"
                ><img
                  :src="require('../assets/images/ic_bed.png')"
                  alt="bed"
                />{{ getHouse.rooms.bedrooms }}</span
              >
              <span class="bath"
                ><img
                  :src="require('../assets/images/ic_bath.png')"
                  alt="bath"
                />{{ getHouse.rooms.bathrooms }}</span
              >
              <span class="garage"
                ><img
                  :src="require('../assets/images/ic_garage.png')"
                  alt="garage"
                />{{ getHouse.hasGarage ? "Yes" : "No" }}</span
              >
            </p>

            <div class="house-description-text">
              {{ getHouse.description }}
            </div>
          </div>
        </div>
        <!-----   Modal  ----->
        <div
          v-if="showModal"
          class="modal"
          :class="{ 'show-modal': showModal }"
        >
          <div class="modal-content">
            <div class="modal-text">
              <h1>Delete Listing</h1>
              <p class="para">Are you sure you want to delete this listing?</p>
              <p>This action cannot be undone.</p>
            </div>
            <div class="modal-btns">
              <button
                type="button"
                class="delete-btn"
                @click="this.deleteHouse(getHouse.id)"
              >
                Yes, delete
              </button>
              <button
                type="button"
                class="cancel-btn"
                @click="this.toggleModal"
              >
                Go back
              </button>
            </div>
          </div>
        </div>
      </main>
      <aside class="aside">
        <h2 class="recomandations-title">Recommended for you</h2>
        <ul>
          <RecommendedHousesComponent :house="recommendations" />
        </ul>
      </aside>
    </div>
  </div>
</template>

<script>
import RecommendedHousesComponent from "@/components/RecommendedHousesComponent.vue";

import { mapGetters, mapActions } from "vuex";
import { formatNumber } from "@/helpers";
export default {
  data() {
    return {
      showModal: false,
    };
  },
  props: ["houseId"],

  methods: {
    formatNumber,
    deleteHouse(id) {
      this.$store.commit("delete", id);
    },
    toggleModal() {
      this.showModal = !this.showModal;
    },
    ...mapActions(["getHouseById"]),
  },
  computed: {
    ...mapGetters({
      getHouse: "getHouse",
      recommendations: "getRecommendations",
    }),
  },
  created() {
    this.$store.dispatch("setRecommendations");
  },
  components: { RecommendedHousesComponent },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/******  Open Sans font *****/
@import url("https://fonts.googleapis.com/css2?family=Open+Sans&display=swap");
.container {
  background-color: #f6f6f6;
  height: 100%;
  padding-bottom: 40px;
}
.conatiner-house-view {
  width: 70%;
  margin-top: 0px;
  margin-right: auto;
  margin-left: auto;
  display: flex;
  flex-direction: row;
  gap: 60px;
}

.house-detail {
  margin-top: 50px;
  flex: 2;
}
.back-icon {
  display: flex;
}
.back-icon span {
  display: flex;
  flex-direction: row;
  font-size: 16px;
  font-weight: 600;
}
.back-icon img {
  width: 20px;
  margin-right: 10px;
}

.header-create {
  padding-top: 30px;
}

/************ Main page styles ********/

.image-box {
  max-width: 800px;
}
.house-detail-description {
  background-color: #fff;
  max-width: 800px;
  padding: 30px;
}
.house-detail-description p {
  margin-top: 15px;
}
.house-detail-body {
  margin-top: 30px;
}

.house-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.house-detail-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.house-detail-change {
  display: flex;
  gap: 30px;
}

.price,
.size,
.year,
.bath,
.bed,
.garage {
  display: inline;
}

.middle-row > *,
.bottom-row > * {
  margin-right: 20px;
}
.house-description-text {
  font-family: "Open Sans", sans-serif;
  padding-top: 30px;
  padding-bottom: 10px;
  font-size: 18px;
  font-weight: 100;
  letter-spacing: 1px;
}

.delete {
  cursor: pointer;
}
/*****************Icon styles************/

.delete img,
.edit img {
  width: 23px;
}

.location img,
.year img,
.size img,
.price img,
.bath img,
.bed img,
.garage img {
  width: 15px;
  margin-right: 10px;
}

.location {
  display: flex;
}
/*************** Aside styles  *********/
.aside {
  margin-top: 50px;

  flex: 1;
}
.recomandations-title {
  margin-top: 48px;
}

/********  Modal ******************** */
.modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  visibility: hidden;
  z-index: 1;
  animation-name: animation;
  animation-duration: 0.3s;
}
.modal-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  width: 700px;
  height: 400px;
  border-radius: 15px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
}

@keyframes animation {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.show-modal {
  opacity: 1;
  visibility: visible;
}
.modal-text {
  text-align: center;
}
.para {
  margin-top: 30px;
}
.modal-btns {
  display: flex;
  flex-direction: column;
}
.cancel-btn {
  margin-top: 20px;
  background-color: #000;
}
.delete-btn {
  background-color: #eb5440;
}
.cancel-btn,
.delete-btn {
  border: none;
  width: 400px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  text-decoration: none;
  text-transform: uppercase;
  font-size: 18px;
  font-weight: 600;
  border-radius: 10px;
  cursor: pointer;
}
</style>
