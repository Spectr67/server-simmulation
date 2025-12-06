<script>
import { BNavbar, BNavbarBrand, BNavbarNav, BNavItem } from 'bootstrap-vue-next'
import { func, showProfile } from '../../src-sv/server/stateless'

export default {
  components: {
    BNavbar,
    BNavbarBrand,
    BNavbarNav,
    BNavItem,
  },

  data() {
    return {
      profile: showProfile(),
    }
  },

  created() {
    func(() => (this.profile = showProfile()))
  },
}
</script>
<template>
  <div class="navigation">
    <BNavbar class="bg-secondary" variant="dark">
      <BNavbarBrand tag="h1" class="mb-0 text-success" to="/">
        Drinks Application
      </BNavbarBrand>

      <BNavbarNav class="mx-auto">
        <BNavItem to="/" class="mx-3" variant="success">HOME</BNavItem>
        <BNavItem to="/panel" class="mx-3" variant="success">PANEL</BNavItem>
        <BNavItem to="/admin" class="mx-3" variant="success">ADMIN</BNavItem>
      </BNavbarNav>

      <BNavItem variant="success">{{ profile?.username }}</BNavItem>

      <BNavbarNav class="mx-right">
        <BNavItem to="/signUp" class="mx-3" variant="success">Sign Up</BNavItem>
        <BNavItem to="/signIn" class="mx-3" variant="success">Sign In</BNavItem>
      </BNavbarNav>
    </BNavbar>
  </div>
</template>
