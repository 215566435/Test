import React from 'react';
import { View, Picker, Modal, TouchableOpacity, Text, Clipboard } from 'react-native';
import { Button } from 'component/Button';
import { width, height } from 'utils';
import { parseAddress, data } from '../parse';

const Item = Picker.Item;


const pickerWidth = width / 3;

/**
 * 去除数组中的C,数据专用
 */
const _removeC = (array) => {
    if (array) {
        return Object.keys(array).filter((i) => {
            if (i !== 'c') return i
        });
    }
    return [];

}

class WheelPicker extends React.Component {
    state = {
        selectedValue: ['北京', '市辖区', '东城'],
        a: [],
        b: [],
        c: []
    }

    _setArray = (idx, value) => {
        return this.state.selectedValue.map((i, index) => {
            if (index === idx) {
                return value
            }
            return i;
        })
    }

    setPickerValue = (pro, city, area, fb) => {

        this.setState({
            selectedValue: [pro, city, area],
            a: Object.keys(data),
            b: _removeC(data[pro]),
            c: _removeC(data[pro][city])
        }, fb)
    }

    Achange = (value) => {
        const b = _removeC(data[value]);
        const firstCity = b[0];
        const firstArea = _removeC(data[value][firstCity])[0]
        const selectedValue = [
            value,
            firstCity,
            firstArea
        ]
        this.setState({
            selectedValue: selectedValue,
            b: _removeC(data[value]),
            c: _removeC(data[value][firstCity])
        })
    }
    Bchange = (value) => {
        const province = this.state.selectedValue[0];
        const firstArea = _removeC(data[province][value])[0]

        const selectedValue = [
            province,
            value,
            firstArea
        ]
        this.setState({
            selectedValue: selectedValue,
            c: _removeC(data[province][value])
        })
    }
    Cchange = (value) => {
        this.setState({
            selectedValue: this._setArray(2, value)
        })
    }
    componentWillReceiveProps(next) {
        this.setState({
            selectedValue: next.selectedValue
        })
    }

    componentDidMount() {
        const province = Object.keys(data);
        const City = Object.keys(data[province[0]]);
        // const firstArea = Object.keys();


        this.setState({
            a: province,
            b: _removeC(data[province[0]]),
            c: _removeC(data[province[0]][City[1]])
        })
    }
    render() {
        const { a, b, c } = this.state;
        const { selectedValue } = this.props;
        return (
            <View style={{ flexDirection: 'row' }}>
                <Picker style={{ width: pickerWidth }} selectedValue={this.state.selectedValue[0]} onValueChange={this.Achange} >
                    {a.map((i) => {
                        return <Item key={i} label={data[i].c[1]} value={i} />
                    })}
                </Picker>
                <Picker style={{ width: pickerWidth }} selectedValue={this.state.selectedValue[1]} onValueChange={this.Bchange} >
                    {b.map((i) => {
                        var label = i;
                        try {
                            label = i + data[this.state.selectedValue[0]][i].c[1];
                        } catch (e) {

                        }
                        return <Item key={i} label={label} value={i} />
                    })}
                </Picker>
                <Picker style={{ width: pickerWidth }} selectedValue={this.state.selectedValue[2]} onValueChange={this.Cchange} >
                    {c.map((i) => {
                        const pro = this.state.selectedValue[0];
                        const city = this.state.selectedValue[1];
                        var label = i;
                        try {
                            label = i + data[pro][city][i][1];
                        } catch (e) {

                        }
                        return <Item key={i} label={label} value={i} />
                    })}
                </Picker>
            </View>
        )
    }
}

class Wrapper extends React.Component {
    state = {
        show: false,
        pro: '北京',
        city: '市辖区',
        area: '东城',
        ClipboardString: ''
    }

    onPress = () => {
        this.hide();
    }
    onFinished = (left) => {
        const value = this.WheelPicker.state.selectedValue;
        this.props.onFinished(value);
        if (this.props.onAutoAnalysisFinished && (typeof left === 'string')) {
            this.props.onAutoAnalysisFinished(left);
        }
        this.hide();
    }
    autoAnalysis = () => {
        const addr = parseAddress(this.state.ClipboardString);
        if (addr.pro) {
            this.setPickerValue(addr.pro, addr.city, addr.area, () => this.onFinished(addr.leftString));
        }

    }
    show = (cb) => {

        Clipboard.getString().then((str) => {
            this.setState({
                ClipboardString: str,
                show: true,
            }, cb)
        });
    }
    hide = () => {
        this.setState({
            show: false
        })
    }
    setPickerValue = (pro, city, area, cb) => {

        this.WheelPicker.setPickerValue(pro, city, area, cb);

    }

    render() {
        return (
            <Modal
                transparent={true}
                visible={this.state.show}
                animationType={'fade'}
            >
                <View style={{ height: height / 2 }}>
                    <View style={{ height: 100, backgroundColor: '#69c0ff', marginTop: 24, flexDirection: 'row' }}>
                        <View style={{ width: 2 * width / 3 }}>
                            <Text style={{ backgroundColor: "transparent", color: "#f0f5ff" }}>系统已检测到剪切板已有收件人信息：</Text>
                            <Text style={{ backgroundColor: "transparent" }}>{this.state.ClipboardString}</Text>
                            <Text style={{ backgroundColor: "transparent", color: "#f0f5ff" }}>点击右侧按钮将自动帮您填充</Text>
                        </View>
                        <Button title='自动填充' onPress={this.autoAnalysis} style={{ backgroundColor: "#1890ff" }} />
                    </View>
                    <TouchableOpacity
                        style={{ height: height / 2 - 100 }}
                        onPress={this.onPress}
                        activeOpacity={1}
                    />
                </View>
                <View style={{ height: height / 2, backgroundColor: '#f5f5f5' }}>
                    <Button title='确定' onPress={this.onFinished} />
                    <WheelPicker selectedValue={['北京', '市辖区', '东城']} ref={node => this.WheelPicker = node} />
                </View>
            </Modal>
        )
    }
}



export class ChinaArea extends React.Component {
    state = {
        selectedValue: '点击选择地址',
        pro: '',
        city: '',
        area: '',
        realpro: '',
        realcity: '',
        realarea: ''
    }
    onPress = () => {
        if (this.state.pro === '') {
            this.ChinaArea.show();
        } else {
            this.ChinaArea.show(() => {
                const { pro, city, area } = this.state;
                this.ChinaArea.setPickerValue(pro, city, area);
            });
        }
    }
    onFinished = (value) => {
        const pro = value[0]
        const city = value[1]
        const area = value[2]
        this.setState({
            pro,
            city,
            area,
            realpro: data[pro].c[1],
            realcity: city + data[pro][city].c[1],
            realarea: area + data[pro][city][area][1]
        })
    }
    onAutoAnalysisFinished = (string) => {
        if (this.props.onAutoAnalysisFinished) {
            this.props.onAutoAnalysisFinished(string)
        }
    }
    setPickerValue = (pro, city, area) => {

        this.setState({
            selectedValue: pro + city + area,
            pro,
            city,
            area
        })
    }
    renderContent = () => {
        if (this.state.pro === '') {
            return '点击选择地址'
        } else {
            return `${this.state.realpro}，${this.state.realcity}，${this.state.realarea}`
        }
    }
    render() {
        return (
            <View
                style={{
                    borderBottomWidth: 0.5,
                    borderColor: 'rgba(120,120,120,0.2)',
                    backgroundColor: 'white',
                    flexDirection: 'row',
                    alignItems: 'center'
                }}
            >
                <Wrapper ref={node => this.ChinaArea = node} onFinished={this.onFinished} onAutoAnalysisFinished={this.onAutoAnalysisFinished} />
                <Text style={{ width: 80, backgroundColor: "transparent", paddingLeft: 14, fontSize: 12, paddingTop: 10, paddingBottom: 10 }}>地址选择</Text>
                <TouchableOpacity
                    onPress={this.onPress}
                    style={{
                        width: "60%",
                        alignItems: 'center',
                        justifyContent: "center"
                    }}
                >
                    <Text
                        style={{
                            fontSize: 12,
                            backgroundColor: "transparent"
                        }}
                    >
                        {this.renderContent()}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}