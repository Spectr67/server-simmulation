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
      form: {
        login: '',
        password: '',
        repassword: '',
        favoriteDrink: '',
      },
      submitted: false,
    }
  },
  methods: {
    fieldState(field) {
      const value = this.form[field]
      if (value === '' || value === null) return null
      if (field === 'repassword' && value !== this.form.password) return false
      return true
    },
    submitForm() {
      this.submitted = false

      if (
        !this.form.login ||
        !this.form.password ||
        !this.form.repassword ||
        !this.form.favoriteDrink
      ) {
        return
      }
      const accountDto = {
        login: this.form.login,
        password: this.form.password,
        repassword: this.form.repassword,
        favoriteDrink: this.form.favoriteDrink,
      }

      // console.log('Registration data:', accountDto)

      this.$emit('submitForm', accountDto)

      this.submitted = true

      this.form.login = ''
      this.form.password = ''
      this.form.repassword = ''
      this.form.favoriteDrink = ''
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
            v-model.trim="form.login"
            :state="fieldState('login')"
            placeholder=""
            required
          />
        </BFormGroup>

        <BFormGroup label="Password" label-for="password">
          <BFormInput
            id="password"
            type="password"
            v-model="form.password"
            :state="fieldState('password')"
            placeholder=""
            required
          />
        </BFormGroup>

        <BFormGroup label="Re-type Password" label-for="repassword">
          <BFormInput
            id="repassword"
            type="password"
            v-model="form.repassword"
            :state="fieldState('repassword')"
            placeholder=""
            required
          />
        </BFormGroup>

        <BFormGroup label="Favorite Drink" label-for="favoriteDrink">
          <BFormInput
            id="favoriteDrink"
            v-model="form.favoriteDrink"
            :state="fieldState('favoriteDrink')"
            placeholder="Example: Tea"
            required
          />
        </BFormGroup>

        <div class="d-flex justify-content-between align-items-center mt-3">
          <BButton @click="submitForm" type="submit" variant="primary"
            >Register</BButton
          >
          <small class="text-muted">All inputs required</small>
        </div>
      </BForm>

      <BAlert v-if="submitted" show variant="success" class="mt-3">
        ✅ Welcome! Check console.log.
      </BAlert>
    </BCard>
  </BContainer>
</template>
