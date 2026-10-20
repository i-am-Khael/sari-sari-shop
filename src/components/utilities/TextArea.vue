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
  labelClass: {
    type: String,
    default: 'uppercase font-semibold tracking-wide'
  },
  textAreaClass: {
    type: String,
    default: 'w-full h-20 p-2 rounded outline-0 bg-slate-100 disabled:cursor-not-allowed'
  }
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
      :class="[props.textAreaClass, { 'outline-2 outline-red-600': props.error }]"
      @input="updateValue"
    >{{ props.text }}</textarea>
    <span v-if="props.error" class="text-red-600">{{ props.error }}</span>
  </div>
</template>
