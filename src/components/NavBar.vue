<template>
  <div class="navbar">
    <ul>
        <!-- @/assets/images//outline-home-24px.svg -->
        <li><router-link to="/">Home</router-link></li>
        <!-- <li><router-link to="/movies"><i class="fas fa-film"></i></router-link></li>
        <li><router-link to="/shows"><i class="fas fa-tv"></i></router-link></li> -->
        <li><router-link to="/search">Search</router-link></li>
        <li><router-link to="/about">info</router-link></li>
    </ul>
  </div>
</template>



<script>

</script>

<style scoped>
    .navbar{
        align-items: center;
        background-color: rgb(0, 0, 0);
        border-right:1px solid rgb(46, 46, 46);
        display: flex;
        height: 4rem;
        justify-content: space-evenly;
        position: fixed;
        top:0;
        width: 100%;
        z-index: 500;
    }

    ul{
        display: flex;
        width: 100%;
        flex-direction: inherit;
        list-style: none;
        justify-content: space-evenly;
        align-items: center;

    }

 
    a{
        text-decoration: none;
        color: white;
        font-size: 1.5rem;
    }

    a:hover{
        -webkit-stroke-width: 5.3px;
        -webkit-stroke-color: #FFF;
        -webkit-fill-color: #FFF;
        text-shadow: 1px 0px 20px rgb(255, 255, 238); 
    }

   @media (min-width: 600px) {
       .navbar{
        align-items: center;
        border-right:1px solid rgb(46, 46, 46);
        display: flex;
        flex-direction: column;
        height: 100vh;
        justify-content: space-between;
        left:0;
        position: fixed;
        width: 4rem;
        z-index: 500;
        }

        ul{
            margin-top:5rem;
        }
        
        li {
            margin: 1.5rem;
        }
   }

</style>
