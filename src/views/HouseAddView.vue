<template>
  <div class="container-create">
    <div class="container-create-body">
      <div class="back-icon">
        <span>
          <router-link to="/">
            <img
              :src="
                require('../assets/images/ic_back_grey.png')
              " /></router-link
          >Back to overwiev</span
        >
      </div>
      <div class="header-create">
        <h1>Create new listing</h1>
      </div>
      <FormComponent />
    </div>
  </div>
</template>

<script>
import FormComponent from "@/components/FormComponent.vue";
export default { components: { FormComponent } };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  font-family: "Montserrat";
}
/***** For background image */
html,
body {
  margin: 0;
  height: 100%;
  overflow: scroll;
}

/************ end ************/
.container-create {
  background-image: url("../assets/images/img_background.png");
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  padding-top: 40px;
}

.container-create .background-image {
  position: absolute;
  width: 100vw;
  height: 100%;
  z-index: -1;
  background-size: cover;
}
.container-create-body {
  width: 70%;
  margin: 0 auto;
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
</style>
