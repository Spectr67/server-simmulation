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

import { signUp } from '@/client/client-api'
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
  emits: ['submitForm'],
  data() {
    return {
      regData: {
        username: '',
        password: '',
        repassword: '',
        favoriteDrink: '',
      },

      submitted: false,
      successReg: false,
      errorReg: false,
    }
  },
  methods: {
    fieldState(field) {
      const value = this.regData[field]
      if (!value) return null
      if (field === 'repassword' && value !== this.regData.password)
        return false
      return true
    },

    submitForm() {
      this.successReg = false
      this.errorReg = false

      if (
        !this.regData.username ||
        !this.regData.password ||
        !this.regData.repassword ||
        !this.regData.favoriteDrink
      ) {
        this.errorReg = true
        return
      }

      if (signUp(this.regData)) {
        this.successReg = true
      } else {
        this.errorReg = true
      }

      setTimeout(() => {
        this.successReg = false
        this.errorReg = false
      }, 3000)

      setTimeout(() => {
        this.regData.username = ''
        this.regData.password = ''
        this.regData.repassword = ''
        this.regData.favoriteDrink = ''
      }, 30)
    },
  },
}
</script>

<template>
  <BContainer class="mt-4 d-flex justify-content-center">
    <BCard style="max-width: 520px; width: 100%">
      <h4 class="mb-3">Registration</h4>

      <BForm @submit.prevent="submitForm" novalidate>
        <BFormGroup label="Login" label-for="login">
          <BFormInput
            id="login"
            v-model.trim="regData.username"
            :state="fieldState('username')"
            required
          />
        </BFormGroup>

        <BFormGroup label="Password" label-for="password">
          <BFormInput
            id="password"
            type="password"
            v-model="regData.password"
            :state="fieldState('password')"
            required
          />
        </BFormGroup>

        <BFormGroup label="Re-type Password" label-for="repassword">
          <BFormInput
            id="repassword"
            type="password"
            v-model="regData.repassword"
            :state="fieldState('repassword')"
            required
          />
        </BFormGroup>

        <BFormGroup label="Favorite Drink" label-for="favoriteDrink">
          <BFormInput
            id="favoriteDrink"
            v-model="regData.favoriteDrink"
            :state="fieldState('favoriteDrink')"
            placeholder="Example: Tea"
            required
          />
        </BFormGroup>

        <div class="d-flex justify-content-between align-items-center mt-3">
          <BButton type="submit" variant="primary">Register</BButton>
          <small class="text-muted">All inputs required</small>
        </div>
      </BForm>

      <BAlert v-if="successReg" show variant="success" class="mt-3">
        ✅ Welcome to the club!.
      </BAlert>

      <BAlert v-if="errorReg" show variant="danger" class="mt-3">
        ❌ Something went wrong... try again.
      </BAlert>
    </BCard>
  </BContainer>
</template>
