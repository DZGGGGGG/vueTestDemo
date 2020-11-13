import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'
const FamilyIdKey = 'vue_admin_template_familyId'

export function getToken() {
  return Cookies.get(TokenKey)
}
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}
export function getFamilyId() {
  return Cookies.get(FamilyIdKey)
}
export function setFamilyId(family) {
  return Cookies.set(FamilyIdKey, family)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
