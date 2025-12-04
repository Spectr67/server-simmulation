<script>
import { BButton, BCard } from 'bootstrap-vue-next'
import { showManage } from '../../src-sv/server/stateless'

export default {
  components: { BCard, BButton },

  data() {
    return {
      usersContext: null,
    }
  },

  mounted() {
    this.usersContext = showManage()
    console.log(this.usersContext)
  },
}
</script>

<template>
  <div class="row g-3 mt-3">
    <div v-if="!usersContext" class="col-12">
      <h1>ERR! hello</h1>
    </div>

    {{ usersContext }}
  </div>
</template>
