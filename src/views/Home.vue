<template>
  <div class="home">
    <Login v-if="!token" @login="setToken" />
    <Message v-else :token="token" />
  </div>
</template>

<script>
import Login from '../components/Login.vue';

export default {
  components: {
    Login
  
  },
  data() {
    return {
      token: ''
    };
  },
  methods: {
    setToken(token) {
      this.token = token;
    }
  }
};
</script>

<style scoped>


.home {
  text-align: center;
}
</style>
