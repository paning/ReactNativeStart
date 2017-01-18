/**
 * Created by Administrator on 2017/1/14.
 */

import { PropTypes } from 'react';
import { requireNativeComponent, View } from 'react-native';

const EaseConversationList = requireNativeComponent('EaseConversationList', {
    propTypes: {
        ...View.propTypes,
    },
});

export default EaseConversationList;
