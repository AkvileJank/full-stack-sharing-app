<script setup lang="ts">
import { FwbNavbarLink } from 'flowbite-vue'
import StackedLayout from './StackedLayout.vue'
import { logout } from '@/stores/user'
import { useRouter } from 'vue-router'

const router = useRouter()

const links = [
  { label: 'Dashboard', name: 'Dashboard' },
  { label: 'Browse lessons', name: 'Lessons' },
  { label: 'My teaching', name: 'CreatedLessons' },
  { label: 'My learning', name: 'JoinedLessons' },
]

function logoutUser() {
  logout()
  router.push({ name: 'Login' })
}
</script>

<template>
  <StackedLayout :links="links">
    <template #menu>
      <FwbNavbarLink @click.prevent="logoutUser" link="#">Logout</FwbNavbarLink>
    </template>
  </StackedLayout>
</template>
