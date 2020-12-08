import React, {Component, useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Platform,
    BackHandler,
    BackAndroid,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    Alert,
    ImageBackground
} from 'react-native';
import Modal from 'react-native-modal';
import BlinkView from 'react-native-blink-view'
import Dialog, { DialogFooter, DialogButton, DialogContent } from 'react-native-popup-dialog';
import firebases from '../config';
import * as firebase from 'firebase'



let _this=undefined;
let navigation = undefined;


var coin = 2; //資料庫給予使用者所擁有金幣數量

const width = Dimensions.get('window').width;
const heightAll = Dimensions.get('window').height;
// 狀態欄高度
const height = Platform.OS === 'ios' ? 70 : 50+20;
const lWidth = width/3;
const lHeight = (heightAll-height)/6;
const lotteryName = ['火鍋星','熊熊星','巧克力星','銘謝惠顧','R星','粉藍超新星','普通星','什麼都沒有'];
const image = [
    require('../assets/hotpot.png'),    
    require('../assets/bearbear.png'),
    require('../assets/chocolate.png'),
    require('../assets/tongue.png'),
    require('../assets/03.png'),
    require('../assets/p2.png'),
    require('../assets/p3.png'),
    require('../assets/p4.png'),
    require('../assets/planet3.png'),
    ];

const styles = [
    {backgroundColor:'#FF5151',borderColor:'gold',borderWidth:3},
    {backgroundColor:'indianred',borderColor:'#00000000',borderWidth:1},
    {backgroundColor:'lightcoral',borderColor:'#00000000',borderWidth:1},
    {backgroundColor:'lightsalmon',borderColor:'#00000000',borderWidth:1},
    {backgroundColor:'#00000000',borderColor:'#00000000',borderWidth:1},
    {backgroundColor:'#00000000',borderColor:'#00000000',borderWidth:1},
    {backgroundColor:'#00000000',borderColor:'#00000000',borderWidth:1},
    {backgroundColor:'#00000000',borderColor:'#00000000',borderWidth:1},
    {backgroundColor:'#00000000',borderColor:'#00000000',borderWidth:1},
    {backgroundColor:'#00000000',borderColor:'#00000000',borderWidth:1},
];
const intervalTime = 100; // 間隔時間



export default class App extends Component {


    constructor(props) {
        super(props);
        _this = this;
        this.state = {
            lotteryName: lotteryName,
            name: '抽獎名稱',
            currentCheck: -1, // 當前選中的那一个
            endCheck: 5, // 最终选中的那个（第几个）
            isUseful: true, // 開獎按鈕是否可用
            styles: [],
            choujNum: 0, //抽獎次數
            choujState: false, // 抽獎狀態
            isVisible: true,
            img_url: "",//圖片網址
            coin: "",//金幣
            currentDate: "",
            user: "",
            uid: ""
            // coin1:""//取得時間
        };
        this.second = 0;
        this.round = 3;      // 轉的圈數
        this.allTime = 0;
    }

    get_coin = () => {
        var user = firebases.auth().currentUser;
        var firebaseRef = firebases.database().ref('/users/' + user.uid + '/coin');
        console.log(firebaseRef);
        console.log(user.displayName);
        firebaseRef.on('value', QuerySnapshot => {
            console.log('firebase1', QuerySnapshot.val());

            this.setState({
                coin: QuerySnapshot.val()
            })
            console.log('firebase2', this.state.coin);
        })
    }

    get_data = () => {  //取得使用者名稱
        var user = firebases.auth().currentUser;

        firebase
            .auth()
            .signInWithEmailAndPassword(gemail, gpassword)
            .catch(error => seterrorMessage({errorMessage: error.message}))
        
        // if (user != null) { this.setState({email: user.email , uid: user.uid}) };
        var firebaseRef =  firebases.database().ref('/users/' + user.uid + '/username');

        firebaseRef.on('value', snapshot => {
        this.setState({
            user : snapshot.val()
        })
        //console.log('firebase',snapshot.val);
        });

        //console.log('user', this.state.user);
    }

    // de_coin = () => {
    //     var firebaseRef = firebase.database().ref('/coinnn');
    //     firebaseRef.child('/coin').on('value', QuerySnapshot => {
    //         console.log('firebase3', QuerySnapshot.val().coin);

    //         this.setState({
    //             coin: QuerySnapshot.val().coin - 1
    //         })
    //         console.log('firebase4', this.state.coin);
    //     })
    // }


    update_coin = () => {
        var user = firebases.auth().currentUser;
        var firebaseRef = firebases.database().ref('/users/' + user.uid );
        firebaseRef.update({
            coin: this.state.coin-1
        })
        // this.setState({
        //     coin:  QuerySnapshot.val().coin
        // })
        console.log('firebase5', this.state.coin);
    }

    ShowCurrentDate = () => {

        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        var sec = new Date().getSeconds(); //Current Seconds

        this.state.currentDate = date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec;
    }


    // 開始抽獎 設置定時器轉圈
    startLottery() {
        
        if (this.timer) {
            return
        }
        if (this.state.choujState) {
            return;
        }
        let c = [0, 1, 2, 3, 4, 5, 6, 7]
        let indexnoc = Math.floor((Math.random() * c.length));
        this.setState({
            choujState: true,
            endCheck: c[indexnoc] + 1,
        })
        setTimeout(() => {

            this.allTime = this.round * 10 * intervalTime + (this.state.endCheck - 1) * intervalTime;
            this.start();
        }, 100);
    }

    startplay = () => {
        this.get_coin();
        // this.de_coin();
        this.update_coin();
        this.ShowCurrentDate();
        var user = firebases.auth().currentUser;

        if (this.state.coin < 1) {
            Alert.alert('對話視窗', '你沒金幣了，要不要加值呢?')
            var firebaseRef = firebases.database().ref('/users/' + user.uid + '/coin');
            firebaseRef.update({
                coin: "0"
            })
            console.log('firebase6', this.state.coin);
        }
        else this.startLottery()

    }



    start = () => {
        this.timer = setInterval(function () {
            this.allTime = this.allTime - intervalTime;
            if (this.second === 9) {
                this.second = 0;
            } else {
                this.second++;
            }
            let s = [];
            let w = this.second;
            for (let i = 0; i < 8; i++) {
                if (this.allTime === 0) {
                    if (i === w) {
                        s.push(styles[0]);
                    } else {
                        s.push({});
                    }
                } else {
                    s.push(styles[w]);
                    if (this.state.endCheck / 2 === 0) {
                        if (w === 7) {
                            w = 0;
                        } else {
                            w++;
                        }
                    } else {
                        if (w === 0) {
                            w = 7;
                        } else {
                            w--;
                        }
                    }
                }
            }

            this.setState({
                name: this.state.lotteryName[this.second],
                styles: s,
                currentCheck: this.second,
            })
            if (this.allTime === 0) {
                clearInterval(this.timer);
                this.timer = false;
                this.allTime = 0;
                this.second = 0;
                this.setState({
                    choujState: false,
                })
                console.log((this.state.endCheck) - 1);

                Alert.alert('Congratulation!', "你抽中了" + this.state.lotteryName[this.state.endCheck - 1]);
                var user = firebases.auth().currentUser;
                if ((this.state.endCheck - 1) == 0) {  //加火鍋星到user_has_planet
                    // this.ShowCurrentDate();

                    firebases.database().ref('/user_has_planet/'+user.uid+'/hotpot').set({
                        date: this.state.currentDate,
                        url: 'https://i.imgur.com/jIqdKgT.png',

                    });
                }
                if ((this.state.endCheck - 1) == 1) {   //加熊熊星到user_has_planet
                    // this.ShowCurrentDate();
                    firebases.database().ref('/user_has_planet/' + user.uid + '/bear').set({
                        date: this.state.ccurrentDate,
                        url: 'https://i.imgur.com/JnPxf8q.png',

                    });
                }
                if ((this.state.endCheck - 1) == 2) {   //加巧克力星到user_has_planet
                    // this.ShowCurrentDate();
                    firebases.database().ref('/user_has_planet/' + user.uid + '/chocolate').set({
                        date: this.state.currentDate,
                        url: 'https://i.imgur.com/cZExWno.png',

                    });
                }
                if ((this.state.endCheck - 1) == 3) {  //銘謝惠顧

                }
                if ((this.state.endCheck - 1) == 4) {   //加R星到user_has_planet
                    // this.ShowCurrentDate();
                    firebases.database().ref('/user_has_planet/' + user.uid + '/maple').set({
                        date: this.state.currentDate,
                        url: 'https://i.imgur.com/g81Jg56.png',

                    });

                }
                if ((this.state.endCheck - 1) == 5) {     //加粉藍星到user_has_planet
                    // this.ShowCurrentDate();
                    firebases.database().ref('/user_has_planet/' + user.uid + '/pinkblue').set({
                        date: this.state.currentDate,
                        url: 'https://i.imgur.com/BjMDFJG.png',

                    });

                }
                if ((this.state.endCheck - 1) == 6) {    //加普通星到user_has_planet
                    // this.ShowCurrentDate();
                    firebases.database().ref('/user_has_planet/' + user.uid + '/yellowgreen').set({
                        date: this.state.currentDate,
                        url: 'https://i.imgur.com/QzloNV1.png',

                    });

                }
                if ((this.state.endCheck - 1) == 7) {  //楓葉星
                    // this.ShowCurrentDate();
                    firebases.database().ref('/user_has_planet/' + user.uid + '/yellowpink').set({
                        date: this.state.currentDate,
                        url: 'https://i.imgur.com/xze2u12.png',
                    });

                }
            }

        }.bind(this), intervalTime);

    }



    //  componentWillMount = () => {
         
    //  }
 
 
     componentDidMount() {
        this.get_coin();
        this.get_data();
        this.setState({user : ""});
     }


    componentWillUnmount() {
        this.interval && clearInterval(this.interval);
        this.timer && clearInterval(this.timer);

    }




    showdialog() {
        Alert.alert('貼心小提醒', "先在心中默念想要的星球， 會更容易抽中哦!")
    }

    modalHandler = () => {
        this.setState({ isVisible: !this.state.isVisible });
    }




    render() {


        const { isVisible } = this.state;
        // console.log(this.state.styles);
        //let choujiangnum = this.state.choujNum;

        return (


            <ImageBackground source={require('../assets/bg1.jpg')} style={shoppingStyles.backgroundColor0}>


                <View style={shoppingStyles.container}>


                    <View>
                        <Modal
                            visible={isVisible}
                            transparent={true}

                            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                        >

                            <TouchableOpacity
                                onPress={() => this.modalHandler()}
                                style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                            >

                                <View style={{ height: '70%', width: '100%', backgroundColor: '#7E3D76', borderRadius: 15, }}>
                                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20, top: 50, color: '#FCFCFC' }}>歡迎來到星球抽抽樂</Text>
                                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16, top: 120, color: '#FCFCFC' }}>請點選中間的按鈕來抽取你想要的星球吧~~~</Text>
                                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 30, top: 200, color: '#FCFCFC' }}>Good Luck！</Text>
                                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 10, top: 270 }}>(點選任意處繼續)</Text>



                                </View>
                            </TouchableOpacity>
                        </Modal>
                    </View>


                    <View>

                        <View style={[{ width: '30%', top: 150, left: 20 }]}>
                            <Image style={[{ resizeMode: 'contain', width: '50%' }]}
                                source={require('../assets/goldcoin.png')} />

                        </View>
                        <View>
                            <Text style={[{ left: 66, bottom: 50, fontWeight: 'bold', fontSize: 25, color: 'white' }]}> {this.state.coin}</Text>
                        </View>


                        <View style={[{ marginRight: 80, left: 330, bottom: 330 }]}>
                            <TouchableOpacity onPress={() => { this.showdialog() }}>
                                <Image style={[{ resizeMode: 'contain', width: '20%' }]}
                                    source={require('../assets/idea.png')} />
                            </TouchableOpacity>
                        </View>






                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <View style={shoppingStyles.lotteryui}>



                            <View style={[{
                                width: lWidth, height: lHeight, borderWidth: 8, borderColor: '#596164', backgroundColor: '#838389',
                                justifyContent: 'center', alignItems: 'center',
                            }, this.state.styles.length != 0 ? this.state.styles[0] : {}]}>

                                <Image style={[shoppingStyles.lotteryimagesize]} source={image[0]} />
                                <View style={[shoppingStyles.ViewTextstyle]}>
                                    <Text style={shoppingStyles.planettext}>火鍋星</Text>
                                </View>

                            </View>

                            <View style={[{
                                width: lWidth, height: lHeight, borderWidth: 8, borderColor: '#596164', backgroundColor: '#838389',
                                justifyContent: 'center', alignItems: 'center'
                            }, this.state.styles.length != 0 ? this.state.styles[1] : {}]}>

                                <Image style={[shoppingStyles.lotteryimagesize]} source={image[1]} />

                                <View style={[shoppingStyles.ViewTextstyle]}>
                                    <Text style={shoppingStyles.planettext}>熊熊星</Text>
                                </View>
                            </View>



                            <View style={[{
                                width: lWidth, height: lHeight, borderWidth: 8, borderColor: '#596164', backgroundColor: '#838389',
                                justifyContent: 'center', alignItems: 'center'
                            }, this.state.styles.length != 0 ? this.state.styles[2] : {}]}>

                                <Image style={[shoppingStyles.lotteryimagesize]} source={image[2]} />

                                <View style={[shoppingStyles.ViewTextstyle]}>
                                    <Text style={shoppingStyles.planettext}>巧克力星</Text>
                                </View>
                            </View>


                            <View style={[{
                                width: lWidth, height: lHeight, borderWidth: 8, borderColor: '#596164', backgroundColor: '#838389',
                                justifyContent: 'center', alignItems: 'center'
                            }, this.state.styles.length != 0 ? this.state.styles[7] : {}]}>

                                <Image style={[shoppingStyles.lotteryimagesize]} source={image[3]} />

                                <View style={[shoppingStyles.ViewTextstyle]}>
                                    <Text style={shoppingStyles.planettext}>什麼都沒中喔</Text>
                                </View>
                            </View>


                            <View style={[{
                                width: lWidth, height: lHeight, borderWidth: 8, borderColor: '#596164', backgroundColor: '#838389',
                                justifyContent: 'center', alignItems: 'center'
                            }]}>



                                <TouchableOpacity activeOpacity={0.3} style={{ width: lWidth, height: lHeight, justifyContent: 'center', alignItems: 'center' }} onPress={this.startplay
                                    // this.get_coin();
                                    // this.de_coin();
                                    // this.update_coin();
                                    // coin = coin - 1
                                    // if (this.state.coin = 0) {
                                    //     Alert.alert('對話視窗', '你沒金幣了，要不要加值呢?')
                                    //     var firebaseRef = firebase.database().ref('/coinnn/');
                                    //     firebaseRef.child('coin/').update({
                                    //         coin: 0
                                    //     })
                                    //     console.log('firebase6', this.state.coin);
                                    // }
                                    // else this.startLottery()

                                    // }
                                }>
                                    <Image style={[shoppingStyles.lotteryuicenter]} source={image[8]} />
                                </TouchableOpacity>


                            </View>


                            <View style={[{
                                width: lWidth, height: lHeight, borderWidth: 8, borderColor: '#596164', backgroundColor: '#838389',
                                justifyContent: 'center', alignItems: 'center'
                            }, this.state.styles.length != 0 ? this.state.styles[3] : {}]}>

                                <Image style={[shoppingStyles.lotteryimagesize]} source={image[4]} />

                                <View style={[shoppingStyles.ViewTextstyle]}>
                                    <Text style={shoppingStyles.planettext}>銘謝惠顧</Text>
                                </View>
                            </View>

                            <View style={[{
                                width: lWidth, height: lHeight, borderWidth: 8, borderColor: '#596164', backgroundColor: '#838389',
                                justifyContent: 'center', alignItems: 'center'
                            }, this.state.styles.length != 0 ? this.state.styles[6] : {}]}>

                                <Image style={[shoppingStyles.lotteryimagesize]} source={image[5]} />

                                <View style={[shoppingStyles.ViewTextstyle]}>
                                    <Text style={shoppingStyles.planettext}>普通星</Text>
                                </View>
                            </View>

                            <View style={[{
                                width: lWidth, height: lHeight, borderWidth: 8, borderColor: '#596164', backgroundColor: '#838389',
                                justifyContent: 'center', alignItems: 'center'
                            }, this.state.styles.length != 0 ? this.state.styles[5] : {}]}>

                                <Image style={[shoppingStyles.lotteryimagesize]} source={image[6]} />

                                <View style={[shoppingStyles.ViewTextstyle]}>
                                    <Text style={shoppingStyles.planettext}>粉藍超新星</Text>
                                </View>
                            </View>

                            <View style={[{
                                width: lWidth, height: lHeight, borderWidth: 8, borderColor: '#596164', backgroundColor: '#838389',
                                justifyContent: 'center', alignItems: 'center'
                            }, this.state.styles.length != 0 ? this.state.styles[4] : {}]}>

                                <Image style={[shoppingStyles.lotteryimagesize]} source={image[7]} />

                                <View style={[shoppingStyles.ViewTextstyle]}>
                                    <Text style={shoppingStyles.planettext}>R星</Text>
                                </View>

                            </View>



                        </View>


                    </View>
                </View>

            </ImageBackground>
        )
    }
}





const shoppingStyles = StyleSheet.create({
    container: {
        flex:2,
        backgroundColor: '#00000000',
        
        
    },
    lotteryimagesize:{
        resizeMode: 'contain',
        width:'60%'
    },
    ideaimagetouch: {
        flex:1,
        resizeMode:'contain',
        
    },
    ideaimagetouchview:{
       flex:1,
       resizeMode:'contain'
       
      
    },
    
    backgroundColor0:{
        width:'100%',
        height:'100%',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        

    },
    lotteryui:{
        flex:4,
        flexDirection:'row',
        flexWrap:'wrap',
        width:width,
        justifyContent:'center',
        bottom:400,
        backgroundColor:'gray',
        
    },
    lotteryuicenter:{
        resizeMode: 'contain',
        width:'70%',
        
    },
    planettext:{
        flex:2,
        fontSize:8,
        color:'white',
        fontWeight:'bold'
            
    },

    ViewTextstyle:{
        flex:2,
        position:'absolute',
        justifyContent:'center',
        alignItems: 'center',
        bottom:0       
    }



    
});


