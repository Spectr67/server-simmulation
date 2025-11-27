<script>
import { BButton, BCard } from 'bootstrap-vue-next'

export default {
  components: { BCard, BButton },

  props: ['accounts', 'account'],

  data() {
    return {
      newRoles: {},
      roles: ['user', 'moderator', 'admin'],
    }
  },

  methods: {
    applyRole(acc) {
      console.log({ AccUsername: acc.username, role: newRole })
      const newRole = this.newRoles[acc.username]
      this.$emit('changeRole', { AccUsername: acc.username, role: newRole })
    },
  },
}
</script>

<template>
  <div class="row g-3 mt-3">
    <h2>Welcome admin! {{ account.username }}</h2>
    <div class="col-md-4" v-for="acc in accounts" :key="acc.id">
      <BCard>
        <h5>{{ acc.username }}</h5>
        <p>Drink: {{ acc.drink }}</p>

        <p><strong>Role:</strong> {{ acc.role }}</p>

        <select v-model="newRoles[acc.username]" class="form-select">
          <option disabled value="">Select role</option>
          <option v-for="role in roles" :key="role">
            {{ role }}
          </option>
        </select>

        <BButton class="mt-2" @click="applyRole(acc)"> Apply role </BButton>
      </BCard>
    </div>
  </div>
</template>
