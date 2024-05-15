<template>
  <div class="logo">
    <img alt="Hisense Image" src="../assets/Feature-image.png">
  </div>
  <div class="body">
    <div class="container mt-5 quiz-container">
      <h1 class="text-center">Quiz Time! ({{ minutes }}:{{ secondsFormatted }} left)</h1>
      <div v-if="!loadingQuestions && questions.length > 0 ">
        <h2 class="my-4 question text-align">{{ currentQuestion.text }}</h2>
        <form @submit.prevent="submitQuiz">
          <div class="form-check mb-5 col-lg-6 col-sm-12 answer text-center english-radio-buttons flex-wrap">
          <div class="mb-3" v-for="choice in currentQuestion.choices" :key="choice.choice_id">
              <div class="d-flex">
                <input class="form-check-input"
                       type="radio"
                       :name="`question-${currentQuestion.id}`"
                       :id="`choice-${choice.choice_id}`"
                       :value="choice.choice_id"
                       v-model="selectedAnswers[currentQuestion.id]"
                       @change="updateAnswer(currentQuestion.id, choice.choice_id)">
                <label class="form-check-label" :for="`choice-${choice.choice_id}`">
                  {{ choice.choice_text }}
                </label>
              </div>
            </div>
          </div>
          <div class="button-group">
            <button  type="button" class="btn btn-secondary me-2" @click="previousQuestion" :disabled="currentQuestionIndex <= 0">Previous</button>
            <button type="button" class="btn btn-primary me-2" @click="nextQuestion" :disabled="currentQuestionIndex >= questions.length - 1">Next</button>
            <button class="btn btn-success" type="submit" v-if="currentQuestionIndex === questions.length - 1">Submit Quiz</button>
          </div>
        </form>
      </div>
      <div v-else class="text-center">
        <p>Loading questions...</p>
      </div>
    </div>
    <footerUI />
  </div>
</template>

<script setup>
import { ref, computed, reactive, onMounted, defineProps, toRaw, onUnmounted } from 'vue';
import axios from 'axios';
import {  useRouter } from 'vue-router'
import footerUI from '../components/FooterUi.vue';
import { io } from "socket.io-client";



const router = useRouter()

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
const loadingQuestions = ref(true);
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

  const response = await axios.get(`${process.env.VUE_APP_BACKEND_URL}/userExists`, {
    params: {
      userId: userId.userId  // Using toRaw here, assuming userId is a reactive or ref
    }
  });
  // console.log(response);
  if(response.data.success === false) {
    router.push({ name: 'Home' });
  }
  try {
    loadingQuestions.value = true;
    const response = await axios.get(`${process.env.VUE_APP_BACKEND_URL}/questions`);
    questions.value = response.data.questions; // adjust according to your API response structure
    loadingQuestions.value = false;
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

async function submitQuiz() {
  // console.log({answer : JSON.parse(JSON.stringify(selectedAnswers)),userId});
  // console.log({answer : toRaw(selectedAnswers),userId});
  stopTimer();
  const formattedAnswers = Object.keys(selectedAnswers).map(key => {
    return { question_id: key, choice_id: selectedAnswers[key] };
  });
  // console.log({userId:toRaw(userId),answer : formattedAnswers});

  await axios.post(`${process.env.VUE_APP_BACKEND_URL}/answers`, {userId:toRaw(userId),answers : formattedAnswers})
    .then(response => {
      // console.log(response.data)
      if (response.data.success) {
        router.push({
          name: 'Result',
          params: {
            userId: toRaw(userId).userId
          },
          query: {
            score: response.data.score,
          }
        });
        const socket = io(process.env.VUE_APP_SOCKET_URL,{transports: ['websocket'],upgrade: false});
        socket.emit('score request')
      }
    })
    .catch(error => {
      console.error("Failed to submit quiz:", error);
    });

}
</script>
<style scoped>
.logo{
  text-align: center;
  margin-top: 60px;
  min-height: 450px;
  /* max-height: 600px; */
  /* width: 1024; */
}
.logo img{
  max-height: 100%;
  max-width: 100%;
  margin-top: 0;
  /* width: 100%; */
}
.body{
  min-height: 65vh; /* Ensure the .body covers at least the full height of the viewport */
  display: grid;
  grid-template-rows: 1fr auto ;
  grid-template-columns: 100%; /* Ensure it spans the full width */
}
.form-check-label{
    font-size: 1.1em;
    color: black;
}
.form-check-input{
    border-color: #00a9a5;
}
.answer input[type="radio"] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 10px;
  height: 10px;
}

.answer label {
  font-weight: 600;
  color: #3c3a3a;
}

.answer input[type="radio"] {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 2px;
  width: 20px;
  height: 20px;
  border: 1px solid #00a9a5;
  margin-right: 5px;
  /* Adjust as needed */
  /* background-clip: content-box;
  padding: 2px; */
}
.answer input[type="radio"]:checked {
    background-color: #00a9a5; /* Example color */
}
.question{ 
  font-weight: 1000;
  color: #00a9a5;
}
.container{
  margin-left: 8vw;
}
@media screen and (max-width: 810px) {
  .container{
    margin-left: 0;
  }
}
button{
    background-color: #00a9a5 !important;
    border-radius: 0.8rem  !important;
    width: 10vw;
    color: #fff !important;
    font-weight:100;
    letter-spacing: 1px;
    border-color: #00a9a5 !important;
}
.quiz-container {
  max-width: 800px;
  /* margin: 2rem auto; */
  padding: 20px;
  /* background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1); */
}

h1, h2 {
  color: #343a40;
}

.form-check-input {
  cursor: pointer;
}

.form-check-label {
  cursor: pointer;
}

.button-group button {
  min-width: 100px;
}

.text-center {
  text-align: center;
}

.my-4 {
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
}

.mb-3 {
  margin-bottom: 1rem;
}
</style>
  