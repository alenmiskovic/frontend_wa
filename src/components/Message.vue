<template>
    <div class="message">
      <h2>Motivational Messages</h2>
      <div>{{ message }}</div>
      <button @click="getRandomMessage">Get Random Message</button>
      <button @click="saveFavorite">Save to Favorites</button>
    </div>
  </template>
  
  <script>
  export default {
    props: ['token'],
    data() {
      return {
        message: ''
      };
    },
    methods: {
      async getRandomMessage() {
        const response = await fetch('http://localhost:3001/api/messages/random', {
          headers: {
            'Authorization': `Bearer ${this.token}`
          }
        });
  
        const data = await response.json();
        this.message = data.message;
      },
      async saveFavorite() {
        await fetch('http://localhost:3001/api/messages/favorites', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
          },
          body: JSON.stringify({ message: this.message })
        });
        alert('Message saved to favorites');
      }
    }
  };
  </script>
  
  <style scoped>
  .message {
    text-align: center;
  }
  
  button {
    margin: 10px;
    padding: 10px 20px;
    cursor: pointer;
  }
  </style>
  