<script>
import GuestWindow from '@/components/GuestWindow.vue'
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
  </div>
  <div>
    <GuestWindow />
  </div>
</template>
