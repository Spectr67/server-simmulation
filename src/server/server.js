import {
  getAccounts,
  setAccounts,
  getSessions,
  setSessions,
} from '@/localStorage/localStorage'

const randId = () => crypto.randomUUID().split('-')[0]

/**
 * server
 */
// private: (клиент не вызывает эти функции)

function createAccount(regData) {
  delete regData.re
  const id = randId()
  return { id, ...regData, role: 'user' }
}
function createSession(username) {
  const sessions = getSessions()
  const sessionId = randId()
  sessions[sessionId] = username
  setSessions(sessions)
  return sessionId
}
function getAccountByUsername(username) {
  const accounts = getAccounts()
  return accounts.find(a => a.username === username)
}
function getUsernameBySessionId(sessionId) {
  return sessions[sessionId]
}
function checkAuthData(authData) {
  const account = getAccountByUsername(authData.username)
  if (account) return account.password === authData.password
  else return false
}

// public: (функции для клиента. пользуйтесь наздоровье)
function setRoleToAccount(username, role) {
  getAccountByUsername(username).role = role
}
export function register(regData) {
  const accounts = getAccounts()

  const username = regData.username || regData.login
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
function authenticate(authData) {
  const isOk = checkAuthData(authData)
  if (isOk) return createSession(authData.username)
  return false
}
function authorize(sessionId) {
  const resource = arguments.callee.caller.name
  if (resource === 'showHome') return true
  if (resource === 'showPanel') {
    const username = getUsernameBySessionId(sessionId)
    if (username) {
      const account = getAccountByUsername(username)
      return account.drink
    }
    return false
  }
  if (resource === 'showManage') {
    const username = getUsernameBySessionId(sessionId)
    if (username) {
      const account = getAccountByUsername(username)
      return Object.fromEntries(accounts.map(a => [a.username, a.drink]))
    }
    return false
  }
}

//====================================================

/**
 * client
 */
// оптравляет запрос на сервер
let sessionId
// export function signUp(regData) {
//   const isSuccess = register(regData)
//   if (isSuccess) console.log('✅ регистрация удалась')
//   else console.log('❌ фейл регистрации')
//   return isSuccess
// }
function signIn(authData) {
  sessionId = authenticate(authData)
  if (sessionId) console.log('вход успешен:', authData.username)
  else console.log('фейл входа')
}

//

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
