<template>
  <form class="form-create" enctype="multipart/form-data">
    <div class="street-name">
      <label for="street">Street name*</label><br />
      <input
        type="text"
        v-model="house.location.street_name"
        placeholder="Enter the street name"
      />
    </div>
    <div class="house-number-row">
      <div class="house-number-label">
        <label for="house-number">House number*</label><br />
        <input
          type="text"
          v-model="house.location.house_number"
          placeholder="Enter house number"
        />
      </div>
      <div class="addition-label">
        <label for="add">Addition (optional)</label><br />
        <input type="text" v-model="house.location.numberAddition" placeholder="Eg. A" />
      </div>
    </div>
    <br />
    <div class="post-code">
      <label for="post-code">Post code*</label><br />
      <input
        type="text"
        v-model="house.location.zip"
        placeholder="Eg. 1000 AA"
      />
    </div>
    <br />
    <div class="city">
      <label for="city">City*</label><br />
      <input
        type="text"
        v-model="house.location.city"
        v
        placeholder="Eg. Utrecht"
      />
    </div>
    <div class="upload-image-box">
      <p>Upload picture (PNG or JPG)*</p>

      <span
        class="clear-img"
        :class="imageURL ? 'clear-img-active' : 'clear-img'"
      >
        <img
          @click="clearImage"
          :src="require('../assets/images/ic_clear_white.png')"
      /></span>
      <label
        for="uploadImage"
        class="label-upload"
        :class="imageURL ? 'label-upload-active' : 'label-upload'"
      >
        <span
          class="upload-image-square"
          :class="
            imageURL ? 'upload-image-square-active' : 'upload-image-square'
          "
        >
          <img
            class="uploaded-image"
            v-if="imageURL"
            :src="house.image"
            :alt="newHouse.altImage"
          />
          <img
            class="plus-icon"
            v-if="!imageURL"
            :src="require('../assets/images/ic_upload.png')"
          />
          <input
            type="file"
            id="uploadImage"
            @change="onfile"
            accept=".jpg,.png"
          />
          <br />
        </span>
      </label>
    </div>

    <div class="price">
      <label for="price">Price*</label><br />
      <input type="text" v-model="house.price" placeholder="eg. €150.000" />
    </div>
    <div class="size-garage-row">
      <div class="size">
        <label for="size">Size*</label><br />
        <input type="text" v-model="house.size" placeholder="eg. 60m2" />
      </div>
      <div class="garage">
        <span>Garage*</span>
        <div class="arrows-select">
          <label>
            <select
              name="garage"
              v-model="house.hasGarage"
              class="garage-select"
            >
              <option value="" selected disabled hidden>Select</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </label>
        </div>
      </div>
    </div>
    <div class="bedrooms-bathrooms-row">
      <div class="bedrooms">
        <label for="bedrooms">Bedrooms*</label><br />
        <input
          type="text"
          v-model="house.rooms.bedrooms"
          placeholder="Enter amount"
        />
      </div>
      <div class="bathrooms">
        <label for="bathrooms">Bathrooms*</label><br />
        <input
          type="text"
          v-model="house.rooms.bathrooms"
          placeholder="Enter amount"
        />
      </div>
    </div>
    <div class="construction-date">
      <label for="construction">Construction date*</label><br />
      <input
        type="text"
        v-model="house.constructionYear"
        placeholder="eg. 1990"
      />
    </div>
    <div class="description">
      <p><label for="description">Description*</label></p>
      <textarea
        rows="4"
        cols="44"
        v-model="house.description"
        placeholder="Enter description"
      ></textarea>
    </div>
    <div class="post">
      <button>Post</button>
    </div>
  </form>
  <pre>{{ this.house.location.street }}</pre>
  <pre>house id12{{ houseId }} {{ this.house }}</pre>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      houseId: this.$route.params.houseId,
    };
  },
  methods: {
    placeNumber(str) {
      var regex = /\d+/g;

      var matches = str.match(regex); // creates array from matches
      return matches;
    },
  },
  computed: {
    ...mapGetters({ house: "getHouse" }),
  },
  created() {
    this.$store.dispatch("getHouseById", this.houseId);
  },
};
</script>

<style>
* {
  font-family: "Montserrat";
}
.form-create {
  max-width: 370px;

  padding-top: 40px;
  padding-bottom: 40px;
}

form input {
  font-size: 14px;
}
::placeholder {
  color: #c3c3c3;
}
.street-name,
.house-number-row,
.house-number-label,
.addition-label,
.post-code,
.city,
.upload-image-box,
.price,
.size-garage-row,
.size,
.garage,
.bedrooms-bathrooms-row,
.bedrooms,
.bathrooms,
.construction-date {
  display: flex;
}
.street-name,
.addition-label,
.house-number-label,
.addition-label,
.post-code,
.city,
.upload-image-box,
.price,
.size,
.garage,
.bedrooms,
.bathrooms,
.construction-date {
  flex-direction: column;
}

.house-number-row,
.size-garage-row,
.bedrooms-bathrooms-row {
  flex-direction: row;
  justify-content: space-between;
  padding-top: 16px;
}
.upload-image-square {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed #c3c3c3;
  width: 120px;
  height: 120px;
  cursor: pointer;
}
.upload-image-square-active {
  border: none;
  width: 150px;
  height: 155px;
}

.uploaded-image {
  display: block;
  max-width: 150px;
  max-height: 155px;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}

.label-upload {
  position: relative;
  width: 120px;
  height: 120px;
}
.label-upload-active {
  width: 150px;
  height: 155px;
}
.plus-icon {
  width: 30px;
}
.upload-image-square input {
  display: none;
}

.upload-image-box p {
  padding-top: 15px;
  padding-bottom: 15px;
}

.upload-image-box {
  position: relative;
}
.clear-img {
  position: absolute;
  left: 100px;
  top: 35px;
  z-index: 1;
}
.clear-img-active {
  left: 130px;
}
.clear-img img {
  width: 35px;
  cursor: pointer;
}

.street-name input,
.house-number-label input,
.addition-label input,
.post-code input,
.city input,
.bedrooms input,
.bathrooms input,
.size input,
.garage select,
.construction-date input {
  margin-top: -10px;
  height: 50px;
  padding: 15px;
  border: none;
  outline: none;
  border-radius: 10px;
  font-size: 14px;
}
.construction-date {
  padding-top: 16px;
}

.description {
  padding-top: 16px;
}
.description p {
  padding-bottom: 5px;
}
.description textarea {
  border-radius: 10px;
  padding: 15px;
  border: none;
  outline: none;
}
.price label {
  padding-top: 20px;
}
.price input {
  margin-top: -10px;
  height: 50px;
  padding: 15px;
  border: none;
  outline: none;
  border-radius: 10px;
  font-size: 14px;
}

.house-number-label input,
.addition-label input,
.bedrooms input,
.bathrooms input,
.size input,
.garage select {
  width: 178px;
}
/*************** <select> styles ******************* */
.arrows-select {
  position: relative;
  float: left;
  min-width: 178px;
  margin: 5px -2%;
}

select::-ms-expand {
  display: none;
}

.arrows-select:after {
  content: "<>";
  font: 17px "Open sans", monospace;
  color: #c3c3c3;
  -webkit-transform: rotate(90deg);
  -moz-transform: rotate(90deg);
  -ms-transform: rotate(90deg);
  transform: rotate(90deg);
  right: 10px;
  top: 18px;
  padding: 0 0 2px;
  position: absolute;
  pointer-events: none;
}

.arrows-select select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  display: block;
  width: 100%;
  max-width: 178px;
  height: 50px;
  float: right;
  margin: 5px 2px;
  padding: 1px -1px;
  font-size: 14px;
  color: #c3c3c3;
  background-color: #ffffff;
  background-image: none;
  border: none;
  outline: none;
  -ms-word-break: normal;
  word-break: normal;
}

/******************** end <select> styles *************************/

.post {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding-top: 30px;
}

.post button {
  width: 55%;
  height: 45px;
  border: none;
  background-color: #eb5440;
  color: #fff;
  text-transform: uppercase;
  font-size: 18px;
  font-weight: 600;
  border-radius: 10px;
  cursor: pointer;
  opacity: 0.5;
}

.bg-img-height {
  height: 102px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 19px;
}
</style>
