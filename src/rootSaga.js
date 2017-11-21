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

import { fork, take } from 'redux-saga/effects';

export default function* rootSaga() {
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
    ]
}
