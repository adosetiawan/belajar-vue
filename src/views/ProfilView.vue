<script setup>
import { ref, computed, onMounted } from 'vue';

// Data reaktif
const currentTime = ref(new Date());
const isEditing = ref(false);

// Student profile data
const studentProfile = ref({
  id: 'S123456',
  fullName: 'Ahmad Setiawan',
  username: '@ahmad.setiawan',
  email: 'ahmad.setiawan@sma1jakarta.sch.id',
  class: 'XII IPA 2',
  nisn: '1234567890',
  phone: '+62 812-3456-7890',
  address: 'Jl. Merdeka No. 123, Jakarta Pusat',
  dateOfBirth: '2007-05-15',
  gender: 'Laki-laki',
  parentName: 'Budi Setiawan',
  parentPhone: '+62 821-9876-5432',
  bio: 'Siswa aktif yang gemar belajar matematika dan fisika. Memiliki cita-cita menjadi insinyur.',
  status: 'active',
  joinDate: '2022-07-15',
  profileImage: '@/assets/img/bg-img/2.jpg'
});

// Academic info
const academicInfo = ref({
  semester: 'Ganjil 2024/2025',
  major: 'IPA (Ilmu Pengetahuan Alam)',
  advisor: 'Ibu Sarah Wijaya',
  totalCredits: 24,
  gpa: 3.75,
  ranking: 12,
  totalStudents: 240
});

// Quick stats
const profileStats = ref({
  attendance: 95,
  assignments: 78,
  points: 85,
  achievements: 8
});

// Recent activities
const recentActivities = ref([
  {
    id: 1,
    type: 'achievement',
    title: 'Meraih Juara 2 Olimpiade Matematika',
    date: '2025-01-20',
    icon: 'bi-trophy',
    color: 'warning'
  },
  {
    id: 2,
    type: 'assignment',
    title: 'Menyelesaikan Tugas Fisika',
    date: '2025-01-18',
    icon: 'bi-check-circle',
    color: 'success'
  },
  {
    id: 3,
    type: 'attendance',
    title: 'Hadir Tepat Waktu 10 Hari Berturut-turut',
    date: '2025-01-15',
    icon: 'bi-calendar-check',
    color: 'primary'
  }
]);

// Settings
const profileSettings = ref({
  notifications: true,
  emailUpdates: true,
  showPhone: false,
  showEmail: true,
  theme: 'light'
});

// Computed properties
const currentDate = computed(() => {
  return currentTime.value.toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

const studentAge = computed(() => {
  const birthDate = new Date(studentProfile.value.dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
});

const joinDuration = computed(() => {
  const joinDate = new Date(studentProfile.value.joinDate);
  const today = new Date();
  const diffTime = Math.abs(today - joinDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const years = Math.floor(diffDays / 365);
  const months = Math.floor((diffDays % 365) / 30);
  
  if (years > 0) {
    return `${years} tahun ${months} bulan`;
  }
  return `${months} bulan`;
});

const gradeColor = computed(() => {
  const gpa = academicInfo.value.gpa;
  if (gpa >= 3.5) return 'success';
  if (gpa >= 3.0) return 'primary';
  if (gpa >= 2.5) return 'warning';
  return 'danger';
});

// Methods
const toggleEdit = () => {
  isEditing.value = !isEditing.value;
};

const saveProfile = () => {
  // Simulate save operation
  isEditing.value = false;
  // Here you would typically send data to backend
};

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

const getActivityIcon = (type) => {
  switch (type) {
    case 'achievement': return 'bi-trophy';
    case 'assignment': return 'bi-check-circle';
    case 'attendance': return 'bi-calendar-check';
    default: return 'bi-circle';
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
    <!-- Header Profile Section -->
    <div class="container mb-3">
        <div class="card profile-header-card bg-gradient-primary text-white shadow-lg border-0 position-relative overflow-hidden">
            <div class="profile-bg-pattern"></div>
            <div class="card-body p-4 position-relative">
                <div class="row align-items-center">
                    <div class="col-8">
                        <div class="profile-header-content">
                            <h5 class="mb-1 fw-bold">👤 Profil Siswa</h5>
                            <p class="mb-2 opacity-90">{{ currentDate }}</p>
                            <div class="d-flex align-items-center">
                                <i class="bi bi-person-badge me-2"></i>
                                <small class="opacity-75">{{ studentProfile.class }} - NISN: {{ studentProfile.nisn }}</small>
                            </div>
                        </div>
                    </div>
                    <div class="col-4 text-end">
                        <div class="profile-actions">
                            <button @click="toggleEdit" class="btn btn-outline-light btn-sm rounded-pill">
                                <i :class="isEditing ? 'bi-x-lg' : 'bi-pencil'" class="me-1"></i>
                                {{ isEditing ? 'Batal' : 'Edit' }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Main Profile Card -->
    <div class="container mb-3">
        <div class="card shadow-sm border-0">
            <div class="card-body p-4">
                <div class="row">
                    <div class="col-12 col-md-4 text-center mb-4 mb-md-0">
                        <!-- Profile Image -->
                        <div class="profile-image-wrapper position-relative d-inline-block">
                            <div class="profile-image rounded-circle overflow-hidden shadow-lg position-relative">
                                <img :src="studentProfile.profileImage" alt="Profile" class="w-100 h-100 object-fit-cover">
                                <div v-if="isEditing" class="profile-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50">
                                    <i class="bi bi-camera text-white fs-4"></i>
                                </div>
                            </div>
                            <div v-if="isEditing" class="edit-photo-btn position-absolute bottom-0 end-0">
                                <button class="btn btn-primary btn-sm rounded-circle">
                                    <i class="bi bi-pencil"></i>
                                </button>
                            </div>
                            <!-- Status Indicator -->
                            <div class="status-indicator position-absolute top-0 end-0">
                                <span class="badge bg-success rounded-pill">
                                    <i class="bi bi-circle-fill"></i>
                                    Aktif
                                </span>
                            </div>
                        </div>
                        
                        <!-- Basic Info -->
                        <div class="profile-basic-info mt-3">
                            <h4 class="fw-bold text-dark mb-1">{{ studentProfile.fullName }}</h4>
                            <p class="text-muted mb-2">{{ studentProfile.class }}</p>
                            <div class="profile-badges">
                                <span class="badge bg-primary rounded-pill me-2">
                                    <i class="bi bi-mortarboard me-1"></i>
                                    {{ academicInfo.major }}
                                </span>
                                <span class="badge bg-success rounded-pill">
                                    <i class="bi bi-star me-1"></i>
                                    Ranking #{{ academicInfo.ranking }}
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-12 col-md-8">
                        <!-- Quick Stats -->
                        <div class="row g-3 mb-4">
                            <div class="col-6 col-sm-3">
                                <div class="stat-mini text-center p-3 bg-light rounded-3">
                                    <div class="stat-value h5 fw-bold text-success mb-1">{{ profileStats.attendance }}%</div>
                                    <small class="text-muted">Kehadiran</small>
                                </div>
                            </div>
                            <div class="col-6 col-sm-3">
                                <div class="stat-mini text-center p-3 bg-light rounded-3">
                                    <div class="stat-value h5 fw-bold text-primary mb-1">{{ profileStats.assignments }}%</div>
                                    <small class="text-muted">Tugas</small>
                                </div>
                            </div>
                            <div class="col-6 col-sm-3">
                                <div class="stat-mini text-center p-3 bg-light rounded-3">
                                    <div class="stat-value h5 fw-bold text-warning mb-1">{{ profileStats.points }}</div>
                                    <small class="text-muted">Poin</small>
                                </div>
                            </div>
                            <div class="col-6 col-sm-3">
                                <div class="stat-mini text-center p-3 bg-light rounded-3">
                                    <div class="stat-value h5 fw-bold text-info mb-1">{{ profileStats.achievements }}</div>
                                    <small class="text-muted">Achievement</small>
                                </div>
                            </div>
                        </div>

                        <!-- Academic Info -->
                        <div class="academic-summary p-3 bg-primary bg-opacity-10 rounded-3">
                            <h6 class="fw-bold text-primary mb-3">
                                <i class="bi bi-book me-2"></i>
                                Informasi Akademik
                            </h6>
                            <div class="row g-3">
                                <div class="col-6">
                                    <div class="info-item">
                                        <small class="text-muted d-block">IPK</small>
                                        <span class="fw-bold" :class="`text-${gradeColor}`">{{ academicInfo.gpa }}/4.00</span>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="info-item">
                                        <small class="text-muted d-block">Semester</small>
                                        <span class="fw-bold text-dark">{{ academicInfo.semester }}</span>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="info-item">
                                        <small class="text-muted d-block">Wali Kelas</small>
                                        <span class="fw-bold text-dark">{{ academicInfo.advisor }}</span>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="info-item">
                                        <small class="text-muted d-block">Total SKS</small>
                                        <span class="fw-bold text-dark">{{ academicInfo.totalCredits }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Personal Information -->
    <div class="container mb-3">
        <div class="section-header mb-3">
            <h6 class="mb-1 fw-bold text-dark">
                <i class="bi bi-person-lines-fill text-primary me-2"></i>
                Informasi Personal
            </h6>
            <p class="text-muted small mb-0">Data diri dan kontak siswa</p>
        </div>
        
        <div class="card border-0 shadow-sm">
            <div class="card-body p-4">
                <form @submit.prevent="saveProfile">
                    <div class="row g-4">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label fw-bold text-dark">Nama Lengkap</label>
                                <input v-model="studentProfile.fullName" 
                                       :readonly="!isEditing"
                                       type="text" 
                                       class="form-control" 
                                       :class="isEditing ? 'border-primary' : 'bg-light'">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label fw-bold text-dark">Username</label>
                                <input v-model="studentProfile.username" 
                                       :readonly="!isEditing"
                                       type="text" 
                                       class="form-control"
                                       :class="isEditing ? 'border-primary' : 'bg-light'">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label fw-bold text-dark">Email</label>
                                <input v-model="studentProfile.email" 
                                       readonly
                                       type="email" 
                                       class="form-control bg-light">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label fw-bold text-dark">No. Telepon</label>
                                <input v-model="studentProfile.phone" 
                                       :readonly="!isEditing"
                                       type="tel" 
                                       class="form-control"
                                       :class="isEditing ? 'border-primary' : 'bg-light'">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label fw-bold text-dark">Tanggal Lahir</label>
                                <input v-model="studentProfile.dateOfBirth" 
                                       :readonly="!isEditing"
                                       type="date" 
                                       class="form-control"
                                       :class="isEditing ? 'border-primary' : 'bg-light'">
                                <small class="text-muted">Usia: {{ studentAge }} tahun</small>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label fw-bold text-dark">Jenis Kelamin</label>
                                <select v-model="studentProfile.gender" 
                                        :disabled="!isEditing"
                                        class="form-select"
                                        :class="isEditing ? 'border-primary' : 'bg-light'">
                                    <option value="Laki-laki">Laki-laki</option>
                                    <option value="Perempuan">Perempuan</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="form-group">
                                <label class="form-label fw-bold text-dark">Alamat</label>
                                <textarea v-model="studentProfile.address" 
                                          :readonly="!isEditing"
                                          class="form-control" 
                                          rows="2"
                                          :class="isEditing ? 'border-primary' : 'bg-light'"></textarea>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="form-group">
                                <label class="form-label fw-bold text-dark">Bio</label>
                                <textarea v-model="studentProfile.bio" 
                                          :readonly="!isEditing"
                                          class="form-control" 
                                          rows="3"
                                          :class="isEditing ? 'border-primary' : 'bg-light'"
                                          placeholder="Ceritakan tentang diri Anda..."></textarea>
                            </div>
                        </div>
                    </div>
                    
                    <div v-if="isEditing" class="form-actions mt-4 pt-3 border-top">
                        <div class="row g-2">
                            <div class="col-6">
                                <button @click="toggleEdit" type="button" class="btn btn-outline-secondary w-100 rounded-pill">
                                    <i class="bi bi-x-lg me-1"></i>
                                    Batal
                                </button>
                            </div>
                            <div class="col-6">
                                <button type="submit" class="btn btn-primary w-100 rounded-pill">
                                    <i class="bi bi-check-lg me-1"></i>
                                    Simpan
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- Parent Information -->
    <div class="container mb-3">
        <div class="section-header mb-3">
            <h6 class="mb-1 fw-bold text-dark">
                <i class="bi bi-people text-primary me-2"></i>
                Informasi Orang Tua / Wali
            </h6>
            <p class="text-muted small mb-0">Kontak dan informasi wali siswa</p>
        </div>
        
        <div class="card border-0 shadow-sm">
            <div class="card-body p-4">
                <div class="row g-4">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="form-label fw-bold text-dark">Nama Orang Tua / Wali</label>
                            <input v-model="studentProfile.parentName" 
                                   :readonly="!isEditing"
                                   type="text" 
                                   class="form-control"
                                   :class="isEditing ? 'border-primary' : 'bg-light'">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="form-label fw-bold text-dark">No. Telepon Orang Tua</label>
                            <input v-model="studentProfile.parentPhone" 
                                   :readonly="!isEditing"
                                   type="tel" 
                                   class="form-control"
                                   :class="isEditing ? 'border-primary' : 'bg-light'">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Recent Activities -->
    <div class="container mb-3">
        <div class="section-header mb-3">
            <h6 class="mb-1 fw-bold text-dark">
                <i class="bi bi-clock-history text-primary me-2"></i>
                Aktivitas Terbaru
            </h6>
            <p class="text-muted small mb-0">Pencapaian dan aktivitas siswa</p>
        </div>
        
        <div class="activities-list">
            <div v-for="activity in recentActivities" :key="activity.id" class="mb-3">
                <div class="activity-item card border-0 shadow-sm position-relative overflow-hidden">
                    <div class="status-indicator position-absolute start-0 top-0 h-100"
                         :class="`bg-${activity.color}`" style="width: 4px;"></div>
                    
                    <div class="card-body p-4">
                        <div class="d-flex align-items-center">
                            <div class="activity-icon me-3">
                                <div class="rounded-circle d-inline-flex justify-content-center align-items-center"
                                     :class="`bg-${activity.color} bg-gradient`"
                                     style="width: 40px; height: 40px;">
                                    <i :class="activity.icon" class="text-white"></i>
                                </div>
                            </div>
                            <div class="activity-info flex-grow-1">
                                <h6 class="mb-1 fw-bold text-dark">{{ activity.title }}</h6>
                                <small class="text-muted">
                                    <i class="bi bi-calendar me-1"></i>
                                    {{ formatDate(activity.date) }}
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Additional Info -->
    <div class="container mb-4">
        <div class="card border-0 shadow-sm">
            <div class="card-body p-4">
                <div class="row g-4">
                    <div class="col-md-6">
                        <div class="info-card text-center p-3 bg-light rounded-3">
                            <i class="bi bi-calendar-plus text-primary fs-3 mb-2"></i>
                            <h6 class="fw-bold text-dark mb-1">Bergabung Sejak</h6>
                            <p class="text-muted mb-0">{{ formatDate(studentProfile.joinDate) }}</p>
                            <small class="text-muted">({{ joinDuration }})</small>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="info-card text-center p-3 bg-light rounded-3">
                            <i class="bi bi-award text-warning fs-3 mb-2"></i>
                            <h6 class="fw-bold text-dark mb-1">Status Siswa</h6>
                            <span class="badge bg-success rounded-pill px-3 py-2">
                                <i class="bi bi-check-circle me-1"></i>
                                Aktif
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="pb-4"></div>
</template>

<style scoped>
/* Profile Header Card Styling - Konsisten dengan theme */
.profile-header-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 120px;
}

.profile-bg-pattern {
  position: absolute;
  top: 0;
  right: 0;
  width: 100px;
  height: 100px;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="30" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="2"/><path d="M35 35 L65 65 M65 35 L35 65" stroke="rgba(255,255,255,0.1)" stroke-width="2"/><circle cx="50" cy="50" r="5" fill="rgba(255,255,255,0.2)"/></svg>') no-repeat center;
  background-size: contain;
}

/* Profile Image */
.profile-image-wrapper {
  margin-bottom: 1rem;
}

.profile-image {
  width: 120px;
  height: 120px;
  border: 4px solid white;
  transition: all 0.3s ease;
  animation: fadeInScale 0.8s ease-out;
}

.profile-image:hover {
  transform: scale(1.05);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2) !important;
}

.profile-overlay {
  border-radius: 50%;
  transition: opacity 0.3s ease;
}

.edit-photo-btn {
  animation: bounceIn 0.6s ease-out;
}

.status-indicator {
  animation: slideInRight 0.6s ease-out;
}

/* Stat Mini Cards */
.stat-mini {
  transition: all 0.3s ease;
  cursor: pointer;
  border: 2px solid transparent;
}

.stat-mini:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1) !important;
  border-color: var(--bs-primary);
  background: white !important;
}

.stat-value {
  font-weight: 700;
  transition: transform 0.3s ease;
}

.stat-mini:hover .stat-value {
  transform: scale(1.1);
}

/* Academic Summary */
.academic-summary {
  border: 2px solid rgba(102, 126, 234, 0.2);
  transition: all 0.3s ease;
}

.academic-summary:hover {
  border-color: var(--bs-primary);
  background: rgba(102, 126, 234, 0.15) !important;
}

.info-item {
  transition: transform 0.3s ease;
}

.academic-summary:hover .info-item {
  transform: translateY(-2px);
}

/* Form Styling */
.form-control {
  border-radius: 10px;
  padding: 12px 15px;
  transition: all 0.3s ease;
  border: 2px solid #e9ecef;
}

.form-control:focus {
  border-color: var(--bs-primary);
  box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
  transform: translateY(-1px);
}

.form-control.border-primary {
  border-color: var(--bs-primary) !important;
}

.form-control.bg-light {
  background-color: #f8f9fa !important;
  border-color: #e9ecef;
}

.form-select {
  border-radius: 10px;
  padding: 12px 15px;
  transition: all 0.3s ease;
  border: 2px solid #e9ecef;
}

.form-select:focus {
  border-color: var(--bs-primary);
  box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
}

.form-label {
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 8px;
}

/* Section Headers - Style konsisten dengan halaman lain */
.section-header {
  padding-left: 15px;
  border-left: 4px solid var(--bs-primary);
  background: linear-gradient(90deg, rgba(102, 126, 234, 0.1) 0%, transparent 100%);
  padding: 15px;
  border-radius: 8px;
}

/* Activity Items */
.activity-item {
  transition: all 0.3s ease;
  border-radius: 15px !important;
  background: white;
}

.activity-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1) !important;
}

.status-indicator {
  border-radius: 0 0 0 15px;
}

.activity-icon {
  transition: transform 0.3s ease;
}

.activity-item:hover .activity-icon {
  transform: scale(1.1);
}

/* Info Cards */
.info-card {
  transition: all 0.3s ease;
  cursor: pointer;
  border: 2px solid transparent;
}

.info-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15) !important;
  border-color: var(--bs-primary);
  background: white !important;
}

.info-card i {
  transition: transform 0.3s ease;
}

.info-card:hover i {
  transform: scale(1.1);
}

/* Buttons */
.btn {
  font-weight: 500;
  padding: 10px 20px;
  transition: all 0.3s ease;
  border-width: 2px;
}

.btn:hover {
  transform: translateY(-2px);
}

.btn-primary:hover {
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
}

.btn-outline-light:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: white;
}

.btn-outline-secondary:hover {
  box-shadow: 0 5px 15px rgba(108, 117, 125, 0.3);
}

/* Badge Improvements */
.badge {
  font-weight: 500;
  padding: 8px 15px;
  font-size: 0.8rem;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
}

.profile-badges .badge:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

/* Form Actions */
.form-actions {
  background: rgba(248, 249, 250, 0.5);
  border-radius: 15px;
  margin: 0 -1.5rem -1.5rem -1.5rem;
  padding: 1.5rem;
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

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
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

/* Responsive Design */
@media (max-width: 768px) {
  .profile-header-card .card-body {
    padding: 20px !important;
  }
  
  .profile-image {
    width: 100px;
    height: 100px;
  }
  
  .stat-mini {
    margin-bottom: 10px;
  }
  
  .form-actions {
    margin: 0 -1rem -1rem -1rem;
    padding: 1rem;
  }
  
  .academic-summary {
    margin-top: 20px;
  }
  
  .profile-basic-info {
    margin-top: 15px;
  }
}

@media (max-width: 576px) {
  .profile-image {
    width: 80px;
    height: 80px;
  }
  
  .stat-mini {
    padding: 15px 10px;
  }
  
  .stat-value {
    font-size: 1.1rem;
  }
  
  .activity-item .card-body {
    padding: 15px;
  }
  
  .activity-icon > div {
    width: 35px;
    height: 35px;
  }
  
  .info-card {
    margin-bottom: 15px;
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

/* Interactive Elements */
.cursor-pointer {
  cursor: pointer;
}

.transition-all {
  transition: all 0.3s ease;
}

/* Hover Effects for Section Headers */
.section-header:hover {
  background: linear-gradient(90deg, rgba(102, 126, 234, 0.15) 0%, transparent 100%);
}

/* Profile Status Colors */
.text-active {
  color: #28a745 !important;
}

.text-inactive {
  color: #6c757d !important;
}

/* Grade Colors */
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

/* Form Focus Effects */
.form-control:focus,
.form-select:focus {
  border-color: var(--bs-primary);
  box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
}

/* Profile Header Content */
.profile-header-content h5 {
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Activity List Scroll */
.activities-list {
  max-height: 400px;
  overflow-y: auto;
}

.activities-list::-webkit-scrollbar {
  width: 6px;
}

.activities-list::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.activities-list::-webkit-scrollbar-thumb {
  background: var(--bs-primary);
  border-radius: 3px;
}

.activities-list::-webkit-scrollbar-thumb:hover {
  background: var(--bs-primary);
  opacity: 0.8;
}
</style>