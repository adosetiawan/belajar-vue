<script setup>
import MenuItemComponent from '@/components/MenuItemComponent.vue';
import ScheduleItemComponent from '@/components/ScheduleItemComponent.vue'

</script>
<template>

    <!-- Welcome Toast -->
    <div class="toast toast-autohide custom-toast-1 toast-primary home-page-toast shadow" role="alert"
        aria-live="assertive" aria-atomic="true" data-bs-delay="60000" data-bs-autohide="true" id="installWrap">
        <div class="toast-body p-4">
            <div class="toast-text me-2">
                <h6 class="text-white">Welcome to Affan!</h6>
                <span class="d-block mb-2">Click the <strong>Install Now</strong> button & enjoy it just like an
                    app.</span>
                <button id="installAffan" class="btn btn-sm btn-warning">Install Now</button>
            </div>
        </div>
        <button class="btn btn-close btn-close-white position-absolute p-2" type="button" data-bs-dismiss="toast"
            aria-label="Close"></button>
    </div>

    <!-- Tiny Slider One Wrapper -->
    <div class="container mb-2">
        <!-- <div class="card user-info-card mt-1 bg-dark bg-img"
            style="background-image: url('@/assets/img/core-img/2.png')">
            <div class="card-body d-flex align-items-center">
                <div class="user-profile me-3">
                    <img src="@/assets/img/bg-img/2.jpg" alt="">
                </div>
                <div class="user-info">
                    <div class="d-flex align-items-center">
                        <h5 class="mb-1 text-white">Affan Islam</h5>
                        <span class="badge bg-warning ms-2 rounded-pill">Pro</span>
                    </div>
                    <p class="mb-0 text-white">UX/UI Designer</p>
                </div>
            </div>
        </div> -->

        <div class="card shadow-sm bg-gradient p-2 mt-2">
            <div class="element-heading">
                <div class="d-flex justify-content-between align-items-center">
                    <div class="element-heading">
                        <h6 class="ps-2 my-1">
                            <i class="bi bi-calendar-event"></i> 
                            26 Jan 2023
                        </h6>
                    </div>
                    <div class="element-heading">
                        <span class="badge bg-gray bg-gradient rounded-pill text-dark">
                            <i class="bi bi-clock"></i>
                             08:30 - 17:30
                        </span>
                    </div>
                </div>
            </div>
            <div class="row g-2 mt-1">
                <div class="col-6">
                    <div class="card bg-gray bg-gradient p-3">
                        <div class="d-flex align-items-center">
                            <div class="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center me-3"
                                style="width: 40px; height: 40px;">
                                <i class="bi bi-box-arrow-in-right"></i>
                            </div>
                            <div class="feature-card">
                                <p class="mb-1 ">Masuk</p>
                                <h6>07:35:07 </h6>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-6">
                    <div class="card bg-gray bg-gradient p-3">
                        <div class="d-flex align-items-center">
                            <div class="rounded-circle bg-dark text-white d-flex justify-content-center align-items-center me-3"
                                style="width: 40px; height: 40px;">
                                <i class="bi bi-box-arrow-left"></i>
                            </div>
                            <div class="feature-card">
                                <p class="mb-1 text-gray">Keluar</p>
                                <h6>18:05:07 </h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <SectionTittleComponent>
        Menu
    </SectionTittleComponent> 

    <div class="container direction-rtl mb-2">
        <div class="row g-3">
            <!-- Dark Mode Card -->
            <div class="col-4">
                <MenuItemComponent :to="'/schedule'">
                    <div class="card mx-auto bg-gray d-flex justify-content-center align-items-center">
                        <i class="bi bi-calendar-event" style="font-size: 1.8rem;"></i>
                    </div>
                    <p class="mb-0">Jadwal</p>
                </MenuItemComponent>
            </div>

            <!-- Absensi Card -->
            <div class="col-4">
                <MenuItemComponent :to="'/absence'">
                    <div class="card mx-auto bg-gray d-flex justify-content-center align-items-center">
                        <i class="bi bi-person-check" style="font-size: 1.8rem;"></i>
                    </div>
                    <p class="mb-0">Absensi</p>
                </MenuItemComponent>
            </div>

            <!-- Poin Siswa Card -->
            <div class="col-4">
                <MenuItemComponent :to="'/points'">
                    <div class="card mx-auto bg-gray d-flex justify-content-center align-items-center">
                        <i class="bi bi-award" style="font-size: 1.8rem;"></i>
                    </div>
                    <p class="mb-0">Poin Siswa</p>
                </MenuItemComponent>
            </div>

        </div>
    </div>
    <SectionTittleComponent>
        Jadwal
    </SectionTittleComponent> 
    <div class="top-products-area product-list-wrap">
      <div class="container">
        <div class="row g-3">

          <!-- Single Top Product Card -->
          <ScheduleItemComponent />
          <ScheduleItemComponent />
          <ScheduleItemComponent />
          <ScheduleItemComponent />

        </div>
      </div>
    </div>

    <div class="pb-3"></div>
</template>