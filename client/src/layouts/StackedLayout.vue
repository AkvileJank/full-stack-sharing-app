<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { FwbNavbar, FwbNavbarCollapse, FwbNavbarLink } from 'flowbite-vue'

const { links } = defineProps<{
  links: {
    label: string
    name: string
  }[]
}>()

const route = useRoute()

const navigation = computed(() =>
  links.map((item) => ({
    ...item,
    isActive: route.name === item.name,
  }))
)
</script>

<template>
  <div class="cont">
    <FwbNavbar>
      <template #default="{ isShowMenu }">
        <FwbNavbar-collapse :isShowMenu="isShowMenu">
          <!-- prettier-ignore -->
          <FwbNavbarLink
          v-for="link in navigation"
          :key="link.name"
          :is-active="link.isActive"
          :link="({ name: link.name } as any)"
          link-attr="to"
          component="RouterLink"
        >
          {{ link.label }}
        </FwbNavbarLink>
          <slot name="menu" />
        </FwbNavbar-collapse>
      </template>
    </FwbNavbar>
  </div>
  <main>
    <RouterView />
  </main>
</template>

<style>
.cont {
  position: relative;
}
</style>
