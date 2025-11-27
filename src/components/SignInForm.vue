<script>
import { signIn } from '../../dev/stateless.js'
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
      authData: {
        username: '',
        password: '',
      },
      pure: {
        username: true,
        password: true,
      },

      error: null,
      isSubmitted: false,
    }
  },

  methods: {
    initAuthData() {
      return { username: '', password: '' }
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

      setTimeout(() => {
        this.isSubmitted = false
        this.error = null
      }, 5000)
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
            :state="authData.username"
            required
            @blur="pure.username = false"
          />
        </BFormGroup>

        <BFormGroup label="Password" label-for="passwordLog">
          <BFormInput
            id="passwordLog"
            type="password"
            v-model="authData.password"
            :state="authData.password"
            required
            @blur="pure.username = false"
          />
        </BFormGroup>

        <div class="d-flex justify-content-between align-items-center mt-3">
          <BButton type="submit" variant="primary">Login</BButton>
          <small class="text-muted">All inputs required</small>
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
