import { CameraRoll } from 'react-native';



export default {
    namespace: 'feedbackform',
    state: {
        isAddAttach: false,
        photos: []
    },
    effects: {
        *cancelAttach({ put }) {
            yield put({
                type: "isAddAttach",
                payload: {
                    isAddAttach: false,
                    photos: []
                }
            })
        },
        *addAttachment({ put }) {
            var fetchParams = {
                first: 30,
                // groupTypes: 'All',
                assetType: 'Photos'
            }
            const res = yield CameraRoll.getPhotos(fetchParams);
            console.log(res);

            yield put({
                type: "isAddAttach",
                payload: {
                    isAddAttach: true,
                    photos: res.edges
                }
            })
        }
    },
    reducers: {
        isAddAttach: (state, { payload }) => {
            return { ...state, ...payload }
        }
    }
}