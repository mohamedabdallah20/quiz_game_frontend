<template>
    <div class="container mt-5">
      <div class="text-center">
        <h1 class="mb-4">Result</h1>
        <div class="card">
          <div class="card-body">
            <p class="card-text fs-4">Your Name: <span class="fw-bold">{{ username }}</span></p>
            <p class="card-text fs-4">Your score: <span class="fw-bold">{{ score }}/100</span></p>
            <p class="card-text fs-4">MAX SCORE: <span class="fw-bold">{{ max_score }}/100</span></p>
            <!-- Buttons for actions -->
            <div class="d-flex" style="justify-content: space-evenly;">
                <button class="btn btn-primary mt-3" @click="retakeQuiz">Retake Quiz</button>
                <button class="btn btn-secondary mt-3" @click="goHome">Go Home</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import axios from 'axios';
  
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
  </style>
  