/**
 * UserManager 对应的就是API中的userController
 */

import BaseManager, { ListManager } from "./BaseManager";
import { getCurrent } from "../util";

const TypeConvertor = (type) => {
    if (type === 'Receiver') return 0
    return 1
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
            json = yield this.getList(this.Url + 'user/ListAddress2', {
                type: 0,
                keyword: this.keyword,
                currentPage: this.currentPage,
                pageSize: this.pageSize
            })
        } else {
            json = yield this.getList(this.Url + 'user/ListAddress2', {
                type: 0,
                keyword: this.keyword,
                currentPage: this.currentPage,
                pageSize: this.pageSize
            })
        }
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
        if (this.append()) {
            return yield this.fetchList(PersonType);
        }
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
