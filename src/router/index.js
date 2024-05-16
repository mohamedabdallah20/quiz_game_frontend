import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import QuizView from '../views/QuizView.vue';
import NotFound from '../views/NotFound.vue';
import ResultView from '../views/ResultView.vue';
import DashBoard from "../views/DashBoard.vue";

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/leaderboard', name: 'Dashboard', component: DashBoard },
    { path: '/quiz/:userId', name: 'Quiz', component: QuizView, props: true },
    {
        path: '/result/:userId',
        name: 'Result',
        component: ResultView,
        props: true  // This allows the route to accept params as props
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }  
];
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
