<template>
  <div class="body">
    <div class="logo">
      <img alt="Hisense Image" src="../assets/Feature-image.png">
    </div>
    <div class="container mt-5">
      <div class="text-center">
        <h1 class="mb-4 thank-you">Thank You for playing {{ username }}!</h1>
        <hr>
        <div class="card">
          <div class="card-body text-center mt-0">
            <p class="card-text fs-4">score: <span class="fw-bold name">{{ score }}</span>/100</p>
            <p class="card-text fs-4">MAX SCORE: <span class="fw-bold name">{{ max_score }}</span>/100</p>
            <!-- Buttons for actions -->
            <div class="d-flex" style="justify-content: space-evenly;">
                <button class="btn btn-primary mt-3" @click="retakeQuiz">Retake Quiz</button>
                <button class="btn btn-secondary mt-3" @click="goHome">Go Home</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footerUI />
  </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import axios from 'axios';
  import footerUI from '../components/FooterUi.vue';

  
  const router = useRouter();
  const route = useRoute();
  const score = ref(null);
  const userId = ref(route.params.userId);
  const username = ref(null);
  const max_score = ref(null);

  onMounted(async () => {
      score.value = route.query.score;

      try {
          const res = await axios.get(`${process.env.VUE_APP_BACKEND_URL}/userExists`, {
              params: {
                  userId: userId.value  // Using toRaw here, assuming userId is a reactive or ref
              }
          });
          username.value = res.data.username;
          max_score.value = res.data.max_score;
      } catch (error) {
          console.error("Failed to fetch user details:", error);
      }
  });
  function retakeQuiz() {
      // Navigate to the quiz page for the same user
      router.push({ name: 'Quiz', params: { userId: userId.value } });
  }
  
  function goHome() {
      // Navigate back to the home page
      router.push({ name: 'Home' });
  }
  </script>
  
  <style scoped>
  .container {
    max-width: 600px;
  }
  .logo{
  text-align: center;
  margin-top: 60px;
  min-height: 450px;
  margin-top: 0;
  /* max-height: 600px; */
  /* width: 1024; */
}
.logo img{
  max-height: 100%;
  max-width: 100%;
  /* width: 100%; */
}
.thank-you {
  font-weight: 1000;
  color: #00a9a5;
}
.body{
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto ;
  /* grid-template-rows: 1fr auto ; */
}
.card{
  --bs-card-border-width: 0;
}
button {
    border-radius: 0.8rem  !important;
    /* width: 10vw; */
    color: #fff !important;
    font-weight:100;
    letter-spacing: 1px;
}
.btn-primary{
  background-color: #00a9a5 !important;
  border-color: #00a9a5 !important;
}
.name{
  color: #00a9a5;
}
  </style>
  