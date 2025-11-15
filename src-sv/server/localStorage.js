function setAccounts(accounts) {
  localStorage.setItem('accounts', JSON.stringify(accounts))
}
function getAccounts() {
  const data = localStorage.getItem('accounts')
  return data ? JSON.parse(data) : []
}

function setSessions(sessions) {
  localStorage.setItem('sessions', JSON.stringify(sessions))
}

function getSessions() {
  const data = localStorage.getItem('sessions')
  return data ? JSON.parse(data) : {}
}

export { getAccounts, getSessions, setAccounts, setSessions }
