/**
 * 2017/10/30 方正 创建
 * 搜索栏封装
 */
import React from 'react';
import { View, TextInput, Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // 4.4.2

export class SearchBar extends React.Component {
    state = {
        inputValue: '',
        deleteBtnVisiable: false
    }
    static defaultProps = {
        backgroundColor: '#f79992',
        searchColor: '#fcdbd9'
    }

    onChangeInput = (text) => {
        const deleteBtnVisiable = this.state.inputValue !== '' ? true : false
        this.setState({
            inputValue: text,
            deleteBtnVisiable: deleteBtnVisiable
        })
    }

    onDelete = () => {
        this.setState({
            inputValue: '',
            deleteBtnVisiable: false
        })
    }
    onEndEditing = () => {
        if (this.props.onEndEditing) this.props.onEndEditing(this.state.inputValue)
    }
    render() {
        const { placeholder, backgroundColor, searchColor, autoFocus } = this.props
        const { deleteBtnVisiable } = this.state
        let fixDeleteBtnVisiable = deleteBtnVisiable ? 1 : 0
        return (
            <View style={{ marginLeft: 8, borderRadius: 5, flexDirection: 'row', backgroundColor: backgroundColor, height: 30, width: '70%', alignItems: 'center' }}>
                <View style={{ marginLeft: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: "center" }}>
                    <Ionicons name='ios-search-outline' size={18} color={searchColor} style={{ backgroundColor: "transparent" }} />
                    <TextInput
                        returnKeyType='search'
                        placeholder={placeholder}
                        style={{ width: '80%', marginLeft: 8, fontSize: Platform.OS === 'ios' ? 14 : 12, height: Platform.OS === 'ios' ? null : 120 }}
                        onChangeText={this.onChangeInput}
                        value={this.state.inputValue}
                        onSubmitEditing={this.onEndEditing}
                        onFocus={this.props.onFocus}
                        autoFocus={autoFocus}
                        autoGrow={true}
                    />
                    <Ionicons onPress={this.onDelete} name='ios-close-circle' size={18} color={searchColor} style={{ opacity: fixDeleteBtnVisiable, backgroundColor: "transparent" }} />
                </View>
            </View>
        )
    }
}