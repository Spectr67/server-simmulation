/**
 * shared
 */
const randId = () => crypto.randomUUID().split('-')[0]

//====================================================

/**
 * server
 */
// private: (клиент не вызывает эти функции)
const accounts = [
  {
    id: randId(),
    username: 'admin',
    password: 'admin',
    drink: 'Tea',
    role: 'admin',
  },
  {
    id: randId(),
    username: 'moder',
    password: 'moder',
    drink: 'Tea',
    role: 'moderator',
  },
  {
    id: randId(),
    username: 'vasya',
    password: 'vasya',
    drink: 'Tea',
    role: 'user',
  },
]
const sessions = {}
function createAccount(regData) {
  delete regData.re
  const id = randId()
  return { id, ...regData, role: 'user' }
}
function createSession(username) {
  const sessionId = randId()
  sessions[sessionId] = username
  return sessionId
}
function getAccountByUsername(username) {
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
function register(regData) {
  if (regData.username === '') return false
  if (regData.password === '') return false
  if (regData.password !== regData.re) return false
  if (getAccountByUsername(regData.username)) return false
  const account = createAccount(regData)
  accounts.push(account)
  console.log('>>', account)
  return true
}
function authenticate(authData) {
  const isOk = checkAuthData(authData)
  if (isOk) return createSession(authData.username)
  return false
}
function authorize(sessionId, resource) {
  if (resource === 'page-home') return 'HELLO GUEST!!!'
  if (resource === 'page-panel') {
    const username = getUsernameBySessionId(sessionId)
    if (username) {
      const account = getAccountByUsername(username)
      return { username: account.username, drink: account.drink }
    }
  }
  if (resource === 'page-manage') {
    const username = getUsernameBySessionId(sessionId)
    if (username) {
      const account = getAccountByUsername(username)
      if (account.role === 'moderator') {
        return Object.fromEntries(accounts.map(a => [a.username, a.drink]))
      }
    }
  }
  return false
}

//====================================================

/**
 * client
 */
// оптравляет запрос на сервер
let sessionId
let username
let drink
// эти функции импортируем во vue компонентах
function signUp(regData) {
  console.log(regData)
  const isSuccess = register({ ...regData })

  console.log('>>>', isSuccess)
  if (isSuccess) return true
  else false
  // if (isSuccess) console.log('регистрация удалась', regData.username)
  // else console.log('фейл регистрации')
}
function signIn(authData) {
  sessionId = authenticate({ ...authData })
  if (sessionId) return true
  else false
  // if (sessionId) console.log('вход успешен:', authData.username)
  // else console.log('фейл входа')
}

// всем, в том числе гостям (без регистрации)
function showHome() {
  const data = authorize(sessionId, 'page-home')
  if (data) {
    return 'Приветствуем в приложении "Напитки"'
  } else {
    return 'ERR! авторизация провалена (нехватает прав)'
  }
}
// всем зарегеным юзерам
function showPanel() {
  const data = authorize(sessionId, 'page-panel')
  if (data) {
    username = data.username
    drink = data.drink
    return `Ваш напиток: ${data}`
  } else {
    return 'ERR! авторизация провалена (нехватает прав)'
  }
}
// только модераторам
function showManage() {
  const data = authorize(sessionId, 'page-manage')
  if (data) {
    return data
    return `Управление напитками пользователей ${data}`
  } else {
    return 'ERR! авторизация провалена (нехватает прав)'
  }
}

export { signUp, signIn }

//====================================================

/**
 * test
 */
// let resp

// signUp({ username: 'Petya', password: 'qwe', re: 'qwe', drink: 'cola' })
// signUp({ username: 'Vasya', password: 'qwr', re: 'qwr', drink: 'cola' })
// signUp({ username: 'Killer', password: 'qwe1', re: 'qwe1', drink: 'pepsi' })
// signIn({ username: 'Killer', password: 'qwe1' })
// setRoleToAccount('Petya', 'moderator')

// resp = showHome()
// resp
// resp = showPanel()
// username
// drink
// resp = showManage()
// console.log(resp)

// console.log(accounts)
