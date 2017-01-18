import { PropTypes } from 'react';
import { requireNativeComponent, View } from 'react-native';

const MCircle = requireNativeComponent('MCircle', {
  propTypes: {
    url: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number,
    radius: PropTypes.number,
    ...View.propTypes,
  },
});

export default MCircle;
