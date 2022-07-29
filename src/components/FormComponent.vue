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
        v-model="newHouse.streetName"
        placeholder="Enter the street name"
        @input="showErrorMsg.streetName = newHouse.streetName == ''"
        :class="showErrorMsg.streetName ? 'error-active' : ''"
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
          v-model.number="newHouse.houseNumber"
          placeholder="Enter house number"
          @input="showErrorMsg.houseNumber = newHouse.houseNumber == ''"
          :class="showErrorMsg.houseNumber ? 'error-active' : ''"
        />
        <p class="error-message" v-if="showErrorMsg.houseNumber">
          Required field missing.
        </p>
      </div>
      <div class="addition-label">
        <label for="add">Addition (optional)</label><br />
        <input
          type="text"
          v-model="newHouse.numberAddition"
          placeholder="Eg. A"
        />
      </div>
    </div>
    <br />
    <div class="post-code">
      <label for="post-code">Post code*</label><br />
      <input
        type="text"
        v-model="newHouse.zip"
        placeholder="Eg. 1000 AA"
        @input="showErrorMsg.zip = newHouse.zip == ''"
        :class="showErrorMsg.zip ? 'error-active' : ''"
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
        v-model="newHouse.city"
        placeholder="Eg. Utrecht"
        @input="showErrorMsg.city = newHouse.city == ''"
        :class="showErrorMsg.city ? 'error-active' : ''"
      />
      <p class="error-message" v-if="showErrorMsg.city">
        Required field missing.
      </p>
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
          :class="[
            imageURL ? 'upload-image-square-active' : 'upload-image-square',
            imageURL == null ? 'upload-image--error' : '',
          ]"
        >
          <img
            class="uploaded-image"
            v-if="imageURL"
            :src="imageURL"
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
      <p class="error-message mt-0" v-if="imageURL == null">
        Required field missing.
      </p>
    </div>

    <div class="price">
      <label for="price">Price*</label><br />
      <input
        type="text"
        v-model.number="newHouse.price"
        placeholder="eg. €150.000"
        @input="showErrorMsg.price = newHouse.price == ''"
        :class="showErrorMsg.price ? 'error-active' : ''"
      />
      <p class="error-message" v-if="showErrorMsg.price">
        Required field missing.
      </p>
    </div>
    <div class="size-garage-row">
      <div class="size">
        <label for="size">Size*</label><br />
        <input
          type="text"
          v-model.number="newHouse.size"
          placeholder="eg. 60m2"
          @input="showErrorMsg.size = newHouse.size == ''"
          :class="showErrorMsg.size ? 'error-active' : ''"
        />
        <p class="error-message" v-if="showErrorMsg.size">
          Required field missing.
        </p>
      </div>
      <div class="garage">
        <span>Garage*</span>
        <div class="arrows-select">
          <label>
            <select
              name="garage"
              v-model="newHouse.hasGarage"
              class="garage-select"
              @input="showErrorMsg.hasGarage = newHouse.hasGarage == ''"
              :class="showErrorMsg.hasGarage ? 'error-active' : ''"
            >
              <option value="" selected disabled hidden>Select</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </label>
          <p class="error-message" v-if="showErrorMsg.hasGarage">
            Required field missing.
          </p>
        </div>
      </div>
    </div>
    <div class="bedrooms-bathrooms-row">
      <div class="bedrooms">
        <label for="bedrooms">Bedrooms*</label><br />
        <input
          type="text"
          v-model.number="newHouse.bedrooms"
          placeholder="Enter amount"
          @input="showErrorMsg.bedrooms = newHouse.bedrooms == ''"
          :class="showErrorMsg.bedrooms ? 'error-active' : ''"
        />
        <p class="error-message" v-if="showErrorMsg.bedrooms">
          Required field missing.
        </p>
      </div>
      <div class="bathrooms">
        <label for="bathrooms">Bathrooms*</label><br />
        <input
          type="text"
          v-model.number="newHouse.bathrooms"
          placeholder="Enter amount"
          @input="showErrorMsg.bathrooms = newHouse.bathrooms == ''"
          :class="showErrorMsg.bathrooms ? 'error-active' : ''"
        />
        <p class="error-message" v-if="showErrorMsg.bathrooms">
          Required field missing.
        </p>
      </div>
    </div>
    <div class="construction-date">
      <label for="construction">Construction date*</label><br />
      <input
        type="text"
        v-model.number="newHouse.constructionYear"
        placeholder="eg. 1990"
        @input="showErrorMsg.constructionYear = newHouse.constructionYear == ''"
        :class="showErrorMsg.constructionYear ? 'error-active' : ''"
      />
      <p class="error-message" v-if="showErrorMsg.constructionYear">
        Required field missing.
      </p>
    </div>
    <div class="description">
      <p><label for="description">Description*</label></p>
      <textarea
        v-model="newHouse.description"
        rows="4"
        cols="44"
        placeholder="Enter description"
        @input="showErrorMsg.description = newHouse.description == ''"
        :class="showErrorMsg.description ? 'error-active' : ''"
      ></textarea>
      <p class="error-message" v-if="showErrorMsg.description">
        Required field missing.
      </p>
    </div>

    <div class="post">
      <button :class="['button', isDisabled() ? 'button--disabled' : '']">
        <span class="button__text">Post</span>
      </button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      newHouse: {
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
      imageURL: "",
      houseId: "",
      selectedFile: null,
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
      formValid: false,
    };
  },
  methods: {
    showErrors: function () {
      let { image, numberAddition, ...allFields } = this.newHouse;
      Object.entries(allFields).map(([key, value]) => {
        this.showErrorMsg[key] = value == "" || value == null;
      });
      if (this.selectedFile == null) this.imageURL = null;
    },
    isDisabled: function () {
      let { image, numberAddition, ...allFields } = this.newHouse;
      return (
        Object.entries(allFields).some(([key, value]) => value == "") ||
        this.selectedFile == null
      );
    },
    submitHouse: function () {
      if (this.isDisabled()) {
        this.showErrors();
        return;
      }
      document.querySelector(".button").classList.add("button--loading");
      this.newHouse["numberAddition"] =
        this.newHouse["numberAddition"] != ""
          ? `-${this.newHouse["numberAddition"]}`
          : this.newHouse["numberAddition"];
      this.$store
        .dispatch("newHouse", this.newHouse)
        .then((response) => {
          console.log("data sent", response.data);
          if (response.data) {
            this.houseId = response.data.id;
            console.log("House ID", this.houseId);
            //Sending the image
            this.onUpload();
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
    onfile(event) {
      this.selectedFile = event.target.files[0];
      if (!this.selectedFile) return;
      this.imageURL = URL.createObjectURL(this.selectedFile);
    },
    async onUpload() {
      let myHeaders = new Headers();
      myHeaders.append("X-Api-Key", "GJXtOHyT8QP352l6BZgxY41dmMojFW_N");
      var formdata = new FormData();
      formdata.append("image", this.selectedFile);
      console.log('Same as "response" selectedFile', this.selectedFile);
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };

      await fetch(
        "https://api.intern.d-tt.nl/api/houses/" + this.houseId + "/upload",
        requestOptions
      )
        .then((response) => {
          console.log("response", response);
        })
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
      //Get data with the new house
      this.$store.dispatch("getHouses");
      setTimeout(() => {
        this.dispalyCreatedHouse(this.houseId);
        this.$router.push(`/house/view/${this.houseId}`);
        document.querySelector(".button").classList.remove("button--loading");
      }, 500);
    },
    dispalyCreatedHouse(id) {
      this.$store.commit("setHouse", id);
    },
    clearImage() {
      this.imageURL = null;
      this.imagePresent = false;
      this.selectedFile = null;

      //clear the previous value
      document.getElementById("uploadImage").value = "";
    },
  },
};
</script>

<style>
/****************************************************************************************************** */

.button {
  position: relative;
  padding: 8px 16px;
  background: #009579;
  border: none;
  outline: none;
  border-radius: 2px;
  cursor: pointer;
}

.button--disabled {
  cursor: not-allowed !important;
  opacity: 0.5 !important;
}

.button__text {
  color: #ffffff;
  transition: all 0.2s;
}

.button--loading .button__text {
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

/***************************************************************************************** */
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
.upload-image--error {
  border-color: #eb5440 !important;
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
  outline: none;
}
.price label {
  padding-top: 20px;
}
.price input {
  margin-top: -10px;
  height: 50px;
  padding: 15px;
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

.error-message {
  font-family: "Montserrat", sans-serif;
  font-style: italic;
  color: #eb5440;
  font-size: 14px;
  margin-top: 10px;
}

.error-active {
  border: 1px solid #eb5440 !important;
}

/************* Button animation ****************** */
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
</style>
