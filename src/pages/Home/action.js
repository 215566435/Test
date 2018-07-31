import { call, put, take, select } from 'redux-saga/effects';
import { Url, header, setLogin } from '../../util';
import { AsyncStorage } from 'react-native';
import { combineReducers } from 'redux';
import BaseManager from '../../NetworkManager/BaseManager';

/**
 * 自己封装的fetch帮助函数
 * TODO： 以后把这个去掉，用util里的fetch
 * @param {*} param0 
 */
function* fetchFunc({ url, body }) {
    yield setLogin()
    const res = yield call(fetch, url, {
        method: 'POST',
        headers: header.get(),
        body: JSON.stringify(body),
    })
    // Hank：这个不用加yield吧？？
    return yield res.json();
}
/**
 * Home页面的帮助类
 * 负责取数据， 应该是为了缓存主页加载速度，把数据放在本地了
 */
class HomeManager extends BaseManager {

    *getHomeData() {
        // 从本地拿到主页数据
        const homeJsonData = yield AsyncStorage.getItem('homeData');
        // 本地没有主页数据，请求获取，存储在本地
        if (homeJsonData === null) {
            const json = yield this.getHomeDataRefresh();
            yield AsyncStorage.setItem('homeData', JSON.stringify(json));
            return json;
        } else {
            return JSON.parse(homeJsonData);
        }
    }

    /**
     * 发送请求，拿到首页数据
     */
    *getHomeDataRefresh() {
        return yield this.fetchApi({
            url: this.Url + 'home/index',
            body: ''
        })
    }

    /**
     * 发送状态到Reducer
     */
    *mapHomeDataToProps(json, put, state) {
        console.log('action中的json', json);
        yield put({
            type: 'Home_SET_STATE',
            data: {
                ...state,
                Carousel: json.data.s,
                // goodNews: json.data.g,
                // event: json.data.e,
                homeItems: json.data.homeItems,
                hotKey: json.data.h,
                //Hank加入首页分类列表
                cateList: json.data.cateList
            }
        })
    }
}

// 把Action放在对象里，方便redux-saga监听
const actionStategy = {
    /**
     * 首页加载
     */
    fetchHome: function* (state) {
        const hmanager = new HomeManager;
        // 加载数据
        yield hmanager.mapHomeDataToProps(yield hmanager.getHomeData(), put, state);
        // Hank：这个为啥还要Refresh一次？？
        yield hmanager.mapHomeDataToProps(yield hmanager.getHomeDataRefresh(), put, state);
        // 请求获得当前登录用户信息
        const info = yield fetchFunc({ url: Url + 'user/GetCurrentUserinfo', body: '' });
        console.log('首页中拿到用户信息', info)
        yield put({
            type: 'Home_SET_STATE',
            data: { noteCount: info.data.messageCount }
        })

        const Aud = yield AsyncStorage.getItem('isAud')
        let fix = false;
        if (Aud === 'true') {
            fix = true;
        } else {
            fix = false;
        }
        // 这个P是allState
        const PriceList = yield select(p => p.PriceList)
        yield put({
            type: 'SET_STATE',
            data: { ...PriceList, isAud: fix }
        })
    },
    checkDetail: function* (state, others) {
        const PriceListState = yield select(allState => allState.PriceList)
        yield put({
            type: 'SET_STATE',
            data: { ...PriceListState, currentID: others.id }
        })
        others.instance.props.navigation.navigate('EventDetailPage')
    },
    EventImagePress: function* (state, others) {
        others.instance.props.navigation.navigate('Activity', { id: others.id, page: 'EventDetailPage' })
    },
    homeSearch: function* (state, others) {
        others.instance.props.navigation.navigate('Search')
    },
    AUDonValueChange: function* () {
        const state = yield select(state => state.PriceList)
        const fix = !state.isAud ? 'true' : 'false'
        AsyncStorage.setItem('isAud', fix)
        yield put({
            type: 'SET_STATE_Currency',
            data: { ...state, isAud: state.isAud !== void 666 ? !state.isAud : true }
        })
    },
    // 点击顶部cateList， 显示商品list
    cateListPress: function* (state, others) {
        const SearchPageState = yield select(state => state.SearchPage)

        yield put({
            type: "Search_SET_STATE",
            data: { ...state, autoFocus: false }
        })
        // 跳转到search页面显示，具体类别的产品
        console.log('Category的Instance', others.instance);
        console.log('Category的text', others.text);
        others.instance.props.navigation.navigate('Search')

        const json = yield fetchFunc({
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
    refreshAll: function* () {
        yield put({
            type: 'fetchHome'
        })
    }
}

function convert() {
    return Object.keys(actionStategy)
}

/**
 * 这是1.0 式代码 还在action写 watch
 * 2.0 式就是在rootsaga中写watch，store中配置
 */
export const watch = function* () {
    const actionList = convert()

    while (true) {
        const { type, ...others } = yield take(actionList);
        try {
            const state = yield select(state => state.Home)
            const actionFn = actionStategy[type]
            if (!actionFn) continue
            yield call(actionFn, state, others)
        } catch (e) {
            console.log(e)
        }
    }
}