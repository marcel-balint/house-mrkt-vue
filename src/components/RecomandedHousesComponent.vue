<template>
  <li v-for="item in house" :key="item.id">
    <router-link :to="`/house/view/${item.id}`" @click="this.setHouse(item.id)">
      <div class="house-item">
        <div class="house-box">
          <div class="house-item-img">
            <img :src="item.image" alt="image" />
          </div>

          <div class="house-item-detail">
            <p class="house-item-detail-title">{{ item.location.street }}</p>
            <p class="house-item-detail-price">
              <img
                :src="require('../assets/images/ic_price.png')"
                alt="price"
              />
              {{ item.price }}
            </p>
            <p class="house-item-detail-address">
              {{ item.location.zip }} {{ item.location.city }}
            </p>
            <p class="house-item-detail-icons">
              <span class="bed"
                ><img :src="require('../assets/images/ic_bed.png')" alt="bed" />
                {{ item.rooms.bedrooms }}</span
              >
              <span class="bath">
                <img :src="require('../assets/images/ic_bath.png')" />{{
                  item.rooms.bathrooms
                }}</span
              >
              <span class="size">
                <img :src="require('../assets/images/ic_size.png')" />{{
                  item.size
                }}</span
              >
            </p>
          </div>
        </div>
      </div>
    </router-link>
  </li>
</template>
<script>
import { mapActions } from "vuex";
export default {
  props: ["house"],
  methods: {
    ...mapActions(["setHouse"]),
  },
};
</script>

<style scoped>
.house-item {
  width: 100%;
  height: 140px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  border-radius: 5px;
  margin-top: 20px;
  margin-right: 50px;
  -webkit-box-shadow: 0px 0px 20px -1px #eee;
  -moz-box-shadow: 0px 0px 20px -1px #eee;
  box-shadow: 0px 0px 20px -1px #eee;
}
.house-box {
  display: flex;
}
ul li {
  list-style-type: none;
}
/***  Removed the default blue color ***/
a {
  color: inherit;
  text-decoration: none;
}
.house-item-img {
  position: relative;
  width: 125px;
  height: 125px;
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
  padding-top: 5px;
}

.house-item-detail-icons span {
  display: flex;
  align-items: center;
}
.house-item-detail-icons img {
  width: 17px;
  margin-right: 10px;
}
.house-item-detail-icons span:not(:first-child) {
  margin-left: 14px;
  margin-right: 14px;
}
.size {
  display: contents !important;
}
</style>
