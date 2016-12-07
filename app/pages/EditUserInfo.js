/**
 * 编辑我的详细资料
 * @author keyy/1501718947@qq.com 16/12/5 16:02
 * @description
 */
import React, {Component} from 'react'
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  Platform,
  TouchableHighlight,
  Dimensions
} from 'react-native'
import * as InitialAppActions from '../actions/InitialApp'
import {connect} from 'react-redux'
import BaseComponent from '../base/BaseComponent'
import ImagePicker from 'react-native-image-picker'
import Spinner from '../components/Spinner'
import {Button as NBButton} from 'native-base'
import RNPicker from 'react-native-picker'
import Icon from 'react-native-vector-icons/FontAwesome'
import EditFriendFilter from '../pages/EditFriendFilter'
import CheckBox from '../components/CheckBox'

const {width, height}=Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E2E2E2'
  },
  scrollViewContainer: {
    flex: 1
  },
  photosContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 10
  },
  userInfo: {
    backgroundColor: '#fff',
    marginBottom: 10,
    paddingHorizontal: 10
  },
  itemTitle: {
    paddingVertical: 10
  },
  listItem: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#d4cfcf',
    alignItems: 'center'
  },
  topItem: {
    borderTopWidth: 1,
    borderTopColor: '#d4cfcf'
  },
  bottomItem: {
    borderBottomWidth: 0
  },
  itemRow: {
    flexDirection: 'row'
  },
  itemEnter: {
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  itemIcon: {
    marginRight: 10
  },
  fullInput: {
    flex: 1
  },
  input: {
    height: 40,
    paddingLeft: 10,
    textAlignVertical: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputLabel: {
    width: 100
  },
  rightLabel: {
    width: 80,
    paddingLeft: 10,
    textAlignVertical: 'center'
  },
  emotionStatusIOS: {
    flex: 1,
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    paddingHorizontal: 10
  },
  emotionStatusIOSView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  emotionStatusIOSText: {
    textAlignVertical: 'center'
  },
  pickerItem: {
    flex: 1,
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    paddingHorizontal: 10
  },
  pickerTextView: {
    flex: 1
  },
  pickerText: {
    textAlignVertical: 'center'
  },
  checkBoxView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingTop:10
  },
  checkBoxItem: {
    width: (width - 30) / 2,
    height: 40
  },
  checkBoxLabel: {
    marginLeft: 10,
    flexDirection: 'row',
    flex: 1,
    flexWrap: 'nowrap'
  },
  datingPurposeTitle:{
    borderBottomWidth:1,
    borderBottomColor:'#d4cfcf'
  }
});

let DatingPurposeSelectCopy = [];

class EditUserInfo extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.route.params,
      ageRangeText: `${this.props.route.params.friendInfo.AgeMin}-${this.props.route.params.friendInfo.AgeMax}岁`,
      heightRangeText: `${this.props.route.params.friendInfo.HeightMin}-${this.props.route.params.friendInfo.HeightMax}cm`
    };
    console.log(this.props.route.params);
  }

  componentDidMount() {

  }

  //TODO: 需要注册安卓返回监听
  componentWillMount() {
    this._initDatingPurpose();
  }

  //初始化交友目的的选中情况
  _initDatingPurpose(){
    let tmpArr = this.state.DatingPurposeName.split(',');
    for (let i = 0; i < this.state.DictMap.DatingPurposeDict.length; i++) {
      for (let j = 0; j < tmpArr.length; j++) {
        if (this.state.DictMap.DatingPurposeDict[i].Value == tmpArr[j]) {
          this.state.DictMap.DatingPurposeDict[i].Checked = true;
          this.setState({
            DictMap: {
              ...this.state.DictMap,
              DatingPurposeDict: this.state.DictMap.DatingPurposeDict
            }
          })
        }
      }
    }
  }

  getNavigationBarProps() {
    return {
      title: '编辑资料',
      hideRightButton: false,
      rightTitle: '完成'
    };
  }

  //点击完成(保存编辑后的个人资料)
  onRightPressed() {
    const {dispatch, navigator}=this.props;
    let data = {};

  }

  //前往编辑个人信息中的交友信息
  _editFriendFilter() {
    const {navigator}=this.props;
    navigator.push({
      component: EditFriendFilter,
      name: 'EditFriendFilter',
      params: {
        ...this.state.friendInfo,
        callBack: (data)=> {
          this.setState({friendInfo: data})
        }
      }
    })
  }

  _createHeightData() {
    let data = [];
    for (let i = 100; i < 251; i++) {
      data.push(i + '')
    }
    return data;
  }

  _createWeightData() {
    let data = [];
    for (let i = 20; i < 501; i++) {
      data.push(i + '')
    }
    return data;
  }

  _createMapData() {
    return ['0m(精确定位)', '200m', '500m', '1000m', '隐身'];
  }

  //通用选择弹窗显示文本方法
  renderSinglePicker(text, value, _createData) {
    return (
      <TouchableHighlight
        onPress={()=> {
          this._showPicker(_createData, text, value)
        }}
        style={styles.emotionStatusIOS}
        activeOpacity={0.5}
        underlayColor="rgba(247,245,245,0.7)">
        <View style={styles.emotionStatusIOSView}>
          <Text style={styles.emotionStatusIOSText}>
            {this.state[`${text}`]}
          </Text>
        </View>
      </TouchableHighlight>
    )
  }

  _updateState(text, value, pickedValue) {
    switch (text) {
      case 'MarriageStatusName':
        this.setState({MarriageStatusName: pickedValue});
        break;
      case 'EducationLevelName':
        this.setState({EducationLevelName: pickedValue});
        break;
      case 'Height':
        this.setState({heightText: pickedValue});
        break;
      case 'Weight':
        this.setState({weightText: pickedValue});
        break;
      case 'JobTypeName':
        this.setState({JobTypeName: pickedValue});
        break;
      case 'IncomeLevelName':
        this.setState({IncomeLevelName: pickedValue});
        break;
      case 'mapPrecisionText':
        if (pickedValue == '隐身') {
          this.setState({
            MapPrecision: null,
            mapPrecisionText: pickedValue
          });
        } else {
          this.setState({
            MapPrecision: parseInt(pickedValue.split('m')[0]),
            mapPrecisionText: pickedValue
          });
        }
        break;
      default:
        console.error('设置数据出错!');
        break;
    }
  }

  _showPicker(_createData, text, value) {
    RNPicker.init({
      pickerData: _createData,
      selectedValue: [this.state[`${text}`]],
      onPickerConfirm: pickedValue => {
        this._updateState(text, value, pickedValue[0]);
        RNPicker.hide();
      },
      onPickerCancel: pickedValue => {
        RNPicker.hide();
      },
      onPickerSelect: pickedValue => {
        this._updateState(text, value, pickedValue[0]);
      }
    });
    RNPicker.show();
  }

  renderDatingPurpose() {
    let arr = this.state.DictMap.DatingPurposeDict;
    return (
      <View style={styles.checkBoxView}>
        {arr.map((item, index)=> {
          return (
            <CheckBox
              key={index}
              label={item.Value}
              labelStyle={styles.checkBoxLabel}
              checked={item.Checked}
              style={styles.checkBoxItem}
              onChange={(checked)=> {
                item.Checked = checked;
                if (checked) {
                  DatingPurposeSelectCopy.push(item);
                } else {
                  let index = 0;
                  for (let i = 0; i < DatingPurposeSelectCopy.length; i++) {
                    if (DatingPurposeSelectCopy[i].Key == item.Key) {
                      index = i;
                      break;
                    }
                  }
                  DatingPurposeSelectCopy.splice(index, 1);
                }
              }}/>
          )
        })}
      </View>
    )
  }

  renderBody() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollViewContainer}>
          <View style={styles.photosContainer}>
            <Text>{'这里相册显示区域'}</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.itemTitle}>{'基本资料'}</Text>
            <View style={[styles.listItem, styles.topItem]}>
              <Text style={styles.inputLabel}>{'昵称'}</Text>
              <TextInput
                style={[styles.input, styles.fullInput]}
                underlineColorAndroid={'transparent'}
                value={this.state.Nickname}
                onChangeText={(Nickname)=>this.setState({Nickname})}
                maxLength={15}/>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.inputLabel}>{'身高'}</Text>
              {this.renderSinglePicker('Height', 'Height', this._createHeightData())}
              <Text style={styles.rightLabel}>{'cm'}</Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.inputLabel}>{'体重'}</Text>
              {this.renderSinglePicker('Weight', 'Weight', this._createWeightData())}
              <Text style={styles.rightLabel}>{'kg'}</Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.inputLabel}>{'职业'}</Text>
              {this.renderSinglePicker('JobTypeName', 'JobTypeName', this.state.DictMap.JobTypeDict)}
            </View>
            <View style={styles.listItem}>
              <Text style={styles.inputLabel}>{'收入'}</Text>
              {this.renderSinglePicker('IncomeLevelName', 'IncomeLevelName', this.state.DictMap.IncomeLevelDict)}
            </View>
            <View style={styles.listItem}>
              <Text style={styles.inputLabel}>{'所在地'}</Text>
              <TextInput
                style={[styles.input, styles.fullInput]}
                underlineColorAndroid={'transparent'}
                value={this.state.Location}
                onChangeText={(Location)=>this.setState({Location})}
                maxLength={50}/>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.inputLabel}>{'情感状态'}</Text>
              {this.renderSinglePicker('MarriageStatusName', 'MarriageStatusName', this.state.DictMap.MarriageStatusDict)}
            </View>
            <View style={[styles.listItem, styles.bottomItem]}>
              <Text style={styles.inputLabel}>{'家乡'}</Text>
              <TextInput
                style={[styles.input, styles.fullInput]}
                underlineColorAndroid={'transparent'}
                value={this.state.Hometown}
                onChangeText={(Hometown)=>this.setState({Hometown})}
                maxLength={50}/>
            </View>
          </View>
          <TouchableOpacity
            onPress={()=> {
              this._editFriendFilter()
            }}
            style={[styles.userInfo, styles.itemRow, styles.itemEnter]}>
            <Text style={styles.itemTitle}>{'交友信息'}</Text>
            <Icon
              style={styles.itemIcon}
              name={'angle-right'}
              size={20}/>
          </TouchableOpacity>
          <View style={styles.userInfo}>
            <Text style={styles.itemTitle}>{'其他'}</Text>
            <View style={[styles.listItem, styles.topItem]}>
              <Text style={styles.inputLabel}>{'学历'}</Text>
              {this.renderSinglePicker('EducationLevelName', 'EducationLevelName', this.state.DictMap.EducationLevelDict)}
            </View>
            <View style={[styles.listItem]}>
              <Text style={styles.inputLabel}>{'地图精度'}</Text>
              {this.renderSinglePicker('mapPrecisionText', 'MapPrecision', this._createMapData())}
            </View>
            <View style={styles.listItem}>
              <Text style={styles.inputLabel}>{'信仰'}</Text>
              <TextInput
                style={[styles.input, styles.fullInput]}
                underlineColorAndroid={'transparent'}
                value={this.state.Religion}
                onChangeText={(Religion)=>this.setState({Religion})}
                maxLength={15}/>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.inputLabel}>{'联系方式'}</Text>
              <TextInput
                style={[styles.input, styles.fullInput]}
                underlineColorAndroid={'transparent'}
                value={this.state.MobileNo}
                onChangeText={(MobileNo)=>this.setState({MobileNo})}
                maxLength={15}/>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.inputLabel}>{'兴趣爱好'}</Text>
              <TextInput
                style={[styles.input, styles.fullInput]}
                underlineColorAndroid={'transparent'}
                value={this.state.Hobby}
                onChangeText={(Hobby)=>this.setState({Hobby})}
                maxLength={15}/>
            </View>
            <View style={[styles.listItem,styles.bottomItem]}>
              <Text style={styles.inputLabel}>{'自我评价'}</Text>
              <TextInput
                style={[styles.input, styles.fullInput]}
                underlineColorAndroid={'transparent'}
                value={this.state.SelfEvaluation}
                onChangeText={(SelfEvaluation)=>this.setState({SelfEvaluation})}
                maxLength={50}/>
            </View>
          </View>
          <View style={styles.userInfo}>
            <Text style={[styles.itemTitle,styles.datingPurposeTitle]}>{'交友目的'}</Text>
            {this.renderDatingPurpose()}
          </View>
        </ScrollView>
      </View>
    )
  }

}
export default EditUserInfo
