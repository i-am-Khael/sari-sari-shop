<script setup>
const props = defineProps({
  id: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    required: true
  },
  required: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  inputValue: {
    type: [ String, Number ],
    default: ''
  },
  error: {
    type: String
  },
  labelClass: {
    type: String,
    default: 'uppercase font-semibold tracking-wide'
  },
  inputClass: {
    type: String,
    default: 'px-4 py-2 text-blue-900 rounded border-none outline-0 bg-blue-100'
  },
});

const emit = defineEmits([ 'update:inputValue' ]);

const updateValue = (event) => emit('update:inputValue', event.target.value);
</script>

<template>
  <div class="w-full flex flex-col gap-2">
    <label :for="props.id" :class="props.labelClass">{{ props.label }}</label>
    <input
      :id="props.id"
      :name="props.id"
      :type="props.type"
      :placeholder="props.placeholder"
      :required="props.required"
      :disabled="props.disabled"
      :value="props.inputValue"
      :class="[ props.inputClass, { 'outline-2 outline-red-600': props.error } ]"
      @input="updateValue"
    />
    <span v-if="props.error" class="text-sm text-red-600" >{{ props.error }}</span>
  </div>
</template>
