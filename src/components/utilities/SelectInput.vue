<script setup>
import LoadingBar from './LoadingBar.vue';

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  required: {
    type: Boolean,
    default: true
  },
  disabled: {
    type: Boolean,
    default: false
  },
  options: {
    type: Array,
    required: true
  },
  textOption: {
    type: String,
    default: 'Select option..'
  },
  optionLabel: {
    type: String,
    default: 'label'
  },
  optionValue: {
    type: String,
    default: 'id'
  },
  inputValue: {
    type: [String, Number],
    default: ''
  },
  error: {
    type: String,
    default: ''
  },
  labelClass: String,
  selectClass: String,
  isLoading: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits([ 'update:inputValue' ]);
const updateValue = (event) => emit('update:inputValue', event.target.value);
</script>

<template>
	<div class="w-full flex flex-col gap-2">
	  <label :for="props.id" :class="props.labelClass" >{{ props.label }}</label>
		<LoadingBar v-if="props.isLoading"/>
		<select
		  v-else
		  :id="props.id"
			:required="props.required"
			:disabled="props.disabled"
			:value="props.inputValue"
			:class="[props.selectClass, { 'error-input': props.error }]"
			@input="updateValue"
		>
		  <option value="">{{ props.textOption }}</option>
			<option
			  v-for="item in props.options"
				:key="item[props.optionValue]"
			  :value="item[props.optionValue]"
			>
			  {{ item[props.optionLabel] }}
			</option>
		</select>
		<span v-if="props.error" class="error-msg">{{ props.error }}</span>
	</div>
</template>
