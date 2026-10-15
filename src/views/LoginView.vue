<script setup>
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
</script>

<template>
  <section class="w-full min-h-screen flex items-center justify-center">

    <div class="w-130 h-auto p-6 rounded bg-linear-to-b from-blue-700 to-blue-900">

      <div class="group flex items-center gap-3 text-slate-100">
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
      </div>

      <form class="w-full mt-6 text-blue-100 flex flex-col gap-6">
        <div class="flex flex-col justify-center gap-2">
          <label
            for="username"
            class="uppercase tracking-wide font-semibold"
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="Username"
            class="w-full px-3 py-2 text-blue-950 rounded border-none outline-none bg-blue-100"
          >
        </div>
        <div class="flex flex-col justify-center gap-2">
          <label
            for="password"
            class="uppercase tracking-wide font-semibold"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            class="w-full px-3 py-2 text-blue-950 rounded border-none outline-none bg-blue-100"
          >
        </div>
        <button
          class="mt-4 py-2 uppercase font-semibold tracking-wide text-blue-950 rounded bg-blue-100 hover:bg-linear-to-b hover:from-blue-700 hover:to-blue-900 hover:outline hover:outline-blue-100 hover:text-blue-100 focus:bg-linear-to-b focus:from-blue-700 focus:to-blue-900 focus:outline focus:outline-blue-100 focus:text-blue-100 cursor-pointer"
        >
          Login
        </button>
      </form>

    </div>


  </section>
</template>
