<script setup>
import { ref, computed, onMounted } from 'vue';
import MenuItemComponent from '@/components/MenuItemComponent.vue';
import ScheduleItemComponent from '@/components/ScheduleItemComponent.vue';

// Data reaktif
const currentTime = ref(new Date());
const userName = ref('Ahmad Setiawan');
const userRole = ref('Siswa Kelas XII');
const attendanceData = ref({
  checkIn: '07:35:07',
  checkOut: '18:05:07',
  workHours: '08:30 - 17:30',
  status: 'Hadir'
});

// Additional data for new layout
const todayStats = ref({
  totalClasses: 5,
  completed: 2,
  current: 1,
  upcoming: 2
});

const weeklyProgress = ref({
  attendance: 95,
  assignments: 78,
  performance: 85
});

// Sample schedule data for HomeView
const upcomingSchedule = ref([
  {
    id: 1,
    subject: 'Matematika',
    teacher: 'Ibu Sarah',
    time: '09:15 - 10:45',
    room: 'Ruang 101',
    status: 'current',
    color: 'primary'
  },
  {
    id: 2,
    subject: 'Fisika',
    teacher: 'Ibu Diana',
    time: '11:00 - 12:30',
    room: 'Lab Fisika',
    status: 'upcoming',
    color: 'info'
  },
  {
    id: 3,
    subject: 'Kimia',
    teacher: 'Pak Budi',
    time: '13:30 - 15:00',
    room: 'Lab Kimia',
    status: 'upcoming',
    color: 'warning'
  }
]);

// Computed properties
const formattedDate = computed(() => {
  return currentTime.value.toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

const formattedTime = computed(() => {
  return currentTime.value.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit'
  });
});

const greeting = computed(() => {
  const hour = currentTime.value.getHours();
  if (hour < 12) return 'Selamat Pagi';
  if (hour < 15) return 'Selamat Siang';
  if (hour < 18) return 'Selamat Sore';
  return 'Selamat Malam';
});

const currentActivity = computed(() => {
  if (todayStats.value.current > 0) {
    return 'Sedang dalam kelas';
  } else if (todayStats.value.upcoming > 0) {
    return 'Menunggu kelas berikutnya';
  } else {
    return 'Semua kelas selesai';
  }
});

// Update waktu setiap detik
onMounted(() => {
  setInterval(() => {
    currentTime.value = new Date();
  }, 1000);
});
</script>
<template>
    <!-- Welcome Toast -->
    <div class="toast toast-autohide custom-toast-1 toast-primary home-page-toast shadow" role="alert"
        aria-live="assertive" aria-atomic="true" data-bs-delay="60000" data-bs-autohide="true" id="installWrap">
        <div class="toast-body p-4">
            <div class="toast-text me-2">
                <h6 class="text-white">Selamat Datang di Portal Siswa!</h6>
                <span class="d-block mb-2">Klik tombol <strong>Install Now</strong> untuk pengalaman yang lebih baik.</span>
                <button id="installAffan" class="btn btn-sm btn-warning">Install Sekarang</button>
            </div>
        </div>
        <button class="btn btn-close btn-close-white position-absolute p-2" type="button" data-bs-dismiss="toast"
            aria-label="Close"></button>
    </div>

    <!-- Header Dashboard Section -->
    <div class="container mb-3">
        <div class="card home-header-card bg-gradient-primary text-white shadow-lg border-0 position-relative overflow-hidden">
            <div class="home-bg-pattern"></div>
            <div class="card-body p-4 position-relative">
                <div class="row align-items-center">
                    <div class="col-8">
                        <div class="home-header-content">
                            <h5 class="mb-1 fw-bold">{{ greeting }}, {{ userName }}! 🎓</h5>
                            <p class="mb-2 opacity-90">{{ userRole }}</p>
                            <div class="d-flex align-items-center">
                                <i class="bi bi-calendar-date me-2"></i>
                                <small class="opacity-75">{{ formattedDate }}</small>
                            </div>
                        </div>
                    </div>
                    <div class="col-4 text-end">
                        <div class="home-stats">
                            <div class="current-time fw-bold h4 mb-0">{{ formattedTime }}</div>
                            <small class="opacity-75">{{ currentActivity }}</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Quick Stats Dashboard -->
    <div class="container mb-3">
        <div class="row g-3">
            <div class="col-3">
                <div class="stat-card text-center p-3 rounded-3 bg-white shadow-sm border h-100">
                    <div class="stat-icon mb-2">
                        <div class="rounded-circle bg-success bg-gradient text-white d-inline-flex justify-content-center align-items-center"
                            style="width: 50px; height: 50px;">
                            <i class="bi bi-check-circle fs-5"></i>
                        </div>
                    </div>
                    <h6 class="mb-1 fw-bold text-success">{{ todayStats.completed }}</h6>
                    <small class="text-muted">Kelas Selesai</small>
                </div>
            </div>
            <div class="col-3">
                <div class="stat-card text-center p-3 rounded-3 bg-white shadow-sm border h-100">
                    <div class="stat-icon mb-2">
                        <div class="rounded-circle bg-primary bg-gradient text-white d-inline-flex justify-content-center align-items-center"
                            style="width: 50px; height: 50px;">
                            <i class="bi bi-play-circle fs-5"></i>
                        </div>
                    </div>
                    <h6 class="mb-1 fw-bold text-primary">{{ todayStats.current }}</h6>
                    <small class="text-muted">Sedang Berlangsung</small>
                </div>
            </div>
            <div class="col-3">
                <div class="stat-card text-center p-3 rounded-3 bg-white shadow-sm border h-100">
                    <div class="stat-icon mb-2">
                        <div class="rounded-circle bg-warning bg-gradient text-white d-inline-flex justify-content-center align-items-center"
                            style="width: 50px; height: 50px;">
                            <i class="bi bi-clock fs-5"></i>
                        </div>
                    </div>
                    <h6 class="mb-1 fw-bold text-warning">{{ todayStats.upcoming }}</h6>
                    <small class="text-muted">Akan Datang</small>
                </div>
            </div>
            <div class="col-3">
                <div class="stat-card text-center p-3 rounded-3 bg-white shadow-sm border h-100">
                    <div class="stat-icon mb-2">
                        <div class="rounded-circle bg-info bg-gradient text-white d-inline-flex justify-content-center align-items-center"
                            style="width: 50px; height: 50px;">
                            <i class="bi bi-calendar-event fs-5"></i>
                        </div>
                    </div>
                    <h6 class="mb-1 fw-bold text-info">{{ todayStats.totalClasses }}</h6>
                    <small class="text-muted">Total Hari Ini</small>
                </div>
            </div>
        </div>
    </div>

    <!-- Today's Attendance Summary -->
    <div class="container mb-3">
        <div class="card shadow-sm border-0">
            <div class="card-header bg-transparent border-0 pb-2">
                <div class="d-flex justify-content-between align-items-center">
                    <h6 class="mb-0 fw-bold text-dark">
                        <i class="bi bi-calendar-check text-primary me-2"></i>
                        Ringkasan Kehadiran Hari Ini
                    </h6>
                    <span class="badge bg-success rounded-pill px-3">
                        <i class="bi bi-check-circle me-1"></i>
                        {{ attendanceData.status }}
                    </span>
                </div>
            </div>
            <div class="card-body pt-2">
                <div class="row g-3">
                    <div class="col-6">
                        <div class="attendance-item text-center p-3 rounded-3 bg-light border">
                            <div class="attendance-icon mb-2">
                                <div class="rounded-circle bg-success bg-gradient text-white d-inline-flex justify-content-center align-items-center"
                                    style="width: 50px; height: 50px;">
                                    <i class="bi bi-box-arrow-in-right fs-5"></i>
                                </div>
                            </div>
                            <div class="attendance-info">
                                <p class="mb-1 text-muted small">Waktu Masuk</p>
                                <h6 class="mb-0 fw-bold text-success">{{ attendanceData.checkIn }}</h6>
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="attendance-item text-center p-3 rounded-3 bg-light border">
                            <div class="attendance-icon mb-2">
                                <div class="rounded-circle bg-danger bg-gradient text-white d-inline-flex justify-content-center align-items-center"
                                    style="width: 50px; height: 50px;">
                                    <i class="bi bi-box-arrow-left fs-5"></i>
                                </div>
                            </div>
                            <div class="attendance-info">
                                <p class="mb-1 text-muted small">Waktu Keluar</p>
                                <h6 class="mb-0 fw-bold text-danger">{{ attendanceData.checkOut }}</h6>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="work-hours-info mt-3 p-3 bg-primary bg-opacity-10 rounded-3 text-center">
                    <small class="text-primary">
                        <i class="bi bi-clock me-1"></i>
                        Jam Kerja: {{ attendanceData.workHours }}
                    </small>
                </div>
            </div>
        </div>
    </div>

    <!-- Quick Actions Menu -->
    <div class="container mb-3">
        <div class="section-header mb-3">
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <h6 class="mb-1 fw-bold text-dark">
                        <i class="bi bi-grid-3x3-gap text-primary me-2"></i>
                        Menu Utama
                    </h6>
                    <p class="text-muted small mb-0">Akses cepat fitur-fitur penting</p>
                </div>
                <button class="btn btn-outline-primary btn-sm rounded-pill">
                    <i class="bi bi-grid me-1"></i>
                    Lihat Semua
                </button>
            </div>
        </div>
        
        <div class="row g-3">
            <!-- Jadwal Card -->
            <div class="col-4">
                <MenuItemComponent :to="'/schedule'">
                    <div class="menu-card text-center p-3 rounded-3 border-0 shadow-sm bg-white h-100 position-relative overflow-hidden">
                        <div class="menu-bg bg-primary bg-opacity-10 position-absolute w-100 h-100 start-0 top-0"></div>
                        <div class="menu-content position-relative">
                            <div class="menu-icon mb-3">
                                <div class="rounded-circle bg-primary bg-gradient text-white d-inline-flex justify-content-center align-items-center"
                                    style="width: 60px; height: 60px;">
                                    <i class="bi bi-calendar-event fs-4"></i>
                                </div>
                            </div>
                            <h6 class="mb-1 fw-bold text-dark">Jadwal</h6>
                            <small class="text-muted">Lihat jadwal pelajaran</small>
                        </div>
                    </div>
                </MenuItemComponent>
            </div>

            <!-- Absensi Card -->
            <div class="col-4">
                <MenuItemComponent :to="'/absence'">
                    <div class="menu-card text-center p-3 rounded-3 border-0 shadow-sm bg-white h-100 position-relative overflow-hidden">
                        <div class="menu-bg bg-success bg-opacity-10 position-absolute w-100 h-100 start-0 top-0"></div>
                        <div class="menu-content position-relative">
                            <div class="menu-icon mb-3">
                                <div class="rounded-circle bg-success bg-gradient text-white d-inline-flex justify-content-center align-items-center"
                                    style="width: 60px; height: 60px;">
                                    <i class="bi bi-person-check fs-4"></i>
                                </div>
                            </div>
                            <h6 class="mb-1 fw-bold text-dark">Absensi</h6>
                            <small class="text-muted">Kelola kehadiran</small>
                        </div>
                    </div>
                </MenuItemComponent>
            </div>

            <!-- Poin Siswa Card -->
            <div class="col-4">
                <MenuItemComponent :to="'/points'">
                    <div class="menu-card text-center p-3 rounded-3 border-0 shadow-sm bg-white h-100 position-relative overflow-hidden">
                        <div class="menu-bg bg-warning bg-opacity-10 position-absolute w-100 h-100 start-0 top-0"></div>
                        <div class="menu-content position-relative">
                            <div class="menu-icon mb-3">
                                <div class="rounded-circle bg-warning bg-gradient text-white d-inline-flex justify-content-center align-items-center"
                                    style="width: 60px; height: 60px;">
                                    <i class="bi bi-award fs-4"></i>
                                </div>
                            </div>
                            <h6 class="mb-1 fw-bold text-dark">Poin Siswa</h6>
                            <small class="text-muted">Lihat pencapaian</small>
                        </div>
                    </div>
                </MenuItemComponent>
            </div>
        </div>
    </div>

    <!-- Weekly Performance Overview -->
    <div class="container mb-3">
        <div class="section-header mb-3">
            <h6 class="mb-1 fw-bold text-dark">
                <i class="bi bi-bar-chart text-primary me-2"></i>
                Performa Minggu Ini
            </h6>
            <p class="text-muted small mb-0">Ringkasan pencapaian dan progress belajar</p>
        </div>
        
        <div class="card border-0 shadow-sm">
            <div class="card-body p-4">
                <div class="row g-4">
                    <div class="col-4">
                        <div class="performance-stat text-center">
                            <div class="stat-circle mb-3">
                                <svg width="80" height="80" viewBox="0 0 80 80">
                                    <circle cx="40" cy="40" r="35" fill="none" stroke="#e9ecef" stroke-width="6"/>
                                    <circle cx="40" cy="40" r="35" fill="none" stroke="#28a745" stroke-width="6"
                                            stroke-dasharray="220" :stroke-dashoffset="220 - (220 * weeklyProgress.attendance / 100)"
                                            stroke-linecap="round" transform="rotate(-90 40 40)"/>
                                    <text x="40" y="45" text-anchor="middle" class="h6 fw-bold" fill="#28a745">{{ weeklyProgress.attendance }}%</text>
                                </svg>
                            </div>
                            <h6 class="mb-1 text-success">Kehadiran</h6>
                            <small class="text-muted">Sangat Baik</small>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="performance-stat text-center">
                            <div class="stat-circle mb-3">
                                <svg width="80" height="80" viewBox="0 0 80 80">
                                    <circle cx="40" cy="40" r="35" fill="none" stroke="#e9ecef" stroke-width="6"/>
                                    <circle cx="40" cy="40" r="35" fill="none" stroke="#ffc107" stroke-width="6"
                                            stroke-dasharray="220" :stroke-dashoffset="220 - (220 * weeklyProgress.assignments / 100)"
                                            stroke-linecap="round" transform="rotate(-90 40 40)"/>
                                    <text x="40" y="45" text-anchor="middle" class="h6 fw-bold" fill="#ffc107">{{ weeklyProgress.assignments }}%</text>
                                </svg>
                            </div>
                            <h6 class="mb-1 text-warning">Tugas</h6>
                            <small class="text-muted">Perlu Ditingkatkan</small>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="performance-stat text-center">
                            <div class="stat-circle mb-3">
                                <svg width="80" height="80" viewBox="0 0 80 80">
                                    <circle cx="40" cy="40" r="35" fill="none" stroke="#e9ecef" stroke-width="6"/>
                                    <circle cx="40" cy="40" r="35" fill="none" stroke="#007bff" stroke-width="6"
                                            stroke-dasharray="220" :stroke-dashoffset="220 - (220 * weeklyProgress.performance / 100)"
                                            stroke-linecap="round" transform="rotate(-90 40 40)"/>
                                    <text x="40" y="45" text-anchor="middle" class="h6 fw-bold" fill="#007bff">{{ weeklyProgress.performance }}%</text>
                                </svg>
                            </div>
                            <h6 class="mb-1 text-primary">Nilai</h6>
                            <small class="text-muted">Baik</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Upcoming Schedule Section -->
    <div class="container mb-4">
        <div class="section-header mb-3">
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <h6 class="mb-1 fw-bold text-dark">
                        <i class="bi bi-calendar-week text-primary me-2"></i>
                        Jadwal Terdekat
                    </h6>
                    <p class="text-muted small mb-0">Mata pelajaran hari ini</p>
                </div>
                <router-link to="/schedule" class="btn btn-outline-primary btn-sm rounded-pill">
                    <i class="bi bi-arrow-right me-1"></i>
                    Lihat Semua
                </router-link>
            </div>
        </div>
        
        <div class="schedule-container">
            <div class="row g-3">
                <div v-for="schedule in upcomingSchedule" :key="schedule.id" class="col-12">
                    <ScheduleItemComponent :schedule="schedule" />
                </div>
            </div>
        </div>
    </div>

    <div class="pb-4"></div>
</template>

<style scoped>
/* Home Header Card Styling - Adopsi dari ScheduleView */
.home-header-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 120px;
}

.home-bg-pattern {
  position: absolute;
  top: 0;
  right: 0;
  width: 100px;
  height: 100px;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="2"/><circle cx="50" cy="50" r="25" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="2"/><path d="M25 75 L75 25" stroke="rgba(255,255,255,0.1)" stroke-width="2"/></svg>') no-repeat center;
  background-size: contain;
}

/* Stat Cards - Style konsisten dengan ScheduleView */
.stat-card {
  transition: all 0.3s ease;
  cursor: pointer;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.15) !important;
}

.stat-icon {
  transition: transform 0.3s ease;
}

.stat-card:hover .stat-icon {
  transform: scale(1.1);
}

/* Attendance Cards */
.attendance-item {
  transition: all 0.3s ease;
  cursor: pointer;
}

.attendance-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.15) !important;
}

.attendance-icon {
  transition: transform 0.3s ease;
}

.attendance-item:hover .attendance-icon {
  transform: scale(1.1);
}

/* Menu Cards */
.menu-card {
  transition: all 0.3s ease;
  cursor: pointer;
  border: 2px solid transparent;
}

.menu-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 35px rgba(0,0,0,0.15) !important;
  border-color: var(--bs-primary);
}

.menu-bg {
  transition: opacity 0.3s ease;
  opacity: 0.3;
}

.menu-card:hover .menu-bg {
  opacity: 0.6;
}

.menu-icon {
  transition: transform 0.3s ease;
}

.menu-card:hover .menu-icon {
  transform: scale(1.15);
}

/* Section Headers - Style konsisten dengan ScheduleView */
.section-header {
  padding-left: 15px;
  border-left: 4px solid var(--bs-primary);
  background: linear-gradient(90deg, rgba(102, 126, 234, 0.1) 0%, transparent 100%);
  padding: 15px;
  border-radius: 8px;
}

/* Time Display */
.current-time {
  font-family: 'Courier New', monospace;
  letter-spacing: 1px;
}

/* Performance Stats - Circular Progress */
.performance-stat {
  transition: all 0.3s ease;
}

.performance-stat:hover {
  transform: scale(1.05);
}

.stat-circle {
  transition: transform 0.3s ease;
}

.performance-stat:hover .stat-circle {
  transform: scale(1.1);
}

/* Schedule Container */
.schedule-container {
  max-height: 400px;
  overflow-y: auto;
}

.schedule-container::-webkit-scrollbar {
  width: 6px;
}

.schedule-container::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.schedule-container::-webkit-scrollbar-thumb {
  background: var(--bs-primary);
  border-radius: 3px;
}

.schedule-container::-webkit-scrollbar-thumb:hover {
  background: var(--bs-primary);
  opacity: 0.8;
}

/* Work Hours Info */
.work-hours-info {
  border: 2px dashed var(--bs-primary);
  background: linear-gradient(45deg, rgba(102, 126, 234, 0.1), rgba(102, 126, 234, 0.05));
}

/* Badge improvements */
.badge {
  font-weight: 500;
  padding: 6px 12px;
  font-size: 0.7rem;
  letter-spacing: 0.5px;
}

/* Button improvements */
.btn-outline-primary {
  border-width: 2px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-outline-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
}

/* Responsive adjustments */
@media (max-width: 576px) {
  .home-header-card .card-body {
    padding: 20px !important;
  }
  
  .menu-card {
    min-height: 120px;
  }
  
  .attendance-item {
    min-height: 100px;
  }
  
  .stat-card {
    min-height: 100px;
    margin-bottom: 10px;
  }
  
  .performance-stat {
    margin-bottom: 20px;
  }
}

/* Animation for loading - konsisten dengan ScheduleView */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.container {
  animation: fadeInUp 0.6s ease-out;
}

.container:nth-child(2) {
  animation-delay: 0.1s;
}

.container:nth-child(3) {
  animation-delay: 0.2s;
}

.container:nth-child(4) {
  animation-delay: 0.3s;
}

.container:nth-child(5) {
  animation-delay: 0.4s;
}

.container:nth-child(6) {
  animation-delay: 0.5s;
}

/* SVG Animations for circular progress */
.stat-circle svg circle:last-child {
  transition: stroke-dashoffset 0.8s ease-in-out;
}

/* Hover effects for interactive elements */
.cursor-pointer {
  cursor: pointer;
}

.transition-all {
  transition: all 0.3s ease;
}

/* Custom animations for stats */
@keyframes countUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.stat-card h6 {
  animation: countUp 0.6s ease-out;
}

/* Performance indicators colors */
.text-excellent {
  color: #28a745 !important;
}

.text-good {
  color: #007bff !important;
}

.text-fair {
  color: #ffc107 !important;
}

.text-poor {
  color: #dc3545 !important;
}

/* Additional hover effects for better UX */
.card:hover {
  transition: all 0.3s ease;
}

.section-header:hover {
  background: linear-gradient(90deg, rgba(102, 126, 234, 0.15) 0%, transparent 100%);
}

/* Custom spacing untuk layout yang lebih rapi */
.mb-3 {
  margin-bottom: 1.5rem !important;
}

.p-4 {
  padding: 1.5rem !important;
}

/* Consistent border radius */
.rounded-3 {
  border-radius: 0.75rem !important;
}

/* Shadow consistency */
.shadow-sm {
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
}

.shadow-lg {
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175) !important;
}
</style>