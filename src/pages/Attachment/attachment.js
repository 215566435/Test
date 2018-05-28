import { AttachManager } from '../../NetworkManager/AttachmentManager'

const attach = new AttachManager()
export default {
    namespace: 'attachment',
    state: {
        image: []
    },
    effects: {
        *fetchAttachment({ put, select }, { payload }) {
            const json = yield attach.getAttach()

            console.log(json)
            yield put({
                type: 'mapAttachment',
                payload: json.data
            })
        },
        *MarkAsSentToBuyer() {
            yield attach.MarkAsSentToBuyer()
        }
    },
    reducers: {
        mapAttachment: (state, { payload }) => {
            return { ...state, image: payload }
        }
    }
}

