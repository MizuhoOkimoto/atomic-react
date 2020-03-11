import PropTypes from "prop-types";
import React, {forwardRef} from "react";

import "./ADropdown.scss";

const ADropdownMenuItem = forwardRef(
  (
    {children, className: propsClassName, href, selected, target, ...rest},
    ref
  ) => {
    let className = "a-dropdown__item";

    if (selected) {
      className += " a-dropdown__item--state-selected";
    }

    if (propsClassName) {
      className += ` ${propsClassName}`;
    }

    let TagName = "div";
    const props = {
      ...rest,
      ref,
      className,
      tabIndex: 0
    };

    if (href) {
      TagName = "a";
      props.href = href;
      props.target = target;
    }

    return <TagName {...props}>{children}</TagName>;
  }
);

ADropdownMenuItem.propTypes = {
  /**
   * If specified, the component will render as an HTML link.
   */
  href: PropTypes.string,
  /**
   * Toggles the `selected` state.
   */
  selected: PropTypes.bool,
  /**
   * If the `href` property is defined, the target can be set (ex: `_blank`, `_self`, `_parent`, `_top`)
   */
  target: PropTypes.string
};

export default ADropdownMenuItem;