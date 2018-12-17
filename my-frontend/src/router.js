
import Vue from 'vue';
import VueRouter from 'vue-router';
import Main from './views/Main';

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        {
            path: '/',
            name: 'main',
            component: Main,
        }
    ],
    mode: 'history'
});

export default router;