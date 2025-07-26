<script setup>
import { ref, computed, onMounted } from 'vue';

// Data reaktif
const currentTime = ref(new Date());
const selectedMonth = ref('current');
const attendanceMode = ref('check-in'); // check-in, check-out

// Sample attendance data
const attendanceData = ref({
  todayStatus: 'present',
  checkInTime: '07:35:07',
  checkOutTime: null,
  workHours: '08:30 - 17:30',
  location: 'SMA Negeri 1 Jakarta',
  isLate: false
});

// Monthly attendance statistics
const monthlyStats = ref({
  present: 18,
  absent: 2,
  late: 3,
  permission: 1,
  totalDays: 24
});

// Recent attendance history
const attendanceHistory = ref([
  {
    id: 1,
    date: '2025-01-25',
    day: 'Jumat',
    checkIn: '07:30:00',
    checkOut: '16:45:00',
    status: 'present',
    note: ''
  },
  {
    id: 2,
    date: '2025-01-24',
    day: 'Kamis',
    checkIn: '08:15:00',
    checkOut: '16:30:00',
    status: 'late',
    note: 'Terlambat karena macet'
  },
  {
    id: 3,
    date: '2025-01-23',
    day: 'Rabu',
    checkIn: '07:25:00',
    checkOut: '16:40:00',
    status: 'present',
    note: ''
  },
  {
    id: 4,
    date: '2025-01-22',
    day: 'Selasa',
    checkIn: null,
    checkOut: null,
    status: 'absent',
    note: 'Sakit demam'
  },
  {
    id: 5,
    date: '2025-01-21',
    day: 'Senin',
    checkIn: '07:35:00',
    checkOut: '16:35:00',
    status: 'present',
    note: ''
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

const currentTimeString = computed(() => {
  return currentTime.value.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
});

const attendancePercentage = computed(() => {
  const total = monthlyStats.value.totalDays;
  const present = monthlyStats.value.present;
  return Math.round((present / total) * 100);
});

const canCheckOut = computed(() => {
  return attendanceData.value.checkInTime && !attendanceData.value.checkOutTime;
});

const statusMessage = computed(() => {
  if (attendanceData.value.checkOutTime) {
    return 'Anda sudah absen keluar hari ini';
  } else if (attendanceData.value.checkInTime) {
    return 'Anda sudah absen masuk hari ini';
  } else {
    return 'Silakan absen masuk';
  }
});

// Methods
const handleAttendance = () => {
  if (attendanceMode.value === 'check-in' && !attendanceData.value.checkInTime) {
    attendanceData.value.checkInTime = currentTimeString.value;
    attendanceData.value.todayStatus = 'present';
    // Check if late (after 08:00)
    const currentHour = currentTime.value.getHours();
    const currentMinute = currentTime.value.getMinutes();
    if (currentHour > 8 || (currentHour === 8 && currentMinute > 0)) {
      attendanceData.value.isLate = true;
    }
  } else if (attendanceMode.value === 'check-out' && canCheckOut.value) {
    attendanceData.value.checkOutTime = currentTimeString.value;
  }
};

const getStatusBadgeClass = (status) => {
  switch (status) {
    case 'present':
      return 'bg-success';
    case 'late':
      return 'bg-warning';
    case 'absent':
      return 'bg-danger';
    case 'permission':
      return 'bg-info';
    default:
      return 'bg-secondary';
  }
};

const getStatusText = (status) => {
  switch (status) {
    case 'present':
      return 'Hadir';
    case 'late':
      return 'Terlambat';
    case 'absent':
      return 'Tidak Hadir';
    case 'permission':
      return 'Izin';
    default:
      return 'Unknown';
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
    <!-- Header Absence Section -->
    <div class="container mb-3">
        <div class="card absence-header-card bg-gradient-primary text-white shadow-lg border-0 position-relative overflow-hidden">
            <div class="absence-bg-pattern"></div>
            <div class="card-body p-4 position-relative">
                <div class="row align-items-center">
                    <div class="col-8">
                        <div class="absence-header-content">
                            <h5 class="mb-1 fw-bold">📝 Absensi Siswa</h5>
                            <p class="mb-2 opacity-90">{{ currentDate }}</p>
                            <div class="d-flex align-items-center">
                                <i class="bi bi-geo-alt me-2"></i>
                                <small class="opacity-75">{{ attendanceData.location }}</small>
                            </div>
                        </div>
                    </div>
                    <div class="col-4 text-end">
                        <div class="absence-stats">
                            <div class="current-time fw-bold h4 mb-0">{{ currentTimeString }}</div>
                            <small class="opacity-75">{{ statusMessage }}</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Today's Attendance -->
    <div class="container mb-3">
        <div class="card shadow-sm border-0">
            <div class="card-header bg-transparent border-0 pb-2">
                <div class="d-flex justify-content-between align-items-center">
                    <h6 class="mb-0 fw-bold text-dark">
                        <i class="bi bi-calendar-check text-primary me-2"></i>
                        Absensi Hari Ini
                    </h6>
                    <span class="badge rounded-pill px-3" :class="getStatusBadgeClass(attendanceData.todayStatus)">
                        <i class="bi bi-check-circle me-1"></i>
                        {{ getStatusText(attendanceData.todayStatus) }}
                        <span v-if="attendanceData.isLate" class="ms-1">(Terlambat)</span>
                    </span>
                </div>
            </div>
            <div class="card-body pt-2">
                <!-- Attendance Action Buttons -->
                <div class="attendance-actions mb-4">
                    <div class="row g-3">
                        <div class="col-6">
                            <button 
                                class="btn btn-success btn-lg w-100 rounded-3 position-relative"
                                :disabled="attendanceData.checkInTime"
                                @click="attendanceMode = 'check-in'; handleAttendance()"
                            >
                                <i class="bi bi-box-arrow-in-right me-2"></i>
                                Absen Masuk
                                <span v-if="attendanceData.checkInTime" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning">
                                    ✓
                                </span>
                            </button>
                        </div>
                        <div class="col-6">
                            <button 
                                class="btn btn-danger btn-lg w-100 rounded-3 position-relative"
                                :disabled="!canCheckOut || attendanceData.checkOutTime"
                                @click="attendanceMode = 'check-out'; handleAttendance()"
                            >
                                <i class="bi bi-box-arrow-left me-2"></i>
                                Absen Keluar
                                <span v-if="attendanceData.checkOutTime" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning">
                                    ✓
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Today's Time Records -->
                <div class="row g-3">
                    <div class="col-6">
                        <div class="time-record text-center p-3 rounded-3 bg-light border">
                            <div class="time-icon mb-2">
                                <div class="rounded-circle bg-success bg-gradient text-white d-inline-flex justify-content-center align-items-center"
                                    style="width: 50px; height: 50px;">
                                    <i class="bi bi-box-arrow-in-right fs-5"></i>
                                </div>
                            </div>
                            <div class="time-info">
                                <p class="mb-1 text-muted small">Waktu Masuk</p>
                                <h6 class="mb-0 fw-bold" :class="attendanceData.checkInTime ? 'text-success' : 'text-muted'">
                                    {{ attendanceData.checkInTime || '--:--:--' }}
                                </h6>
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="time-record text-center p-3 rounded-3 bg-light border">
                            <div class="time-icon mb-2">
                                <div class="rounded-circle bg-danger bg-gradient text-white d-inline-flex justify-content-center align-items-center"
                                    style="width: 50px; height: 50px;">
                                    <i class="bi bi-box-arrow-left fs-5"></i>
                                </div>
                            </div>
                            <div class="time-info">
                                <p class="mb-1 text-muted small">Waktu Keluar</p>
                                <h6 class="mb-0 fw-bold" :class="attendanceData.checkOutTime ? 'text-danger' : 'text-muted'">
                                    {{ attendanceData.checkOutTime || '--:--:--' }}
                                </h6>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Work Hours Info -->
                <div class="work-hours-info mt-3 p-3 bg-primary bg-opacity-10 rounded-3 text-center">
                    <small class="text-primary">
                        <i class="bi bi-clock me-1"></i>
                        Jam Kerja: {{ attendanceData.workHours }}
                    </small>
                </div>
            </div>
        </div>
    </div>

    <!-- Monthly Statistics -->
    <div class="container mb-3">
        <div class="section-header mb-3">
            <h6 class="mb-1 fw-bold text-dark">
                <i class="bi bi-bar-chart text-primary me-2"></i>
                Statistik Bulan Ini
            </h6>
            <p class="text-muted small mb-0">Ringkasan kehadiran dan ketidakhadiran</p>
        </div>
        
        <div class="row g-3">
            <div class="col-3">
                <div class="stat-card text-center p-3 rounded-3 bg-white shadow-sm border h-100">
                    <div class="stat-icon mb-2">
                        <div class="rounded-circle bg-success bg-gradient text-white d-inline-flex justify-content-center align-items-center"
                            style="width: 50px; height: 50px;">
                            <i class="bi bi-check-circle fs-5"></i>
                        </div>
                    </div>
                    <h6 class="mb-1 fw-bold text-success">{{ monthlyStats.present }}</h6>
                    <small class="text-muted">Hadir</small>
                </div>
            </div>
            <div class="col-3">
                <div class="stat-card text-center p-3 rounded-3 bg-white shadow-sm border h-100">
                    <div class="stat-icon mb-2">
                        <div class="rounded-circle bg-warning bg-gradient text-white d-inline-flex justify-content-center align-items-center"
                            style="width: 50px; height: 50px;">
                            <i class="bi bi-exclamation-triangle fs-5"></i>
                        </div>
                    </div>
                    <h6 class="mb-1 fw-bold text-warning">{{ monthlyStats.late }}</h6>
                    <small class="text-muted">Terlambat</small>
                </div>
            </div>
            <div class="col-3">
                <div class="stat-card text-center p-3 rounded-3 bg-white shadow-sm border h-100">
                    <div class="stat-icon mb-2">
                        <div class="rounded-circle bg-danger bg-gradient text-white d-inline-flex justify-content-center align-items-center"
                            style="width: 50px; height: 50px;">
                            <i class="bi bi-x-circle fs-5"></i>
                        </div>
                    </div>
                    <h6 class="mb-1 fw-bold text-danger">{{ monthlyStats.absent }}</h6>
                    <small class="text-muted">Tidak Hadir</small>
                </div>
            </div>
            <div class="col-3">
                <div class="stat-card text-center p-3 rounded-3 bg-white shadow-sm border h-100">
                    <div class="stat-icon mb-2">
                        <div class="rounded-circle bg-info bg-gradient text-white d-inline-flex justify-content-center align-items-center"
                            style="width: 50px; height: 50px;">
                            <i class="bi bi-file-text fs-5"></i>
                        </div>
                    </div>
                    <h6 class="mb-1 fw-bold text-info">{{ monthlyStats.permission }}</h6>
                    <small class="text-muted">Izin</small>
                </div>
            </div>
        </div>

        <!-- Attendance Percentage -->
        <div class="card border-0 shadow-sm mt-3">
            <div class="card-body p-4">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <div>
                        <h6 class="mb-1 fw-bold text-dark">Tingkat Kehadiran</h6>
                        <small class="text-muted">Persentase kehadiran bulan ini</small>
                    </div>
                    <div class="percentage-display">
                        <span class="h4 fw-bold text-primary">{{ attendancePercentage }}%</span>
                    </div>
                </div>
                <div class="progress" style="height: 12px;">
                    <div class="progress-bar bg-gradient bg-primary" role="progressbar" 
                         :style="`width: ${attendancePercentage}%`" 
                         :aria-valuenow="attendancePercentage" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <div class="d-flex justify-content-between mt-2">
                    <small class="text-muted">{{ monthlyStats.present }}/{{ monthlyStats.totalDays }} hari</small>
                    <small class="text-muted" :class="attendancePercentage >= 75 ? 'text-success' : 'text-danger'">
                        {{ attendancePercentage >= 75 ? 'Baik' : 'Perlu Diperbaiki' }}
                    </small>
                </div>
            </div>
        </div>
    </div>

    <!-- Attendance History -->
    <div class="container mb-4">
        <div class="section-header mb-3">
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <h6 class="mb-1 fw-bold text-dark">
                        <i class="bi bi-clock-history text-primary me-2"></i>
                        Riwayat Absensi
                    </h6>
                    <p class="text-muted small mb-0">5 hari terakhir</p>
                </div>
                <button class="btn btn-outline-primary btn-sm rounded-pill">
                    <i class="bi bi-calendar-range me-1"></i>
                    Lihat Semua
                </button>
            </div>
        </div>
        
        <div class="history-list">
            <div v-for="record in attendanceHistory" :key="record.id" class="mb-3">
                <div class="history-item card border-0 shadow-sm position-relative overflow-hidden">
                    <div class="status-indicator position-absolute start-0 top-0 h-100"
                         :class="getStatusBadgeClass(record.status)" style="width: 4px;"></div>
                    
                    <div class="card-body p-4">
                        <div class="row align-items-center">
                            <div class="col-8">
                                <div class="history-content">
                                    <div class="d-flex align-items-center mb-2">
                                        <h6 class="mb-0 fw-bold text-dark me-2">{{ record.day }}</h6>
                                        <span class="badge rounded-pill px-3" :class="getStatusBadgeClass(record.status)">
                                            {{ getStatusText(record.status) }}
                                        </span>
                                    </div>
                                    <div class="history-details">
                                        <div class="d-flex align-items-center mb-1">
                                            <i class="bi bi-calendar-date text-muted me-2"></i>
                                            <small class="text-muted">{{ record.date }}</small>
                                        </div>
                                        <div v-if="record.note" class="d-flex align-items-center">
                                            <i class="bi bi-chat-text text-muted me-2"></i>
                                            <small class="text-muted">{{ record.note }}</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-4 text-end">
                                <div class="history-time">
                                    <div v-if="record.checkIn" class="time-entry mb-1">
                                        <small class="text-muted d-block">Masuk</small>
                                        <div class="fw-bold text-success">{{ record.checkIn }}</div>
                                    </div>
                                    <div v-if="record.checkOut" class="time-entry">
                                        <small class="text-muted d-block">Keluar</small>
                                        <div class="fw-bold text-danger">{{ record.checkOut }}</div>
                                    </div>
                                    <div v-if="!record.checkIn && !record.checkOut" class="time-entry">
                                        <div class="text-muted">--:--:--</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="pb-4"></div>
</template>