import UserManager from "../../NetworkManager/UserManager";
import { CartManager } from "../../NetworkManager/CartManager";
import { GoodsManager } from "../../NetworkManager/GoodsManager";
import { Alert } from 'react-native';


const userManager = new UserManager();
export default {
    namespace: 'freeitem',
    state: {
        freeItems: [],
        currentGood: {},
        modal: false
    },
    effects: {
        fetchItems: function* ({ put }, { payload: id }) {
            const goodmanager = new GoodsManager();

            const res = yield goodmanager.fetchCurrentGoods(id);
            yield put({
                type: 'MapCurrentGoods',
                payload: { ...res.data }
            })
        },
        getFreeItem: function* ({ put }, { payload: keyword }) {
            const json = yield CartManager.PromotionFreeItem(keyword);
            yield put({
                type: 'MapfreeItems',
                payload: json.data.goodsList
            })
        },
        handleConfirm: function* ({ put }, { payload: { choosenGood, instance, key } }) {
            const json = yield CartManager.addFreeItem(choosenGood.id, key);

            console.log(json.data.freeItems)
            if (json.data.freeItems[key].errorMsg !== null) {

                Alert.alert(
                    '访问出错',
                    json.data.freeItems[key].errorMsg,
                    [
                        { text: '返回' },
                    ],
                    { cancelable: false }
                )
                return
            }

            yield put({
                type: "SET_STATE_Settle",
                data: {
                    ...json.data
                }
            })
            yield put({
                type: "closeModal"
            })
            instance.props.navigation.goBack();
        }
    },
    reducers: {
        MapfreeItems: (state, { payload }) => {
            return { ...state, freeItems: payload };
        },
        MapCurrentGoods: (state, { payload }) => {
            return { ...state, currentGood: payload, modal: true }
        },
        closeModal: (state, { payload }) => {
            return { ...state, modal: false }
        }
    }
}