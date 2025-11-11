<script>
import { BButton, BCard, BForm, BFormGroup, BFormInput, BTable } from 'bootstrap-vue-next'
import {
  setRoleToAccount,
  register,
  authenticate,
  authorize,
  sessions,
  accounts,
} from '../controller'
import { getAccountByUsername } from '../server'
export default {
  components: { BCard, BForm, BFormInput, BFormGroup, BButton, BTable },
  data() {
    return {
      accounts,
      sessionId: null,
      currentUser: null,
      activePanel: 'home',
      form: { username: '', password: '', re: '', drink: '' },
    }
  },
  methods: {
    signUp() {
      const success = register(this.form)

      if (success) {
        console.log('Welcome')
      } else {
        console.log('Try again')
      }

      this.form = { username: '', password: '', re: '', drink: '' }
    },
    signIn() {
      const sid = authenticate(this.form)
      if (sid) {
        this.sessionId = sid
        this.currentUser = getAccountByUsername(this.form.username)
        console.log('Welcome')
      } else {
        console.log('Try again')
      }
    },
    canAccess(panel) {
      return authorize(this.sessionId, panel)
    },
    logout() {
      this.sessionId = null
      this.currentUser = null
      this.activePanel = 'home'
    },
  },
}
</script>

<template>
  <div class="container py-5">
    <BCard class="text-center shadow">
      <template #header>
        <h4 class="mb-0">Приложение "Напитки"</h4>
      </template>

      <div v-if="!sessionId">
        <BForm @submit.prevent>
          <BFormGroup label="Имя пользователя">
            <BFormInput v-model="form.username" placeholder="Введите имя" required />
          </BFormGroup>
          <BFormGroup label="Пароль">
            <BFormInput
              v-model="form.password"
              type="password"
              placeholder="Введите пароль"
              required
            />
          </BFormGroup>
          <BFormGroup label="Повторите пароль (для регистрации)">
            <BFormInput v-model="form.re" type="password" placeholder="Повторите пароль" />
          </BFormGroup>
          <BFormGroup label="Любимый напиток (необязательно)">
            <BFormInput v-model="form.drink" placeholder="Например, кофе" />
          </BFormGroup>

          <div class="d-flex justify-content-between mt-3">
            <BButton variant="primary" @click="signIn">Войти</BButton>
            <BButton variant="success" @click="signUp">Регистрация</BButton>
          </div>
        </BForm>
      </div>
      <div v-else>
        <p class="mb-3">
          Вы вошли как: <b>{{ currentUser.username }}</b> (роль: <i>{{ currentUser.role }}</i
          >)
        </p>

        <div class="d-flex justify-content-center gap-2 mb-4 flex-wrap">
          <BButton variant="info" @click="activePanel = 'home'"> Home</BButton>
          <BButton variant="primary" :disabled="!canAccess('panel')" @click="activePanel = 'panel'">
            Panel</BButton
          >
          <BButton
            variant="danger"
            :disabled="!canAccess('manage')"
            @click="activePanel = 'manage'"
          >
            Manage</BButton
          >
          <BButton variant="secondary" @click="logout">Выйти</BButton>
        </div>

        <div v-if="activePanel === 'home'">
          <h5>Домашняя панель</h5>
          <p>Добро пожаловать в приложение "Напитки"!</p>
        </div>

        <div v-if="activePanel === 'panel'">
          <h5>Панель пользователя</h5>
          <p>
            Ваш напиток: <b>{{ currentUser.drink || 'не указан' }}</b>
          </p>
        </div>

        <div v-if="activePanel === 'manage'">
          <h5>Панель модератора</h5>
          <BTable :items="accounts" :fields="['username', 'role', 'drink']" bordered small></BTable>
        </div>
      </div>
    </BCard>
  </div>
</template>

<style>
body {
  background-color: #f8f9fa;
}
</style>
