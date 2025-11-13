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
        username: '',
        password: '',
      },
      submitted: false,
    }
  },
  methods: {
    fieldState(field) {
      const value = this.form[field]
      if (value === '' || value === null) return null
      return true
    },
    submitForm() {
      if (!this.form.username || !this.form.password) {
        this.submitted = false
        return
      }

      const logData = {
        username: this.form.username,
        password: this.form.password,
      }

      this.$emit('submitForm', logData)

      this.submitted = true

      setTimeout(() => {
        this.form.username = ''
        this.form.password = ''
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
        <BFormGroup label="Username" label-for="username">
          <BFormInput
            id="username"
            v-model.trim="form.username"
            :state="fieldState('username')"
            required
          />
        </BFormGroup>

        <BFormGroup label="Password" label-for="password">
          <BFormInput
            id="password"
            type="password"
            v-model="form.password"
            :state="fieldState('password')"
            required
          />
        </BFormGroup>

        <div class="d-flex justify-content-between align-items-center mt-3">
          <BButton type="submit" variant="primary">Login</BButton>
          <small class="text-muted">All inputs required</small>
        </div>
      </BForm>
    </BCard>
  </BContainer>
</template>
