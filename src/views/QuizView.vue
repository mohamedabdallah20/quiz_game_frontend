<template>
  <div class="container mt-5">
    <h1>Quiz Time! ({{ minutes }}:{{ secondsFormatted }} left)</h1>
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
import { ref, computed, reactive, onMounted, defineProps, toRaw, onUnmounted } from 'vue';
import axios from 'axios';

 const userId = defineProps({
  userId: {
    type: [String, Number],
    required: true
  }
});

const totalSeconds = ref(120); // 2 minutes in seconds
const timerInterval = ref(null);

const minutes = computed(() => Math.floor(totalSeconds.value / 60));
const secondsFormatted = computed(() => `0${totalSeconds.value % 60}`.slice(-2));

const questions = ref([]);
const currentQuestionIndex = ref(0);
const selectedAnswers = reactive({});

function startTimer() {
  if (timerInterval.value === null) {
    timerInterval.value = setInterval(() => {
      if (totalSeconds.value > 0) {
        totalSeconds.value--;
      } else {
        // clearInterval(timerInterval.value);
        submitQuiz(); // Automatically submit when time runs out
      }
    }, 1000);
  }
}
function stopTimer() {
  if (timerInterval.value !== null) {
    clearInterval(timerInterval.value);
    timerInterval.value = null;
  }
}

onUnmounted(() => {
  stopTimer();
});

onMounted(async () => {
  try {
    const response = await axios.get(`${process.env.VUE_APP_BACKEND_URL}/questions`);
    questions.value = response.data.questions; // adjust according to your API response structure
    startTimer();
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
  stopTimer();
  const formattedAnswers = Object.keys(selectedAnswers).map(key => {
    return { questionId: key, answerId: selectedAnswers[key] };
  });
  console.log({userId:toRaw(userId),answer : formattedAnswers});

}
</script>
  