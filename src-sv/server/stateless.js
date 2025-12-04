const randId = () => crypto.randomUUID().split('-')[0]
//====================================================

/**
 * server
 */
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
  if (resource === 'page-profile') {
    const username = getUsernameBySessionId(sessionId)
    if (username) {
      const account = { ...getAccountByUsername(username) }
      delete account.id
      delete account.password
      return account
    }
  }
  if (resource === 'page-home') return 'your ip is ok'
  if (resource === 'page-panel') {
    const username = getUsernameBySessionId(sessionId)
    if (username) {
      const account = getAccountByUsername(username)
      if (account.role === 'moderator') {
        return accounts.map(a => ({ username: a.username, drink: a.drink }))
      }
      if (account.role === 'user') {
        return {
          payload: accounts.map(a => ({
            username: a.username,
            drink: a.drink,
          })),
          rules: [
            'canReadUserUsername',
            'canReadUserRole',
            'canReadUserDrink',
            'canEditUserDrink',
            'canKickUser',
            'canBanUser',
          ],
        }
      }
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
let clientSessionId
let clientProfile
// эти функции импортируем во vue компонентах
function signUp(regData) {
  console.log(regData)
  const isSuccess = register({ ...regData })
  // fetch('http://domain.com/register', regData)

  console.log('>>>', isSuccess)
  if (isSuccess) return true
  else false
}
function signIn(authData) {
  clientSessionId = authenticate({ ...authData })
  if (clientSessionId) return true
  else false
}

// всем, в том числе гостям (без регистрации)

function showHome() {
  const data = authorize(clientSessionId, 'page-home')
  if (data) {
    return data
  } else {
    return 'ERR! авторизация провалена (нехватает прав)'
  }
}

// всем зареганным юзерам
function showPanel() {
  const data = authorize(clientSessionId, 'page-panel')
  if (data) {
    return data
  } else {
    return null
  }
}

// только модераторам
function showManage() {
  const data = authorize(clientSessionId, 'page-manage')
  if (data) {
    console.log(data)
    console.log('data')
    return `Управление напитками пользователей: ${JSON.stringify(data)}`
  } else {
    return 'ERR! авторизация провалена (нехватает прав)'
  }
}

function showProfile() {
  clientProfile = authorize(clientSessionId, 'page-profile')
  return clientProfile
}

console.log(accounts)
console.log(sessions)

export { signUp, signIn, showHome, showPanel, showManage, showProfile }

//====================================================

/**
 * test
 */
let resp

signUp({ username: 'Petya', password: 'qwe', re: 'qwe', drink: 'cola' })
signIn({ username: 'Petya', password: 'qwe' })
// signUp({ username: 'Vasya', password: 'qwr', re: 'qwr', drink: 'cola' })
// signUp({ username: 'Killer', password: 'qwe1', re: 'qwe1', drink: 'pepsi' })
// setRoleToAccount('Petya', 'moderator')

resp = showHome()
resp
resp = showPanel()
resp
resp = showProfile()
resp

clientProfile

// resp = showManage()
// console.log(resp)

// console.log(accounts)
