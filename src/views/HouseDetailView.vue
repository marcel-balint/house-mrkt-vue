<template>
  <div class="container">
    <div class="conatiner-house-view">
      <main class="house-detail">
        <div class="back-icon">
          <div class="link">
            <router-link to="/">
              <img
                :src="
                  windowWidth > 630
                    ? require('@/assets/images/' + icons[0])
                    : require('@/assets/images/' + icons[1])
                "
                alt="back" /></router-link
            >{{ windowWidth > 630 ? "Back to overview " : "" }}
          </div>
        </div>
        <div
          class="mobile-icons-top"
          v-if="getHouse.madeByMe && windowWidth < 630"
        >
          <span class="edit-mobile"
            ><router-link :to="`/house/edit/${getHouse.id}`"
              ><img
                src="../assets/images/ic_edit_white.png"
                @click="this.getHouseById(getHouse.id)"
                alt="edit" /></router-link
          ></span>
          <span class="delete-mobile" @click="this.toggleModal"
            ><img src="../assets/images/ic_delete_white.png" alt="delete"
          /></span>
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

              <div
                class="house-detail-change"
                v-if="getHouse.madeByMe && windowWidth > 630"
              >
                <span class="edit"
                  ><router-link :to="`/house/edit/${getHouse.id}`"
                    ><img
                      src="../assets/images/ic_edit.png"
                      @click="this.getHouseById(getHouse.id)"
                      alt="edit" /></router-link
                ></span>
                <span class="delete" @click="this.toggleModal"
                  ><img src="../assets/images/ic_delete.png" alt="delete"
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
                @click="this.delete(getHouse.id)"
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
      icons: [
        "ic_back_grey.png",
        "ic_back_white.png",
        "ic_edit.png",
        "ic_edit_white.png",
        "ic_delete.png",
        "ic_delete_white.png",
      ],
      windowWidth: window.innerWidth,
    };
  },
  // props: ["houseId"],

  methods: {
    formatNumber,
    toggleModal() {
      this.showModal = !this.showModal;
    },

    onResize() {
      this.windowWidth = window.innerWidth;
    },

    ...mapActions(["getHouseById", "delete"]),
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
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
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
.back-icon .link {
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
  font-size: 23px;
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

/********  Modal ************ */
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

/*---    Media Queries   ---*/

@media (max-width: 1300px) {
  .conatiner-house-view {
    gap: 40px;
  }
}
@media (max-width: 1250px) {
  .conatiner-house-view {
    width: 80%;
  }
}
@media (max-width: 1100px) {
  .conatiner-house-view {
    gap: 20px;
  }
  .aside {
    width: 365px;
  }
  .recomandations-title,
  .house-title {
    font-size: 23px;
  }
  .recomandations-title {
    margin-left: 30px;
  }
}

@media (max-width: 1000px) {
  .aside {
    width: 325px;
  }
}

@media (max-width: 900px) {
  .conatiner-house-view {
    flex-direction: column;
  }
  .house-title {
    font-size: 20px;
  }
  .house-description-text {
    font-size: 16px;
  }
  .aside {
    width: auto;
    margin-top: 0px;
  }
  .recomandations-title {
    margin-left: 0px;
    font-size: 20px;
    text-align: center;
  }
}

@media (max-width: 894px) {
  .modal-content {
    max-width: 75%;
    max-height: 370px;
  }
  .modal-content h1 {
    font-size: 25px;
  }
  .para {
    font-size: 18px;
  }
  .modal-btns,
  .delete-btn,
  .cancel-btn {
    width: 330px;
    font-size: 16px;
  }
}

@media (max-width: 680px) {
  .modal-content {
    max-height: 370px;
  }
  .modal-content p {
    font-size: 16px;
  }
  .modal-text {
    width: 75%;
  }
  .modal-content h1 {
    font-size: 21px;
  }
  .para {
    font-size: 18px;
  }
  .modal-btns,
  .delete-btn,
  .cancel-btn {
    width: 290px;
  }
}

@media (max-width: 630px) {
  .container {
    margin-bottom: 100px;
  }
  .conatiner-house-view {
    width: 100%;
    align-items: center;
  }
  .house-detail {
    margin-top: 0px;
  }
  .house-detail-body {
    margin-top: 0px;
  }
  .aside {
    width: 80%;
  }
  .recomandations-title {
    text-align: left;
  }
  .back-icon img {
    position: absolute;
    top: 60px;
    left: 30px;
    z-index: 1;
  }
  .mobile-icons-top {
    position: absolute;
    z-index: 1;
    right: 30px;
    top: 60px;
    display: flex;
    gap: 30px;
  }
  .edit-mobile img {
    width: 23px;
  }
  .delete-mobile img {
    width: 16px;
  }
  .house-detail-image {
    position: relative;
  }
  .house-detail-description {
    position: relative;
    margin-top: -30px;
    border-top-right-radius: 25px;
    border-top-left-radius: 25px;
  }
  .modal-content {
    height: 320px;
  }
  .modal-content h1 {
    font-size: 19px;
  }
  .modal-content p {
    font-size: 12px;
  }
  .modal-btns,
  .delete-btn,
  .cancel-btn {
    font-size: 12px;
    width: 230px;
  }
  .delete-btn,
  .cancel-btn {
    height: 45px;
  }
  .para {
    margin-top: 16px;
  }
}

@media (max-width: 540px) {
  .aside {
    width: 85%;
  }
  .mobile-icons-top,
  .back-icon img {
    top: 40px;
  }
}
@media (max-width: 540px) {
  .container {
    padding-bottom: 20px;
  }
  .aside {
    width: 90%;
  }
  .house-title {
    font-size: 18px;
  }
  .back-icon img {
    width: 19px;
  }
  .edit-mobile img {
    width: 20px;
  }
  .delete-mobile img {
    width: 14px;
  }
  .mobile-icons-top,
  .back-icon img {
    top: 30px;
  }
  .house-detail-description {
    padding: 20px;
  }
  .house-description-text,
  .house-detail-description p {
    font-size: 12px;
    align-items: center;
  }
  .house-description-text {
    padding-top: 17px;
  }
  .middle-row > * {
    margin-right: 15px;
  }
  .recomandations-title {
    margin-top: 5px;
    font-size: 14px;
  }
}

@media (max-width: 477px) {
  .modal-content {
    max-width: 90%;
    height: 270px;
  }
  .modal-text {
    width: 80%;
  }
  .modal-btns {
    align-items: center;
    width: 229px;
  }
  .cancel-btn,
  .delete-btn {
    height: 35px;
    width: 175px;
    border-radius: 7px;
  }
}
@media (max-width: 380px) {
  .house-detail-description p {
    margin-top: 10px;
  }
  .modal-text {
    width: 100%;
  }
}
</style>
