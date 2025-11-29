<script>
import GuestWindow from '@/ui/UiGuestWindow.vue'
import SignInForm from '@/components/SignInForm.vue'
import SignUpForm from '@/components/SignUpForm.vue'

export default {
  components: {
    GuestWindow,
    SignUpForm,
    SignInForm,
  },
}
</script>

<template>
  <div class="container py-5">
    <div class="row g-4">
      <div class="col-md-6">
        <SignUpForm />
      </div>
      <div class="col-md-6">
        <SignInForm />
      </div>
    </div>
    <div class="mt-5">
      <GuestWindow />
    </div>
  </div>
</template>
