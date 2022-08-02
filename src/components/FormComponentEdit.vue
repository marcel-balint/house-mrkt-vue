<template>
  <form
    @submit.prevent="submitHouse"
    class="form-create"
    enctype="multipart/form-data"
  >
    <div class="street-name">
      <label for="street">Street name*</label><br />
      <input
        type="text"
        v-model="editHouse.streetName"
        @input="showErrorMsg.streetName = editHouse.streetName === ''"
        :class="showErrorMsg.streetName ? 'error-active' : ''"
        placeholder="Enter the street name"
      />
      <p class="error-message" v-if="showErrorMsg.streetName">
        Required field missing.
      </p>
    </div>
    <div class="house-number-row">
      <div class="house-number-label">
        <label for="house-number">House number*</label><br />
        <input
          type="text"
          v-model="editHouse.houseNumber"
          @input="
            showErrorMsg.houseNumber =
              editHouse.houseNumber === '' || isNaN(editHouse.houseNumber)
          "
          :class="showErrorMsg.houseNumber ? 'error-active' : ''"
          placeholder="Enter house number"
        />
        <p class="error-message" v-if="showErrorMsg.houseNumber">
          Required field missing (number).
        </p>
      </div>
      <div class="addition-label">
        <label for="add">Addition (optional)</label><br />
        <input
          type="text"
          v-model="editHouse.numberAddition"
          placeholder="Eg. A"
        />
      </div>
    </div>
    <br />
    <div class="post-code">
      <label for="post-code">Post code*</label><br />
      <input
        type="text"
        v-model="editHouse.zip"
        @input="showErrorMsg.zip = editHouse.zip === ''"
        :class="showErrorMsg.zip ? 'error-active' : ''"
        placeholder="Eg. 1000 AA"
      />
      <p class="error-message" v-if="showErrorMsg.zip">
        Required field missing.
      </p>
    </div>
    <br />
    <div class="city">
      <label for="city">City*</label><br />
      <input
        type="text"
        v-model="editHouse.city"
        @input="showErrorMsg.city = editHouse.city === ''"
        :class="showErrorMsg.city ? 'error-active' : ''"
        v
        placeholder="Eg. Utrecht"
      />
      <p class="error-message" v-if="showErrorMsg.city">
        Required field missing.
      </p>
    </div>
    <div class="upload-image-box">
      <p>Upload picture (PNG or JPG)*</p>

      <span
        class="clear-img"
        :class="imageURL || editHouse.image ? 'clear-img-active' : 'clear-img'"
      >
        <img
          @click="clearImage"
          :src="require('../assets/images/ic_clear_white.png')"
      /></span>
      <label
        for="uploadImage"
        class="label-upload"
        :class="
          imageURL || editHouse.image ? 'label-upload-active' : 'label-upload'
        "
      >
        <span
          class="upload-image-square"
          :class="[
            imageURL || editHouse.image
              ? 'upload-image-square-active'
              : 'upload-image-square',
            imageURL === null || editHouse.image == null
              ? 'upload-image--error'
              : '',
          ]"
        >
          <img
            class="uploaded-image"
            v-if="editHouse.image || imageURL"
            :src="imageURL ? imageURL : editHouse.image"
          />
          <img
            class="plus-icon"
            v-if="!imageURL && !editHouse.image"
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
      <p class="error-message mt-0" v-if="imageURL === null">
        Required field missing.
      </p>
    </div>

    <div class="price">
      <label for="price">Price*</label><br />
      <input
        type="text"
        @input="
          showErrorMsg.price = editHouse.price === '' || isNaN(editHouse.price)
        "
        :class="showErrorMsg.price ? 'error-active' : ''"
        v-model="editHouse.price"
        placeholder="eg. €150.000"
      />
      <p class="error-message" v-if="showErrorMsg.price">
        Required field missing (number).
      </p>
    </div>
    <div class="size-garage-row">
      <div class="size">
        <label for="size">Size*</label><br />
        <input
          type="text"
          @input="
            showErrorMsg.size = editHouse.size === '' || isNaN(editHouse.size)
          "
          :class="showErrorMsg.size ? 'error-active' : ''"
          v-model="editHouse.size"
          placeholder="eg. 60m2"
        />
        <p class="error-message" v-if="showErrorMsg.size">
          Required field missing (number).
        </p>
      </div>
      <div class="garage">
        <span>Garage*</span>
        <div class="arrows-select">
          <label>
            <select
              name="garage"
              @input="showErrorMsg.hasGarage = editHouse.hasGarage === ''"
              :class="showErrorMsg.hasGarage ? 'error-active' : ''"
              v-model="editHouse.hasGarage"
              class="garage-select"
            >
              <option value="" selected disabled hidden>Select</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </label>
        </div>
        <p class="error-message" v-if="showErrorMsg.hasGarage">
          Required field missing.
        </p>
      </div>
    </div>
    <div class="bedrooms-bathrooms-row">
      <div class="bedrooms">
        <label for="bedrooms">Bedrooms*</label><br />
        <input
          type="text"
          v-model="editHouse.bedrooms"
          @input="
            showErrorMsg.bedrooms =
              editHouse.bedrooms === '' || isNaN(editHouse.bedrooms)
          "
          :class="showErrorMsg.bedrooms ? 'error-active' : ''"
          placeholder="Enter amount"
        />
        <p class="error-message" v-if="showErrorMsg.bedrooms">
          Required field missing (number).
        </p>
      </div>
      <div class="bathrooms">
        <label for="bathrooms">Bathrooms*</label><br />
        <input
          type="text"
          v-model="editHouse.bathrooms"
          @input="
            showErrorMsg.bathrooms =
              editHouse.bathrooms === '' || isNaN(editHouse.bathrooms)
          "
          :class="showErrorMsg.bathrooms ? 'error-active' : ''"
          placeholder="Enter amount"
        />
        <p class="error-message" v-if="showErrorMsg.bathrooms">
          Required field missing (number).
        </p>
      </div>
    </div>
    <div class="construction-date">
      <label for="construction">Construction date*</label><br />
      <input
        type="text"
        v-model="editHouse.constructionYear"
        @input="
          showErrorMsg.constructionYear =
            editHouse.constructionYear === '' ||
            isNaN(editHouse.constructionYear) ||
            editHouse.constructionYear <= 1901
        "
        :class="showErrorMsg.constructionYear ? 'error-active' : ''"
        placeholder="eg. 1990"
      />
      <p class="error-message" v-if="showErrorMsg.constructionYear">
        Required field missing (number higer than<strong>1901</strong>).
      </p>
    </div>
    <div class="description">
      <p><label for="description">Description*</label></p>
      <textarea
        rows="4"
        cols="44"
        v-model="editHouse.description"
        @input="showErrorMsg.description = editHouse.description === ''"
        :class="showErrorMsg.description ? 'error-active' : ''"
        placeholder="Enter description"
      ></textarea>
      <p class="error-message" v-if="showErrorMsg.description">
        Required field missing.
      </p>
    </div>
    <div class="post">
      <button :class="['button', isDisabled() ? 'button--disabled' : '']">
        Post
      </button>
    </div>
  </form>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import { myHeaders } from "@/api";
import { getDataURL } from "@/api";
export default {
  data() {
    return {
      houseId: this.$route.params.houseId,
      imageURL: "",
      showErrorMsg: {
        streetName: false,
        houseNumber: false,
        zip: false,
        city: false,
        image: false,
        price: false,
        size: false,
        hasGarage: false,
        bedrooms: false,
        bathrooms: false,
        constructionYear: false,
        description: false,
      },
      editHouse: {
        streetName: "",
        houseNumber: "",
        numberAddition: "",
        zip: "",
        city: "",
        image: null,
        price: "",
        size: "",
        hasGarage: "",
        bedrooms: "",
        bathrooms: "",
        constructionYear: "",
        description: "",
      },
    };
  },
  methods: {
    ...mapActions(["getHouseById"]),
    dispalyCreatedHouse(id) {
      this.$store.commit("setHouse", id);
    },
    showErrors() {
      let { image, numberAddition, ...allFields } = this.editHouse;
      Object.entries(allFields).map(([key, value]) => {
        this.showErrorMsg[key] = value === "" || value === null;
      });
      if ((this.selectedFile === null && image === null) || image === "")
        this.imageURL = null;
    },
    isDisabled() {
      let { image, numberAddition, ...allFields } = this.editHouse;
      let is = Object.entries(allFields).some(
        ([key, value]) => value === "" || value === null
      );
      return is || this.imageURL === null;
    },
    submitHouse: function () {
      if (this.isDisabled()) {
        this.showErrors();
        return;
      }

      document.querySelector(".button").classList.add("button--loading");
      //Add '-' in front of 'numberAddition'
      this.editHouse["numberAddition"] =
        this.editHouse["numberAddition"] != ""
          ? `-${this.editHouse["numberAddition"]}`
          : this.editHouse["numberAddition"];
      this.editHouse["id"] = this.houseId;

      //Remove letter from input
      if (/[a-zA-Z]/.test(this.editHouse.size)) {
        this.editHouse["size"] = this.editHouse["size"]
          .toString()
          .toLowerCase()
          .split("m")[0];
      }
      this.$store
        .dispatch("updateHouse", this.editHouse)
        .then((response) => {
          console.log("data sent", response.data);
          //Sending the image
          this.onUpload();
        })
        .catch((error) => {
          console.log(error.message);
        });
    },

    async onUpload() {
      const formdata = new FormData();
      formdata.append("image", this.selectedFile);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };
      await fetch(getDataURL + "/" + this.houseId + "/upload", requestOptions)
        .then((response) => {
          console.log("response", response);
        })
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
      await this.$store.dispatch("getHouses");
      setTimeout(() => {
        this.dispalyCreatedHouse(this.houseId);
        this.$router.push(`/house/view/${this.houseId}`);
        document.querySelector(".button").classList.remove("button--loading");
      }, 500);
    },
    onfile(event) {
      this.selectedFile = event.target.files[0];
      if (!this.selectedFile) return;
      this.imageURL = URL.createObjectURL(this.selectedFile);
    },

    clearImage: function () {
      this.imageURL = null;
      this.editHouse.image = null;
      this.selectedFile = null;
      //clear the previous value
      document.getElementById("uploadImage").value = "";
    },
  },
  computed: {
    ...mapGetters({ house: "getHouse" }),
  },
  created() {
    this.$store.dispatch("getHouseById", this.houseId);
    this.editHouse = {
      streetName: this.house.location.street_name,
      houseNumber: this.house.location.house_number,
      numberAddition: this.house.location.numberAddition,
      zip: this.house.location.zip,
      city: this.house.location.city,
      image: this.house.image,
      price: this.house.price,
      size: this.house.size,
      hasGarage: this.house.hasGarage,
      bedrooms: this.house.rooms.bedrooms,
      bathrooms: this.house.rooms.bathrooms,
      constructionYear: this.house.constructionYear,
      description: this.house.description,
    };
  },
};
</script>

<style scoped>
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

.upload-image-box p:first-child {
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
}

.bg-img-height {
  height: 102px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 19px;
}

/**************** Button animation*************** */
.button {
  position: relative;
  padding: 8px 16px;
  background: #009579;
  border: none;
  outline: none;
  border-radius: 2px;
  cursor: pointer;
}

.button-text {
  color: #ffffff;
  transition: all 0.2s;
}

.button--loading .button-text {
  visibility: hidden;
  opacity: 0;
}

.button--loading::after {
  content: "";
  position: absolute;
  width: 16px;
  height: 16px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  border: 4px solid transparent;
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: button-loading-spinner 1s ease infinite;
}

@keyframes button-loading-spinner {
  from {
    transform: rotate(0turn);
  }

  to {
    transform: rotate(1turn);
  }
}

/*---    Media Queries   ---*/
@media (max-width: 630px) {
  .form-create {
    max-width: 400px;
    margin: 0 auto;
    padding-bottom: 100px !important;
  }
  .post button {
    width: 100% !important;
  }
  .error-message {
    font-size: 12px;
    margin-top: 2px;
  }
}

@media (max-width: 530px) {
  .upload-image-square {
    width: 130px;
    height: 135px;
  }
  .uploaded-image {
    max-width: 130px;
    max-height: 135px;
  }
  .clear-img-active {
    left: 110px;
  }
  .price label {
    padding-top: 0px;
  }
  .garage span {
    margin-bottom: -5px;
  }

  .street-name,
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
  .construction-date,
  .description {
    font-size: smaller;
  }
  .street-name input,
  .house-number-label input,
  .addition-label input,
  .post-code input,
  .city input,
  .price input,
  .bedrooms input,
  .bathrooms input,
  .size input,
  .garage select,
  .construction-date input {
    border-radius: 6px;
    font-size: 12px !important;
    height: 45px !important;
    padding: 8px !important;
  }
}

@media (max-width: 415px) {
  .house-number-label input,
  .addition-label input,
  .bedrooms input,
  .bathrooms input,
  .size input,
  .garage select {
    width: 165px !important;
  }
  .street-name,
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
  .construction-date,
  .description {
    font-size: 12px;
  }
  .garage span {
    margin-left: 12px;
  }
}
@media (max-width: 376px) {
  .house-number-label input,
  .addition-label input,
  .bedrooms input,
  .bathrooms input,
  .size input,
  .garage select {
    width: 155px !important;
  }
  .garage span {
    margin-left: 21px;
  }
}
@media (max-width: 360px) {
  .house-number-label input,
  .addition-label input,
  .bedrooms input,
  .bathrooms input,
  .size input,
  .garage select {
    width: 141px !important;
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
    padding: 4px !important;
  }
  .garage span {
    margin-left: 34px;
  }
}

@media (max-width: 355px) {
  .garage {
    margin-left: -31px;
  }
}
</style>
