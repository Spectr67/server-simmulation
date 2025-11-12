<script>
import {
  BButton,
  BCard,
  BForm,
  BFormGroup,
  BFormInput,
  BTable,
} from 'bootstrap-vue-next'
import {
  setRoleToAccount,
  register,
  authenticate,
  authorize,
  sessions,
  accounts,
} from './server/controller'
import { getAccountByUsername } from './server/server'
import SignUpForm from './components/SignUpForm.vue'
export default {
  components: {
    BCard,
    BForm,
    BFormInput,
    BFormGroup,
    BButton,
    BTable,
    SignUpForm,
  },
  data() {
    return {
      accounts,
      sessionId: null,
      currentUser: null,
      activePanel: 'home',
      form: { username: '', password: '', re: '', drink: '' },
    }
  },
  methods: {
    signUp() {
      const success = register(this.form)

      if (success) {
        console.log('Welcome')
      } else {
        console.log('Try again')
      }

      this.form = { username: '', password: '', re: '', drink: '' }
    },
    signIn() {
      const sid = authenticate(this.form)
      if (sid) {
        this.sessionId = sid
        this.currentUser = getAccountByUsername(this.form.username)
        console.log('Welcome')
      } else {
        console.log('Try again')
      }
    },
    canAccess(panel) {
      return authorize(this.sessionId, panel)
    },
    logout() {
      this.sessionId = null
      this.currentUser = null
      this.activePanel = 'home'
    },
  },
}
</script>

<template>
  <div class="container py-5">
    <SignUpForm />
  </div>
</template>

<style>
body {
  background-color: #f8f9fa;
}
</style>
