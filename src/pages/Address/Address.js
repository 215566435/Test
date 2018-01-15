export default {
    namespace: 'address',
    state: {

    },
    effects: {
        *fetchAddress2() {
            console.log('fetchAddress')
        }
    },
    reducers: {
        mapList: (state) => {
            return state;
        }
    }
}