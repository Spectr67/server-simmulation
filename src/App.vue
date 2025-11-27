<script>
export default {}
</script>

<template>
  <div>
    <div class="navigation">
      <div>
        <RouterLink to="/">HOME</RouterLink>
      </div>
      <div>
        <RouterLink to="/panel">PANEL</RouterLink>
      </div>
      <div>
        <RouterLink to="/admin">ADMIN</RouterLink>
      </div>
    </div>

    <div class="content">
      <RouterView></RouterView>
    </div>
  </div>
</template>
