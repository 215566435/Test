import UserManager from "../../NetworkManager/UserManager";


const userManager = new UserManager();
export default {
    namespace: 'address',
    state: {
        addresses: []
    },
    effects: {
        *searchAddress({ put }, { payload: keyword }) {
            const json = yield userManager.SearchListAddress(keyword, -1);
            console.log(json);
            yield put({
                type: 'mapList',
                payload: json.data.items
            })
        },
        *fetchAddress({ put }) {
            const json = yield userManager.fetchListAddress(-1);
            yield put({
                type: 'mapList',
                payload: json.data.items
            })
        },
        *appendAddress({ select, put }) {
            const { addresses } = yield select(state => state.address);
            const json = yield userManager.appendListAddress(-1);
            yield put({
                type: 'mapList',
                payload: [...addresses, ...json.data.items]
            })
        },
        *deleteAddress({ put }, { payload }) {

            const { address, instance } = payload;

            yield userManager.DeleteAddress({
                id: address.id,
                address: address.a
            });

            const json = yield userManager.fetchListAddress(-1);
            yield put({
                type: 'mapList',
                payload: json.data.items
            })
        }
    },
    reducers: {
        mapList: (state, { payload }) => {
            return { ...state, addresses: payload };
        }
    }
}