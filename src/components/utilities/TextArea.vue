<script setup>
const props = defineProps({
  id: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  text: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  row: {
    type: String,
    default: '5'
  },
  cols: {
    type: String,
    default: '5'
  },
  inputValue: {
    type: String,
    default: ''
  },
  error: {
    type: String,
    default: ''
  },
  labelClass: String,
  textAreaClass: String
});

const emit = defineEmits([ 'update:inputValue' ]);
const updateValue = (event) => emit('update:inputValue', event.target.value);
</script>

<template>
  <div class="w-full flex flex-col gap-2">
    <label :for="props.id" :class="props.labelClass">{{ props.label }}</label>
    <textarea
      :id="props.id"
      :required="props.required"
      :disabled="props.disabled"
      :class="[props.textAreaClass, { 'error-input': props.error }]"
      @input="updateValue"
    >{{ props.text }}</textarea>
    <span v-if="props.error" class="error-msg">{{ props.error }}</span>
  </div>
</template>
