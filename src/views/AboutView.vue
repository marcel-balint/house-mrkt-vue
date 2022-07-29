<template>
  <div class="container-about">
    <div class="container-about-content">
      <h1>About DTT Real Estate</h1>
      <div class="content-text">
        <p>
          This is a web application for house listings, which allows the user to
          view a list of houses that are currently available for sale, and
          create, edit and delete their own listings.
        </p>
        <p>
          On the 'home page' on the top left side there is a search field where
          a user is able to search houses by typing a city, a street or a zip
          code. An indication will be displayed showing the number of results
          found, if there are no results found, based on the search term, a
          message will be displayed accordingly. On the top right side there are
          two buttons 'Price' and 'Size' which gives the ability for the user to
          sort listings based on price (ascending) and size.
        </p>

        <p>
          On the oveview page, where a house is displayed in detail, there are
          recommended houses listed on the right side and the user is able to
          click and view the overview of the house.
        </p>
      </div>
      <div class="header-foot">
        <h2>Design and Development</h2>
        <div class="content-foot">
          <img
            class="image-foot"
            :src="require('../assets/images/logo_dtt.png')"
          />
          <p>
            By DTT
            <span>
              <a href="https://www.d-tt.nl/en/" target="_blank"
                >www.d-tt.nl</a
              ></span
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script></script>

<style scoped>
.container-about {
  width: 70%;
  margin: 0 auto;
}
.container-about-content {
  margin-top: 70px;
}

.content-text {
  margin-top: 40px;
  font-size: 18px;
}
.content-text p {
  margin-top: 30px;
}

.header-foot {
  position: absolute;
  margin-top: 60px;
  bottom: 30%;
}
.content-foot {
  display: flex;
  flex-direction: row;
  margin-top: 30px;
}
.image-foot {
  width: 190px;
  margin-right: 30px;
}
.content-foot p {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.content-foot p a {
  text-decoration: none;
}
</style>
