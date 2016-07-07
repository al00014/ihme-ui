import React, { PropTypes } from 'react';
import classNames from 'classnames';
import memoize from 'lodash/memoize';
import { CommonPropTypes, PureComponent } from '../../../utils';

import styles from './group.css';

const wrappedClickHandler = memoize((wrappedProps, clickHandler) => {
  return () => {
    clickHandler({ value: wrappedProps });
  };
});

export default class Group extends PureComponent {
  render() {
    const { children, className, clickHandler, style } = this.props;

    return (
      <div className={classNames(className)} style={style}>
        {
          React.Children.map(children, (child) => {
            const childProps = {
              className: classNames(styles.common, child.props.className),
              clickHandler: wrappedClickHandler(child.props.value, clickHandler),
            };

            return React.cloneElement(child, childProps);
          })
        }
      </div>
    );
  }
}

Group.propTypes = {
  className: CommonPropTypes.className,
  style: CommonPropTypes.style,

  /* function with following signature: function({ value }) */
  clickHandler: PropTypes.func,

  hoverHandler: PropTypes.func,

  children: PropTypes.node.isRequired,
};

Group.defaultProps = {
  className: styles.group,
};
