  <script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
</script>

<template>
  <section class="relative overflow-hidden bg-slate-50">
    <div class="h-96 w-96 absolute -right-32 -top-32 rounded-full bg-blue-300 blur-3xl"></div>
    <div class="h-96 w-96 absolute -bottom-40 -left-32 rounded-full bg-blue-300 blur-3xl"></div>

    <div class="mx-auto p-10 relative grid lg:grid-cols-2 items-center gap-12">

      <div class="max-w-2xl">

        <div class="mb-5 px-4 py-2 text-sm font-semibold text-blue-700 inline-flex items-center gap-2 rounded-full bg-blue-100">
          <FontAwesomeIcon icon="fa-solid fa-store"/>
          Your neighborhood online sari-sari-shop.
        </div>

        <h2 class="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
          Everything you need,
          <span class="text-blue-700">everyday.</span>
        </h2>

        <p class="max-w-xl mt-6 leading-7 text-base text-slate-600 sm:text-lg">
          Shop everyday essentials, clothes, foods, drinks, household favorites and even cars from your trusted sari-sari-shop.
        </p>

        <div class="mt-8 flex flex-col gap-8 sm:flex-row">
          <RouterLink
            to="/shop"
            class="px-6 py-3.5 font-semibold text-slate-50 inline-flex items-center justify-center gap-2 rounded bg-blue-700 shadow-lg shadow-blue-700/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-800 hover:shadow-xl hover:shadow-blue-700/25 active:translate-y-0"
          >
            <FontAwesomeIcon icon="fa-solid fa-bag-shopping"/>
            <span>Shop Now</span>
          </RouterLink>
          <RouterLink
            to="/categories"
            class="px-6 py-3.5 font-semibold text-slate-700 inline-flex items-center justify-center gap-2 transition-all duration-200 hover:text-blue-800"
          >
            <span>Browse Categories</span>
            <FontAwesomeIcon icon="fa-solid fa-arrow-right" class="text-sm"/>
          </RouterLink>
        </div>

        <div class="max-w-xl mt-10 grid grid-cols-3 divide-x divide-slate-200">

          <div class="pr-4 inline-flex items-center gap-2">
            <FontAwesomeIcon
              icon="fa-solid fa-truck-fast"
              class=" text-blue-600"
            />
            <p class="text-sm font-semibold text-slate-800">Fast Delivery.</p>
          </div>

          <div class="pr-4 inline-flex items-center gap-2">
            <FontAwesomeIcon
              icon="fa-solid fa-tags"
              class=" text-blue-600"
            />
            <p class="text-sm font-semibold text-slate-800">Great Prices.</p>
          </div>

          <div class="pr-4 inline-flex items-center gap-2">
            <FontAwesomeIcon
              icon="fa-solid fa-shield-heart"
              class=" text-blue-600"
            />
            <p class="text-sm font-semibold text-slate-800">Trusted Shop.</p>
          </div>

        </div>

      </div>


      <div class="w-full max-w-xl mx-auto relative">

        <div class="p-8 sm:p-10 relative overflow-hidden rounded bg-linear-to-br from-blue-700 via-blue-800 to-blue-950 shadow-2xl shadow-blue-950/30">

          <div class="h-48 w-48 absolute -right-16 -top-16 rounded-full bg-slate-50/10"></div>
          <div class="h-56 w-56 absolute -bottom-24 -left-16 rounded-full bg-slate-50/10"></div>

          <div class="w-44 h-44 sm:w-52 sm:h-52 mx-auto relative flex items-center justify-center rounded-full backdrop-blur-sm ring-1 ring-slate-50/20">
            <div class="w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center rounded-3xl shadow-xl bg-blue-200">
              <FontAwesomeIcon
                icon="fa-solid fa-store"
                class="text-6xl sm:text-7xl text-blue-700"
              />
            </div>
          </div>

          <div class="mt-8 relative text-center">
            <p class="uppercase text-sm font-medium text-blue-200">Sari-Sari-Shop</p>
            <h3 class="mt-1 text-2xl font-bold text-slate-50 sm:text-3xl">
              Your daily essentials,
              <br/>
              all in one place.
            </h3>
          </div>

        </div>

      </div>

    </div>
  </section>
</template>
