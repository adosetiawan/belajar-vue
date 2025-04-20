import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import SettingsView from '@/views/SettingsView.vue';
import ProfilView from '@/views/ProfilView.vue';
import ScheduleView from '@/views/ScheduleView.vue';
import AbsenceView from '@/views/AbsenceView.vue';
import PointsView from '@/views/PointsView.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomeView,
        meta: {
            headerComponent: 'HeaderDefaultComponent',
            headerTitle: 'Home',
        },
    },
    {
        path: '/settings',
        name: 'Settings',
        component: SettingsView,
        meta: {
            headerComponent: 'HeaderPageComponent',
            headerTitle: 'Setting Sistem',
        },
    },
    {
        path: '/profil',
        name: 'Profil',
        component: ProfilView,
        meta: {
            headerComponent: 'HeaderPageComponent',
            headerTitle: 'Profil Pengguna',
        },
    },
    {
        path: '/schedule',
        name: 'Schedule',
        component: ScheduleView,
        meta: {
            headerComponent: 'HeaderPageComponent',
            headerTitle: 'Jadwal Pelajaran',
        },
    },
    {
        path: '/absence',
        name: 'Absence',
        component: AbsenceView,
        meta: {
            headerComponent: 'HeaderPageComponent',
            headerTitle: 'Absensi Pengguna',
        },
    },
    {
        path: '/points',
        name: 'Points',
        component: PointsView,
        meta: {
            headerComponent: 'HeaderPageComponent',
            headerTitle: 'Poin Pengguna',
        },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;