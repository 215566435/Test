/**
 * 组件：Layout
 * 时间：08/18
 * 把常用的页面布局块，提取出来
 */

/**
 * 类似首页EventLayout
 * 上面是大图，下面是横向的产品ScrollView
 */
export const EventLayout = (event, index) => {
  return (
    <View style={{ ...style.defaultStyle, marginTop: 10 }} key={event.image}>
      <Text style={style.eventTitleStyle}>🌟{event.name}🌟</Text>
      <TouchableOpacity onPress={() => this.props.EventImagePress(event.id)}>
        <Image
          source={{
            uri:
              "http://cdn2u.com" +
              event.image +
              "?width=750&constrain=true&bgcolor=white"
          }}
          style={{ height: 200, width: width }}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {event.goods.map(item => {
          const { isAud } = this.props;

          const price = {
            p: isAud ? "$" + item.ap.p.a : "¥" + item.ap.p.r,
            pi: isAud ? "$" + item.ap.p.ai : "¥" + item.ap.p.ri
          };

          return (
            <TouchableOpacity
              key={item.id}
              onPress={() => this.props.onEventPress(item.id)}
            >
              <View
                style={{
                  height: 180,
                  width: 130,
                  padding: 10,
                  borderWidth: 0.5,
                  borderColor: "#f7f7f7"
                }}
              >
                <Image
                  source={{
                    uri:
                      "http://cdn2u.com" +
                      item.i +
                      "?width=140&height=140&constrain=true&bgcolor=white",
                    header: {
                      Accept:
                        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;",
                      "User-Agent":
                        "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.89 Safari/537.36"
                    }
                  }}
                  style={{ height: 110, width: 110 }}
                  resizeMode="contain"
                />
                <Text
                  numberOfLines={2}
                  style={{
                    fontSize: 10,
                    backgroundColor: "transparent"
                  }}
                >
                  {item.n}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: "#f56a00",
                    backgroundColor: "transparent"
                  }}
                >
                  {price.p !== "$null" ? price.p : "¥" + item.ap.p.r}
                </Text>
                <Text
                  style={{
                    fontSize: 10,
                    color: "#919191",
                    backgroundColor: "transparent"
                  }}
                >
                  包邮价:{price.pi !== "$null" ? price.pi : "¥" + item.ap.p.ri}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

// 页面的样式对象
const style = {
  pageStyle: {
    flex: 1,
    backgroundColor: "#fff"
  },
  defaultStyle: {
    alignItems: "center",
    justifyContent: "center"
  },
  eventTitleStyle: {
    fontSize: 20,
    padding: 10,
    color: "#f56a00",
    backgroundColor: "transparent"
  }
};

/**
 * 类似首页的GridLayout
 * 上面是标题，下面是产品列表
 */
export const GridLayout = () => {};
