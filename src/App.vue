<script>
import { BAlert } from 'bootstrap-vue-next'
import SignInForm from './components/SignInForm.vue'
import SignUpForm from './components/SignUpForm.vue'
import { getAccounts, setAccounts } from './localStorage/localStorage'
import { register, authenticate, authorize } from './server/server'
import GuestWindow from './components/GuestWindow.vue'
import UserWindow from './components/UserWindow.vue'
import ModeratorWindow from './components/ModeratorWindow.vue'
export default {
  components: {
    SignUpForm,
    SignInForm,
    BAlert,
    GuestWindow,
    UserWindow,
    ModeratorWindow,
  },
  data() {
    return {
      accounts: [],
      successReg: false,
      errorReg: false,
      successLog: false,
      errorLog: false,
      sessionId: '',
      recourseType: 'guest',
      currentAccount: null,
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

        const account = authorize(this.sessionId)

        this.recourseType = account?.role || 'guest'
        this.currentAccount = account // ⬅ сохраняем тут

        console.log('Role:', this.recourseType)
      } else {
        this.successLog = false
        this.errorLog = true
        this.recourseType = 'guest'
        this.currentAccount = null
      }
    },

    loadAccounts() {
      this.accounts = getAccounts()

      const adminExists = this.accounts.some(acc => acc.username === 'admin')
      if (!adminExists) {
        const admin = {
          id: 'admin-id-1',
          username: 'admin',
          password: 'admin',
          drink: 'Tea',
          role: 'admin',
        }
        this.accounts.push(admin)
        setAccounts(this.accounts)
        console.log('Admin has created')
      }
    },
  },
  mounted() {
    this.loadAccounts()
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
  <div class="container py-5">
    <GuestWindow v-if="recourseType === 'guest'" />
    <UserWindow v-if="recourseType === 'user'" :account="currentAccount" />
    <ModeratorWindow
      v-if="recourseType === 'moderator' || recourseType === 'admin'"
      :account="currentAccount"
      :accounts="this.accounts"
    />
  </div>
</template>
