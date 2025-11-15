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

// client code (api) для взаимодействия с сервером
import { signUp } from '../../dev/stateless.js'

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
    }
  },
  methods: {
    fieldState(field) {
      const value = this.regData[field]
      if (value === '' || value === null) return null
      if (field === 'repassword' && value !== this.regData.password) {
        return false
      }
      return true
    },
    submitForm() {
      if (signUp(this.regData)) {
        this.status = 'ok-signup'
      } else {
        this.status = 'err-signup'
      }
      setTimeout(() => {
        this.status = 'none'
      }, 3000)

      this.submitted = false

      if (
        !this.regData.username ||
        !this.regData.password ||
        !this.regData.repassword ||
        !this.regData.favoriteDrink
      ) {
        return
      }

      const accountDto = { ...this.regData }

      // const accountDto = {
      //   username: this.regData.username,
      //   password: this.regData.password,
      //   repassword: this.regData.repassword,
      //   favoriteDrink: this.regData.favoriteDrink,
      // }

      // console.log('Registration data:', accountDto)

      this.$emit('submitForm', accountDto)

      this.submitted = true

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
            placeholder=""
            required
          />
        </BFormGroup>

        <BFormGroup label="Password" label-for="password">
          <BFormInput
            id="password"
            type="password"
            v-model="regData.password"
            :state="fieldState('password')"
            placeholder=""
            required
          />
        </BFormGroup>

        <BFormGroup label="Re-type Password" label-for="repassword">
          <BFormInput
            id="repassword"
            type="password"
            v-model="regData.repassword"
            :state="fieldState('repassword')"
            placeholder=""
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
    </BCard>
  </BContainer>
</template>
