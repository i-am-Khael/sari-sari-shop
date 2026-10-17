<script setup>
import { ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import TextInput from '@/components/utilities/TextInput.vue'
import Button from '@/components/utilities/Button.vue'

const props = defineProps({
  btnLabel: {
    type: String,
    required: true
  },
  errors: {
    type: [Object, Array]
  }
});

const emit = defineEmits([ 'submit' ]);

const username = ref('');
const password = ref('');

const submitForm = () => {
  const data = {
    'username': username.value,
    'password': password.value
  }
  emit('submit', data);
}

</script>

<template>
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

    <form
      class="w-full mt-9 text-blue-100 flex flex-col gap-6"
      @submit.prevent="submitForm"
    >
      <TextInput
        id="username"
        type="text"
        label="Username"
        placeholder="Username"
        :required="true"
        :error="props.errors?.msg || props.errors?.username"
        v-model:input-value="username"
      />
      <TextInput
        id="password"
        type="password"
        label="password"
        placeholder="Password"
        :required="true"
        :error="props.errors?.msg || props.errors?.password"
        v-model:input-value="password"
      />
      <Button
        type="submit"
        :label="props.btnLabel"
        class="w-full mt-3 px-4 py-2 uppercase font-semibold tracking-wide rounded outline outline-blue-100 bg-linear-to-b from-blue-700 to-blue-900 hover:from-blue-900 hover:to-blue-700 hover:outline-2 focus:from-blue-900 focus:to-blue-700 focus:outline-2 cursor-pointer"
      />
    </form>

  </div>
</template>
