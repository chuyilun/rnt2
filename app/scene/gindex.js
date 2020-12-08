import React, { useState, useEffect, Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import * as FaceDetector from 'expo-face-detector';

export default class gindex extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      hasPermission: null,
      faceDetecting: false, //when true, we look for faces
      type: Camera.Constants.Type.front,
      face: [null],
      lf_cheekx: null,
      lf_cheeky: null,
      rt_cheekx: null,
      rt_cheeky: null,
      mouthx: null,
      mouthy: null,
      nosex: null,
      nosey: null,
      lf_eyes_x: null,
      lf_eyes_y: null,
      rt_eyes_x: null,
      rt_eyes_y: null,
    }
    global.l_cheek_x = null;
    global.l_cheek_y = null;
    global.r_cheek_x = null;
    global.r_cheek_y = null;
    global.g_mouth_x = null;
    global.g_mouth_y = null;
    global.g_nose_x = null;
    global.g_nose_y = null;
    global.l_eyes_x = null;
    global.l_eyes_y = null;
    global.r_eyes_x = null;
    global.r_eyes_y = null;
    global.eye1vector = null;
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
          lf_cheekx: faces[0].leftCheekPosition.x,
          lf_cheeky: faces[0].leftCheekPosition.y,
          rt_cheekx: faces[0].rightCheekPosition.x,
          rt_cheeky: faces[0].rightCheekPosition.y,
          mouthx: faces[0].bottomMouthPosition.x,
          mouthy: faces[0].bottomMouthPosition.y,
          nosex: faces[0].noseBasePosition.x,
          nosey: faces[0].noseBasePosition.y,
          lf_eyes_x: faces[0].leftEyePosition.x,
          lf_eyes_y: faces[0].leftEyePosition.y,
          rt_eyes_x: faces[0].rightEyePosition.x,
          rt_eyes_y: faces[0].rightEyePosition.y,
        });
        // console.log({faces})
        l_cheek_x = this.state.lf_cheekx;
        l_cheek_y = this.state.lf_cheeky;
        r_cheek_x = this.state.rt_cheekx;
        r_cheek_y = this.state.rt_cheeky;
        g_mouth_x = this.state.mouthx;
        g_mouth_y = this.state.mouthy;
        g_nose_x = this.state.nosex;
        g_nose_y = this.state.nosey;
        l_eyes_x = this.state.lf_eyes_x;
        l_eyes_y = this.state.lf_eyes_y;
        r_eyes_x = this.state.rt_eyes_x;
        r_eyes_y = this.state.rt_eyes_y;

        const middle_x = (l_eyes_x + r_eyes_x) / 2;
        const middle_y = (l_eyes_y + r_eyes_y) / 2;
        const xx_diff = Math.pow(middle_x - g_nose_x, 2);
        const yy_diff = Math.pow(middle_y - g_nose_y, 2);
        eye1vector = Math.sqrt(xx_diff + yy_diff);
        // alert({faces})
      } else {
        this.setState({faceDetected: false });
      }
    }
}