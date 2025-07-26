<script setup>
import { ref, computed, onMounted } from 'vue';

// Data reaktif
const currentTime = ref(new Date());
const selectedPeriod = ref('current-month');
const selectedCategory = ref('all');

// Student points data
const studentPoints = ref({
  totalPoints: 85,
  positivePoints: 95,
  negativePoints: 10,
  netPoints: 85,
  ranking: 12,
  totalStudents: 240,
  grade: 'B+',
  status: 'good'
});

// Points categories
const pointsCategories = ref([
  { id: 'academic', name: 'Akademik', icon: 'bi-book', color: 'primary', points: 45 },
  { id: 'discipline', name: 'Kedisiplinan', icon: 'bi-shield-check', color: 'success', points: 25 },
  { id: 'social', name: 'Sosial', icon: 'bi-people', color: 'info', points: 15 },
  { id: 'violation', name: 'Pelanggaran', icon: 'bi-exclamation-triangle', color: 'danger', points: -10 }
]);

// Recent points history
const pointsHistory = ref([
  {
    id: 1,
    date: '2025-01-26',
    category: 'academic',
    type: 'positive',
    points: 10,
    reason: 'Juara 1 Olimpiade Matematika',
    teacher: 'Ibu Sarah',
    status: 'approved'
  },
  {
    id: 2,
    date: '2025-01-25',
    category: 'discipline',
    type: 'positive',
    points: 5,
    reason: 'Datang tepat waktu selama 1 minggu',
    teacher: 'Pak Ahmad',
    status: 'approved'
  },
  {
    id: 3,
    date: '2025-01-24',
    category: 'social',
    type: 'positive',
    points: 8,
    reason: 'Membantu teman dalam belajar',
    teacher: 'Ibu Diana',
    status: 'approved'
  },
  {
    id: 4,
    date: '2025-01-23',
    category: 'violation',
    type: 'negative',
    points: -5,
    reason: 'Terlambat masuk kelas',
    teacher: 'Pak Budi',
    status: 'approved'
  },
  {
    id: 5,
    date: '2025-01-22',
    category: 'academic',
    type: 'positive',
    points: 7,
    reason: 'Mengumpulkan tugas tepat waktu',
    teacher: 'Ibu Maya',
    status: 'pending'
  }
]);

// Achievements data
const achievements = ref([
  {
    id: 1,
    title: 'Siswa Teladan',
    description: 'Mencapai 80+ poin dalam 1 semester',
    icon: 'bi-trophy',
    color: 'warning',
    achieved: true,
    date: '2025-01-15'
  },
  {
    id: 2,
    title: 'Perfect Attendance',
    description: 'Tidak pernah absen dalam 1 bulan',
    icon: 'bi-calendar-check',
    color: 'success',
    achieved: true,
    date: '2025-01-10'
  },
  {
    id: 3,
    title: 'Academic Star',
    description: 'Mencapai 50+ poin akademik',
    icon: 'bi-star',
    color: 'primary',
    achieved: false,
    progress: 90
  },
  {
    id: 4,
    title: 'Social Leader',
    description: 'Mencapai 30+ poin sosial',
    icon: 'bi-people',
    color: 'info',
    achieved: false,
    progress: 50
  }
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

const gradeColor = computed(() => {
  const grade = studentPoints.value.grade;
  if (grade.startsWith('A')) return 'success';
  if (grade.startsWith('B')) return 'primary';
  if (grade.startsWith('C')) return 'warning';
  return 'danger';
});

const pointsPercentage = computed(() => {
  return Math.min((studentPoints.value.totalPoints / 100) * 100, 100);
});

const rankingPercentile = computed(() => {
  const rank = studentPoints.value.ranking;
  const total = studentPoints.value.totalStudents;
  return Math.round(((total - rank + 1) / total) * 100);
});

const filteredHistory = computed(() => {
  if (selectedCategory.value === 'all') {
    return pointsHistory.value;
  }
  return pointsHistory.value.filter(item => item.category === selectedCategory.value);
});

// Methods
const getCategoryInfo = (categoryId) => {
  return pointsCategories.value.find(cat => cat.id === categoryId) || {};
};

const getPointsColor = (points) => {
  return points > 0 ? 'text-success' : 'text-danger';
};

const getStatusBadgeClass = (status) => {
  switch (status) {
    case 'approved':
      return 'bg-success';
    case 'pending':
      return 'bg-warning';
    case 'rejected':
      return 'bg-danger';
    default:
      return 'bg-secondary';
  }
};

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};

// Update waktu setiap detik
onMounted(() => {
  setInterval(() => {
    currentTime.value = new Date();
  }, 1000);
});
</script>

<template>
    <!-- Header Points Section -->
    <div class="container mb-3">
        <div class="card points-header-card bg-gradient-primary text-white shadow-lg border-0 position-relative overflow-hidden">
            <div class="points-bg-pattern"></div>
            <div class="card-body p-4 position-relative">
                <div class="row align-items-center">
                    <div class="col-8">
                        <div class="points-header-content">
                            <h5 class="mb-1 fw-bold">🏆 Poin Siswa</h5>
                            <p class="mb-2 opacity-90">{{ currentDate }}</p>
                            <div class="d-flex align-items-center">
                                <i class="bi bi-trophy me-2"></i>
                                <small class="opacity-75">Status: {{ studentPoints.status === 'good' ? 'Baik' : 'Perlu Perbaikan' }}</small>
                            </div>
                        </div>
                    </div>
                    <div class="col-4 text-end">
                        <div class="points-stats">
                            <div class="total-points fw-bold h3 mb-0">{{ studentPoints.totalPoints }}</div>
                            <small class="opacity-75">Total Poin</small>
                            <div class="ranking-info mt-1">
                                <small class="badge bg-white bg-opacity-20 rounded-pill">
                                    Peringkat #{{ studentPoints.ranking }}
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Points Overview -->
    <div class="container mb-3">
        <div class="row g-3">
            <div class="col-6">
                <div class="stat-card text-center p-3 rounded-3 bg-white shadow-sm border h-100">
                    <div class="stat-icon mb-2">
                        <div class="rounded-circle bg-success bg-gradient text-white d-inline-flex justify-content-center align-items-center"
                             style="width: 50px; height: 50px;">
                            <i class="bi bi-plus-circle fs-5"></i>
                        </div>
                    </div>
                    <h6 class="mb-1 fw-bold text-success">+{{ studentPoints.positivePoints }}</h6>
                    <small class="text-muted">Poin Positif</small>
                </div>
            </div>
            <div class="col-6">
                <div class="stat-card text-center p-3 rounded-3 bg-white shadow-sm border h-100">
                    <div class="stat-icon mb-2">
                        <div class="rounded-circle bg-danger bg-gradient text-white d-inline-flex justify-content-center align-items-center"
                             style="width: 50px; height: 50px;">
                            <i class="bi bi-dash-circle fs-5"></i>
                        </div>
                    </div>
                    <h6 class="mb-1 fw-bold text-danger">-{{ studentPoints.negativePoints }}</h6>
                    <small class="text-muted">Poin Negatif</small>
                </div>
            </div>
        </div>
    </div>

    <!-- Grade & Ranking -->
    <div class="container mb-3">
        <div class="card shadow-sm border-0">
            <div class="card-body p-4">
                <div class="row g-4">
                    <div class="col-6">
                        <div class="grade-display text-center">
                            <div class="grade-circle mx-auto mb-2" 
                                 :class="`bg-${gradeColor} bg-gradient`"
                                 style="width: 80px; height: 80px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                                <span class="text-white fw-bold h4 mb-0">{{ studentPoints.grade }}</span>
                            </div>
                            <h6 class="mb-1 fw-bold" :class="`text-${gradeColor}`">Grade Poin</h6>
                            <small class="text-muted">{{ studentPoints.totalPoints }} dari 100 poin</small>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="ranking-display text-center">
                            <div class="ranking-number h2 fw-bold text-primary mb-1">#{{ studentPoints.ranking }}</div>
                            <h6 class="mb-1 fw-bold">Peringkat Kelas</h6>
                            <small class="text-muted">Top {{ rankingPercentile }}% dari {{ studentPoints.totalStudents }} siswa</small>
                            <div class="progress mt-2" style="height: 6px;">
                                <div class="progress-bar bg-primary" style="width: 75%"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Points by Category -->
    <div class="container mb-3">
        <div class="section-header mb-3">
            <h6 class="mb-1 fw-bold text-dark">
                <i class="bi bi-pie-chart text-primary me-2"></i>
                Poin per Kategori
            </h6>
            <p class="text-muted small mb-0">Breakdown poin berdasarkan kategori</p>
        </div>
        
        <div class="row g-3">
            <div v-for="category in pointsCategories" :key="category.id" class="col-6">
                <div class="category-card p-3 rounded-3 bg-white shadow-sm border h-100">
                    <div class="d-flex align-items-center mb-2">
                        <div class="category-icon me-3">
                            <div class="rounded-circle d-inline-flex justify-content-center align-items-center"
                                 :class="`bg-${category.color} bg-gradient`"
                                 style="width: 40px; height: 40px;">
                                <i :class="category.icon" class="text-white"></i>
                            </div>
                        </div>
                        <div class="category-info flex-grow-1">
                            <h6 class="mb-0 fw-bold text-dark">{{ category.name }}</h6>
                            <span class="fw-bold h6 mb-0" :class="getPointsColor(category.points)">
                                {{ category.points > 0 ? '+' : '' }}{{ category.points }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Achievements -->
    <div class="container mb-3">
        <div class="section-header mb-3">
            <h6 class="mb-1 fw-bold text-dark">
                <i class="bi bi-award text-primary me-2"></i>
                Pencapaian
            </h6>
            <p class="text-muted small mb-0">Badge dan achievement yang telah diraih</p>
        </div>
        
        <div class="row g-3">
            <div v-for="achievement in achievements" :key="achievement.id" class="col-6">
                <div class="achievement-card p-3 rounded-3 bg-white shadow-sm border h-100 position-relative"
                     :class="achievement.achieved ? 'border-success' : 'border-light'">
                    <!-- Achievement Status -->
                    <div v-if="achievement.achieved" class="achievement-badge position-absolute top-0 end-0 p-2">
                        <i class="bi bi-check-circle-fill text-success"></i>
                    </div>
                    
                    <div class="achievement-content">
                        <div class="achievement-icon mb-2 text-center">
                            <div class="rounded-circle d-inline-flex justify-content-center align-items-center"
                                 :class="`bg-${achievement.color} ${achievement.achieved ? 'bg-gradient' : 'bg-opacity-25'}`"
                                 style="width: 50px; height: 50px;">
                                <i :class="[achievement.icon, achievement.achieved ? 'text-white' : `text-${achievement.color}`]"></i>
                            </div>
                        </div>
                        <h6 class="mb-1 fw-bold text-center" 
                            :class="achievement.achieved ? 'text-dark' : 'text-muted'">
                            {{ achievement.title }}
                        </h6>
                        <p class="small text-muted text-center mb-2">{{ achievement.description }}</p>
                        
                        <!-- Progress for unachieved -->
                        <div v-if="!achievement.achieved && achievement.progress" class="progress mt-2" style="height: 4px;">
                            <div class="progress-bar" 
                                 :class="`bg-${achievement.color}`"
                                 :style="`width: ${achievement.progress}%`"></div>
                        </div>
                        
                        <!-- Date for achieved -->
                        <div v-if="achievement.achieved" class="achievement-date text-center">
                            <small class="text-success fw-bold">
                                <i class="bi bi-calendar-check me-1"></i>
                                {{ formatDate(achievement.date) }}
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Points History -->
    <div class="container mb-4">
        <div class="section-header mb-3">
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <h6 class="mb-1 fw-bold text-dark">
                        <i class="bi bi-clock-history text-primary me-2"></i>
                        Riwayat Poin
                    </h6>
                    <p class="text-muted small mb-0">Aktivitas poin terbaru</p>
                </div>
                <div class="dropdown">
                    <button class="btn btn-outline-primary btn-sm dropdown-toggle rounded-pill" type="button" 
                            data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="bi bi-filter me-1"></i>
                        Filter
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#" @click="selectedCategory = 'all'">Semua</a></li>
                        <li><a class="dropdown-item" href="#" @click="selectedCategory = 'academic'">Akademik</a></li>
                        <li><a class="dropdown-item" href="#" @click="selectedCategory = 'discipline'">Kedisiplinan</a></li>
                        <li><a class="dropdown-item" href="#" @click="selectedCategory = 'social'">Sosial</a></li>
                        <li><a class="dropdown-item" href="#" @click="selectedCategory = 'violation'">Pelanggaran</a></li>
                    </ul>
                </div>
            </div>
        </div>
        
        <div class="history-list">
            <div v-for="record in filteredHistory" :key="record.id" class="mb-3">
                <div class="history-item card border-0 shadow-sm position-relative overflow-hidden">
                    <div class="status-indicator position-absolute start-0 top-0 h-100"
                         :class="`bg-${getCategoryInfo(record.category).color}`" style="width: 4px;"></div>
                    
                    <div class="card-body p-4">
                        <div class="row align-items-center">
                            <div class="col-8">
                                <div class="history-content">
                                    <div class="d-flex align-items-center mb-2">
                                        <div class="category-icon me-3">
                                            <div class="rounded-circle d-inline-flex justify-content-center align-items-center"
                                                 :class="`bg-${getCategoryInfo(record.category).color} bg-gradient`"
                                                 style="width: 35px; height: 35px;">
                                                <i :class="getCategoryInfo(record.category).icon" class="text-white small"></i>
                                            </div>
                                        </div>
                                        <div class="record-info flex-grow-1">
                                            <h6 class="mb-1 fw-bold text-dark">{{ record.reason }}</h6>
                                            <div class="d-flex align-items-center">
                                                <span class="badge rounded-pill px-3" :class="getStatusBadgeClass(record.status)">
                                                    {{ record.status === 'approved' ? 'Disetujui' : 
                                                       record.status === 'pending' ? 'Menunggu' : 'Ditolak' }}
                                                </span>
                                                <small class="text-muted ms-2">oleh {{ record.teacher }}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-4 text-end">
                                <div class="points-display">
                                    <div class="points-value fw-bold h6 mb-0" :class="getPointsColor(record.points)">
                                        {{ record.points > 0 ? '+' : '' }}{{ record.points }}
                                    </div>
                                    <small class="text-muted">{{ formatDate(record.date) }}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Load More Button -->
        <div class="text-center mt-3">
            <button class="btn btn-outline-primary rounded-pill">
                <i class="bi bi-arrow-clockwise me-1"></i>
                Muat Lebih Banyak
            </button>
        </div>
    </div>

    <div class="pb-4"></div>
</template>

<style scoped>
/* Points Header Card Styling - Konsisten dengan theme */
.points-header-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 120px;
}

.points-bg-pattern {
  position: absolute;
  top: 0;
  right: 0;
  width: 100px;
  height: 100px;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><polygon points="50,10 60,40 90,40 68,58 78,88 50,70 22,88 32,58 10,40 40,40" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="2"/><circle cx="50" cy="50" r="35" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="2"/></svg>') no-repeat center;
  background-size: contain;
}

/* Stat Cards - Style konsisten dengan halaman lain */
.stat-card {
  transition: all 0.3s ease;
  cursor: pointer;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15) !important;
}

.stat-icon {
  transition: transform 0.3s ease;
}

.stat-card:hover .stat-icon {
  transform: scale(1.1);
}

/* Grade Circle Animation */
.grade-circle {
  transition: all 0.3s ease;
  animation: fadeInScale 0.8s ease-out;
}

.grade-circle:hover {
  transform: scale(1.1);
}

/* Category Cards */
.category-card {
  transition: all 0.3s ease;
  cursor: pointer;
  border: 2px solid transparent;
}

.category-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1) !important;
  border-color: var(--bs-primary);
}

.category-icon {
  transition: transform 0.3s ease;
}

.category-card:hover .category-icon {
  transform: scale(1.1);
}

/* Achievement Cards */
.achievement-card {
  transition: all 0.3s ease;
  cursor: pointer;
  min-height: 180px;
}

.achievement-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15) !important;
}

.achievement-badge {
  animation: bounceIn 0.6s ease-out;
}

.achievement-icon {
  transition: transform 0.3s ease;
}

.achievement-card:hover .achievement-icon {
  transform: scale(1.1);
}

/* History Items */
.history-item {
  transition: all 0.3s ease;
  border-radius: 15px !important;
  background: white;
}

.history-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1) !important;
}

.status-indicator {
  border-radius: 0 0 0 15px;
}

/* Section Headers - Style konsisten dengan halaman lain */
.section-header {
  padding-left: 15px;
  border-left: 4px solid var(--bs-primary);
  background: linear-gradient(90deg, rgba(102, 126, 234, 0.1) 0%, transparent 100%);
  padding: 15px;
  border-radius: 8px;
}

/* Ranking Display */
.ranking-display {
  animation: fadeInUp 0.8s ease-out;
}

.ranking-number {
  background: linear-gradient(45deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Points Display */
.points-display {
  text-align: center;
}

.points-value {
  font-size: 1.2rem;
  font-weight: 700;
}

/* Button Improvements */
.btn-outline-primary {
  border-width: 2px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-outline-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
}

/* Badge Improvements */
.badge {
  font-weight: 500;
  padding: 6px 12px;
  font-size: 0.7rem;
  letter-spacing: 0.5px;
}

/* Progress Bar Enhancements */
.progress {
  border-radius: 10px;
  overflow: hidden;
}

.progress-bar {
  border-radius: 10px;
  transition: width 0.8s ease-in-out;
}

/* Animations */
@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

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

@keyframes bounceIn {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* Container Animations */
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

.container:nth-child(7) {
  animation-delay: 0.6s;
}

/* Text Colors for Points */
.text-positive {
  color: #28a745 !important;
}

.text-negative {
  color: #dc3545 !important;
}

/* Hover Effects */
.cursor-pointer {
  cursor: pointer;
}

.transition-all {
  transition: all 0.3s ease;
}

/* Responsive Design */
@media (max-width: 576px) {
  .points-header-card .card-body {
    padding: 20px !important;
  }
  
  .grade-circle {
    width: 60px !important;
    height: 60px !important;
  }
  
  .achievement-card {
    min-height: 150px;
  }
  
  .category-card {
    min-height: 100px;
  }
  
  .stat-card {
    min-height: 100px;
    margin-bottom: 10px;
  }
  
  .history-item .card-body {
    padding: 1rem;
  }
  
  .category-icon > div {
    width: 30px;
    height: 30px;
  }
  
  .points-value {
    font-size: 1rem;
  }
}

/* Custom Shadow Effects */
.shadow-sm {
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
}

.shadow-lg {
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175) !important;
}

/* Border Radius Consistency */
.rounded-3 {
  border-radius: 0.75rem !important;
}

/* Custom Spacing */
.mb-3 {
  margin-bottom: 1.5rem !important;
}

.p-4 {
  padding: 1.5rem !important;
}

/* Achievement Progress Animation */
.achievement-card .progress-bar {
  animation: progressFill 1.5s ease-in-out;
}

@keyframes progressFill {
  from {
    width: 0%;
  }
  to {
    width: var(--progress-width, 0%);
  }
}

/* Interactive Elements */
.section-header:hover {
  background: linear-gradient(90deg, rgba(102, 126, 234, 0.15) 0%, transparent 100%);
}

/* Grade Status Colors */
.grade-excellent { color: #28a745 !important; }
.grade-good { color: #007bff !important; }
.grade-fair { color: #ffc107 !important; }
.grade-poor { color: #dc3545 !important; }

/* Points Summary Enhancements */
.total-points {
  font-family: 'Arial', sans-serif;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Achievement Status Indicators */
.achievement-card.border-success {
  box-shadow: 0 0 0 2px rgba(40, 167, 69, 0.2);
}

/* Filter Button Enhancements */
.dropdown-toggle::after {
  margin-left: 0.5rem;
}

/* History List Scroll */
.history-list {
  max-height: 600px;
  overflow-y: auto;
}

.history-list::-webkit-scrollbar {
  width: 6px;
}

.history-list::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.history-list::-webkit-scrollbar-thumb {
  background: var(--bs-primary);
  border-radius: 3px;
}

.history-list::-webkit-scrollbar-thumb:hover {
  background: var(--bs-primary);
  opacity: 0.8;
}
</style>