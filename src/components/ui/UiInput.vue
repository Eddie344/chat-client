<template>
  <label class="flex flex-col gap-y-2" :class="{ 'block w-full': block }">
    <span v-if="label">{{ label }}</span>
    <input
      type="text"
      :value="modelValue"
      @input="updateValue"
      class="flex-grow py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-200 transition border border-gray-300"
    />
  </label>
</template>

<script setup>
defineProps({
  modelValue: String,
  label: String,
  block: Boolean,
});

const emit = defineEmits(['update:modelValue']);

const updateValue = (event) => {
  emit('update:modelValue', event.target.value);
};
</script>
