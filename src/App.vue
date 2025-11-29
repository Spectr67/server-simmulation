<script>
import {
  BButton,
  BNavbar,
  BNavbarBrand,
  BNavbarNav,
  BNavItem,
} from 'bootstrap-vue-next'

export default {
  components: {
    BNavbar,
    BNavbarBrand,
    BNavbarNav,
    BNavItem,
  },
}
</script>

<template>
  <div>
    <div class="navigation">
      <BNavbar class="bg-secondary" variant="dark">
        <BNavbarBrand tag="h1" class="mb-0 text-success">
          Drinks Application
        </BNavbarBrand>

        <BNavbarNav class="mx-auto">
          <BNavItem to="/" class="mx-3" variant="success">HOME</BNavItem>
          <BNavItem to="/panel" class="mx-3" variant="success">PANEL</BNavItem>
          <BNavItem to="/admin" class="mx-3" variant="success">ADMIN</BNavItem>
        </BNavbarNav>
        <BNavbarNav class="mx-right">
          <BNavItem to="/signUp" class="mx-3" variant="success"
            >Sign Up</BNavItem
          >
          <BNavItem to="/signIn" class="mx-3" variant="success"
            >Sign In</BNavItem
          >
        </BNavbarNav>
      </BNavbar>
    </div>

    <div class="content">
      <RouterView />
    </div>
  </div>
</template>
