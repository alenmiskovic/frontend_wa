<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div>
        <label for="username">Username:</label>
        <input type="text" v-model="username" id="username" required>
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="password" id="password" required>
      </div>
      <button type="submit">Login</button>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      error: null
    };
  },
  methods: {
    async login() {
      this.error = null;
      try {
        const response = await fetch('http://localhost:3001/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password,
          }),
        });

        const data = await response.json();
        if (response.ok) {
          // Pohranjivanje tokena u localStorage
          localStorage.setItem('token', data.token);
          console.log('Login successful:', data);
          // Preusmjeravanje na drugu stranicu nakon prijave
          this.$router.push('/message');
        } else {
          console.error('Login failed:', data);
          this.error = 'Login failed: ' + data.error;
        }
      } catch (error) {
        console.error('Error during login:', error);
        this.error = 'Login failed: An error occurred';
      }
    }
  }
};

</script>

<style scoped>
/* Stilovi za stranicu prijave */


form {
  max-width: 300px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}
form div {
  margin-bottom: 10px;
}
form label {
  display: block;
  margin-bottom: 5px;
}
form input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}
button {
  width: 100%;
  padding: 10px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #35495e;
}
p {
  color: red;
  text-align: center;
}
</style>
