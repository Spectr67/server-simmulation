<script>
import { BAlert } from 'bootstrap-vue-next'
import SignInForm from './components/SignInForm.vue'
import SignUpForm from './components/SignUpForm.vue'
import { getAccounts } from './localStorage/localStorage'
import { register, authenticate, authorize } from './server/server'
export default {
  components: { SignUpForm, SignInForm, BAlert },
  data() {
    return {
      accounts: getAccounts(),
      success: false,
      sessionId: '',
    }
  },
  methods: {
    handleRegister(accountDto) {
      const success = register(accountDto)
      if (success) {
        console.log('Аккаунт успешно зарегистрирован!')
        this.accounts = getAccounts()
        this.success = true
      } else {
        console.log(' Ошибка регистрации (возможно логин уже занят)')
        this.success = false
      }
    },
    handleLogin(authData) {
      this.sessionId = authenticate(authData)
      if (this.sessionId) console.log('вход успешен:', authData.username)
      else console.log('фейл входа')
      authorize(this.sessionId)
    },
  },
}
</script>

<template>
  <span>ACCounts{{ accounts }}</span>
  <div class="container py-5">
    <div class="row g-4">
      <div class="col-md-6">
        <SignUpForm @submitForm="handleRegister" />
        <BAlert v-if="success" show variant="success" class="mt-3">
          ✅ Welcome! Check console.log.
        </BAlert>
      </div>

      <div class="col-md-6">
        <SignInForm @submitForm="handleLogin" />
        <BAlert v-if="success" show variant="success" class="mt-3">
          ✅ Welcome Back!
        </BAlert>
      </div>
    </div>
  </div>
</template>
