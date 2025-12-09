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
    <h1>PANEL</h1>

    <div v-if="Array.isArray(usersContext)" class="row g-3 mt-2">
      <div
        v-for="u in usersContext"
        :key="u.username"
        class="col-12 col-md-6 col-lg-4"
      >
        <BCard>
          <p><strong>Username:</strong> {{ u.username }}</p>
          <p><strong>Drink:</strong> {{ u.drink }}</p>
        </BCard>
      </div>
    </div>

    <div v-else-if="usersContext && usersContext.payload" class="row g-3 mt-2">
      <div
        v-for="u in usersContext.payload"
        :key="u.username"
        class="col-12 col-md-6 col-lg-4"
      >
        <BCard>
          <p><strong>Username:</strong> {{ u.username }}</p>
          <p><strong>Drink:</strong> {{ u.drink }}</p>
        </BCard>
      </div>
    </div>

    <div v-else>Loading or error...</div>
  </div>
</template>
