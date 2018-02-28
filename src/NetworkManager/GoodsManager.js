import { ListManager } from "./BaseManager";



export class GoodsManager extends ListManager {
    constructor() {
        super();
        this.currentCateId = 0;
    }
    *fetchCurrentGoods(currentID) {

        return yield this.fetchApi({ url: this.Url + 'goods/Get?id=' + currentID, body: {} });
    }

    *SearchGoodsList(keyword, currentCateId) {
        this.currentPage = 1;
        this.keyword = keyword;
        this.currentCateId = currentCateId;
        const json = yield this.getList(this.Url + 'goods/PriceList',
            {
                cateid: this.currentCateId || 0,
                keyword: keyword,
                currentPage: this.currentPage,
                pagesize: this.pageSize
            })
        return json;
    }
    *SearchGoodsAppend() {
        if (this.append()) {

            const json = yield this.getList(this.Url + 'goods/PriceList',
                {
                    cateid: this.currentCateId || 0,
                    keyword: this.keyword,
                    currentPage: this.currentPage,
                    pagesize: this.pageSize
                })
            console.log(json);
            return json;
        }
    }
}