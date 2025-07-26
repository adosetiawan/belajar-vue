<script setup>
import { ref, computed, onMounted } from 'vue';
import ScheduleItemComponent from '@/components/ScheduleItemComponent.vue';

// Data reaktif
const currentTime = ref(new Date());
const selectedDay = ref('today');
const selectedWeek = ref('current');

// Sample schedule data
const scheduleData = ref([
  {
    id: 1,
    subject: 'Matematika',
    teacher: 'Ibu Sarah',
    time: '07:30 - 09:00',
    room: 'Ruang 101',
    status: 'upcoming',
    color: 'primary'
  },
  {
    id: 2,
    subject: 'Bahasa Indonesia',
    teacher: 'Pak Ahmad',
    time: '09:15 - 10:45',
    room: 'Ruang 102',
    status: 'current',
    color: 'success'
  },
  {
    id: 3,
    subject: 'Fisika',
    teacher: 'Ibu Diana',
    time: '11:00 - 12:30',
    room: 'Lab Fisika',
    status: 'upcoming',
    color: 'info'
  },
  {
    id: 4,
    subject: 'Kimia',
    teacher: 'Pak Budi',
    time: '13:30 - 15:00',
    room: 'Lab Kimia',
    status: 'upcoming',
    color: 'warning'
  },
  {
    id: 5,
    subject: 'Sejarah',
    teacher: 'Ibu Maya',
    time: '15:15 - 16:45',
    room: 'Ruang 103',
    status: 'upcoming',
    color: 'secondary'
  }
]);

const weekdays = ref([
  { id: 'monday', name: 'Senin', short: 'Sen', date: '26' },
  { id: 'tuesday', name: 'Selasa', short: 'Sel', date: '27' },
  { id: 'wednesday', name: 'Rabu', short: 'Rab', date: '28' },
  { id: 'thursday', name: 'Kamis', short: 'Kam', date: '29' },
  { id: 'friday', name: 'Jumat', short: 'Jum', date: '30' },
]);

// Computed properties
const currentDate = computed(() => {
  return currentTime.value.toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

const currentTimeString = computed(() => {
  return currentTime.value.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit'
  });
});

const todayScheduleCount = computed(() => {
  return scheduleData.value.length;
});

const currentSubject = computed(() => {
  const current = scheduleData.value.find(item => item.status === 'current');
  return current ? current.subject : 'Istirahat';
});

// Methods
const selectDay = (day) => {
  selectedDay.value = day;
};

const getStatusBadgeClass = (status) => {
  switch (status) {
    case 'current':
      return 'bg-success';
    case 'upcoming':
      return 'bg-primary';
    case 'completed':
      return 'bg-secondary';
    default:
      return 'bg-light text-dark';
  }
};

// Update waktu setiap detik
onMounted(() => {
  setInterval(() => {
    currentTime.value = new Date();
  }, 1000);
});
</script>

<template>
    <!-- Header Schedule Section -->
    <div class="container mb-3">
        <div class="card schedule-header-card bg-gradient-primary text-white shadow-lg border-0 position-relative overflow-hidden">
            <div class="schedule-bg-pattern"></div>
            <div class="card-body p-4 position-relative">
                <div class="row align-items-center">
                    <div class="col-8">
                        <div class="schedule-header-content">
                            <h5 class="mb-1 fw-bold">📚 Jadwal Pelajaran</h5>
                            <p class="mb-2 opacity-90">{{ currentDate }}</p>
                            <div class="d-flex align-items-center">
                                <i class="bi bi-clock me-2"></i>
                                <small class="opacity-75">Mata pelajaran saat ini: {{ currentSubject }}</small>
                            </div>
                        </div>
                    </div>
                    <div class="col-4 text-end">
                        <div class="schedule-stats">
                            <div class="current-time fw-bold h4 mb-0">{{ currentTimeString }}</div>
                            <small class="opacity-75">{{ todayScheduleCount }} pelajaran hari ini</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Weekly Navigation -->
    <div class="container mb-3">
        <div class="card shadow-sm border-0">
            <div class="card-header bg-transparent border-0 pb-2">
                <h6 class="mb-0 fw-bold text-dark">
                    <i class="bi bi-calendar-week text-primary me-2"></i>
                    Pilih Hari
                </h6>
            </div>
            <div class="card-body pt-2">
                <div class="row g-2">
                    <div v-for="day in weekdays" :key="day.id" class="col">
                        <div class="day-selector text-center p-3 rounded-3 cursor-pointer transition-all"
                             :class="selectedDay === day.id ? 'bg-primary text-white shadow-sm' : 'bg-light text-dark hover-lift'"
                             @click="selectDay(day.id)">
                            <div class="day-date fw-bold h6 mb-1">{{ day.date }}</div>
                            <small class="day-name">{{ day.short }}</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Quick Stats -->
    <div class="container mb-3">
        <div class="row g-3">
            <div class="col-4">
                <div class="stat-card text-center p-3 rounded-3 bg-white shadow-sm border h-100">
                    <div class="stat-icon mb-2">
                        <div class="rounded-circle bg-success bg-gradient text-white d-inline-flex justify-content-center align-items-center"
                            style="width: 50px; height: 50px;">
                            <i class="bi bi-check-circle fs-5"></i>
                        </div>
                    </div>
                    <h6 class="mb-1 fw-bold text-success">2</h6>
                    <small class="text-muted">Selesai</small>
                </div>
            </div>
            <div class="col-4">
                <div class="stat-card text-center p-3 rounded-3 bg-white shadow-sm border h-100">
                    <div class="stat-icon mb-2">
                        <div class="rounded-circle bg-primary bg-gradient text-white d-inline-flex justify-content-center align-items-center"
                            style="width: 50px; height: 50px;">
                            <i class="bi bi-play-circle fs-5"></i>
                        </div>
                    </div>
                    <h6 class="mb-1 fw-bold text-primary">1</h6>
                    <small class="text-muted">Sedang Berlangsung</small>
                </div>
            </div>
            <div class="col-4">
                <div class="stat-card text-center p-3 rounded-3 bg-white shadow-sm border h-100">
                    <div class="stat-icon mb-2">
                        <div class="rounded-circle bg-warning bg-gradient text-white d-inline-flex justify-content-center align-items-center"
                            style="width: 50px; height: 50px;">
                            <i class="bi bi-clock fs-5"></i>
                        </div>
                    </div>
                    <h6 class="mb-1 fw-bold text-warning">2</h6>
                    <small class="text-muted">Akan Datang</small>
                </div>
            </div>
        </div>
    </div>

    <!-- Today's Schedule -->
    <div class="container mb-3">
        <div class="section-header mb-3">
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <h6 class="mb-1 fw-bold text-dark">
                        <i class="bi bi-list-ul text-primary me-2"></i>
                        Jadwal Hari Ini
                    </h6>
                    <p class="text-muted small mb-0">Semua mata pelajaran untuk hari ini</p>
                </div>
                <div class="dropdown">
                    <button class="btn btn-outline-primary btn-sm dropdown-toggle rounded-pill" type="button" 
                            data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="bi bi-filter me-1"></i>
                        Filter
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">Semua</a></li>
                        <li><a class="dropdown-item" href="#">Sedang Berlangsung</a></li>
                        <li><a class="dropdown-item" href="#">Akan Datang</a></li>
                        <li><a class="dropdown-item" href="#">Selesai</a></li>
                    </ul>
                </div>
            </div>
        </div>
        
        <div class="schedule-list">
            <div v-for="(schedule, index) in scheduleData" :key="schedule.id" class="mb-3">
                <div class="schedule-item card border-0 shadow-sm position-relative overflow-hidden">
                    <div class="status-indicator position-absolute start-0 top-0 h-100"
                         :class="`bg-${schedule.color}`" style="width: 4px;"></div>
                    
                    <div class="card-body p-4">
                        <div class="row align-items-center">
                            <div class="col-8">
                                <div class="schedule-content">
                                    <div class="d-flex align-items-center mb-2">
                                        <h6 class="mb-0 fw-bold text-dark me-2">{{ schedule.subject }}</h6>
                                        <span class="badge rounded-pill px-3" :class="getStatusBadgeClass(schedule.status)">
                                            <i v-if="schedule.status === 'current'" class="bi bi-play-fill me-1"></i>
                                            <i v-else-if="schedule.status === 'upcoming'" class="bi bi-clock me-1"></i>
                                            <i v-else class="bi bi-check-circle me-1"></i>
                                            {{ schedule.status === 'current' ? 'Sedang Berlangsung' : 
                                               schedule.status === 'upcoming' ? 'Akan Datang' : 'Selesai' }}
                                        </span>
                                    </div>
                                    <div class="schedule-details">
                                        <div class="d-flex align-items-center mb-1">
                                            <i class="bi bi-person text-muted me-2"></i>
                                            <small class="text-muted">{{ schedule.teacher }}</small>
                                        </div>
                                        <div class="d-flex align-items-center">
                                            <i class="bi bi-geo-alt text-muted me-2"></i>
                                            <small class="text-muted">{{ schedule.room }}</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-4 text-end">
                                <div class="schedule-time">
                                    <div class="time-display">
                                        <div class="fw-bold h6 mb-0" :class="`text-${schedule.color}`">
                                            {{ schedule.time }}
                                        </div>
                                        <small class="text-muted">90 menit</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Action buttons for current/upcoming classes -->
                        <div v-if="schedule.status !== 'completed'" class="schedule-actions mt-3 pt-3 border-top">
                            <div class="row g-2">
                                <div class="col-6">
                                    <button class="btn btn-outline-primary btn-sm w-100 rounded-pill">
                                        <i class="bi bi-journal-text me-1"></i>
                                        Materi
                                    </button>
                                </div>
                                <div class="col-6">
                                    <button class="btn btn-outline-success btn-sm w-100 rounded-pill">
                                        <i class="bi bi-camera-video me-1"></i>
                                        Join Class
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Weekly Overview -->
    <div class="container mb-4">
        <div class="section-header mb-3">
            <h6 class="mb-1 fw-bold text-dark">
                <i class="bi bi-calendar-month text-primary me-2"></i>
                Ringkasan Minggu Ini
            </h6>
            <p class="text-muted small mb-0">Total jam pelajaran dan mata pelajaran</p>
        </div>
        
        <div class="card border-0 shadow-sm">
            <div class="card-body p-4">
                <div class="row g-4">
                    <div class="col-6">
                        <div class="weekly-stat text-center">
                            <div class="stat-number h3 fw-bold text-primary mb-1">25</div>
                            <div class="stat-label text-muted">Total Jam Pelajaran</div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="weekly-stat text-center">
                            <div class="stat-number h3 fw-bold text-success mb-1">8</div>
                            <div class="stat-label text-muted">Mata Pelajaran</div>
                        </div>
                    </div>
                </div>
                
                <div class="progress-section mt-4">
                    <div class="d-flex justify-content-between mb-2">
                        <small class="text-muted">Progress Minggu Ini</small>
                        <small class="text-muted">68%</small>
                    </div>
                    <div class="progress" style="height: 8px;">
                        <div class="progress-bar bg-gradient bg-primary" role="progressbar" 
                             style="width: 68%" aria-valuenow="68" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="pb-4"></div>
</template>