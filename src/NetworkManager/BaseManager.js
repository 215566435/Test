import { fetchApi } from "utils";

var hostName = 'test.austgo.com'

if (__DEV__) {
    hostName = 'test.austgo.com'
} else {
    hostName = 'www.austgo.com'
}

const Url = `http://${hostName}/api/app/1.2/`;


export default class BaseManager {
    constructor() {
        this.fetchApi = fetchApi;
        this.Url = Url;
    }
}

