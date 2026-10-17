<script setup>
const props = defineProps({
  type: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  class: {
    type: String,
    default: 'w-full px-4 py-2 rounded border-none outline cursor-pointer'
  }
});

const emit = defineEmits([ 'click' ]);

</script>

<template>
  <button
    :type="props.type"
    :class="props.class"
    @click="emit('click')"
  >
    {{ props.label }}
  </button>
</template>
