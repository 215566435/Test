import { call, put, take, select } from 'redux-saga/effects';
import { Alert } from 'react-native';
import { header, Url } from '../../util'

function* fetchSelect({ url, body }) {
    const res = yield call(fetch, url, {
        method: 'POST',
        headers: header.get(),
        body: JSON.stringify(body),
    })
    return yield res.json();
}


const actionStategy = {
    // 页面加载完成，请求拿到类别
    fetchCategory: function* (state, others) {
        const json = yield fetchSelect({
            url: Url + 'goods/GetCatesHomePage',
            body: {}
        })
        yield put({
            type: "Cate_SET_STATE",
            data: { ...state, tabList: json.data }
        })
    },

    // 点击单个类别， 显示商品list
    catePress: function* (state, others) {
        const SearchPageState = yield select(state => state.SearchPage)

        yield put({
            type: "Search_SET_STATE",
            data: { ...state, autoFocus: false }
        })
        // 跳转到search页面显示，具体类别的产品
        console.log('Category的Instance', others.instance);
        console.log('Category的text', others.text);
        others.instance.props.navigation.navigate('Search')

        const json = yield fetchSelect({
            url: Url + 'goods/PriceList',
            body: {
                cateid: others.text,
                keyword: '',
                currentPage: 1,
                pagesize: 16
            }
        })
        yield put({
            type: "searchPage",
            text: '',
            currentCateId: others.text,
            autoFocus: false
        })
    },
    ChangeHeader: function* (state, others) {
        const json = yield fetchSelect({
            url: Url + 'goods/AllCates?id=' + (others.id + 1),
            body: {}
        })
        yield put({
            type: "Cate_SET_STATE",
            data: { ...state, headerCateID: others.id, tabList: json.data }
        })
    }
}

function convert() {
    return Object.keys(actionStategy)
}

export const watch = function* () {
    const actionList = convert();
    while (true) {
        const { type, ...others } = yield take(actionList);
        try {
            const state = yield select(state => state.Category);
            const actionFn = actionStategy[type];
            yield call(actionFn, state, others);
        } catch (e) {
            console.log(e)
        }
    }

}