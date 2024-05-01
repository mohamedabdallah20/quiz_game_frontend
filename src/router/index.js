import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import QuizView from '../views/QuizView.vue';
import NotFound from '../views/NotFound.vue';
import ResultView from '../views/ResultView.vue';

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/quiz/:userId', name: 'Quiz', component: QuizView, props: true },
    { path: '/result/:userId', name: 'Result', component: ResultView, props: true },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }  
];
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
