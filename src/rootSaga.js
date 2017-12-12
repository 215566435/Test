import { watch as PriceList } from './pages/PriceList/action';
import { watch as Detail } from './pages/Detail/action';
import { watch as Cart } from './pages/Cart/action';
import { watch as Manifest } from './pages/Manifest/action';
import { watch as GoodState } from './pages/GoodState/action';
import { watch as Home } from './pages/Home/action';
import { watch as EventPage } from './pages/EventPage/action';
import { watch as SearchPage } from './pages/SearchPage/action';
import { watch as Category } from './pages/Category/action';
import { watch as Activity } from './pages/Activity/action';
import { watch as Person } from './pages/Person/action';
import { watch as Deposite } from './pages/DepositeLog/action';
import { watch as Password } from './pages/Password/action';
import { watch as Login } from './pages/Login/action';
import { actionStategy as Profile } from './pages/Profile/action';
import { actionStategy as Message } from './pages/Message/action';
import { actionStategy as Feedback } from './pages/Feedback/action';
import { actionStategy as FeedbackForm } from './pages/FeedbackForm/action';

import { fork, take, select, call } from 'redux-saga/effects';


function convert(actionStategy) {
    return Object.keys(actionStategy)
}

const watchCreator = (actionStategy) => {
    const actionList = convert(actionStategy)
    return function* () {
        while (true) {
            const { type, ...others } = yield take(actionList);
            try {
                const state = yield select(state => state)
                const actionFn = actionStategy[type]
                if (!actionFn) continue
                yield call(actionFn, state, others)
            } catch (e) {
                console.log(e)
            }
        }
    }
}

const rootWatch = (actionStategys) => {
    return actionStategys.map((actionStategy) => {

        return fork(watchCreator(actionStategy))
    })
}

export default function* rootSaga() {
    const watchList = rootWatch([
        Profile,
        Message,
        Feedback,
        FeedbackForm
    ])

    yield [
        fork(PriceList),
        fork(Detail),
        fork(Cart),
        fork(Manifest),
        fork(GoodState),
        fork(EventPage),
        fork(Home),
        fork(SearchPage),
        fork(Category),
        fork(Activity),
        fork(Person),
        fork(Deposite),
        fork(Password),
        fork(Login),
        ...watchList
    ]
}
