<script>
import {
  BContainer,
  BCard,
  BForm,
  BFormGroup,
  BFormInput,
  BButton,
  BAlert,
} from 'bootstrap-vue-next'

import { signIn } from '@/client/client-api'

export default {
  components: {
    BContainer,
    BCard,
    BForm,
    BFormGroup,
    BFormInput,
    BButton,
    BAlert,
  },
  data() {
    return {
      authData: {
        username: '',
        password: '',
      },

      submitted: false,
      successLog: false,
      errorLog: false,
    }
  },
  methods: {
    fieldState(field) {
      const value = this.authData[field]
      if (!value) return null
      return true
    },

    submitForm() {
      this.successLog = false
      this.errorLog = false

      if (!this.authData.username || !this.authData.password) {
        this.errorLog = true
        return
      }
      const ok = signIn(this.authData)

      if (ok) {
        this.successLog = true
      } else {
        this.errorLog = true
      }
      setTimeout(() => {
        this.successLog = false
        this.errorLog = false
      }, 3000)

      setTimeout(() => {
        this.authData.username = ''
        this.authData.password = ''
      }, 300)
    },
  },
}
</script>

<template>
  <BContainer class="mt-4 d-flex justify-content-center">
    <BCard style="max-width: 520px; width: 100%">
      <h4 class="mb-3">Login</h4>

      <BForm @submit.prevent="submitForm" novalidate>
        <BFormGroup label="Username" label-for="usernameLog">
          <BFormInput
            id="usernameLog"
            v-model.trim="authData.username"
            :state="fieldState('username')"
            required
          />
        </BFormGroup>

        <BFormGroup label="Password" label-for="passwordLog">
          <BFormInput
            id="passwordLog"
            type="password"
            v-model="authData.password"
            :state="fieldState('password')"
            required
          />
        </BFormGroup>

        <div class="d-flex justify-content-between align-items-center mt-3">
          <BButton type="submit" variant="primary">Login</BButton>
          <small class="text-muted">All inputs required</small>
        </div>
      </BForm>

      <BAlert v-if="successLog" show variant="success" class="mt-3">
        ✅ Welcome Back!
      </BAlert>

      <BAlert v-if="errorLog" show variant="danger" class="mt-3">
        ❌ Something went wrong... try again.
      </BAlert>
    </BCard>
  </BContainer>
</template>
