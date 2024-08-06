<template>
    <div class="login">
      <h2>Login</h2>
      <form @submit.prevent="handleSubmit">
        <input 
          type="text" 
          v-model="username" 
          placeholder="Username" 
        />
        <input 
          type="password" 
          v-model="password" 
          placeholder="Password" 
        />
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: ''
      };
    },
    methods: {
      async handleSubmit() {
        const response = await fetch('http://localhost:3000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username: this.username, password: this.password })
        });
  
        const data = await response.json();
        if (data.token) {
          this.$emit('login', data.token);
        } else {
          alert('Login failed');
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .login {
    width: 300px;
    margin: 50px auto;
    text-align: center;
  }
  
  input {
    display: block;
    margin: 10px auto;
    padding: 10px;
    width: 100%;
  }
  
  button {
    margin: 10px;
    padding: 10px 20px;
    cursor: pointer;
  }
  </style>
  