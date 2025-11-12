const accounts = []
const sessions = {}
const randId = x => crypto.randomUUID().split('-')[0]

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
//////////

export {
  accounts,
  sessions,
  createAccount,
  createSession,
  getAccountByUsername,
  getUsernameBySessionId,
  checkAuthData,
}
