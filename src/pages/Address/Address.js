import UserManager from "../../NetworkManager/UserManager";


const userManager = new UserManager();
export default {
    namespace: 'address',
    state: {
        addresses: []
    },
    effects: {
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

        }
    },
    reducers: {
        mapList: (state, { payload }) => {
            return { ...state, addresses: payload };
        }
    }
}