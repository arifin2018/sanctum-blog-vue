<template>
  <Navigation />
  <div class="py-2 container view-90vh">
    <router-view />
  </div>
  <router-view name="footer"></router-view>
</template>

<script>
  import Navigation from './components/Navigation.vue';
  export default {
    name: 'App',
    components: {
      Navigation
    },
  }
</script>

<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    height: 70vh;
  }

  nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
</style>