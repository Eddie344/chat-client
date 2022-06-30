<template>
  <div class="w-full h-full flex items-center justify-center">
    <div class="rounded-lg bg-white py-8 px-10 shadow-md">
      <h1 class="font-bold text-2xl">Welcome to chat!</h1>
      <form @submit.prevent="submit" class="mt-4 space-y-4">
        <UiInput v-model="name" label="Enter your nickname:" />
        <UiButton :disabled="!name"> Save </UiButton>
      </form>
    </div>
  </div>
</template>

<script setup>
import UiInput from '@/components/ui/UiInput.vue';
import UiButton from '@/components/ui/UiButton.vue';
import { ref } from 'vue';

const emit = defineEmits(['submit']);

const name = ref('');
const submit = () => {
  emit('submit', {
    name: name.value,
  });
};
</script>
