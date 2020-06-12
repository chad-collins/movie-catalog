<template>
  <footer>

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
        <div class="wrapper">
      <a href="https://github.com/chad-collins/" target="_blank">
        github
      </a>
      <a href="https://www.linkedin.com/in/chadacollins/" target="_blank">
        linkedin
      </a>
      <a href="mailto: contact@chadcollins.net" target="_blank">
        email
      </a>
    </div>
  </footer>
</template>



<style scoped>
footer {
  border-top: 1px solid gray;
  margin: 1rem;
  margin-top: 4rem;
  text-align: center;
}

.wrapper {
  display: flex;
  justify-content: center;
  padding: 2rem;
}

img {
  margin-bottom: 1rem;
}
a {
  color: rgb(32, 32, 32);
  margin: 0 1rem 0 1rem;
}

a:hover{
  text-decoration: underline;
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
