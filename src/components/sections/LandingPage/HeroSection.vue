<template>
  <header>
    <div class="container py-20">
      <div
        class="flex flex-col sm:flex-row w-full items-center sm:items-stretch gap-8 sm:gap-0"
      >
        <div
          class="w-full flex flex-col justify-between order-2 space-y-8 sm:space-y-0"
        >
          <h1 class="font-bold text-5xl text-primary">
            Layanan Konseling AI Untuk Mahasiswa FILKOM Aman, Cepat, dan Anonim
          </h1>
          <p class="text-primary text-lg">
            Platform konseling digital yang dirancang dengan menghadirkan
            layanan chatbot AI yang responsif dan konselor profesional yang siap
            membantu, secara anonim dan rahasia.
          </p>
          <div class="flex gap-4 justify-between">
            <router-link
              to="/chatbot"
              class="bg-secondary text-white py-2 px-8 text-lg rounded-full"
            >
              Mulai Chat Sekarang
            </router-link>
            <router-link
              to="/konseling"
              class="bg-primary text-white py-2 px-8 text-lg rounded-full"
            >
              Atur Jadwal Konseling
            </router-link>
          </div>
        </div>
        <img
          src="@/assets/images/LandingPage/Hero.png"
          alt=""
          class="w-[90%] sm:w-[50%] sm:order-2"
          draggable="false"
        />
      </div>
    </div>
  </header>
</template>

<script setup></script>

<style lang="scss" scoped></style>
