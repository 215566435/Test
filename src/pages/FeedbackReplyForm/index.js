import React, { Component } from 'react';
import { View, Text, TextInput, ScrollView, Picker, CameraRoll } from 'react-native';
import { connect } from 'react-redux';
import { PageWithTab } from '../../HOC/PageWithTab';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { height } from '../../util';
import { PickerView } from '../../components/Picker';

class FeedbackReplyForm extends Component {

    CustomTabBarPress = (e, child, index) => {
        if (index === 0) {
            this.props.navigation.goBack();
        } else if (index === 1) {
            const id = this.props.navigation.state.params.id;
            this.props.dispatch({
                type: 'submitFeedbackReply',
                ...this.changeText,
                FeedbackReplyForm: this,
                id: id
            });
        }
    }
    onChangeText = (text, name) => {
        if (this.changeText[name]) {
            this.changeText[name] = text;
        } else {
            this.changeText[name] = '';
            this.changeText[name] = text;
        }
    }
    onValueChange = (value, index) => {
        if (this.changeText.priority) {
            this.changeText.priority = value;
        } else {
            this.changeText.priority = '';
            this.changeText.priority = value;
        }
    }
    componentDidMount() {
        this.changeText = {};
    }

    render() {
        return (
            <View style={{ height: '100%', backgroundColor: "white" }}>
                <ScrollView style={{ marginTop: 24 }}>
                    <PickerView addonBefore={'优先级'} value={'低'} onValueChange={this.onValueChange}>
                        <Picker.Item label="低" value="低" />
                        <Picker.Item label="普通" value="普通" />
                        <Picker.Item label="高" value="高" />
                    </PickerView>
                    <Input size='large' name='content' addonBefore='反馈内容' multiline={true} numberOfLines={4} onChangeText={this.onChangeText} autoFocus={true} />
                </ScrollView>
            </View>
        )
    }
}

const wrapper = PageWithTab(FeedbackReplyForm, ['返回', '提交反馈'], ['white', '#ff7875']);

const mapState = (state) => {
    return {
        ...state.Feedback
    }
}

export default connect()(wrapper);