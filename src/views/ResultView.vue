<template>
  <div class="body" :dir="locale==='ar' ? 'rtl' : 'ltr'">
    <div class="logo">
      <img alt="Hisense Image" src="../assets/Feature-image.png">
    </div>
    <div class="container mt-5">
      <div class="text-center">
        <h1 class="mb-4 thank-you">{{t('Thank You for playing')}} {{ username }}!</h1>
        <hr>
        <div class="card">
          <div class="card-body text-center mt-0">
            <p class="card-text fs-4">score: <span class="fw-bold name">{{ score }}</span>/100</p>
            <p class="card-text fs-4">MAX SCORE: <span class="fw-bold name">{{ max_score }}</span>/100</p>
            <!-- Buttons for actions -->
            <div class="container">
              <div class="row justify-content-center mt-3">
                <div class="col-md-12">
                  <button  class="btn btn-secondary mt-3" @click="shareScore">{{t('Share Score')}}</button>
                </div>
              </div>
              <div class="row justify-content-center mt-3">
                <div class="col-md-6">
                  <button class="btn btn-primary mt-3" @click="retakeQuiz">{{t('Retake Quiz')}}</button>
                </div>
                <div class="col-md-6">
                  <button class="btn btn-secondary mt-3" @click="toHisense">{{t('To Hisense')}}</button>
                </div>
              </div>
              <div class="row justify-content-center mt-3">
                <div class="col-md-6">
                  <button class="btn btn-primary mt-3" @click="toLeaderboard">{{t('To Leaderboard')}}</button>
                </div>
                <div class="col-md-6">
                  <button class="btn btn-secondary mt-3" @click="goHome">{{t('Go Home')}}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr>
        <div>
          <p class="congratulationsp text-center ">
            {{t("You have successfully entered the draw to get the chance to win with Hisense!")}}
          </p>
          <p class="congratulationsp text-center ">
            {{t("Follow us to know the winners and to get all the updates")}}
          </p>
          <div class="footer-icons d-flex justify-content-center mb-3">
            <a target="_blank" href="https://twitter.com/Hisense_KSA">
              <div class="icon" v-html="twitterSvg"></div>
            </a>
            <a target="_blank" href="https://www.instagram.com/hisense_ksa/">
              <div class="icon" v-html="instagramSvg"></div>
            </a>
            <a target="_blank" href="https://www.facebook.com/HisenseSaudiArabia">
              <div class="icon" v-html="facebookSvg"></div>
            </a>
            <a target="_blank" href="https://www.tiktok.com/@hisense_ksa">
              <div class="icon" v-html="tiktokSvg"></div>
            </a>
          </div>
        </div>
        <p class="congratulationsp text-center">
          {{t("Best of luck!")}}
        </p>
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
import { useI18n } from 'vue-i18n';
const { t,locale } = useI18n();

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
async function  shareScore () {
  const data = {
    title: 'Hisense Euro Challenge',
    text: `I scored ${score.value} on the Hisense Euro Challenge! Can you beat my score?`,
    url: "https://www.hisenseksa.com/eurochallenge/" // The URL of your quiz game
        };
        console.log(data);
        if(!navigator.canShare) {
          alert('Sharing is not supported in your browser.');
        }
        else{
          try {
            await navigator.share(data);
            alert('Score shared successfully')
          } catch (error) {
            console.error('Failed to share score:');
          }
        }
}
function retakeQuiz() {
  // Navigate to the quiz page for the same user
  router.push({ name: 'Quiz', params: { userId: userId.value } });
}
function toLeaderboard() {
  // Navigate to the quiz page for the same user
  router.push({ name: 'Dashboard' });
}

function toHisense() {
  // Navigate to the quiz page for the same user
  window.location.href = 'https://www.hisenseksa.com/';
}

function goHome() {
  // Navigate back to the home page
  router.push({ name: 'Home' });
}
const twitterSvg = ref(`
<svg version="1.1" id="Layer_2_00000084528843485277880190000002349648946228571559_" class="sm-icon"
    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 55.3 55.2" style="enable-background:new 0 0 55.3 55.2;" xml:space="preserve">
    <style type="text/css">
        .st0 {
            fill: #00A9A5;
        }
    </style>
    <g>
        <path class="st0" d="M14.4,1.2h26.3C48.1,1.2,54,7.1,54,14.4v26.3C54,48.1,48.1,54,40.7,54H14.4C7.1,54,1.2,48.1,1.2,40.7V14.4
C1.2,7.1,7.1,1.2,14.4,1.2z" />
        <path d="M13.7,41.8c0.7-0.8,1.3-1.5,2-2.3c2.9-3.4,5.8-6.7,8.7-10.1c0.1-0.1,0.1-0.1,0.2-0.2c-3.6-5.2-7.2-10.5-10.9-15.8
c0.1,0,0.2,0,0.2,0c2.6,0,5.2,0,7.8,0c0.2,0,0.3,0.1,0.4,0.2c2.3,3.3,4.6,6.6,6.9,10c0.1,0.1,0.1,0.2,0.2,0.3
c0.5-0.5,0.9-1.1,1.4-1.6c2.5-2.9,4.9-5.7,7.4-8.6c0.2-0.2,0.3-0.3,0.6-0.3c0.7,0,1.3,0,2.1,0c-3.5,4-6.9,8-10.4,12
c0.1,0.1,0.1,0.2,0.2,0.2C34,31,37.7,36.3,41.3,41.6c0.1,0.1,0.1,0.2,0.2,0.3h-8.3c0-0.1-0.1-0.1-0.1-0.2
c-2.5-3.6-4.9-7.1-7.3-10.7c0-0.1-0.1-0.1-0.1-0.2c-0.1,0.1-0.2,0.2-0.2,0.3c-2,2.3-4,4.6-5.9,6.9c-1.1,1.3-2.2,2.6-3.3,3.9H13.7
L13.7,41.8z M17,15.2c0.1,0.1,0.1,0.2,0.2,0.3c0.4,0.6,0.9,1.2,1.3,1.8c5.2,7.5,10.5,15,15.7,22.5c0.1,0.2,0.2,0.2,0.5,0.2
c1,0,2.1,0,3.1,0c0.1,0,0.2,0,0.3,0c-0.3-0.5-0.6-0.9-0.9-1.3C31.8,31,26.4,23.2,21,15.5c-0.1-0.2-0.2-0.3-0.5-0.3
c-0.9,0-1.9,0-2.8,0C17.5,15.2,17.3,15.2,17,15.2L17,15.2z" />
    </g>
</svg>
`);

const instagramSvg = ref(`
<svg version="1.1" id="Layer_2_00000084528843485277880190000002349648946228571559_" class="sm-icon"
    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 55.3 55.2" style="enable-background:new 0 0 55.3 55.2;" xml:space="preserve">
    <style type="text/css">
        .st0 {
            fill: #00A9A5;
        }
    </style>
    <g>
        <path class="st0" d="M14.5,1.2h26.3c7.3,0,13.3,5.9,13.3,13.3v26.3c0,7.3-5.9,13.3-13.3,13.3H14.5C7.2,54,1.2,48.1,1.2,40.7V14.4
C1.2,7.1,7.2,1.2,14.5,1.2z" />
        <g>
            <path d="M34.6,41.9h-14c-0.3,0-0.6-0.1-0.9-0.1c-3.2-0.7-5.3-2.7-6.2-5.9c-0.1-0.4-0.2-0.8-0.2-1.3c0-4.7,0-9.3,0-14
c0-0.1,0-0.2,0.1-0.3c0.2-0.7,0.3-1.5,0.6-2.2c1.4-3.1,3.9-4.7,7.3-4.8c4.2-0.1,8.5,0,12.7,0c1.7,0,3.2,0.4,4.5,1.4
c2.3,1.6,3.4,3.9,3.4,6.6c0,4.2,0,8.3,0,12.5c0,0.5,0,1.1-0.2,1.6c-0.7,3.2-2.7,5.3-5.9,6.2C35.5,41.8,35,41.8,34.6,41.9
L34.6,41.9z M27.7,15.8c-2.1,0-4.2,0-6.2,0c-0.7,0-1.3,0.1-1.9,0.3c-2.3,0.8-3.6,2.8-3.6,5.2c0,4.2,0,8.3,0,12.5
c0,0.6,0.1,1.3,0.3,1.9c0.8,2.3,2.7,3.6,5.2,3.7c4.2,0,8.3,0,12.5,0c0.6,0,1.3-0.1,1.9-0.3c2.3-0.8,3.6-2.7,3.7-5.2
c0-4.2,0-8.4,0-12.6c0-1.9-0.8-3.4-2.3-4.5c-1-0.7-2.1-1-3.3-1C31.8,15.8,29.7,15.8,27.7,15.8L27.7,15.8z" />
            <path d="M35,27.6c0,4.1-3.4,7.4-7.4,7.3c-4.1,0-7.4-3.4-7.3-7.4c0-4.1,3.3-7.4,7.4-7.3C31.7,20.2,35,23.6,35,27.6L35,27.6z
 M27.6,22.8c-2.7,0-4.8,2.2-4.8,4.8s2.2,4.8,4.8,4.8c2.7,0,4.8-2.2,4.8-4.8S30.3,22.8,27.6,22.8z" />
            <path d="M35.3,21.8c-1,0-1.9-0.8-1.9-1.9c0-1,0.8-1.8,1.8-1.9c1,0,1.9,0.8,1.9,1.9C37.2,20.9,36.3,21.8,35.3,21.8L35.3,21.8z" />
        </g>
    </g>
</svg>
`);

const facebookSvg = ref(`
<svg version="1.1" id="Layer_2_00000084528843485277880190000002349648946228571559_" class="sm-icon"
    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 55.3 55.2" style="enable-background:new 0 0 55.3 55.2;" xml:space="preserve">
    <style type="text/css">
        .st0 {
            fill: #00A9A5;
        }
    </style>
    <g>
        <path class="st0" d="M14.5,1.2h26.3c7.3,0,13.3,5.9,13.3,13.3v26.3c0,7.3-5.9,13.3-13.3,13.3H14.5C7.2,54,1.2,48.1,1.2,40.7V14.4
C1.2,7.1,7.2,1.2,14.5,1.2z" />
        <path d="M30.5,29.5c0,0.2,0,0.4,0,0.5c0,3.9,0,7.8,0,11.6c0,1.1-0.1,1.2-1.2,1.2c-1.4,0-2.8,0-4.2,0c-0.8,0-1-0.2-1-1
c0-3.9,0-7.9,0-11.8c0-0.1,0-0.3,0-0.5c-0.1,0-0.3,0-0.4,0c-1.1,0-2.2,0-3.2,0c-0.8,0-0.9-0.2-0.9-0.9c0-1.5,0-2.9,0-4.4
c0-0.8,0.2-1,0.9-1c1.1,0,2.1,0,3.2,0c0.1,0,0.3,0,0.4,0c0-0.2,0-0.3,0-0.5c0-1.4,0-2.8,0.1-4.2c0.3-3.5,3-6.1,6.6-6.2
c1.5-0.1,3,0,4.5,0c0.5,0,0.7,0.2,0.7,0.7c0,1.5,0,3,0,4.4c0,0.5-0.2,0.7-0.8,0.7c-1,0-2,0-3,0c-1.2,0-1.6,0.5-1.6,1.6
c0,1.1,0,2.2,0,3.4c0.2,0,0.3,0,0.4,0c1.3,0,2.6,0,3.9,0c0.8,0,1,0.2,1,1c0,1.5,0,3,0,4.4c0,0.7-0.2,0.9-0.9,0.9
c-1.3,0-2.6,0-3.9,0C30.8,29.5,30.7,29.5,30.5,29.5L30.5,29.5z" />
    </g>
</svg>
`);

const tiktokSvg = ref(`
<svg version="1.1" id="Layer_2_00000084528843485277880190000002349648946228571559_" class="sm-icon"
    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    viewBox="0 0 55.3 55.2" style="enable-background:new 0 0 55.3 55.2;" xml:space="preserve">
    <style type="text/css">
        .st0 {
            fill: #00A9A5;
        }
    </style>
    <g>
        <path class="st0" d="M14.5,1.2h26.3c7.3,0,13.3,5.9,13.3,13.3v26.3c0,7.3-5.9,13.3-13.3,13.3H14.5C7.2,54,1.2,48.1,1.2,40.7V14.4
C1.2,7.1,7.2,1.2,14.5,1.2z" />
        <path d="M22.9,45.2c-0.8-0.1-1.6-0.2-2.3-0.3c-4.4-1-7.7-4.8-8.3-9.2c-0.7-5.9,3.3-11.2,9.1-12.2c1.1-0.2,2.3-0.2,3.4,0v5.8
c-0.3-0.1-0.6-0.1-0.9-0.2c-2.8-0.4-5.5,1.6-5.9,4.3c-0.4,3,1.6,5.6,4.5,6c2.9,0.4,5.9-1.9,5.9-5.3c0-4.2,0-8.4,0-12.5
c0-3.7,0-7.4,0-11.1c0-0.1,0-0.3,0-0.5h5.7c0.1,0.6,0.1,1.2,0.2,1.8c0.8,3.9,4.3,6.9,8.3,7c0.4,0,0.4,0.1,0.4,0.5
c0,1.6,0,3.3,0,4.9c0,0.1,0,0.2,0,0.4c-1.6,0-3.2-0.2-4.7-0.8c-1.5-0.5-2.9-1.3-4.2-2.2c0,0.2,0,0.3,0,0.4c0,4.1,0,8.1,0,12.2
c0,2.2-0.5,4.3-1.8,6.1c-2,3-4.9,4.7-8.5,4.9c-0.1,0-0.2,0-0.4,0.1L22.9,45.2L22.9,45.2z" />
    </g>
</svg>
`);
</script>

<style scoped>
.container {
  max-width: 600px;
}

.logo {
  text-align: center;
  /* margin-top: 60px; */
  min-height: 450px;
  max-height: 800px;
  margin-top: 0;
  /* max-height: 600px; */
  /* width: 1024; */
}

.logo img {
  max-height: 100%;
  max-width: 100%;
  /* width: 100%; */
}

.thank-you {
  font-weight: 1000;
  color: #00a9a5;
}

.body {
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
  /* grid-template-rows: 1fr auto ; */
}

.card {
  --bs-card-border-width: 0;
}

button {
  border-radius: 0.8rem !important;
  /* width: 10vw; */
  color: #fff !important;
  font-weight: 100;
  letter-spacing: 1px;
}

.btn-primary {
  background-color: #00a9a5 !important;
  border-color: #00a9a5 !important;
}

.name {
  color: #00a9a5;
}

.congratulationsp {
  text-align: center;
}

.footer-icons {
  column-gap: 20px;
}

svg {
  /* color: rgb(0, 179, 136); */
  font-size: 2rem;
  margin-right: 30px;
}

.icon {
  width: 3rem;
  height: 3rem;
  vertical-align: -.125rem;
}
.congratulations {
    color:rgb(0, 179, 136);
    padding: 0.5vw 1vw;
    font-size: 3vw;
    font-weight: 1000;
}
.congratulationsp {
    font-size: 0.8vw;
    font-weight: 1000;
}
@media (max-width: 768px) {
    .congratulations {
        color:rgb(0, 179, 136);
        padding: 0.5vw 1vw;
        font-size: 10vw;
        font-weight: 1000;
    }
    .congratulationsp {
        font-size: 3vw;
        font-weight: 1000;
    }
}
</style>