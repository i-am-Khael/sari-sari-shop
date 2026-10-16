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
  <header class="w-full bg-linear-to-r from-blue-950 to-blue-700 shadow-lg shadow-slate-950/30 print:hidden">
    <nav class="max-w-[2400px] mx-auto px-5 py-4 flex items-center justify-between">
      <RouterLink
        to="/"
        class="group flex items-center gap-3 text-slate-100"
      >
        <span class="h-11 w-11 flex items-center justify-center rounded bg-slate-50/10 ring-1 ring-slate-50/20 shadow-inner backdrop-blur-sm group-hover:bg-slate-50/20 group-hover:ring-slate-50/30">
          <FontAwesomeIcon
            icon="fa-solid fa-box"
            class="text-2xl text-blue-200 transition-transform duration-200 group-hover:scale-110"
          />
        </span>
        <div class="flex flex-col leading-tight">
          <h1 class="text-xl font-bold tracking-wide sm:text-2xl">Sari-Sari-Shop</h1>
          <span class="text-xs font-medium text-blue-200/80">
            Everything you need, everyday.
          </span>
        </div>
      </RouterLink>

      <ul class="font-semibold text-blue-100 inline-flex items-center justify-center gap-4">

        <li>
          <RouterLink to="/products">Products</RouterLink>
        </li>

        <li>
          <RouterLink to="/categories">Categories</RouterLink>
        </li>

        <li class="relative">
          <RouterLink to="/user/checkout">
            <FontAwesomeIcon
              class="text-2xl"
              icon="fa-solid fa-shopping-cart"
            />
            <div
              v-if="totalItems !== 0"
              class="w-5 h-5 p-4 text-blue-100 flex items-center justify-center rounded-full absolute -top-5 left-3 bg-blue-950/80"
            >
              <span class="" >{{ totalItems }}</span>
            </div>
          </RouterLink>
        </li>

        <span class="h-8 border-l border-blue-100"></span>

        <li v-if="isAuth">
          <span class="cursor-pointer" @click="logout">Logout</span>
        </li>

        <li v-if="!isAuth" class="px-4 py-2 font-semibold tracking-wide text-sm rounded bg-blue-100/20 backdrop-blur-3xl hover:bg-blue-100/30 hover:outline hover:outline-blue-100/40">
          <RouterLink to="/login">Login</RouterLink>
        </li>

        <li v-if="!isAuth" class="px-4 py-2 font-semibold tracking-wide text-sm rounded bg-blue-100/20 backdrop-blur-3xl hover:bg-blue-100/30 hover:outline hover:outline-blue-100/40">
          <RouterLink to="/register">Register</RouterLink>
        </li>

      </ul>

    </nav>
  </header>
</template>
