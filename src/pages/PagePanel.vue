<script>
import { BCard } from 'bootstrap-vue-next'
import {
  patchPanel,
  showPanel,
  showProfile,
} from '../../src-sv/server/stateless.js'

export default {
  components: { BCard },

  data() {
    return {
      usersContext: null,
      profile: showProfile(),
    }
  },

  mounted() {
    this.usersContext = showPanel()
  },

  methods: {
    patchPanel,
  },
}
</script>

<template>
  <div class="row g-3 mt-3">
    <h1>PANEL</h1>

    <div v-if="usersContext && usersContext.payload" class="row g-3 mt-2">
      <div
        v-for="u in usersContext.payload"
        :key="u.username"
        class="col-12 col-md-6 col-lg-4"
      >
        <BCard>
          <p><strong>Username:</strong> {{ u.username }}</p>
          <div v-if="profile.username === u.username" s>
            <input type="text" v-model="u.drink" />
            <button @click="patchPanel(u.drink)">OK</button>
          </div>
          <p v-else><strong>Drink:</strong> {{ u.drink }}</p>
        </BCard>
      </div>
    </div>

    <div v-else>Loading or error...</div>
  </div>
</template>
