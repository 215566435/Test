

export default {
    namespace: 'imageviewer',
    state: {
        attachment: [],
        index: 0
    },
    effects: {

    },
    reducers: {
        mapAttachment: (state, { payload: { url, index } }) => {

            return { ...state, attachment: url, index: index };
        }
    }

}