import React from "react";
import {
  ScrollView,
  View,
  Picker,
  Text,
  Alert,
  Image,
  TouchableOpacity,
  Platform,
  SegmentedControlIOS,
  Switch
} from "react-native";
import { PageWithTab } from "../../HOC/PageWithTab";
import { width } from "../../util";
import { connect } from "react-redux";
import { List, Li, Flex, Collapse } from "./list";
import { PacksBlock } from "./settle-packblock";
import { Page } from "../../components/page";
import { ListItem } from "../../components/ListItem";
import { convertCurrency } from "./settle-util";
import { Input, InputSelfControl } from "../../components/Input";

// //不懂这是干什么的
const AddressBlock = ({
  children,
  index,
  billAddress,
  onPress,
  billName,
  billPhone,
  senderAddress,
  senderName,
  senderPhone
}) => {
  return (
    <View>
      <Li onPress={onPress} arrow={true}>
        <Text>
          发件人：
          {senderName === null
            ? "点击编辑发件人"
            : `${senderName} ${senderPhone} ${senderAddress} `}
        </Text>
      </Li>
      <Li onPress={onPress} arrow={true}>
        <Text>
          收件人：
          {`${billName} ${billPhone} ${billAddress} `}
        </Text>
      </Li>
      {children}
    </View>
  );
};

class Settle extends React.Component {
  //本地component level state默认值
  state = {
    isKeyboardShow: false,
    isSelfPickup: false
  };

  // 组件加载后开始加载状态
  componentDidMount() {
    this.props.dispatch({
      type: "fetchSubmit",
      payload: {
        isSelfPickup: this.state.isSelfPickup
      }
    });
  }

  // 返回或者提交订单处理Handler
  CustomTabBarPress = (e, child, index) => {
    //返回按钮被点击
    if (index === 0) this.props.navigation.goBack();

    const dispatch = () => {
      this.props.dispatch({
        type: "createOrder",
        payload: {
          their_commits: this.their_commits,
          mycommits: this.mycommits,
          instance: this
        }
      });
    };
    //提交订单按钮被点击
    if (index === 1) {
      const { promotionsSum, freeItems } = this.props;
      if (promotionsSum.length === 0) {
        var hasOpptunity = false;
        Object.keys(freeItems).forEach(() => {
          hasOpptunity = true;
        });

        if (hasOpptunity) {
          Alert.alert(
            "赠品提示",
            "根据你选择的商品，你有赠品可以选择，你确定不选赠品直接下单吗？",
            [
              {
                text: "不选赠品直接下单",
                onPress: () => {
                  dispatch();
                }
              },
              { text: "返回选择赠品" }
            ],
            { cancelable: false }
          );
        } else {
          dispatch();
        }
      } else {
        dispatch();
      }
    }
  };

  // 判断是否存在voucher
  componentWillReceiveProps(nextprops) {
    if (nextprops.voucher) {
      this.handleChangeText(nextprops.voucher.vouchersCode);
    }
  }

  // 修改收件人发件人，转到别的页面
  ChangePeople = type => {
    Alert.alert(
      type === "receiver" ? "操作收件人地址" : "操作发件人地址",
      "",
      [
        {
          text: "选择地址簿的地址",
          onPress: () => {
            this.props.navigation.navigate("SettleAddressSelector", { type });
          }
        },
        {
          text: "输入地址",
          onPress: () => {
            this.props.navigation.navigate("SettleEditAddress", { type });
          }
        },
        { text: "取消" }
      ],
      { cancelable: false }
    );
  };

  /**
   * 渲染包裹
   */
  renderPackage = () => {
    // const addressPacks = mock
    const { packs } = this.props;

    if (!packs || packs.length === 0) return null;

    // if (!packs || packs.length === 0 || this.state.isSpin) {
    //   return <SpinScreen />;
    // }

    return packs.map((pack, index) => {
      return (
        <List title={pack.showName} key={index}>
          {pack.summary.items.map(item => {
            return (
              <View key={item.id}>
                <Li>{item.name}</Li>
              </View>
            );
          })}
          <View>
            <Li
              onPress={() => {
                this.props.navigation.navigate("SettleCourierPicker", {
                  pack
                });
              }}
              color="rgba(120,120,120,1)"
            >
              {"快递：" + pack.options.courierName}
            </Li>
          </View>
        </List>
      );
    });
  };

  /**
   * 渲染自提??? 这个好像没用???
   */
  renderSelfPickUp = () => {
    // const addressPacks = mock
    const { pickupPacks } = this.props;

    if (!pickupPacks || pickupPacks.length === 0) return null;

    return (
      <Collapse title="自提包裹列表">
        {show =>
          show
            ? pickupPacks.map((pack, idx) => {
                return (
                  <PacksBlock
                    style={{ padding: 10 }}
                    key={idx}
                    pack={pack}
                    isSelfPickup={isSelfPickup}
                    dispatch={this.props.dispatch}
                  />
                );
              })
            : null
        }
      </Collapse>
    );
  };

  // 不懂
  handleGetFreeItem = key => {
    this.props.navigation.navigate("FreeItem", { key });
  };

  // promotionSum列表，好像没有渲染出来？？？
  renderPromotionsSum = () => {
    if (
      this.props.promotionsSum === void 666 ||
      this.props.promotionsSum.length === 0
    )
      return;

    return (
      <Li>
        <View style={{ alignItems: "center" }}>
          {this.props.promotionsSum.map((item, index) => {
            return (
              <Flex direction="row" key={index}>
                <Text
                  style={{
                    fontSize: 12,
                    color: "#ff7875",
                    paddingLeft: 10,
                    fontWeight: "bold"
                  }}
                >
                  {item.promotionsName}: -{item.price}
                </Text>
              </Flex>
            );
          })}
        </View>
      </Li>
    );
  };

  // 输入代金劵后， 失去焦点
  onVoucherBlur = () => {
    this.props.dispatch({
      type: "handleVoucher",
      payload: this.voucherComponent.getText()
    });
    this.setState({
      isKeyboardShow: false
    });
  };

  // 清空代金劵
  handleClearVoucher = () => {
    this.voucherComponent.clear();
    this.props.dispatch({
      type: "handleVoucher",
      payload: ""
    });
  };

  // handleClearVoucher = () => {
  //   this.voucherComponent.clear()
  //   this.props.dispatch({
  //     type: 'handleVoucher',
  //     payload: ''
  //   })
  // }

  //直接操作DOM进行渲染修改text，不通过state
  handleChangeText = text => {
    // console.log('........', text)
    this.voucherComponent.setText(text);
  };

  //渲染voucher
  renderVoucher = () => {
    const { voucher } = this.props;
    const renderAmount = () => {
      return voucher ? (
        <ListItem
          content={
            <View style={{ flexDirection: "row" }}>
              <View style={{ width: width - 150 }} />
              <Text
                style={{
                  width: 150,
                  fontSize: 12,
                  color: "#ff7875",
                  paddingLeft: 10,
                  fontWeight: "bold"
                }}
              >{`代金券减免金额:-${voucher.amount}元`}</Text>
            </View>
          }
          ArrowColor={"transparent"}
        />
      ) : null;
    };
    const button = ({ onPress, color, title }) => (
      <TouchableOpacity
        onPress={onPress}
        style={{
          width: 60,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: color
        }}
      >
        <View>
          <Text style={{ color: "white", fontSize: 10 }}>{title}</Text>
        </View>
      </TouchableOpacity>
    );

    return (
      <View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ width: width - 60 }}>
            <InputSelfControl
              addonBefore="代金券"
              placeholder="请输入代金券"
              ref={node => (this.voucherComponent = node)} //
              defaultValue={voucher ? voucher.vouchersCode : ""}
              // onFocus={this.onFocus}
              onBlur={this.onVoucherBlur}
              onChangeText={this.handleChangeText}
              name="voucher"
            />
          </View>
          {button({
            onPress: this.handleClearVoucher,
            color: "#40a9ff",
            title: "清除代金券"
          })}
        </View>
        {renderAmount()}
      </View>
    );
  };

  renderFreeItems = () => {
    const { freeItems } = this.props;
    if (!freeItems) return null;
    var item = {};
    var button = [];
    for (const key in freeItems) {
      item = freeItems[key];
      button.push(freeItems[key]);
    }
    return button.map((i, index) => {
      return (
        <ListItem
          key={i.key}
          content={
            <View
              style={{
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <Text
                style={{
                  width: 60,
                  fontSize: 12,
                  color: "#ff7875",
                  paddingLeft: 10
                }}
              >
                赠品
                {index + 1}
              </Text>
              <Text style={{ width: width - 160, fontSize: 12 }}>{i.name}</Text>
              <TouchableOpacity
                onPress={() => this.handleGetFreeItem(i.key)}
                style={{
                  width: 100,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#ff7a45",
                  minHeight: 30
                }}
              >
                <View>
                  <Text style={{ color: "white", fontSize: 10 }}>选择赠品</Text>
                </View>
              </TouchableOpacity>
            </View>
          }
          ArrowColor={"transparent"}
        />
      );
    });
  };

  /**
   * 渲染包裹上面的切换邮寄方式按钮
   */
  renderSwitch = () => {
    if (Platform.OS === "ios") {
      // IOS下发货模式Switch
      return (
        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <Text
              style={{
                width: "48%",
                paddingLeft: 10
              }}
            >
              发货模式
            </Text>
            <SegmentedControlIOS
              values={["仓库代发", "现场自提"]}
              selectedIndex={0}
              onChange={() => {
                // 更改本地状态
                this.setState({
                  isSelfPickup: !this.state.isSelfPickup
                });
                // 发请求API获取需要渲染的信息
                this.props.dispatch({
                  type: "fetchSubmit",
                  payload: {
                    isSelfPickup: !this.state.isSelfPickup
                  }
                });
              }}
              style={{
                width: "50%"
              }}
            />
          </View>
          <View>
            <Text
              style={{
                width: "98%",
                paddingLeft: 10,
                paddingTop: 10,
                fontSize: 10,
                color: "#ccc",
                textAlign: "right"
              }}
            >
              {this.state.isSelfPickup
                ? "下单后订单备货完毕后需要您到现场自行打包或提走"
                : "订单将由我们代您打包及发货"}
            </Text>
          </View>
        </View>
      );
    }
    // 安卓下渲染发货模式switch
    if (Platform.OS === "android") {
      return (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <Text
            style={{
              width: "83%",
              paddingLeft: 10
            }}
          >
            发货模式： 仓库代发/现场自提
          </Text>
          <Switch
            onValueChange={() => {
              // 更改本地状态
              this.setState({
                isSelfPickup: !this.state.isSelfPickup
              });
              // 发请求API获取需要渲染的信息
              this.props.dispatch({
                type: "fetchSubmit",
                payload: {
                  isSelfPickup: !this.state.isSelfPickup
                }
              });
            }}
            value={this.state.isSelfPickup}
          />
        </View>
      );
    }
  };

  onFocus = () => {
    this.setState({
      isKeyboardShow: true
    });
  };

  onBlur = () => {
    this.setState({
      isKeyboardShow: false
    });
  };

  // 绑定输入数据显示
  onChangeText = (text, name) => {
    if (this[name] !== void 666) {
      this[name] = text;
    } else {
      this[name] = "";
      this[name] = text;
    }
  };

  /**
   * 06/18加入从线上获取之前订单信息
   */
  fetchInfoNoAsyncStorage = (billName, billPhone, billAddress) => {
    this.props.dispatch({
      type: "EditAdressInfo",
      payload: {
        type: this.type(),
        address: {
          billAddress,
          billPhone,
          billName
        }
      }
    });
  };

  render() {
    // console.log(this.props.addressPacks)
    const {
      pickupPacks,
      receiver,
      sender,
      receiverJSON,
      senderJSON
    } = this.props;
    const { cr } = this.props;
    // console.log('前台props', this.props);
    // console.log('前台receiver', receiver);
    // console.log('前台sender', sender);
    // console.log('前台receiverJSON', receiverJSON);
    // console.log('前台senderJSON', senderJSON);

    //封装显示收件人发件人地址方法
    const mergeSource = (type, source) => {
      // if(!source) return `${type}：点击编辑`

      //传入的receiver和sender为空
      if (!source) return `${type}：没有记录，点击编辑`;

      console.log("source", source);

      let { name, phone, address, idNumber } = source;
      name = name || "";
      phone = phone || "";
      address = address || "";
      idNumber = idNumber || "";

      //传入的receiver和sender不为空，return前面的原来的代码都不懂
      // let { billName, billPhone, billAddress, idNumber } = source
      // billPhone = billPhone || ''
      // billAddress = billAddress || ''
      // idNumber = idNumber || ''

      //传入的receiver和sender不为空，return前面的原来的代码都不懂
      let { billName, billPhone, billAddress } = source;
      billName = billName || name;
      billPhone = billPhone || phone;
      billAddress = billAddress || address;

      console.log("idNumber", idNumber);
      // 原来的代码
      // return billName ? `${type}：${billName} ${billPhone} ${idNumber} ${billAddress}` : `${type}：点击编辑`
      return billName
        ? `${type}：${billName} ${billPhone} ${idNumber} ${billAddress}`
        : `${type}：没有记录 点击编辑`;
    };

    return (
      <Page
        style={{
          height: "100%",
          transform: [{ translateY: this.state.isKeyboardShow ? -180 : 0 }]
        }}
      >
        <ScrollView style={{ marginTop: 24 }}>
          {this.renderPromotionsSum()}
          {this.renderVoucher()}
          {this.renderFreeItems()}
          <Input
            addonBefore="订单留言"
            // onFocus={this.onFocus}
            // onBlur={this.onBlur}
            placeholder="后台及打包人员可见信息"
            name="their_commits"
            onChangeText={this.onChangeText}
          />
          <Input
            addonBefore="我的备注"
            // onFocus={this.onFocus}
            // onBlur={this.onBlur}
            placeholder="留备信息，仅自己可见"
            name="mycommits"
            onChangeText={this.onChangeText}
          />
          {/* <Li onPress={() => this.ChangePeople('receiver')}>{mergeSource('收件人', receiver ? receiver : receiverJSON)}</Li>
          <Li onPress={() => this.ChangePeople('sender')}>{mergeSource('发件人', sender ? sender : senderJSON)}</Li> */}
          <Li onPress={() => this.ChangePeople("receiver")}>
            {mergeSource("收件人", receiver)}
          </Li>
          <Li onPress={() => this.ChangePeople("sender")}>
            {mergeSource("发件人", sender)}
          </Li>
          <Li>{this.renderSwitch()}</Li>
          {this.renderPackage()}
          {/* {this.renderSelfPickUp()} */}
          <Li>
            <View>
              <View style={{ flexDirection: "row" }}>
                <View style={{ width: width - 150 }} />
                <Text style={{ fontSize: 12, paddingLeft: 10 }}>
                  商品价格：
                  {convertCurrency(cr, this.props.o)}
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <View style={{ width: width - 150 }} />
                <Text style={{ fontSize: 13, paddingLeft: 10 }}>
                  总价格：
                  {convertCurrency(cr, this.props.t)}
                </Text>
              </View>
            </View>
          </Li>
        </ScrollView>
      </Page>
    );
  }
}

// 增加底部按钮
const wapprer = PageWithTab(Settle, ["返回", "提交订单"], ["white", "#f5222d"]);

// 从application level state 获取状态
const mapState = state => {
  return {
    ...state.settle.data,
    receiver: state.settle.receiver,
    sender: state.settle.sender
  };
};

export default connect(mapState)(wapprer);
