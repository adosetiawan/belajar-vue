<script setup>
import { ref, computed, onMounted, nextTick } from 'vue';

// Data reaktif
const currentTime = ref(new Date());
const selectedChat = ref(null);
const newMessage = ref('');
const isTyping = ref(false);
const searchQuery = ref('');
const isSidebarCollapsed = ref(false);

// Chat contacts data
const contacts = ref([
  {
    id: 1,
    name: 'Ibu Sarah Wijaya',
    role: 'Guru Matematika',
    avatar: '@/assets/img/bg-img/2.jpg',
    lastMessage: 'Jangan lupa kerjakan PR halaman 45-47',
    lastTime: '10:30',
    unreadCount: 2,
    isOnline: true,
    type: 'teacher'
  },
  {
    id: 2,
    name: 'Pak Ahmad Hidayat',
    role: 'Wali Kelas XII IPA 2',
    avatar: '@/assets/img/bg-img/3.jpg',
    lastMessage: 'Besok ada rapat orang tua jam 09:00',
    lastTime: '09:15',
    unreadCount: 0,
    isOnline: true,
    type: 'teacher'
  },
  {
    id: 3,
    name: 'Ibu Diana Sari',
    role: 'Guru Fisika',
    avatar: '@/assets/img/bg-img/4.jpg',
    lastMessage: 'Praktikum lab besok dibawa jas lab',
    lastTime: 'Kemarin',
    unreadCount: 1,
    isOnline: false,
    type: 'teacher'
  },
  {
    id: 4,
    name: 'Andi Pratama',
    role: 'Ketua Kelas XII IPA 2',
    avatar: '@/assets/img/bg-img/5.jpg',
    lastMessage: 'Info: Ulangan Kimia dipindah ke Jumat',
    lastTime: 'Kemarin',
    unreadCount: 0,
    isOnline: true,
    type: 'student'
  },
  {
    id: 5,
    name: 'Siti Nurhaliza',
    role: 'Bendahara Kelas',
    avatar: '@/assets/img/bg-img/6.jpg',
    lastMessage: 'Bayar kas kelas Rp 50.000',
    lastTime: '2 hari lalu',
    unreadCount: 3,
    isOnline: false,
    type: 'student'
  }
]);

// Messages data
const messages = ref({
  1: [
    {
      id: 1,
      senderId: 1,
      senderName: 'Ibu Sarah Wijaya',
      message: 'Selamat pagi Ahmad, bagaimana kabar belajarnya?',
      time: '08:30',
      type: 'received',
      isRead: true
    },
    {
      id: 2,
      senderId: 'me',
      senderName: 'Ahmad Setiawan',
      message: 'Pagi Bu, Alhamdulillah baik Bu. Ada yang ingin saya tanyakan tentang materi integral',
      time: '08:32',
      type: 'sent',
      isRead: true
    },
    {
      id: 3,
      senderId: 1,
      senderName: 'Ibu Sarah Wijaya',
      message: 'Silakan, kamu mau tanya yang mana?',
      time: '08:35',
      type: 'received',
      isRead: true
    },
    {
      id: 4,
      senderId: 'me',
      senderName: 'Ahmad Setiawan',
      message: 'Tentang integral parsial Bu, saya masih bingung cara menentukan u dan dv nya',
      time: '08:37',
      type: 'sent',
      isRead: true
    },
    {
      id: 5,
      senderId: 1,
      senderName: 'Ibu Sarah Wijaya',
      message: 'Oh iya, untuk integral parsial ada rumus LIATE:\nL - Logaritma\nI - Invers trigonometri\nA - Aljabar\nT - Trigonometri\nE - Eksponensial\n\nUrutan prioritas untuk memilih u',
      time: '08:40',
      type: 'received',
      isRead: true
    },
    {
      id: 6,
      senderId: 1,
      senderName: 'Ibu Sarah Wijaya',
      message: 'Jangan lupa kerjakan PR halaman 45-47',
      time: '10:30',
      type: 'received',
      isRead: false
    }
  ],
  2: [
    {
      id: 1,
      senderId: 2,
      senderName: 'Pak Ahmad Hidayat',
      message: 'Selamat siang Ahmad, mohon infokan ke teman-teman',
      time: '09:00',
      type: 'received',
      isRead: true
    },
    {
      id: 2,
      senderId: 2,
      senderName: 'Pak Ahmad Hidayat',
      message: 'Besok ada rapat orang tua jam 09:00',
      time: '09:15',
      type: 'received',
      isRead: true
    }
  ]
});

// Quick replies
const quickReplies = ref([
  'Terima kasih Bu/Pak',
  'Baik, siap',
  'Maaf, bisa diulangi?',
  'Saya mengerti',
  'Sampai jumpa'
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

const filteredContacts = computed(() => {
  if (!searchQuery.value) return contacts.value;
  return contacts.value.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    contact.role.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const currentMessages = computed(() => {
  if (!selectedChat.value) return [];
  return messages.value[selectedChat.value.id] || [];
});

const totalUnreadCount = computed(() => {
  return contacts.value.reduce((total, contact) => total + contact.unreadCount, 0);
});

// Methods
const selectChat = (contact) => {
  selectedChat.value = contact;
  // Mark messages as read
  contact.unreadCount = 0;
  if (messages.value[contact.id]) {
    messages.value[contact.id].forEach(msg => {
      if (msg.type === 'received') {
        msg.isRead = true;
      }
    });
  }
  scrollToBottom();
};

const sendMessage = () => {
  if (!newMessage.value.trim() || !selectedChat.value) return;
  
  const message = {
    id: Date.now(),
    senderId: 'me',
    senderName: 'Ahmad Setiawan',
    message: newMessage.value.trim(),
    time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    type: 'sent',
    isRead: false
  };
  
  if (!messages.value[selectedChat.value.id]) {
    messages.value[selectedChat.value.id] = [];
  }
  
  messages.value[selectedChat.value.id].push(message);
  
  // Update last message in contact
  const contact = contacts.value.find(c => c.id === selectedChat.value.id);
  if (contact) {
    contact.lastMessage = newMessage.value.trim();
    contact.lastTime = message.time;
  }
  
  newMessage.value = '';
  scrollToBottom();
};

const sendQuickReply = (reply) => {
  newMessage.value = reply;
  sendMessage();
};

const scrollToBottom = () => {
  nextTick(() => {
    const chatContainer = document.querySelector('.chat-messages');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  });
};

const formatTime = (timeStr) => {
  return timeStr;
};

const getContactTypeIcon = (type) => {
  return type === 'teacher' ? 'bi-mortarboard' : 'bi-person';
};

const getContactTypeColor = (type) => {
  return type === 'teacher' ? 'text-primary' : 'text-success';
};

const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value;
};

// Update waktu setiap detik
onMounted(() => {
  setInterval(() => {
    currentTime.value = new Date();
  }, 1000);
});
</script>

<template>
    <!-- Header Chat Section -->
    <div class="container mb-3">
        <div class="card chat-header-card bg-gradient-primary text-white shadow-lg border-0 position-relative overflow-hidden">
            <div class="chat-bg-pattern"></div>
            <div class="card-body p-4 position-relative">
                <div class="row align-items-center">
                    <div class="col-8">
                        <div class="chat-header-content">
                            <h5 class="mb-1 fw-bold">💬 Chat & Komunikasi</h5>
                            <p class="mb-2 opacity-90">{{ currentDate }}</p>
                            <div class="d-flex align-items-center">
                                <i class="bi bi-chat-dots me-2"></i>
                                <small class="opacity-75">Terhubung dengan guru dan teman sekelas</small>
                            </div>
                        </div>
                    </div>
                    <div class="col-4 text-end">
                        <div class="chat-stats">
                            <div class="unread-count fw-bold h4 mb-0">{{ totalUnreadCount }}</div>
                            <small class="opacity-75">Pesan belum dibaca</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Chat Interface -->
    <div class="container mb-4">
        <div class="row g-3">
            <!-- Chat List Sidebar -->
            <div class="col-md-4" :class="{ 'sidebar-collapsed': isSidebarCollapsed }">
                <div class="chat-sidebar card shadow-sm border-0 h-100" :class="{ 'collapsed': isSidebarCollapsed }">
                    <!-- Collapse Toggle Button -->
                    <div class="sidebar-toggle d-md-none d-flex justify-content-end p-2">
                        <button @click="toggleSidebar" class="btn btn-sm btn-outline-primary rounded-circle">
                            <i :class="isSidebarCollapsed ? 'bi-chevron-right' : 'bi-chevron-left'"></i>
                        </button>
                    </div>
                    
                    <div class="card-header bg-transparent border-0 pb-2" v-show="!isSidebarCollapsed">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <h6 class="mb-0 fw-bold text-dark">
                                <i class="bi bi-people text-primary me-2"></i>
                                Kontak
                            </h6>
                            <div class="d-flex align-items-center gap-2">
                                <span class="badge bg-primary rounded-pill">{{ contacts.length }}</span>
                                <button @click="toggleSidebar" class="btn btn-sm btn-outline-primary rounded-circle d-none d-md-inline-flex">
                                    <i class="bi-chevron-left"></i>
                                </button>
                            </div>
                        </div>
                        
                        <!-- Search Bar -->
                        <div class="search-container">
                            <div class="input-group">
                                <span class="input-group-text bg-light border-end-0">
                                    <i class="bi bi-search text-muted"></i>
                                </span>
                                <input v-model="searchQuery" 
                                       type="text" 
                                       class="form-control border-start-0 bg-light" 
                                       placeholder="Cari kontak...">
                            </div>
                        </div>
                    </div>
                    
                    <!-- Collapsed State -->
                    <div v-show="isSidebarCollapsed" class="collapsed-content p-2 text-center">
                        <button @click="toggleSidebar" class="btn btn-primary rounded-circle mb-3">
                            <i class="bi-chevron-right"></i>
                        </button>
                        <div class="collapsed-contacts">
                            <div v-for="contact in contacts.slice(0, 5)" 
                                 :key="contact.id" 
                                 class="collapsed-contact-item mb-2 position-relative"
                                 @click="selectChat(contact)">
                                <img :src="contact.avatar" 
                                     alt="Avatar" 
                                     class="rounded-circle cursor-pointer"
                                     style="width: 35px; height: 35px; object-fit: cover;">
                                <div v-if="contact.unreadCount > 0" 
                                     class="position-absolute top-0 end-0 bg-danger rounded-circle text-white d-flex align-items-center justify-content-center"
                                     style="width: 15px; height: 15px; font-size: 0.6rem; transform: translate(25%, -25%);">
                                    {{ contact.unreadCount }}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="card-body p-0" v-show="!isSidebarCollapsed">
                        <div class="contacts-list">
                            <div v-for="contact in filteredContacts" 
                                 :key="contact.id" 
                                 class="contact-item p-3 border-bottom cursor-pointer transition-all"
                                 :class="selectedChat?.id === contact.id ? 'bg-primary bg-opacity-10 border-primary' : ''"
                                 @click="selectChat(contact)">
                                <div class="d-flex align-items-center">
                                    <div class="contact-avatar position-relative me-3">
                                        <img :src="contact.avatar" 
                                             alt="Avatar" 
                                             class="rounded-circle"
                                             style="width: 45px; height: 45px; object-fit: cover;">
                                        <div v-if="contact.isOnline" 
                                             class="online-indicator position-absolute bottom-0 end-0 bg-success rounded-circle border border-2 border-white"
                                             style="width: 12px; height: 12px;"></div>
                                    </div>
                                    
                                    <div class="contact-info flex-grow-1">
                                        <div class="d-flex justify-content-between align-items-start mb-1">
                                            <h6 class="mb-0 fw-bold text-dark" style="font-size: 0.95rem;">
                                                {{ contact.name }}
                                            </h6>
                                            <small class="text-muted">{{ contact.lastTime }}</small>
                                        </div>
                                        
                                        <div class="d-flex justify-content-between align-items-center">
                                            <div class="contact-role-msg">
                                                <div class="d-flex align-items-center mb-1">
                                                    <i :class="[getContactTypeIcon(contact.type), getContactTypeColor(contact.type)]" 
                                                       class="me-1 small"></i>
                                                    <small class="text-muted">{{ contact.role }}</small>
                                                </div>
                                                <p class="mb-0 text-muted small text-truncate" style="max-width: 200px;">
                                                    {{ contact.lastMessage }}
                                                </p>
                                            </div>
                                            
                                            <div v-if="contact.unreadCount > 0" 
                                                 class="unread-badge badge bg-danger rounded-pill">
                                                {{ contact.unreadCount }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Chat Window -->
            <div class="col-md-8" :class="{ 'chat-full-width': isSidebarCollapsed }">
                <div class="chat-window card shadow-sm border-0 h-100">
                    <!-- Chat Header -->
                    <div v-if="selectedChat" class="chat-window-header card-header bg-white border-0 py-3">
                        <div class="d-flex align-items-center">
                            <button v-if="isSidebarCollapsed" @click="toggleSidebar" class="btn btn-outline-primary btn-sm rounded-circle me-3">
                                <i class="bi-list"></i>
                            </button>
                            <div class="chat-contact-avatar position-relative me-3">
                                <img :src="selectedChat.avatar" 
                                     alt="Avatar" 
                                     class="rounded-circle"
                                     style="width: 40px; height: 40px; object-fit: cover;">
                                <div v-if="selectedChat.isOnline" 
                                     class="online-indicator position-absolute bottom-0 end-0 bg-success rounded-circle border border-2 border-white"
                                     style="width: 10px; height: 10px;"></div>
                            </div>
                            <div class="chat-contact-info flex-grow-1">
                                <h6 class="mb-0 fw-bold text-dark">{{ selectedChat.name }}</h6>
                                <small class="text-muted">
                                    <i :class="getContactTypeIcon(selectedChat.type)" class="me-1"></i>
                                    {{ selectedChat.role }}
                                    <span v-if="selectedChat.isOnline" class="text-success ms-2">
                                        <i class="bi bi-circle-fill me-1" style="font-size: 0.5rem;"></i>
                                        Online
                                    </span>
                                </small>
                            </div>
                            <div class="chat-actions">
                                <button class="btn btn-outline-primary btn-sm rounded-pill me-2">
                                    <i class="bi bi-telephone"></i>
                                </button>
                                <button class="btn btn-outline-primary btn-sm rounded-pill">
                                    <i class="bi bi-three-dots-vertical"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Messages Area -->
                    <div class="card-body p-0 d-flex flex-column" :style="{ height: isSidebarCollapsed ? '600px' : '500px' }">
                        <div v-if="!selectedChat" class="no-chat-selected d-flex flex-column justify-content-center align-items-center h-100 text-center p-4">
                            <i class="bi bi-chat-square-text text-muted mb-3" style="font-size: 3rem;"></i>
                            <h5 class="text-muted mb-2">Pilih Kontak untuk Memulai Chat</h5>
                            <p class="text-muted">Pilih guru atau teman dari daftar kontak untuk memulai percakapan</p>
                            <button v-if="isSidebarCollapsed" @click="toggleSidebar" class="btn btn-primary rounded-pill mt-3">
                                <i class="bi bi-list me-2"></i>
                                Lihat Kontak
                            </button>
                        </div>
                        
                        <div v-else class="chat-messages flex-grow-1 p-3" :style="{ 'overflow-y': 'auto', 'max-height': isSidebarCollapsed ? '450px' : '350px' }">
                            <div v-for="message in currentMessages" 
                                 :key="message.id" 
                                 class="message-item mb-3"
                                 :class="message.type === 'sent' ? 'text-end' : 'text-start'">
                                <div class="message-bubble d-inline-block position-relative"
                                     :class="message.type === 'sent' ? 'bg-primary text-white' : 'bg-light text-dark'"
                                     style="max-width: 70%; padding: 12px 16px; border-radius: 18px;">
                                    <div v-if="message.type === 'received'" class="sender-name small fw-bold mb-1 opacity-75">
                                        {{ message.senderName }}
                                    </div>
                                    <div class="message-text" style="white-space: pre-wrap;">{{ message.message }}</div>
                                    <div class="message-time small mt-1"
                                         :class="message.type === 'sent' ? 'text-white-50' : 'text-muted'">
                                        {{ message.time }}
                                        <i v-if="message.type === 'sent' && message.isRead" 
                                           class="bi bi-check-all ms-1 text-info"></i>
                                        <i v-else-if="message.type === 'sent'" 
                                           class="bi bi-check ms-1"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Quick Replies -->
                        <div v-if="selectedChat" class="quick-replies p-3 border-top bg-light">
                            <small class="text-muted d-block mb-2">Balasan Cepat:</small>
                            <div class="d-flex flex-wrap gap-2">
                                <button v-for="reply in quickReplies" 
                                        :key="reply"
                                        @click="sendQuickReply(reply)"
                                        class="btn btn-outline-primary btn-sm rounded-pill">
                                    {{ reply }}
                                </button>
                            </div>
                        </div>
                        
                        <!-- Message Input -->
                        <div v-if="selectedChat" class="message-input-area p-3 border-top">
                            <form @submit.prevent="sendMessage" class="d-flex align-items-end gap-2">
                                <div class="flex-grow-1">
                                    <textarea v-model="newMessage" 
                                             class="form-control border-2" 
                                             placeholder="Ketik pesan..." 
                                             :rows="isSidebarCollapsed ? 3 : 2"
                                             style="resize: none; border-radius: 20px;"
                                             @keydown.enter.prevent="sendMessage"></textarea>
                                </div>
                                <div class="input-actions">
                                    <button type="button" class="btn btn-outline-secondary rounded-circle me-2" style="width: 40px; height: 40px;">
                                        <i class="bi bi-paperclip"></i>
                                    </button>
                                    <button type="button" class="btn btn-outline-secondary rounded-circle me-2" style="width: 40px; height: 40px;">
                                        <i class="bi bi-emoji-smile"></i>
                                    </button>
                                    <button type="submit" 
                                            class="btn btn-primary rounded-circle" 
                                            style="width: 40px; height: 40px;"
                                            :disabled="!newMessage.trim()">
                                        <i class="bi bi-send"></i>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="pb-4"></div>
</template>

<style scoped>
/* Chat Header Card Styling - Konsisten dengan theme */
.chat-header-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 120px;
}

.chat-bg-pattern {
  position: absolute;
  top: 0;
  right: 0;
  width: 100px;
  height: 100px;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="25" cy="25" r="8" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="2"/><circle cx="75" cy="25" r="8" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="2"/><circle cx="25" cy="75" r="8" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="2"/><circle cx="75" cy="75" r="8" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="2"/><path d="M25 35 Q50 50 75 35" stroke="rgba(255,255,255,0.1)" stroke-width="2" fill="none"/></svg>') no-repeat center;
  background-size: contain;
}

/* Chat Sidebar */
.chat-sidebar {
  border-radius: 15px !important;
  min-height: 600px;
  transition: all 0.3s ease;
}

.chat-sidebar.collapsed {
  width: 80px !important;
  min-width: 80px !important;
}

.sidebar-collapsed {
  flex: 0 0 80px !important;
  max-width: 80px !important;
}

.chat-full-width {
  flex: 1 !important;
  max-width: 100% !important;
}

.sidebar-toggle {
  border-bottom: 1px solid #dee2e6;
}

.collapsed-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
}

.collapsed-contacts {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 400px;
  overflow-y: auto;
}

.collapsed-contact-item {
  transition: all 0.3s ease;
  cursor: pointer;
}

.collapsed-contact-item:hover {
  transform: scale(1.1);
}

.collapsed-contacts::-webkit-scrollbar {
  width: 4px;
}

.collapsed-contacts::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 2px;
}

.collapsed-contacts::-webkit-scrollbar-thumb {
  background: var(--bs-primary);
  border-radius: 2px;
}

.search-container .input-group-text {
  border-radius: 10px 0 0 10px;
  border-right: none;
}

.search-container .form-control {
  border-radius: 0 10px 10px 0;
  border-left: none;
}

.search-container .form-control:focus {
  border-color: var(--bs-primary);
  box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
}

/* Contact Items */
.contacts-list {
  max-height: 450px;
  overflow-y: auto;
}

.contacts-list::-webkit-scrollbar {
  width: 6px;
}

.contacts-list::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.contacts-list::-webkit-scrollbar-thumb {
  background: var(--bs-primary);
  border-radius: 3px;
}

.contact-item {
  transition: all 0.3s ease;
  cursor: pointer;
}

.contact-item:hover {
  background: rgba(102, 126, 234, 0.05) !important;
  transform: translateX(2px);
}

.contact-item.bg-primary {
  border-left: 4px solid var(--bs-primary) !important;
}

.contact-avatar img {
  transition: transform 0.3s ease;
}

.contact-item:hover .contact-avatar img {
  transform: scale(1.05);
}

.online-indicator {
  animation: pulse 2s infinite;
}

.unread-badge {
  font-size: 0.7rem;
  min-width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Chat Window Enhancements */
.chat-window {
  border-radius: 15px !important;
  min-height: 600px;
  transition: all 0.3s ease;
}

.chat-window.full-width {
  width: 100%;
}

.chat-window-header {
  border-radius: 15px 15px 0 0 !important;
  border-bottom: 2px solid #f8f9fa;
  position: relative;
}

.chat-window-header::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 50px;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--bs-primary), transparent);
}

.chat-contact-avatar img {
  transition: transform 0.3s ease;
}

.chat-window-header:hover .chat-contact-avatar img {
  transform: scale(1.1);
}

/* Messages */
.chat-messages {
  background: linear-gradient(to bottom, #f8f9fa 0%, #ffffff 100%);
}

.message-item {
  animation: fadeInUp 0.3s ease-out;
}

.message-bubble {
  position: relative;
  word-wrap: break-word;
  animation: messageSlide 0.3s ease-out;
}

.message-bubble.bg-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
}

.message-bubble.bg-light {
  background: white !important;
  border: 1px solid #e9ecef;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.message-bubble::before {
  content: '';
  position: absolute;
  width: 0;
  height: 0;
}

/* Message tails */
.text-end .message-bubble::before {
  right: -8px;
  top: 10px;
  border-left: 8px solid var(--bs-primary);
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
}

.text-start .message-bubble::before {
  left: -8px;
  top: 10px;
  border-right: 8px solid white;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
}

/* No Chat Selected */
.no-chat-selected {
  background: linear-gradient(45deg, #f8f9fa 0%, #ffffff 50%, #f8f9fa 100%);
  border-radius: 20px;
  margin: 20px;
}

.no-chat-selected i {
  animation: float 3s ease-in-out infinite;
}

/* Quick Replies */
.quick-replies {
  border-radius: 0 0 0 0;
  background: linear-gradient(to right, #f8f9fa 0%, #ffffff 100%) !important;
}

.quick-replies .btn {
  font-size: 0.8rem;
  padding: 0.4rem 0.8rem;
  transition: all 0.3s ease;
  border-width: 1.5px;
}

.quick-replies .btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

/* Message Input */
.message-input-area {
  background: white;
  border-radius: 0 0 15px 15px;
}

.message-input-area textarea {
  border-color: #e9ecef;
  transition: all 0.3s ease;
}

.message-input-area textarea:focus {
  border-color: var(--bs-primary);
  box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
  transform: translateY(-1px);
}

.input-actions .btn {
  transition: all 0.3s ease;
}

.input-actions .btn:hover {
  transform: scale(1.1);
}

.input-actions .btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
}

.input-actions .btn-primary:hover {
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.input-actions .btn-primary:disabled {
  opacity: 0.5;
  transform: none;
}

/* Section Headers - Style konsisten dengan halaman lain */
.section-header {
  padding-left: 15px;
  border-left: 4px solid var(--bs-primary);
  background: linear-gradient(90deg, rgba(102, 126, 234, 0.1) 0%, transparent 100%);
  padding: 15px;
  border-radius: 8px;
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes messageSlide {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(40, 167, 69, 0.7);
  }
  70% {
    box-shadow: 0 0 0 8px rgba(40, 167, 69, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(40, 167, 69, 0);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* Container Animations */
.container {
  animation: fadeInUp 0.6s ease-out;
}

.container:nth-child(2) {
  animation-delay: 0.1s;
}

/* Collapse Animations */
.sidebar-collapse-enter-active,
.sidebar-collapse-leave-active {
  transition: all 0.3s ease;
}

.sidebar-collapse-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}

.sidebar-collapse-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.chat-expand-enter-active,
.chat-expand-leave-active {
  transition: all 0.3s ease;
}

.chat-expand-enter-from {
  transform: scale(0.95);
  opacity: 0;
}

.chat-expand-leave-to {
  transform: scale(0.95);
  opacity: 0;
}

/* Badge Improvements */
.badge {
  font-weight: 500;
  padding: 6px 12px;
  font-size: 0.7rem;
  letter-spacing: 0.5px;
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

/* Responsive Design */
@media (max-width: 768px) {
  .chat-header-card .card-body {
    padding: 20px !important;
  }
  
  .chat-sidebar,
  .chat-window {
    min-height: 500px;
  }
  
  .chat-messages {
    max-height: 300px;
  }
  
  .contact-item {
    padding: 15px !important;
  }
  
  .message-bubble {
    max-width: 85% !important;
  }
  
  .quick-replies {
    padding: 15px !important;
  }
  
  .message-input-area {
    padding: 15px !important;
  }
  
  /* Mobile Collapse Behavior */
  .sidebar-collapsed {
    position: fixed !important;
    top: 0;
    left: -100%;
    z-index: 1050;
    width: 280px !important;
    max-width: 280px !important;
    height: 100vh;
    background: white;
    transition: left 0.3s ease;
  }
  
  .sidebar-collapsed.show {
    left: 0;
  }
  
  .chat-full-width {
    flex: 1 !important;
    max-width: 100% !important;
    margin-left: 0 !important;
  }
  
  .mobile-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1040;
    display: none;
  }
  
  .mobile-overlay.show {
    display: block;
  }
}

@media (max-width: 576px) {
  .contact-avatar img,
  .chat-contact-avatar img {
    width: 40px !important;
    height: 40px !important;
  }
  
  .message-bubble {
    padding: 10px 12px !important;
    max-width: 90% !important;
  }
  
  .quick-replies .btn {
    font-size: 0.75rem;
    padding: 0.3rem 0.6rem;
  }
  
  .input-actions .btn {
    width: 35px !important;
    height: 35px !important;
  }
  
  .message-input-area textarea {
    min-height: 40px;
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

/* Typing Indicator */
.typing-indicator {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  background: #f8f9fa;
  border-radius: 15px;
  margin: 10px 0;
}

.typing-dots {
  display: flex;
  gap: 4px;
}

.typing-dot {
  width: 8px;
  height: 8px;
  background: #6c757d;
  border-radius: 50%;
  animation: typing 1.4s infinite ease-in-out;
}

.typing-dot:nth-child(1) {
  animation-delay: -0.32s;
}

.typing-dot:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes typing {
  0%, 80%, 100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

/* Status Colors */
.text-online {
  color: #28a745 !important;
}

.text-offline {
  color: #6c757d !important;
}

/* Chat Header Content */
.chat-header-content h5 {
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Message Status Icons */
.bi-check {
  font-size: 0.8rem;
}

.bi-check-all {
  font-size: 0.8rem;
  color: #17a2b8 !important;
}

/* Hover Effects for Interactive Elements */
.card:hover {
  transition: all 0.3s ease;
}
</style>