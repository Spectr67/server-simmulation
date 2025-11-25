<script>
import SignInForm from '@/components/SignInForm.vue'
import SignUpForm from '@/components/SignUpForm.vue'
import { accounts, sessions } from '@/../dev/stateless'
import GuestWindow from '@/components/GuestWindow.vue'
import UserWindow from '@/components/UserWindow.vue'
import ModeratorWindow from '@/components/ModeratorWindow.vue'
import AdminPanel from '@/components/AdminPanel.vue'

export default {
  components: {
    SignUpForm,
    SignInForm,
    GuestWindow,
    UserWindow,
    ModeratorWindow,
    AdminPanel,
  },
  data() {
    return {
      accounts: accounts,
      sessionId: '',
      role: 'guest',
      currentAccount: null,
    }
  },
  methods: {
    loadAccounts() {
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
        console.log('Admin has been created')
        const moder = {
          id: 'moder-id-1',
          username: 'moder',
          password: 'moder',
          drink: 'Tea',
          role: 'moder',
        }
        this.accounts.push(moder)
        console.log('Moder has been created')
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
        <SignInForm />
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
