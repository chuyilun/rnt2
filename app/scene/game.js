import React, { useState, useEffect, Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import * as FaceDetector from 'expo-face-detector';

export default class Routes extends Component {
  
  state = {
    hasPermission: null,
    faceDetecting: false, //when true, we look for faces
    type: Camera.Constants.Type.front,
    face: [null]
  }
  
  async UNSAFE_componentWillMount() {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      this.setState({ hasPermission: status === 'granted' });
    }
  
  detectFaces(doDetect){
    this.setState({
      faceDetecting: doDetect,
    });
  }
  
  render() {
    const { hasPermission } = this.state
    if (hasPermission === null) {
      return <View />;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }

    return (
      <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Camera style={{ flex: 1 }} type={this.state.type}
        onFacesDetected={ this.handleFacesDetected }
        faceDetectorSettings={{
          mode: FaceDetector.Constants.Mode.fast,
          detectLandmarks: FaceDetector.Constants.Landmarks.all,
          runClassifications: FaceDetector.Constants.Classifications.none,
          minDetectionInterval: 100,
          tracking: true,
        }}>
        </Camera>
      </View>
      <View style={{ flex: 2 }}></View>
      </View>
    );
  }

  handleFacesDetected = ({ faces }) => {
      if (faces.length === 1){
        this.setState({
          faceDetected: true,
        });
        console.log({faces})
        // alert({faces})
      } else {
        this.setState({faceDetected: false });
      }
    }
}