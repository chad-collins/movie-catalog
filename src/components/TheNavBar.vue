<template>
  <div class="navbar">
    <ul>
     
            <li>
        <router-link  to="/">
         <img src="../assets/images/logo.png" alt="">
        </router-link>
      </li>
      <li> <router-link to="/movies">Movies</router-link></li>
      <li> <router-link to="/">People</router-link></li>
      <li>
        <router-link to="/search">
          <font-awesome-icon class="yellow" icon="search" />
        </router-link>
      </li>
      <li>
        <router-link to="/about">
           <font-awesome-icon class="yellow" icon="info" />
        </router-link>
      </li>
      <li>
       
      </li>
    </ul>
  </div>
</template>



<script>
</script>

<style scoped>

.branding{
  border: 1px solid white;
  padding: 0.5rem;
  border-radius: 20px;
}
.navbar {
    background: linear-gradient(
    0deg,
    rgba(99, 82, 161, 1) 0%,
    rgb(104, 87, 167) 90%
  );
    align-items: center;
    display: flex;
    height: 60px;
    justify-content: space-between;
    top: 0;
    position: fixed;
    width: 100vw;
    z-index: 500;
    box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.3);
  }

ul {
  display: flex;
  width: 100%;
  flex-direction: inherit;
  list-style: none;
  justify-content: space-evenly;
  align-items: center;
}

a {
  text-decoration: none;
  color: white;
  font-weight: bolder;
}



a:hover {
  -webkit-stroke-width: 5.3px;
  -webkit-stroke-color: #fff;
  -webkit-fill-color: #fff;
  text-shadow: 1px 0px 20px rgb(255, 255, 238);
}

.yellow{
  color: #ffd500;
  font-size: 1.3rem;
}


  li {
    margin: 1.5rem;
  }

</style>
