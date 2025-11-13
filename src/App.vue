<script>
import SignUpForm from './components/SignUpForm.vue'
import { getAccounts, getSessions } from './localStorage/localStorage'
import { register } from './server/server'
export default {
  components: { SignUpForm },
  data() {
    return {
      accounts: getAccounts(),
    }
  },
  methods: {
    handleRegister(accountDto) {
      const success = register(accountDto)
      if (success) {
        console.log('Аккаунт успешно зарегистрирован!')
        this.accounts = getAccounts()
      } else {
        console.log(' Ошибка регистрации (возможно логин уже занят)')
      }
    },
  },
}
</script>

<template>
  {{ accounts }}
  <div class="container py-5">
    <SignUpForm @submitForm="handleRegister" />
  </div>
</template>
