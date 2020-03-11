import PropTypes from "prop-types";
import React, {forwardRef, useState} from "react";

import ATabContext from "./ATabContext";
import "./ATabs.scss";

let tabCounter = 0;

const ATabGroup = forwardRef(
  ({className: propsClassName, children, oversized, tall, ...rest}, ref) => {
    const [tabChanged, setTabChanged] = useState(false);

    let className = "a-tab-group";

    if (oversized) {
      className += " a-tab-group--size-oversized";
    } else if (tall) {
      className += " a-tab-group--size-tall";
    }

    if (propsClassName) {
      className += ` ${propsClassName}`;
    }

    const tabContext = {
      tabChanged,
      setTabChanged,
      register: selected => {
        const index = tabCounter++;
        if (selected) setTabChanged(index);
        return index;
      }
    };

    return (
      <div {...rest} ref={ref} className={className}>
        <ATabContext.Provider value={tabContext}>
          {children}
        </ATabContext.Provider>
      </div>
    );
  }
);

ATabGroup.propTypes = {
  /**
   * Toggle the oversized style variant.
   */
  oversized: PropTypes.bool,
  /**
   * Toggle the tall style variant.
   */
  tall: PropTypes.bool
};

export default ATabGroup;