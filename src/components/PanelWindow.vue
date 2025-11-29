<script>
import { BCard } from 'bootstrap-vue-next'

export default {
  props: ['accounts', 'account'],
  components: { BCard },
}
</script>

<template>
  <div class="row g-3 mt-3">
    <h1>Welcome{{ account.username }}</h1>
    <h2>Your favorite drink is {{ account.drink }}</h2>
    <div class="col-md-4" v-for="acc in accounts" :key="acc.id">
      <BCard>
        <h5>{{ acc.username }}</h5>
        <p>Drink: {{ acc.drink }}</p>
        <p>Role: {{ acc.role }}</p>
      </BCard>
    </div>
  </div>
</template>
