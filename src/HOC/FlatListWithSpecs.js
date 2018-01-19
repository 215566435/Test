import React, { Component } from 'react';
import { FlatList, View, Text } from 'react-native';




export const FlatListWithSpecs = ({ data, renderItem, onEndReached, keyExtractor }) => {

    return class wrapper extends Component {
        render() {
            return (
                <FlatList
                    style={{ zIndex: -10, marginTop: 24 }}
                    data={data}
                    renderItem={renderItem}
                    onEndReached={onEndReached}
                    initialNumToRender={6}
                    keyExtractor={keyExtractor}
                    onEndReachedThreshold={0.1}
                />
            )
        }
    }
}

export class FlatListComponent extends Component {
    render() {
        const dataSource = this.dataSource;
        if (dataSource === void 666 || dataSource === null) {
            throw Error('FlatListComponent 必须制定一个dataSource函数用于返回数据源');
        }
        const source = dataSource();
        if (source instanceof Array) {

            if (source.length === 0) {
                return <View style={{ height: '100%', justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ color: "rgba(0, 0, 0, 0.45)" }}>暂无信息</Text>
                </View>
            }

        }
        const { height } = this.props;

        const numberOfColumn = this.numberOfColumn ? this.numberOfColumn() : 1;

        return (
            <View style={{ height: height === void 666 ? '100%' : height }}>
                <FlatList
                    style={{ marginTop: 24 }}
                    data={source}
                    renderItem={({ item, index }) => {
                        const Item = this.renderItem({ item, index });
                        if (Item === void 666 || Item === null) {
                            throw Error('FlatListComponent 必须制定一个renderItem函数用于返回需要渲染的Cell');
                        }
                        return Item;
                    }}
                    numColumns={numberOfColumn}
                    onEndReached={this.onEndReached}
                    initialNumToRender={6}
                    keyExtractor={(item, index) => {
                        const key = this.keyExtractor(item, index);
                        if (key === void 666 || key === null) {
                            throw Error('FlatListComponent 必须制定一个keyExtractor函数，并且返回一个唯一的key');
                        }
                        return key;
                    }}
                    onEndReachedThreshold={0.1}
                />
            </View>
        )
    }
}