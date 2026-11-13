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
  <div class="form-container">

    <form @submit.prevent="submitForm">
      <TextInput
        id="username"
        type="text"
        label="Username"
        placeholder="Username"
        :required="true"
        :error="props.errors?.error || props.errors?.username"
        v-model:input-value="username"
      />
      <TextInput
        id="password"
        type="password"
        label="password"
        placeholder="Password"
        :required="true"
        :error="props.errors?.error || props.errors?.password"
        v-model:input-value="password"
      />
      <Button
        type="submit"
        :label="props.btnLabel"
        class="form-button"
      />
    </form>

  </div>
</template>
