import {
  createAccount,
  createSession,
  getAccountByUsername,
  getUsernameBySessionId,
  checkAuthData,
  sessions,
  accounts,
} from './server.js'

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

export {
  accounts,
  sessions,
  setRoleToAccount,
  register,
  authenticate,
  authorize,
}
