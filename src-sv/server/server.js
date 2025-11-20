import {
  getAccounts,
  setAccounts,
  getSessions,
  setSessions,
} from './localStorage'

export function signUp(regData) {
  const isSuccess = register(regData)
  if (isSuccess) return true
  else false
}
export function signIn(authData) {
  const sessionId = authenticate(authData)

  if (sessionId) {
    return true
  } else {
    return false
  }
}

///////////
function createSession(username) {
  const sessions = getSessions()
  const sessionId = randId()
  sessions[sessionId] = username
  setSessions(sessions)
  return sessionId
}

function getUsernameBySessionId(sessionId) {
  const sessions = getSessions()
  return sessions[sessionId]
}

// public: (функции для клиента. пользуйтесь наздоровье)
function setRoleToAccount(username, role) {
  getAccountByUsername(username).role = role
}

export function authorize(sessionId) {
  const username = getUsernameBySessionId(sessionId)
  const account = getAccountByUsername(username)
  return account
}

// всем, в том числе гостям (без регистрации)
function showHome() {
  const data = authorize(sessionId)
  if (data) {
    return 'Приветствуем в приложении "Напитки"'
  } else {
    return 'ERR! авторизация провалена (нехватает прав)'
  }
}
// всем зарегеным юзерам
function showPanel() {
  const data = authorize(sessionId)
  if (data) {
    return `Ваш напиток: ${data}`
  } else {
    return 'ERR! авторизация провалена (нехватает прав)'
  }
}
// только модераторам
function showManage() {
  const data = authorize(sessionId)
  if (data) {
    return data
    return `Управление напитками пользователей ${data}`
  } else {
    return 'ERR! авторизация провалена (нехватает прав)'
  }
}

const randId = () => crypto.randomUUID().split('-')[0]

function createAccount(regData) {
  delete regData.re
  const id = randId()
  return { id, ...regData, role: 'user' }
}
export function register(regData) {
  const accounts = getAccounts()

  const username = regData.username || regData.username
  const password = regData.password
  const re = regData.re || regData.repassword
  const drink = regData.drink || regData.favoriteDrink

  if (!username || !password || password !== re) return false
  if (getAccountByUsername(username)) return false

  const account = createAccount({ username, password, drink })
  accounts.push(account)
  setAccounts(accounts)
  return true
}
export function authenticate(authData) {
  const isOk = checkAuthData(authData)
  if (isOk) return createSession(authData.username)
  return false
}
function checkAuthData(authData) {
  const account = getAccountByUsername(authData.username)
  if (account) return account.password === authData.password
  else return false
}
function getAccountByUsername(username) {
  const accounts = getAccounts()
  return accounts.find(a => a.username === username)
}
