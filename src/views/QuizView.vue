<template>
  <div class="container mt-5">
    <h1>Quiz Time!</h1>
    <div v-if="questions.length > 0">
      <h2>{{ currentQuestion.id }} - {{ currentQuestion.text }}</h2>
      <div v-for="choice in currentQuestion.choices" :key="choice.choice_id">
        <input type="radio"
               :name="`question-${currentQuestion.id}`"
               :id="`choice-${choice.choice_id}`"
               :value="choice.choice_id"
               v-model="selectedAnswers[currentQuestion.id]"
               @change="updateAnswer(currentQuestion.id, choice.choice_id)">
        <label :for="`choice-${choice.choice_id}`">{{ choice.choice_text }}</label>
      </div>
      <button @click="previousQuestion" :disabled="currentQuestionIndex <= 0">Previous</button>
      <button @click="nextQuestion" :disabled="currentQuestionIndex >= questions.length - 1">Next</button>
      <button v-if="currentQuestionIndex === questions.length - 1" @click="submitQuiz">Submit Quiz</button>
    </div>
    <div v-else>
      <p>Loading questions...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive, onMounted, defineProps, toRaw } from 'vue';
import axios from 'axios';

 const userId = defineProps({
  userId: {
    type: [String, Number],
    required: true
  }
});

const questions = ref([]);
const currentQuestionIndex = ref(0);
const selectedAnswers = reactive({});

onMounted(async () => {
  try {
    const response = await axios.get(`${process.env.VUE_APP_BACKEND_URL}/questions`);
    questions.value = response.data.questions; // adjust according to your API response structure
  } catch (error) {
    console.error("Failed to fetch questions:", error);
  }
});

const currentQuestion = computed(() => {
  return questions.value[currentQuestionIndex.value] || {};
});

function nextQuestion() {
  if (currentQuestionIndex.value < questions.value.length - 1) {
    currentQuestionIndex.value++;
  }
}

function previousQuestion() {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--;
  }
}

function updateAnswer(questionId, choiceId) {
  selectedAnswers[questionId] = choiceId;

}

function submitQuiz() {
  // console.log({answer : JSON.parse(JSON.stringify(selectedAnswers)),userId});
  // console.log({answer : toRaw(selectedAnswers),userId});

  const formattedAnswers = Object.keys(selectedAnswers).map(key => {
    return { questionId: key, answerId: selectedAnswers[key] };
  });
  console.log({userId:toRaw(userId),answer : formattedAnswers});
  
}
</script>
  