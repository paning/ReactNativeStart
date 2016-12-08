import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import SealApplyViewComponent from './SealApplyViewComponent';
import ActivitiesViewComponent from './ActivitiesViewComponent';
import KServices from '../../NetworkService/KalixServices';

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: 'white',
  },
  buttonView: {
    flex: 1,
    margin: 20,
    height: 50,
    backgroundColor: '#3281DD',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    width: 50,
  },
});

export default class TaskView extends Component {
  static propTypes = {
    model: React.PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      submited: false,
      text: '',
    };
  }
  analysisTask(task) {
    if (task.indexOf('sealapply') === 0) {
      return 'sealapplys';
    } else if (task.indexOf('carapply') === 0) {
      return 'carapplys';
    }

    return '';
  }

  auditOnPress(result) {
    const that = this;
    const taskPath = this.analysisTask(this.props.model.businessKey);
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
    if (this.props.model.businessKey.indexOf('sealapply') === 0) {
      taskType = <SealApplyViewComponent entityId={this.props.model.entityId} />;
    }

    const activitiesView = (<ActivitiesViewComponent
      historyProcessId={this.props.model.processInstanceId}
    />);

    return (
      <ScrollView style={{ backgroundColor: 'white' }}>
        <Text>ddd</Text>
        <Text>ddd</Text>
        <Text>ddd</Text>
        <Text>ddd</Text>
        <Text>ddd</Text>
        <Text>ddd</Text>
        <Text>ddd</Text>
        <Text>ddd</Text>
        <Text>ddd</Text>
        <Text>ddd</Text>
        <Text>ddd</Text>
        <Text>ddd</Text>
        <Text>ddd</Text>
        <Text>ddd</Text>
        <Text>ddd</Text>
        <Text>ddd</Text>
        <Text>ddd</Text>
        <Text>ddd</Text>
        <Text>ddd</Text>
        <Text>ddd</Text>
        {taskType}
        {activitiesView}
        <View>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={text => this.setState({ text })}
            value={this.state.text}
          />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={() => this.auditOnPress('同意')} style={styles.buttonView}>
            <Text style={styles.buttonText}>同意</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.auditOnPress('不同意')} style={styles.buttonView}>
            <Text style={styles.buttonText}>不同意</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
