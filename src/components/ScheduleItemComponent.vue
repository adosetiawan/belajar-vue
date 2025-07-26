<script setup>
import { computed } from 'vue';

// Props untuk menerima data dari parent component
const props = defineProps({
  schedule: {
    type: Object,
    default: () => ({
      id: 1,
      subject: 'Bahasa Indonesia',
      teacher: 'Budi Santoso',
      time: '07:30 - 09:00',
      room: 'Ruang 102',
      status: 'upcoming',
      color: 'primary'
    })
  }
});

// Computed properties
const getStatusBadgeClass = computed(() => {
  switch (props.schedule.status) {
    case 'current':
      return 'bg-success';
    case 'upcoming':
      return 'bg-primary';
    case 'completed':
      return 'bg-secondary';
    default:
      return 'bg-light text-dark';
  }
});

const getStatusText = computed(() => {
  switch (props.schedule.status) {
    case 'current':
      return 'Sedang Berlangsung';
    case 'upcoming':
      return 'Akan Datang';
    case 'completed':
      return 'Selesai';
    default:
      return 'Unknown';
  }
});

const getStatusIcon = computed(() => {
  switch (props.schedule.status) {
    case 'current':
      return 'bi-play-fill';
    case 'upcoming':
      return 'bi-clock';
    case 'completed':
      return 'bi-check-circle';
    default:
      return 'bi-circle';
  }
});
</script>

<template>
    <div class="schedule-item-wrapper">
        <div class="schedule-item card border-0 shadow-sm position-relative overflow-hidden">
            <!-- Status indicator strip -->
            <div class="status-indicator position-absolute start-0 top-0 h-100"
                 :class="`bg-${schedule.color}`" style="width: 4px;"></div>
            
            <div class="card-body p-4">
                <div class="row align-items-center">
                    <div class="col-8">
                        <div class="schedule-content">
                            <!-- Subject and Status -->
                            <div class="d-flex align-items-center mb-2">
                                <div class="subject-icon me-3">
                                    <div class="rounded-circle d-inline-flex justify-content-center align-items-center"
                                         :class="`bg-${schedule.color} bg-gradient`"
                                         style="width: 40px; height: 40px;">
                                        <i class="bi bi-book text-white"></i>
                                    </div>
                                </div>
                                <div class="subject-info flex-grow-1">
                                    <h6 class="mb-1 fw-bold text-dark">{{ schedule.subject }}</h6>
                                    <span class="badge rounded-pill px-3" :class="getStatusBadgeClass">
                                        <i :class="getStatusIcon" class="me-1"></i>
                                        {{ getStatusText }}
                                    </span>
                                </div>
                            </div>
                            
                            <!-- Teacher and Room Info -->
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
                    
                    <!-- Time Display -->
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
</template>

<style scoped>
.schedule-item-wrapper {
    margin-bottom: 1rem;
}

.schedule-item {
    transition: all 0.3s ease;
    border-radius: 15px !important;
    background: white;
}

.schedule-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1) !important;
}

.status-indicator {
    border-radius: 0 0 0 15px;
}

.subject-icon {
    animation: fadeInScale 0.6s ease-out;
}

.subject-info h6 {
    font-size: 1.1rem;
    color: #2c3e50;
}

.schedule-details small {
    font-size: 0.85rem;
}

.time-display {
    text-align: center;
}

.time-display .h6 {
    font-size: 1rem;
    font-weight: 700;
}

.schedule-actions {
    background: rgba(248, 249, 250, 0.5);
    border-radius: 10px;
    margin: 0 -1rem -1rem -1rem;
    padding: 1rem 1rem 0.5rem 1rem;
}

.schedule-actions .btn {
    font-size: 0.8rem;
    padding: 0.4rem 0.8rem;
    transition: all 0.3s ease;
    border-width: 1.5px;
}

.schedule-actions .btn:hover {
    transform: translateY(-1px);
}

.badge {
    font-size: 0.75rem;
    padding: 0.4rem 0.8rem;
    font-weight: 500;
}

/* Animation */
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

/* Responsive adjustments */
@media (max-width: 576px) {
    .schedule-item .card-body {
        padding: 1rem;
    }
    
    .subject-icon {
        margin-right: 0.75rem;
    }
    
    .subject-icon > div {
        width: 35px;
        height: 35px;
    }
    
    .time-display .h6 {
        font-size: 0.9rem;
    }
    
    .schedule-actions .btn {
        font-size: 0.75rem;
        padding: 0.3rem 0.6rem;
    }
}
</style>
