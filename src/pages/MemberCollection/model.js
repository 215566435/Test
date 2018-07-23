/**
 * 会员臻选页面的model
 */

export default {
  namespace: 'memberCollection',
  state: {
      data: {
        items: [
          {id: 1, name: "abc"},
          {id: 2, name: "abc"},
          {id: 3, name: "abc"},
          {id: 4, name: "abc"},
        ]
      }
    },

  reducers: {
    mapReducer(state, { payload }) {
      return { ...state };
    }
  },
  effects: {
    // 接收index发来的请求，处理，访问服务器API拿数据
    *fetchMemberCollection({ select, call, put }, { payload }) {
      const manager = new BaseManager();
      // const res = yield manager.fetchApi({
      //   //fetch新的数据
      //   url: manager.Url + "memberCollection/list",
      //   body: {
      //     type: payload.type,
      //     keyword: "",
      //     currentpage: payload.page,
      //     pagesize: 15
      //   }
      // });

      // 拿到伪数据
      const res = this.state

      try {
        let items = res.data.items; //数据格式转化
        yield put({
          type: "mapMemberCollection",
          payload: items
        });
      } catch (e) {
        Alert.alert("出错了", e.message);
      }
    }
  }
};
