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
  labelClass: String,
  inputClass: String
});

const emit = defineEmits([ 'update:inputValue' ]);
const updateValue = (event) => emit('update:inputValue', event.target.value);
</script>

<template>
  <div>
    <label :for="props.id" :class="props.labelClass">{{ props.label }}</label>
    <input
      :id="props.id"
      :name="props.id"
      :type="props.type"
      :placeholder="props.placeholder"
      :required="props.required"
      :disabled="props.disabled"
      :value="props.inputValue"
      :class="[ props.inputClass, { 'error-input': props.error } ]"
      @input="updateValue"
    />
    <span v-if="props.error" class="error-msg" >{{ props.error }}</span>
  </div>
</template>
