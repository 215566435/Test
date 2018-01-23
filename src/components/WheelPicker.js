import React from 'react';
import { View, Picker, Modal, TouchableOpacity, Text } from 'react-native';
import { Button } from 'component/Button';
import { width, height } from 'utils';
import { parseAddress, data } from '../parse';

const Item = Picker.Item;


const pickerWidth = width / 3;

class WheelPicker extends React.Component {
    state = {
        selectedValue: ['北京', '', ''],
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

    Achange = (value) => {
        const b = Object.keys(data[value]).filter((i) => {
            if (i !== 'c') return i
        });
        const firstCity = b[0]

        this.setState({
            selectedValue: this._setArray(0, value),
            b: Object.keys(data[value]).filter((i) => {
                if (i !== 'c') return i
            }),
            c: Object.keys(data[value][firstCity]).filter((i) => {
                if (i !== 'c') return i
            })
        })
    }
    Bchange = (value) => {

        const province = this.state.selectedValue[0];
        this.setState({
            selectedValue: this._setArray(1, value),
            c: Object.keys(data[province][value]).filter((i) => {
                if (i !== 'c') return i
            })
        })

    }

    Cchange = (value) => {

        this.setState({
            selectedValue: this._setArray(2, value)
        })

        // console.log(area)
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
        const area = Object.keys(data[province[0]][City[0]]);


        this.setState({
            a: province,
            b: City.filter((i) => {
                if (i !== 'c') {
                    return i
                }
            }),
            c: area
        })
    }
    render() {
        const { a, b, c } = this.state;
        const { selectedValue } = this.props;
        return (
            <View style={{ flexDirection: 'row' }}>
                <Picker style={{ width: pickerWidth }} selectedValue={this.state.selectedValue[0]} onValueChange={this.Achange} >
                    {a.map((i) => {
                        return <Item key={i} label={i} value={i} />
                    })}
                </Picker>
                <Picker style={{ width: pickerWidth }} selectedValue={this.state.selectedValue[1]} onValueChange={this.Bchange} >
                    {b.map((i) => {
                        return <Item key={i} label={i} value={i} />
                    })}
                </Picker>
                <Picker style={{ width: pickerWidth }} selectedValue={this.state.selectedValue[2]} onValueChange={this.Cchange} >
                    {c.map((i) => {
                        return <Item key={i} label={i} value={i} />
                    })}
                </Picker>
            </View>
        )
    }
}

export default class Wrapper extends React.Component {
    state = {
        show: true
    }

    onPress = () => {
        this.hide();
    }
    onFinished = () => {
        this.hide();
        this.props.onFinished(this.WheelPicker.state.selectedValue);
        console.log(this.WheelPicker.state.selectedValue)
    }
    show = () => {
        this.setState({
            show: true
        })
    }
    hide = () => {
        this.setState({
            show: false
        })
    }

    render() {
        return (
            <Modal
                transparent={true}
                visible={this.state.show}
                animationType={'slide'}
            >
                <TouchableOpacity
                    onPress={this.onPress}
                    style={{ height: height / 2 }}
                    activeOpacity={1}
                />
                <View style={{ height: height / 2, backgroundColor: '#f5f5f5' }}>
                    <Button title='确定' onPress={this.onFinished} />
                    <WheelPicker selectedValue={['北京', 0, 0]} ref={node => this.WheelPicker = node} />
                </View>
            </Modal>
        )
    }
}



export class ChinaArea extends React.Component {
    state = {
        selectedValue: '点击选择地址'
    }
    onPress = () => {
        this.ChinaArea.show();
    }
    onFinished = (value) => {
        this.setState({
            selectedValue: value.reduce((pre, next) => {
                return pre + next
            })
        })
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
                <Wrapper ref={node => this.ChinaArea = node} onFinished={this.onFinished} />
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
                        {this.state.selectedValue}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}