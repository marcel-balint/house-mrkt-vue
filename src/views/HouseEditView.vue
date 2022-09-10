<template>
  <div class="container-create">
    <div class="container-create-body">
      <div class="back-icon">
        <div class="back-link">
          <router-link :to="`/house/view/${house.id}`">
            <img
              :src="
                require('../assets/images/ic_back_grey.png')
              " /></router-link
          ><span>{{ windowWidth > 630 ? "Back to detail page " : "" }}</span>
          <h1 class="header-mobile">
            {{ windowWidth < 630 ? "Edit listing" : "" }}
          </h1>
        </div>
      </div>
      <div class="header-create" v-if="windowWidth > 630">
        <h1>Edit listing</h1>
      </div>
      <FormComponentEdit />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import FormComponentEdit from "../components/FormComponentEdit.vue";
export default {
  data() {
    return {
      houseId: this.$route.params.houseId,
      windowWidth: window.innerWidth,
    };
  },
  methods: {
    onResize() {
      this.windowWidth = window.innerWidth;
    },
  },
  computed: { ...mapGetters({ house: "getHouse" }) },
  created() {
    this.$store.dispatch("getHouseById", this.houseId);
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
  },
  components: { FormComponentEdit },
};
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
.back-icon .back-link {
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

/*---    Media Queries   ---*/
@media (max-width: 860px) {
  .header-create {
    padding-top: 20px;
    font-size: 15px;
  }
}
@media (max-width: 630px) {
  .back-icon {
    max-width: 370px;
    margin: 0 auto;
  }
  .back-icon img {
    margin-right: 95px;
  }
  .back-icon .back-link {
    display: flex;
    align-items: center;
  }
  .header-mobile {
    font-size: 23px;
  }
}

@media (max-width: 530px) {
  .container-create-body {
    width: 80%;
  }
  .header-mobile {
    font-size: 18px;
  }
  .back-icon img {
    margin-right: 110px;
  }
}

@media (max-width: 470px) {
  .container-create-body {
    width: 90%;
  }
}

@media (max-width: 385px) {
  .back-icon img {
    margin-right: 95px;
  }
}

@media (max-width: 370px) {
  .back-icon img {
    margin-right: 85px;
  }
}
@media (max-width: 340px) {
  .back-icon img {
    margin-right: 80px;
  }
}
</style>
