<template>
    <div>
      <h1>Quiz Time!</h1>
      <!-- Quiz logic goes here -->
      <button @click="submitQuiz">Submit Quiz</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRoute } from 'vue-router';
  import axios from 'axios';
  
  const route = useRoute();
  const userId = ref(route.params.userId);
  
  function submitQuiz() {
      const quizResults = { score: 85 }; // Example result
      axios.post(`${process.env.VUE_APP_BACKEND_URL}/submit-quiz`, { userId: userId.value, ...quizResults })
          .then(response => {
              console.log('Quiz results saved:', response.data);
          })
          .catch(error => {
              console.error('Failed to submit quiz:', error);
          });
  }
  </script>
  