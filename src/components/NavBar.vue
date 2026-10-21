<script setup>
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth';
import { utilities } from '@/composables/utilities';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const router = useRouter();
const auth = useAuthStore();
const { isAuth } = storeToRefs(auth);
const { totalItems } = utilities();

const logout = async () => {
  const result = await auth.logout();
  if (result.status === 200) router.push({ name: 'index' });
}

</script>

<template>
  <header>
    <nav>

      <RouterLink to="/" class="icon-container">
        <span class="icon">
          <FontAwesomeIcon icon="fa-solid fa-box"/>
        </span>
        <div class="icon-text-container">
          <h1>Sari-Sari-Shop</h1>
          <span>
            Everything you need, everyday.
          </span>
        </div>
      </RouterLink>

      <ul class="link-container">
        <li>
          <RouterLink to="/products">Products</RouterLink>
        </li>
        <li>
          <RouterLink to="/categories">Categories</RouterLink>
        </li>
        <span class="divider"></span>
        <li class="login">
          <RouterLink to="/login">Login</RouterLink>
        </li>
        <li class="register">
          <RouterLink to="/register">Register</RouterLink>
        </li>
      </ul>

    </nav>
  </header>
</template>
