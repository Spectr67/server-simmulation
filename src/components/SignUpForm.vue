<script>
import { signUp } from '../../dev/stateless.js'
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
      regData: this.initRegData(),
      error: null,
      isSubmitted: false,
      pure: {
        username: true,
        password: true,
        re: true,
        drink: true,
      },
    }
  },

  methods: {
    initRegData() {
      return {
        username: '',
        password: '',
        re: '',
        drink: '',
      }
    },

    submitForm() {
      if (this.regData.password !== this.regData.re) return
      if (
        this.regData.username &&
        this.regData.password &&
        this.regData.drink
      ) {
        if (signUp(this.regData)) {
        } else {
          this.error = { message: 'reg fail' }
        }

        this.isSubmitted = true
        this.regData = this.initRegData()

        // проблема с повторным таймером
        setTimeout(() => {
          this.isSubmitted = false
          this.error = null
        }, 9000)
      }
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
            :state="pure.username || regData.username.length >= 3"
            required
            @blur="pure.username = false"
          />
        </BFormGroup>

        <BFormGroup label="Password" label-for="password">
          <BFormInput
            id="password"
            type="password"
            v-model="regData.password"
            :state="
              pure.password ||
              (regData.password.length >= 1 && regData.password === regData.re)
            "
            required
          />
        </BFormGroup>

        <BFormGroup label="Re-type Password" label-for="repassword">
          <BFormInput
            id="repassword"
            type="password"
            v-model="regData.re"
            :state="
              pure.re ||
              (regData.re.length >= 1 && regData.password === regData.re)
            "
            required
          />
        </BFormGroup>

        <BFormGroup label="Favorite Drink" label-for="favoriteDrink">
          <BFormInput
            id="favoriteDrink"
            v-model="regData.drink"
            :state="pure.drink || regData.drink.length >= 3"
            placeholder="Example: Tea"
            required
          />
        </BFormGroup>

        <div class="d-flex justify-content-between align-items-center mt-3">
          <BButton type="submit" variant="success">Register</BButton>
          <small class="text-muted">All inputs required</small>
        </div>
      </BForm>

      <div v-if="isSubmitted">
        <BAlert v-if="error" show variant="danger" class="mt-3">
          ❌ Something went wrong... try again.
          {{ error.message }}
        </BAlert>

        <BAlert v-else show variant="success" class="mt-3">
          ✅ Welcome to the club!.
        </BAlert>
      </div>
    </BCard>
  </BContainer>
</template>
