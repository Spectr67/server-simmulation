<script>
import SignUpForm from './components/SignUpForm.vue'
export default {
  components: { SignUpForm },
  data() {
    return {}
  },
  methods: {
    handleRegister(accountDto) {
      console.log('Получено сверху:', accountDto)
    },
  },
}
</script>

<template>
  <div class="container py-5">
    <SignUpForm @submitForm="handleRegister" />
  </div>
</template>
