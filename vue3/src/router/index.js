import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/HomePages.vue';
import Calendar from '../pages/CalendarPages.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/calendar',
        name: 'About',
        component: Calendar
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
