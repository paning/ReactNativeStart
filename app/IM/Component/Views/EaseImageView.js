/**
 * Created by Administrator on 2017/1/14.
 */

import { PropTypes } from 'react';
import { requireNativeComponent, View } from 'react-native';

const EaseImageView = requireNativeComponent('EaseImageView', {
    propTypes: {
        ...View.propTypes,
    },
});

export default EaseImageView;
