<script>
import NavBar from './components/NavBar.vue'

export default {
  components: {
    NavBar,
  },
}
</script>

<template>
  <div>
    <div>
      <NavBar />
    </div>
    <div class="content">
      <RouterView />
    </div>
  </div>
</template>
