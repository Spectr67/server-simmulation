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
      successReg: false,
      errorReg: false,
      successLog: false,
      errorLog: false,
      sessionId: '',
    }
  },
  methods: {
    handleRegister(accountDto) {
      const success = register(accountDto)
      if (success) {
        this.accounts = getAccounts()
        this.successReg = true
        this.errorReg = false
      } else {
        this.successReg = false
        this.errorReg = true
      }
    },

    handleLogin(authData) {
      this.sessionId = authenticate(authData)

      if (this.sessionId) {
        this.successLog = true
        this.errorLog = false
      } else {
        this.successLog = false
        this.errorLog = true
      }

      // authorize(this.sessionId)
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
        <BAlert v-if="successReg" show variant="success" class="mt-3">
          ✅ Welcome! Check console.log.
        </BAlert>
        <BAlert v-if="errorReg" show variant="danger" class="mt-3">
          Something went wrong... try again.
        </BAlert>
      </div>

      <div class="col-md-6">
        <SignInForm @submitForm="handleLogin" />
        <BAlert v-if="successLog" show variant="success" class="mt-3">
          ✅ Welcome Back!
        </BAlert>
        <BAlert v-if="errorLog" show variant="danger" class="mt-3">
          Something went wrong... try again.
        </BAlert>
      </div>
    </div>
  </div>
</template>
