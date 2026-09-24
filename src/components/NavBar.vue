<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { utilities } from '@/composables/utilities';

const { totalItems } = utilities();
</script>

<template>
  <header class="w-full bg-linear-to-r from-blue-950 to-blue-700 shadow-lg shadow-slate-950/30">
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

      <div class="flex items-center gap-2">
        <RouterLink
          to="/checkout"
          class="h-11 w-11 group relative flex items-center justify-center rounded text-blue-100 transition-all duration-200 bg-slate/20 hover:text-slate"
        >
          <FontAwesomeIcon
            icon="fa-solid fa-cart-shopping"
            class="text-2xl transition-transform duration-200 group-hover:scale-110"
          />
          <span v-if="totalItems > 0" class="px-2 py-0.5 absolute -top-2 -right-0.5 flex itemx-center justify-center rounded-full bg-green-400 text-slate-900" >{{ totalItems }}</span>
        </RouterLink>
        <span class="h-7 w-px mx-1 bg-slate-50/20" ></span>
        <RouterLink
          to="/login"
          class="px-4 py-2.5 uppercase text-sm font-semibold text-slate-50 rounded bg-slate-50/10 ring-1 ring-slate-50/20 transition-all duration-200 hover:bg-slate-50/20 hover:ring-slate-50/30 active:scale-95"
        >
          Login
        </RouterLink>
      </div>

    </nav>
  </header>
</template>
