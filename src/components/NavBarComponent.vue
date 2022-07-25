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
            @click="this.toggleClassHome"
            :class="this.homeClass ? 'navlink-active' : ''"
            to="/"
          >
            <li>Home</li></router-link
          >
          <router-link
            @click="this.toggleClassAbout"
            :class="this.aboutClass ? 'navlink-active' : ''"
            to="/about"
            ><li>About</li></router-link
          >
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
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

/***  Removed the default blue color ***/
a {
  color: inherit;
  text-decoration: none;
}
</style>
