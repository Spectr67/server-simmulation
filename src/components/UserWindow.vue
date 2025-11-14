<script>
export default {
  props: ['account'],
}
</script>
<template>
  <h1>Welcome back! {{ account.username }}</h1>
  <h2>Your Favorite Drink is {{ account.drink }}</h2>
</template>
