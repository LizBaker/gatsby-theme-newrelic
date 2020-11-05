import React from 'react';
import PropTypes from 'prop-types';
import FeatherSVG from './FeatherSVG';
import constantize from '../utils/constantize';
import transformKeys from '../utils/transformKeys';
import featherIcons from '../icons/feather';
import icons from '../icons';

const TYPES = transformKeys(featherIcons, constantize);

const Icon = ({ name, ...props }) => {
  const featherIcon = featherIcons[name];
  const IconElement = icons[name];

  if (featherIcon) {
    return <FeatherSVG {...props}>{featherIcon}</FeatherSVG>;
  }

  if (IconElement) {
    return <IconElement {...props} />;
  }

  throw new Error(`Icon: ${name} did not match a known icon`);
};

Icon.propTypes = {
  ...FeatherSVG.propTypes,
  name: PropTypes.oneOf([...Object.keys(icons), ...Object.values(TYPES)])
    .isRequired,
};

Icon.TYPE = TYPES;

export default Icon;
