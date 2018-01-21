

import BaseManager from "./BaseManager";
import { getCurrent } from "utils";

const TypeConvertor = (type) => {
    if (type === 'Receiver') return 0
    return 1
}



class ListManager extends BaseManager {
    constructor() {
        super();
        this.keyword = '';
        this.currentPage = 1;
        this.pageSize = 15;
        this.totalPages = 0;
    }

    *getList(url, body) {
        const json = yield this.fetchApi({
            url, body
        })
        this.currentPage = json.data.currentPage;
        this.totalPages = json.data.totalPages;
        return json;
    }

    *appendList(url, body) {
        const { currentPage, totalPages } = getCurrent(this);
        if (currentPage > totalPages) {
            return
        }
        this.currentPage = this.currentPage + 1;
        const _body = {
            currentPage: this.currentPage,
            pageSize: this.pageSize
        }

        return yield this.fetchApi({
            url: url,
            body: { ...body, ..._body }
        })
    }

}


export default class UserManager extends ListManager {
    constructor() {
        super();
    }
    *fetchList(PersonType) {
        if (PersonType === void 666) {
            throw new Error('UserManager中fetchList必须要填写PersonType，Receiver = 0/Sender = 1');
        }
        var json;
        if (PersonType === -1) {
            json = yield this.fetchApi({
                url: this.Url + 'user/ListAddress2',
                body: {
                    type: 0,
                    keyword: this.keyword,
                    currentPage: this.currentPage,
                    pageSize: this.pageSize
                }
            })
        } else {
            json = yield this.fetchApi({
                url: this.Url + 'user/ListAddress2',
                body: {
                    type: 0,
                    keyword: this.keyword,
                    currentPage: this.currentPage,
                    pageSize: this.pageSize,
                    addressType: TypeConvertor(PersonType)
                }
            })
        }

        this.currentPage = json.data.currentPage;
        this.totalPages = json.data.totalPages;
        return json;
    }

    *fetchListAddress(PersonType) {
        this.currentPage = 1;
        this.keyword = '';
        return yield this.fetchList(PersonType);
    }
    *SearchListAddress(keyword, PersonType) {
        this.currentPage = 1;
        this.keyword = keyword;

        return yield this.fetchList(PersonType);
    }

    *appendListAddress(PersonType) {
        const { currentPage, totalPages } = getCurrent(this);
        if (currentPage > totalPages) {
            return
        }
        this.currentPage = this.currentPage + 1;
        return yield this.fetchList(PersonType);
    }

    *DeleteAddress({ id, address }) {
        return yield this.fetchApi({
            url: this.Url + 'user/DeleteAddress',
            body: {
                id: id,
                a: address
            }
        })
    }
}
