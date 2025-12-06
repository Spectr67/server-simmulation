<script>
import { signIn } from '../../src-sv/server/stateless.js'
import {
  BContainer,
  BCard,
  BForm,
  BFormGroup,
  BFormInput,
  BButton,
  BAlert,
} from 'bootstrap-vue-next'

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
      authData: this.initAuthData(),
      error: null,
      isSubmitted: false,
      pure: {
        username: true,
        password: true,
      },
    }
  },

  methods: {
    initAuthData() {
      return { username: '', password: '' }
    },

    fieldState(value, pure) {
      if (pure) return null
      return value ? true : false
    },

    submitForm() {
      const sid = signIn(this.authData)

      if (!sid) {
        this.error = { message: 'Login failed' }
      } else {
        this.error = null
      }

      this.isSubmitted = true

      this.authData = this.initAuthData()
      this.pure.username = true
      this.pure.password = true

      setTimeout(() => {
        this.error = null
      }, 2000)
    },
    goSignIn() {
      this.isSubmitted = false
      this.$router.push('/panel')
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
            :state="fieldState(authData.username, pure.username)"
            required
            @blur="pure.username = false"
          />
        </BFormGroup>

        <BFormGroup label="Password" label-for="passwordLog">
          <BFormInput
            id="passwordLog"
            type="password"
            v-model="authData.password"
            :state="fieldState(authData.password, pure.password)"
            required
            @blur="pure.password = false"
          />
        </BFormGroup>

        <div class="d-flex justify-content-between align-items-center mt-3">
          <BButton type="submit" variant="success">Login</BButton>
          <small class="text-muted">All inputs required</small>
          <BButton
            v-if="isSubmitted && !error"
            variant="success"
            @click="goSignIn"
          >
            Keep going
          </BButton>
        </div>
      </BForm>

      <div v-if="isSubmitted">
        <BAlert v-if="error" show variant="danger" class="mt-3">
          ❌ Something went wrong... try again.
        </BAlert>

        <BAlert v-else show variant="success" class="mt-3">
          ✅ Welcome Back!
        </BAlert>
      </div>
    </BCard>
  </BContainer>
</template>
