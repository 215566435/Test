import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga'


import { reducer as PriceList } from './pages/PriceList/reducer';
import { reducer as Detail } from './pages/Detail/reducer';
import { reducer as Cart } from './pages/Cart/reducer';
import { reducer as Manifest } from './pages/Manifest/reducer';
import { reducer as GoodState } from './pages/GoodState/reducer';
import { reducer as Home } from './pages/Home/reducer';
import { reducer as EventPage } from './pages/EventPage/reducer';
import { reducer as SearchPage } from './pages/SearchPage/reducer';
import { reducer as Category } from './pages/Category/reducer';
import { reducer as Activity } from './pages/Activity/reducer';
import { reducer as Person } from './pages/Person/reducer';
import { reducer as Deposite } from './pages/DepositeLog/reducer';
import { reducer as Password } from './pages/Password/reducer';


const tmpReducer = (state = {}, action) => {
    const type = action.type
    return { type: type }
}

const appReducer = combineReducers({
    PriceList: PriceList,
    Detail: Detail,
    Cart: Cart,
    Manifest: Manifest,
    GoodState: GoodState,
    Home: Home,
    EventPage: EventPage,
    SearchPage: SearchPage,
    Category: Category,
    Activity: Activity,
    Person: Person,
    Deposite: Deposite,
    Password: Password
})

const sagaMiddleware = createSagaMiddleware(rootSaga)
export const store = createStore(appReducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootSaga)//运行所有已经注册的saga
