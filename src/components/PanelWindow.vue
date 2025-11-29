<script>
import { BCard } from 'bootstrap-vue-next'

export default {
  components: { BCard },

  data() {
    return {
      pageMessage: '',
    }
  },
  mounted() {
    // this.pageMessage = showHome()
    // this.pageMessage = showPanel()
    // this.pageMessage = showManage()
  },
}
</script>
<template>
  <div class="row g-3 mt-3">
    <div v-if="!account" class="col-12">
      <h1>You must be logged in</h1>
    </div>

    <div v-else class="col-12">
      <h1>Welcome {{ account.username }}</h1>
      <h2>Your favorite drink is {{ account.drink }}</h2>
    </div>
    <div v-if="account" class="col-md-4" v-for="acc in accounts" :key="acc.id">
      <BCard class="p-3">
        <h5>{{ acc.username }}</h5>
        <p>Drink: {{ acc.drink }}</p>
        <p>Role: {{ acc.role }}</p>
      </BCard>
    </div>
  </div>
</template>
