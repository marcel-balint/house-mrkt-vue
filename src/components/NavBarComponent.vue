<template>
  <nav class="navbar">
    <div class="nav-box">
      <div class="brand-logo">
        <router-link to="/">
          <img :src="require('../assets/images/logo_dtt.png')" />
        </router-link>
      </div>
      <div class="navbar-links">
        <ul>
          <router-link
            to="/"
            @click="this.toggleClassHome"
            :class="this.homeClass ? 'navlink-active' : ''"
          >
            <li>
              <img
                class="home-icon-mobile"
                :src="
                  this.homeClass
                    ? require('@/assets/images/' + mobileIconsHome[0])
                    : require('@/assets/images/' + mobileIconsHome[1])
                "
              />

              <span class="navlink-home">Home</span>
            </li></router-link
          >
          <router-link
            @click="this.toggleClassAbout"
            :class="this.aboutClass ? 'navlink-active' : ''"
            to="/about"
            ><li>
              <img
                class="about-icon-mobile"
                :src="
                  this.aboutClass
                    ? require('@/assets/images/' + mobileIconsAbout[0])
                    : require('@/assets/images/' + mobileIconsAbout[1])
                "
              />

              <span class="navlink-about">About</span>
            </li></router-link
          >
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      mobileIconsHome: ["ic_mobile_home_active.png", "ic_mobile_home.png"],
      mobileIconsAbout: ["ic_mobile_info_active.png", "ic_mobile_info.png"],
    };
  },
  methods: {
    ...mapActions(["toggleClassHome"]),
    ...mapActions(["toggleClassAbout"]),
  },
  computed: {
    ...mapGetters({ homeClass: "getHome" }),
    ...mapGetters({ aboutClass: "getAbout" }),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap");

.navlink-active {
  color: #000;
  font-weight: bold;
}
.brand-logo {
  margin-right: 50px;
  cursor: pointer;
}

.brand-logo img {
  width: 130px;
  height: 40px;
  display: flex;
}

.navbar {
  position: relative;
  width: 100%;
  height: 70px;
  margin-top: 0px;
  display: flex;
  background-color: #fff;
  color: #c3c3c3;
  -webkit-box-shadow: 3px 3px 12px 0px rgba(232, 232, 232, 1);
  -moz-box-shadow: 3px 3px 12px 0px rgba(232, 232, 232, 1);
  box-shadow: 3px 3px 12px 0px rgba(232, 232, 232, 1);
}
.nav-box {
  position: relative;
  width: 70%;
  margin: auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.navbar-links {
  display: flex;
  align-items: center;
}
.navbar-links ul {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-between;
}
.navbar-links li:first-child {
  margin-right: 50px;
}
.navbar-links li {
  list-style-type: none;
  font-size: 22px;
  font-family: "Montserrat";
  align-items: center;
  cursor: pointer;
}

.home-icon-mobile,
.about-icon-mobile {
  display: none;
}

/***  Removed the default blue color ***/
a {
  color: inherit;
  text-decoration: none;
}

/*---    Media Queries   ---*/

@media (max-width: 1200px) {
  .brand-logo {
    margin-right: 45px;
  }
  .navbar-links li:first-child {
    margin-right: 45px;
  }
}

@media (max-width: 1000px) {
  .brand-logo {
    margin-right: 40px;
  }
  .navbar-links li:first-child {
    margin-right: 40px;
  }
}
@media (max-width: 950px) {
  .brand-logo {
    margin-right: 30px;
  }
  .brand-logo img {
    width: 120px;
  }
  .navbar-links li:first-child {
    margin-right: 30px;
  }
}
@media (max-width: 850px) {
  .navbar {
    height: 60px;
  }
  .brand-logo {
    margin-right: 25px;
  }
  .brand-logo img {
    width: 110px;
    height: 35px;
  }
  .navbar-links li {
    font-size: 20px;
  }
  .navbar-links li:first-child {
    margin-right: 20px;
  }
}
@media (max-width: 730px) {
  .nav-box {
    width: 75%;
  }
  .brand-logo img {
    width: 100px;
  }
}

@media (max-width: 630px) {
  .navbar {
    position: fixed;
    bottom: 0;
    z-index: 1;
  }
  .brand-logo {
    display: none;
  }
  .navlink-home,
  .navlink-about {
    display: none;
  }
  .navbar-links {
    width: 100%;
  }
  .navbar-links ul {
    width: 100%;
  }
  .home-icon-mobile,
  .about-icon-mobile {
    display: block;
    width: 33px;
  }
}
@media (max-width: 530px) {
  .navbar {
    height: 55px;
  }
  .home-icon-mobile,
  .about-icon-mobile {
    width: 30px;
  }
}

@media (max-width: 380px) {
  .home-icon-mobile,
  .about-icon-mobile {
    width: 25px;
  }
  .navbar {
    height: 50px;
  }
}

@media (min-width: 630px) {
  .home-icon-mobile,
  .about-icon-mobile {
    display: none;
  }
}
</style>
