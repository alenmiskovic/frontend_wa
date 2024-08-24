<template>
  <div class="message">
    <h2>Motivational Messages</h2>
    <div v-if="message" class="message-window">
      {{ message }}
    </div>
    <button @click="getRandomMessage">Get Random Message</button>
    <button v-if="message" @click="saveFavorite">Save to Favorites</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: ''  // Inicijalna vrijednost poruke je prazna
    };
  },
  methods: {
    async getRandomMessage() {
      console.log('Pokrenuta metoda getRandomMessage');  // Logiranje pokretanja metode

      const token = localStorage.getItem('token'); // Dohvaćanje tokena iz localStorage

      try {
        console.log('Šalje se zahtjev na backend...');  // Log prije slanja zahtjeva

        const response = await fetch('http://localhost:3001/api/messages/random', {
          headers: {
            'Authorization': `Bearer ${token}`  // Koristimo token za autorizaciju
          }
        });

        console.log('API response status:', response.status);  // Logiramo status odgovora

        if (!response.ok) {
          console.error('Greška pri dohvaćanju poruke:', response.statusText);  // Logiramo grešku ako poziv ne uspije
          return;
        }

        const data = await response.json();
        console.log('Primljeni podaci s backenda:', data);  // Logiramo primljene podatke
        this.message = data.message;
        console.log('Postavljena message varijabla:', this.message);  // Logiramo postavljenu poruku
      } catch (error) {
        console.error('Greška pri dohvaćanju poruke:', error);  // Logiramo grešku ako poziv ne uspije
      }
    },
    async saveFavorite() {
      console.log('Pokrenuta metoda saveFavorite');  // Logiranje pokretanja metode

      const token = localStorage.getItem('token'); // Dohvaćanje tokena iz localStorage

      try {
        console.log('Šalje se zahtjev za spremanje poruke na backend...');  // Log prije slanja zahtjeva

        await fetch('http://localhost:3001/api/messages/favorites', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`  // Koristimo token za autorizaciju
          },
          body: JSON.stringify({ message: this.message })  // Spremamo trenutnu poruku
        });

        console.log('Poruka je uspješno spremljena');  // Logiramo uspješno spremanje poruke
        alert('Message saved to favorites');
      } catch (error) {
        console.error('Greška pri spremanju poruke:', error);  // Logiramo grešku ako poziv ne uspije
      }
    }
  },
  created() {
    console.log('Komponenta učitana, pokreće se getRandomMessage');  // Logiramo učitavanje komponente
    this.getRandomMessage();  // Dohvaća prvu poruku kada se komponenta učita
  }
};

</script>

<style scoped>
.message {
  text-align: center;
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
</style>
