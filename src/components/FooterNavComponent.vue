<template>
  <div class="footer-nav-area" id="footerNav">
    <div class="container px-0">
      <!-- Footer Content -->
      <div class="footer-nav position-relative footer-style-three shadow-sm">
        <ul class="h-100 d-flex align-items-center justify-content-between ps-0">
          <li>
            <RouterLink to="/profil">
                <i class="bi bi-person"></i>
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/chat">
              <i class="bi bi-chat-dots"></i>
            </RouterLink>
          </li>
          <li >
            <RouterLink to="/">
              <i class="bi bi-house"></i>
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/chat">
              <i class="bi bi-chat-dots"></i>
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/settings">
              <i class="bi bi-gear"></i>
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>