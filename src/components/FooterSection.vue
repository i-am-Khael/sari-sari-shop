<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer>
    <div class="footer-container">
      <div class="w-full inline-flex items-center justify-between">
        <p class="font-semibold">&copy; {{ currentYear }} Michael Casals</p>
        <div class="text-2xl inline-flex items-center justify-center gap-4">
          <a href="https://github.com/i-am-Khael/sari-sari-shop">
            <FontAwesomeIcon icon="fa-brands fa-github"/>
          </a>
          <a href="https://michaelcasals.dev/">
            <FontAwesomeIcon icon="fa-brands fa-firefox-browser"/>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
