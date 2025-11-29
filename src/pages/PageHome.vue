<script>
import GuestWindow from '@/ui/UiGuestWindow.vue'
import { BButton } from 'bootstrap-vue-next'

export default {
  components: {
    GuestWindow,
    BButton,
  },
}
</script>

<template>
  <div class="container py-5">
    <div class="mt-5 justify-content-center">
      <GuestWindow />
    </div>

    <div class="d-flex justify-content-center gap-3 mt-4">
      <BButton to="/signUp" variant="success" size="lg">Sign Up</BButton>
      <BButton to="/signIn" variant="success" size="lg">Sign In</BButton>
    </div>
  </div>
</template>
