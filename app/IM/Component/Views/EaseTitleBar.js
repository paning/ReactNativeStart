/**
 * Created by Administrator on 2017/1/14.
 */

import { PropTypes } from 'react';
import { requireNativeComponent, View } from 'react-native';

const EaseTitleBar = requireNativeComponent('EaseTitleBar', {
    name: 'EaseTitleBar',
    propTypes: {
        title: PropTypes.string,
        ...View.propTypes,
    },
});

export default EaseTitleBar;