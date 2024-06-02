import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import QuizView from '../views/QuizView.vue';
import NotFound from '../views/NotFound.vue';
import ResultView from '../views/ResultView.vue';
import Leaderboard from "../views/Leaderboard.vue";
import Dashboard from "../views/Dashboard.vue";

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/dashboard', name: 'Dashboard', component:Dashboard },
    { path: '/leaderboard', name: 'Leaderboard', component: Leaderboard },
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
