

import BaseManager from "./BaseManager";
import { getCurrent } from "utils";

const TypeConvertor = (type) => {
    if (type === 'Receiver') return 0
    return 1
}

export default class UserManager extends BaseManager {
    constructor() {
        super();
        this.keyword = '';
        this.currentPage = 1;
        this.pageSize = 15;
        this.totalPages = 0;
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
        console.log(json);
        return json;
    }

    *fetchListAddress(PersonType) {
        this.currentPage = 1;

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
}
