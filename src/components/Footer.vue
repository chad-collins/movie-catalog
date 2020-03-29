<template>
  <footer>
    <p>Built and Designed by Chad Collins</p>
    <div class="wrapper">
      <a href="https://github.com/rewkie/" target="_blank">
        <img class="link_img" src="@/assets/images/GitHub-Mark-Light-32px.png" alt="Github logo">
      </a>
      <a href="https://www.linkedin.com/in/chadacollins/" target="_blank">
        <img class="link_img" src="@/assets/images/In-White-34.png" alt="Github logo">
      </a>
      <a href="mailto: contact@chadcollins.net" target="_blank">
        <i class="material-icons link_img">email</i>
      </a>
    </div>

    <div class="wrapper">
      <div>
        <a href="https://www.themoviedb.org/" target="_blank">
          <img width="50" src="@/assets/images/tmdb.svg" alt="TMDB logo">
        </a>
        <p>This product uses the TMDb API but is not endorsed or certified by TMDb.</p>
      </div>
    </div>
    <div class="copy">
      <p>&copy; 2020 Chad Collins</p>
    </div>
  </footer>
</template>



<style scoped>
footer {
  margin: 1rem;
  margin-top: 4rem;
  text-align: center;
}

.wrapper {
  display: flex;
  justify-content: center;
  padding: 2rem;
  border-bottom: 1px solid rgb(49, 49, 49);
}

img {
  margin-bottom: 1rem;
}
.material-icons {
  color: white;
}

.link_img {
  width: auto;
  height: 21px;
  margin: 0 0.8rem;
}

.copy {
  display: flex;
  justify-content: center;
  padding: 1rem;
  align-items: center;
}
</style>
