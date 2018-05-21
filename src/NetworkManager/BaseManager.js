import { fetchApi, getCurrent } from '../util'

var hostName = 'test.austgo.com'

if (__DEV__) {
  hostName = 'test.austgo.com'
} else {
  hostName = 'app.niuaomall.com'
}

const Url = `http://${hostName}/api/app/1.4/`

export default class BaseManager {
  constructor() {
    this.fetchApi = fetchApi
    this.Url = Url
  }
}

export class ListManager extends BaseManager {
  constructor() {
    super()
    this.keyword = ''
    this.currentPage = 1
    this.pageSize = 15
    this.totalPages = 0
  }

  *getList(url, body) {
    const json = yield this.fetchApi({
      url,
      body
    })

    this.currentPage = json.data.currentPage
    this.totalPages = json.data.totalPages
    return json
  }

  append(url, body) {
    const { currentPage, totalPages } = getCurrent(this)

    if (currentPage > totalPages) {
      return
    }
    this.currentPage = this.currentPage + 1
    return true
  }
}
