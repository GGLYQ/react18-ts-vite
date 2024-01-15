import { http } from "@/http/index"

function getUserInfo(params: any = {}) {
  let url = ""
  return http.httpRequestGet(url, params)
}

export { getUserInfo }