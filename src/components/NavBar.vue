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

      <div class="link-container">
        <ul class="common-links">
          <li>
            <RouterLink to="/products">Products</RouterLink>
          </li>

          <li>
            <RouterLink to="/featured">Featured</RouterLink>
          </li>

          <li>
            <RouterLink to="/categories">Categories</RouterLink>
          </li>
        </ul>

        <ul v-if="!isAuth" class="auth-links">
          <li>
            <RouterLink to="/login" class="login" >Login</RouterLink>
          </li>

          <li>
            <RouterLink to="/register" class="register">Register</RouterLink>
          </li>
        </ul>

        <div class="divider"></div>

        <ul class="user-links">
          <li class="checkout">
            <RouterLink to="/user/checkout" >
              <FontAwesomeIcon icon="fa-solid fa-shopping-cart"/>
            </RouterLink>
            <span v-if="totalItems" >{{ totalItems }}</span>
          </li>
          <div v-if="isAuth">
            <li>
              <RouterLink to="/user/profile">
                <FontAwesomeIcon icon="fa-solid fa-circle-user"/>
              </RouterLink>
            </li>
            <li class="logout" @click="logout">
              <FontAwesomeIcon icon="fa-solid fa-right-from-bracket"/>
            </li>
          </div>
        </ul>

      </div>

    </nav>
  </header>
</template>
