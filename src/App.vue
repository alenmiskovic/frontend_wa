<template>
  <div id="app" class="app-background">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/login">Login</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
/* Stilovi za navigaciju */
nav {
  margin-bottom: 20px;
}
nav a {
  margin-right: 10px;
  text-decoration: none;
  color: #42b983;
}
nav a.router-link-active {
  font-weight: bold;
  color: #35495e;
}

/* Stilovi za pozadinu aplikacije */
.app-background {
  background-image: url('/background.jpg'); /* Postavljanje pozadinske slike */
  background-size: cover; /* Osigurava da slika pokrije cijelu površinu elementa */
  background-position: center; /* Sredi sliku u elementu */
  height: 100vh; /* Postavlja visinu na 100% visine preglednika */
  width: 100vw; /* Postavlja širinu na 100% širine preglednika */
  overflow: hidden; /* Sprječava preklapanje sadržaja izvan elementa */
}
</style>
