<template>
  <div class="container-about">
    <div class="container-about-content">
      <h1 class="header-mobile">About</h1>
      <h1 class="header-about">About DTT Real Estate</h1>
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
          click and view the overview of each house. If the user wants to create
          a new listing or edit his/her listing, he/she must fill all the
          required form fields otherwise there will be validation error in the
          form with an appropriate error message.
        </p>
      </div>
      <div class="header-foot">
        <h2>Design and Development</h2>
        <div class="content-foot">
          <img
            class="image-foot"
            :src="require('../assets/images/ic_mobile_home_active.png')"
          />
          <p>
            By Marcel
            <span>
              <a href="https://github.com/marcel-balint" target="_blank"
                >www.github.com</a
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
.header-mobile {
  display: none;
}

.content-text {
  margin-top: 40px;
  font-size: 18px;
}
.content-text p {
  margin-top: 30px;
}

.header-foot {
  margin-top: 60px;
  margin-bottom: 40px;
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

/*---    Media Queries   ---*/

@media (max-width: 1000px) {
  .header-about {
    font-size: 26px;
  }
}
@media (max-width: 715px) {
  .header-about {
    font-size: 25px;
  }
  .header-foot h2 {
    font-size: 20px;
  }
  .content-text {
    font-size: 16px;
  }
}

@media (max-width: 630px) {
  .container-about-content {
    margin-top: 40px;
    margin-bottom: 100px;
  }
  .header-mobile {
    display: block;
    text-align: center;
    margin-bottom: 30px;
    font-size: 18px;
  }
  .header-about {
    font-size: 14px;
  }
  .content-text {
    margin-top: -20px;
    font-size: 12px;
  }
  .header-foot h2 {
    font-size: 14px;
  }
  .image-foot {
    width: 160px;
    margin-right: 16px;
  }
  .content-foot {
    margin-top: 16px;
  }
  .content-foot p {
    font-size: 12px;
  }
  .header-foot {
    margin-top: 40px;
  }
}
@media (max-width: 550px) {
  .container-about {
    width: 80%;
  }
  .image-foot {
    width: 110px;
    margin-right: 12px;
  }
}

@media (max-width: 430px) {
  .container-about {
    width: 90%;
  }
  .image-foot {
    width: 85px;
    margin-right: 12px;
  }
}
</style>
