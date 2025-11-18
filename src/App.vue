<script>
import { BAlert } from 'bootstrap-vue-next'
import SignInForm from './components/SignInForm.vue'
import SignUpForm from './components/SignUpForm.vue'
import { getAccounts, setAccounts } from '../src-sv/server/localStorage'
import { register, authenticate, authorize } from '../src-sv/server/server'
import GuestWindow from './components/GuestWindow.vue'
import UserWindow from './components/UserWindow.vue'
import ModeratorWindow from './components/ModeratorWindow.vue'
import AdminPanel from './components/AdminPanel.vue'
export default {
  components: {
    SignUpForm,
    SignInForm,
    BAlert,
    GuestWindow,
    UserWindow,
    ModeratorWindow,
    AdminPanel,
  },
  data() {
    return {
      accounts: [],
      successLog: false,
      errorLog: false,
      availableStatuses: [
        'ok-signup',
        'err-signup',
        'ok-signin',
        'err-signin',
        'none',
      ],
      status: 'none',
      sessionId: '',
      role: 'guest',
      currentAccount: null,
    }
  },
  methods: {
    handleLogin(authData) {
      this.sessionId = authenticate(authData)

      if (this.sessionId) {
        this.successLog = true
        this.errorLog = false

        const account = authorize(this.sessionId)

        this.role = account?.role || 'guest'
        this.currentAccount = account

        console.log('Role:', this.role)
      } else {
        this.successLog = false
        this.errorLog = true
        this.role = 'guest'
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
    handleChangeRole() {
      console.log()
      const acc = getAccountByUsername(AccUsername)
      const role = role
      acc.role = role
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
        <SignUpForm />
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
    <GuestWindow v-if="role === 'guest'" />
    <UserWindow v-if="role === 'user'" :account="currentAccount" />
    <ModeratorWindow
      v-if="role === 'moderator' || role === 'admin'"
      :account="currentAccount"
      :accounts="this.accounts"
    />
    <AdminPanel
      v-if="role === 'admin'"
      :account="currentAccount"
      :accounts="this.accounts"
      @changeRole="handleChangeRole"
    />
  </div>
</template>
