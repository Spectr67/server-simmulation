<script>
import { BCard } from 'bootstrap-vue-next'
import { showPanel } from '../../src-sv/server/stateless.js'

export default {
  components: { BCard },

  data() {
    return {
      usersContext: null,
    }
  },

  mounted() {
    this.usersContext = showPanel()
  },
}
</script>

<template>
  <div class="row g-3 mt-3">
    <div v-if="!usersContext" class="col-12">
      <h1>ERR! авторизация провалена (нехватает прав)</h1>
    </div>

    {{ usersContext }}

    <!-- <div v-else class="col-12">
      <h1>Welcome {{ account.username }}</h1>
      <h2>Your favorite drink is {{ account.drink }}</h2>
    </div> -->

    <!-- <tempalte v-if="account">
      <div class="col-md-4" v-for="acc in accounts" :key="acc.id">
        <BCard class="p-3">
          <h5>{{ acc.username }}</h5>
          <p>Drink: {{ acc.drink }}</p>
          <p>Role: {{ acc.role }}</p>
        </BCard>
      </div>
    </tempalte> -->
  </div>
</template>
