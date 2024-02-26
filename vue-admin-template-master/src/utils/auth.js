import Cookies from 'js-cookie'
import jwt_decode from "jwt-decode"

const TokenKey = 'travel-strategy-token'

export function getToken() {
  var token = Cookies.get(TokenKey)
  if(null != token) {
    return eval('(' + jwt_decode(token).sub + ')')
  } else {
    return token
  }
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
