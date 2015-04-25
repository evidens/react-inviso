'use strict';
import React from 'react';

export default {
  propTypes: {
    hasSomeMixin: React.PropTypes.bool
  },
  hasMixin() {
    return this.props.hasSomeMixin;
  }
};
