import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import Colors from '../../CommonComponents/Colors';
import Styles from '../../CommonComponents/CommonStyles';
import SealApplyViewComponent from './SealApplyViewComponent';
import CarApplyViewComponent from './CarApplyViewComponent';
import MeetingApplyViewComponent from './MeetingApplyViewComponent';
import RecruitApplyViewComponent from './RecruitApplyViewComponent';
import EmployApplyViewComponent from './EmployApplyViewComponent';
import ActivitiesViewComponent from './ActivitiesViewComponent';
import KServices from '../../NetworkService/KalixServices';

export default class MyProcessHistoryView extends Component {
  static propTypes = {
    navigator: React.PropTypes.object,
    model: React.PropTypes.object,
  };

  static analysisTask(task) {
    if (task.indexOf('sealapply') === 0) {
      return 'sealapplys';
    } else if (task.indexOf('carapply') === 0) {
      return 'carapplys';
    } else if (task.indexOf('meetingapply') === 0) {
      return 'meetingapplys';
    } else if (task.indexOf('recruitapply') === 0) {
      return 'recruitapplys';
    } else if (task.indexOf('employapply') === 0) {
      return 'employapplys';
    }

    return '';
  }

  constructor(props) {
    super(props);

    this.state = {
      submited: false,
      text: '',
    };
  }

  auditOnPress(result) {
    const that = this;
    const taskPath = MyProcessHistoryView.analysisTask(this.props.model.businessKey);
    if (taskPath !== '') {
      this.setState({
        submited: true,
      });

      const path = `${KServices.restPath()}/${taskPath}/workflow/completeTask?taskId=${this.props.model.id}&accepted=${result}&comment=${this.state.text}`;
      const promise = KServices.fetchPromise(encodeURI(path));
      promise
        .then(value => value.text())
        .then((responseText) => {
          const json = JSON.parse(responseText);
          if (json.success) {
            alert(json.msg);
          } else {
            alert(json.msg);
          }
        })
        .catch((err) => {
          alert(`系统错误！！！${err}`);
        })
        .done(() => {
          that.setState({
            submited: false,
          });
        });
    }
  }

  render() {
    let taskType;
    switch (MyProcessHistoryView.analysisTask(this.props.model.businessKey)) {
      case 'sealapplys':
        taskType = <SealApplyViewComponent entityId={this.props.model.entityId} />;
        break;
      case 'carapplys':
        taskType = <CarApplyViewComponent entityId={this.props.model.entityId} />;
        break;
      case 'meetingapplys':
        taskType = <MeetingApplyViewComponent entityId={this.props.model.entityId} />;
        break;
      case 'recruitapplys':
        taskType = <RecruitApplyViewComponent entityId={this.props.model.entityId} />;
        break;
      case 'employapplys':
        taskType = (<EmployApplyViewComponent
          navigator={this.props.navigator}
          entityId={this.props.model.entityId}
        />);
        break;
      default:
        break;
    }

    const activitiesView = (<ActivitiesViewComponent
      historyProcessId={this.props.model.processInstanceId}
    />);

    return (
      <ScrollView style={Styles.container}>
        {taskType}
        {activitiesView}
      </ScrollView>
    );
  }
}
