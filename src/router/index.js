import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import QuizView from '../views/QuizView.vue';
import NotFound from '../views/NotFound.vue';

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/quiz/:userId', name: 'Quiz', component: QuizView, props: true },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }  
];
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
