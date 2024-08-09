<template>
  <div class="home">
    <Login v-if="!token" @login="setToken" />
    <Message v-else :token="token" />
  </div>
</template>

<script>
import Login from '../components/Login.vue';
import Message from '../components/Message.vue';

export default {
  components: {
    Login,
    Message
  },
  data() {
    return {
      token: ''
    };
  },
  methods: {
    setToken(token) {
      this.token = token;
      this.$router.push('/home'); // Navigacija na home stranicu
    }
  }
};
</script>

<style scoped>
.home {
  text-align: center;
}
</style>
