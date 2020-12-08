import React, { Component } from 'react';
import { Image, View } from 'react-native';
import Images from './Images';

export default class Obs extends Component {
    render() {
        const width = this.props.body.bounds.max.x - this.props.body.bounds.min.x;
        const height = this.props.body.bounds.max.y - this.props.body.bounds.min.y;
        const x = this.props.body.position.x - width / 2;
        const y = this.props.body.position.y - height / 2;

        const obsRation =  width;
        const obsHeight = obsRation;
        const obsIterations = Math.ceil(height / obsHeight)

        return (
            <View 
              style = {{
                position: 'absolute',
                left: x,
                top: y,
                width: width,
                height: height,
                overflow: 'hidden',
                flexDirection: 'column'
            }}>
                <Image style={{ width: width, height: height}}  resizeMode="stretch" source={Images.obs1} />
            </View>

        )
    }
}