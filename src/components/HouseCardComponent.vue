<template>
  <li>
    <div class="house-item">
      <router-link
        :to="'/house/view/' + house.id"
        @click="this.getHouseById(house.id)"
      >
        <div class="house-box">
          <div class="house-item-img">
            <img :src="house.image" alt="house image" />
          </div>

          <div class="house-item-detail">
            <p class="house-item-detail-title">
              {{ house.location.street.replace("-", "") }}
            </p>
            <p class="house-item-detail-price">
              <img
                :src="require('../assets/images/ic_price.png')"
                alt="price"
              />
              {{ this.formatNumber(house.price) }}
            </p>
            <p class="house-item-detail-address">
              {{ house.location.zip }} {{ house.location.city }}
            </p>
            <p class="house-item-detail-icons">
              <span class="bed"
                ><img :src="require('../assets/images/ic_bed.png')" alt="bed" />
                {{ house.rooms.bedrooms }}</span
              >
              <span class="bath">
                <img
                  :src="require('../assets/images/ic_bath.png')"
                  alt="bath"
                />{{ house.rooms.bathrooms }}</span
              >
              <span class="size">
                <img
                  :src="require('../assets/images/ic_size.png')"
                  alt="size"
                />{{ house.size + " m2" }}</span
              >
            </p>
          </div>
        </div>
      </router-link>
      <div class="house-item-edit" v-if="house.madeByMe">
        <span class="item-edit"
          ><router-link :to="`/house/edit/${house.id}`"
            ><img
              :src="require('../assets/images/ic_edit.png')"
              @click="this.getHouseById(house.id)"
              alt="edit" /></router-link
        ></span>
        <span class="item-delete"
          ><img
            :src="require('../assets/images/ic_delete.png')"
            alt="delete"
            @click="this.toggleModal"
        /></span>
      </div>
    </div>
    <!-----   Modal  ----->
    <div v-if="showModal" class="modal" :class="{ 'show-modal': showModal }">
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
            @click="this.delete(house.id)"
          >
            Yes, delete
          </button>
          <button type="button" class="cancel-btn" @click="this.toggleModal">
            Go back
          </button>
        </div>
      </div>
    </div>
  </li>
</template>
<script>
import { mapActions } from "vuex";
import { formatNumber } from "@/helpers";
export default {
  props: ["house"],
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    formatNumber,
    toggleModal() {
      this.showModal = !this.showModal;
    },
    ...mapActions(["getHouseById", "delete"]),
  },
};
</script>

<style scoped>
.house-item {
  position: relative;
  width: 100%;
  height: 210px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  border-radius: 10px;
}

.house-item a {
  flex-grow: 1;
}

.house-box {
  display: flex;
}
ul li {
  list-style-type: none;
  margin-top: 20px;
}
/***  Removed default blue color ***/
a {
  color: inherit;
  text-decoration: none;
}
.house-item-img {
  position: relative;
  width: 190px;
  height: 190px;
}
.house-item-img img {
  position: absolute;
  width: 90%;
  height: 90%;
  top: 55%;
  left: 55%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
}
.house-item-detail {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding-top: 14px;
  padding-left: 15px;
  padding-bottom: 12px;
}
.house-item-detail-title {
  font-weight: bold;
}
.house-item-detail-price {
  display: flex;
  font-weight: 500;
}
.house-item-detail-price img {
  width: 20px;
  margin-right: 5px;
}

.house-item-detail-address {
  color: #c3c3c3;
  font-weight: 100;
}
.house-item-detail-icons {
  display: flex;
  align-items: center;
}

.house-item-detail-icons span {
  display: flex;
  align-items: center;
}
.house-item-detail-icons img {
  width: 20px;
  margin-right: 10px;
}
.house-item-detail-icons span:not(:first-child) {
  margin-left: 10px;
  margin-right: 10px;
}
.size {
  display: contents !important;
}

/********  Edit and Delete icons styles *********/
.house-item-edit {
  position: absolute;
  right: 0;
  margin-top: 25px;
  margin-right: 25px;
  height: 30px;
}
.item-delete {
  margin-left: 17px;
}
.item-edit img,
.item-delete img {
  width: 23px;
  cursor: pointer;
  z-index: 5;
}

/**************  Modal ************* */
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
  .house-item {
    height: 180px;
  }
  .house-item-img {
    width: 170px;
    height: 170px;
  }
  .house-item-img img {
    top: 53%;
    left: 53%;
  }
  .item-edit img,
  .item-delete img {
    width: 21px;
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

@media (max-width: 730px) {
  .house-item {
    height: 160px;
  }
  .house-item-img {
    height: 150px;
    width: 150px;
  }
  .house-item-detail-icons img {
    height: 15px;
    width: 15px;
  }
  .house-item-detail-icons span {
    font-size: 15px;
  }
  .item-edit img,
  .item-delete img {
    width: 17px;
    height: 19px;
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

@media (max-width: 633px) {
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

@media (max-width: 530px) {
  .house-item {
    border-radius: 7px;
    height: 130px;
  }
  .house-item-img {
    height: 120px;
    width: 120px;
  }

  .house-item-detail-title,
  .house-item-detail-price,
  .house-item-detail-address,
  .house-item-detail-icons span {
    font-size: 12px;
  }
  .house-item-edit {
    margin-top: 15px;
    margin-right: 15px;
  }
  .item-edit img,
  .item-delete img {
    width: 15px;
    height: 17px;
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
  .house-item {
    height: 100px;
  }
  ul li {
    margin-top: 15px;
  }
  .house-item-img {
    height: 90px;
    width: 90px;
  }
  .house-item-edit {
    margin-top: 10px;
    margin-right: 10px;
  }
  .item-delete {
    margin-left: 10px;
  }
  .house-item-detail {
    padding-top: 7px;
    padding-left: 5px;
    padding-bottom: 0px;
  }
  .house-item-detail-price img {
    width: 15px;
  }
  .house-item-detail-icons img {
    margin-right: 5px;
  }
  .modal-text {
    width: 100%;
  }
}
</style>
