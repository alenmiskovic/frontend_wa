<template>
  <div class="message">
    <h2>Motivational Messages</h2>

    <!-- Prikaz nasumične poruke -->
    <div v-if="message" class="message-window">
      {{ message }}
    </div>
    <button @click="getRandomMessage">Get Random Message</button>
    <button v-if="message" @click="saveFavorite">Save to Favorites</button>

    <!-- Prikaz omiljenih poruka -->
    <h3>Your Favorite Messages</h3>
    <ul v-if="favorites.length">
      <li v-for="favorite in favorites" :key="favorite._id">
        {{ favorite.text }}
        <button @click="deleteFavorite(favorite._id)">Delete</button> <!-- Dodan gumb za brisanje -->
      </li>
    </ul>
    <p v-else>No favorites yet.</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: '',  // Inicijalna vrijednost poruke
      favorites: []  // Polje za omiljene poruke
    };
  },
  methods: {
    async getRandomMessage() {
      console.log('Pokrenuta metoda getRandomMessage');

      const token = localStorage.getItem('token'); // Dohvaćanje tokena iz localStorage

      try {
        console.log('Šalje se zahtjev na backend...');

        const response = await fetch('http://localhost:3001/api/messages/random', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        console.log('API response status:', response.status);

        if (!response.ok) {
          console.error('Greška pri dohvaćanju poruke:', response.statusText);
          return;
        }

        const data = await response.json();
        console.log('Primljeni podaci s backenda:', data);
        this.message = data.message;
        console.log('Postavljena message varijabla:', this.message);
      } catch (error) {
        console.error('Greška pri dohvaćanju poruke:', error);
      }
    },
    async saveFavorite() {
      console.log('Pokrenuta metoda saveFavorite');

      const token = localStorage.getItem('token');

      try {
        console.log('Šalje se zahtjev za spremanje poruke na backend...');

        await fetch('http://localhost:3001/api/messages/favorites', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ message: this.message })
        });

        console.log('Poruka je uspješno spremljena');
        this.fetchFavorites();  // Osvježavanje popisa omiljenih poruka
        alert('Message saved to favorites');
      } catch (error) {
        console.error('Greška pri spremanju poruke:', error);
      }
    },
    async fetchFavorites() {
      console.log('Dohvaćaju se omiljene poruke');

      const token = localStorage.getItem('token');

      try {
        const response = await fetch('http://localhost:3001/api/messages/favorites', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await response.json();
        if (response.ok) {
          this.favorites = data.favorites;
          console.log('Omiljene poruke:', this.favorites);
        } else {
          console.error('Greška pri dohvaćanju omiljenih poruka:', data.error);
        }
      } catch (error) {
        console.error('Greška pri dohvaćanju omiljenih poruka:', error);
      }
    },
    async deleteFavorite(messageId) {
      console.log('Pokrenuta metoda deleteFavorite');

      const token = localStorage.getItem('token');

      try {
        console.log('Šalje se zahtjev za brisanje omiljene poruke...');

        await fetch('http://localhost:3001/api/messages/favorites', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ messageId }) // Prosljeđivanje ID-a poruke koja se briše
        });

        console.log('Poruka je uspješno obrisana iz favorita');
        this.fetchFavorites(); // Osvježavanje popisa omiljenih poruka
      } catch (error) {
        console.error('Greška pri brisanju omiljene poruke:', error);
      }
    }
  },
  created() {
    console.log('Komponenta učitana, pokreće se getRandomMessage');
    this.getRandomMessage();
    this.fetchFavorites();  // Dohvaća omiljene poruke prilikom učitavanja komponente
  }
};
</script>

<style scoped>
.message {
  text-align: center;
}
.message {
  text-align: center;
  background-image: url('https://marketplace.canva.com/EAFw77ihYd8/1/0/1600w/canva-beige-abstract-shapes-desktop-wallpaper-ZRVj2MUZRxY.jpg'); /* URL do slike na internetu */
  background-size: cover; /* Pokriva cijelu pozadinu */
  background-repeat: no-repeat; /* Sprječava ponavljanje slike */
  background-position: center center; /* Centriranje slike */
  min-height: 100vh; /* Postavlja minimalnu visinu na 100% visine prikaznog prozora */
  width: 100%;
  padding: 20px;
}
.message-window {
  border: 1px solid #ccc;
  padding: 20px;
  margin: 20px auto;
  width: 50%;
  background-color: #f9f9f9;
  border-radius: 10px;
  min-height: 50px;  /* Održava prostor čak i kad nema poruke */
}

button {
  margin: 10px;
  padding: 10px 20px;
  cursor: pointer;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  background-color: #f1f1f1;
  margin: 5px 0;
  padding: 10px;
  border-radius: 5px;
}

li button {
  margin-left: 10px;
  padding: 5px 10px;
  cursor: pointer;
}
</style>
