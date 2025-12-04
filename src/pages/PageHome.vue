<script>
import GuestWindow from '@/ui/UiGuestWindow.vue'
import { BButton } from 'bootstrap-vue-next'
import { showHome } from '../../src-sv/server/stateless.js'

export default {
  components: {
    GuestWindow,
    BButton,
  },

  data() {
    return {
      textFromServer: showHome(),
    }
  },
}
</script>

<template>
  <div class="container py-5">
    <h1>{{ textFromServer }}</h1>
    <div class="mt-5 justify-content-center">
      <GuestWindow />
    </div>

    <div class="d-flex justify-content-center gap-3 mt-4">
      <BButton to="/signUp" variant="success" size="lg">Sign Up</BButton>
      <BButton to="/signIn" variant="success" size="lg">Sign In</BButton>
    </div>
  </div>
</template>
