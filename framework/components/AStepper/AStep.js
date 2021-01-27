import PropTypes from "prop-types";
import React, {forwardRef, useState} from "react";

import "./AStepper.scss";

const AStep = forwardRef(
  ({className: propsClassName, onChange, value = new Date(), ...rest}, ref) => {
    // import AStepperContext, so it can find out what the active step is.
    // needs onclick
    let className = "a-step";

    if (propsClassName) {
      className += ` ${propsClassName}`;
    }

    // is active?
    // is disabled?
    // rules -- success/error/warning

    return (
      <div {...rest} ref={ref} className={className}>
        <div class="step__icon">
          <span class="icon-checkmark"></span>
          {/* or step number without icon */}
        </div>
        <div class="step__content">
          <div class="step__label">
            <span class="step__title">Success</span>
          </div>
          <div class="step__hint">
            Description of title. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
          </div>
        </div>
      </div>
    );
  }
);

AStep.propTypes = {
  /**
   * Handles the `change` event for when a date is selected.
   */
  onChange: PropTypes.func,
  /**
   * Sets the date selected.
   */
  value: PropTypes.instanceOf(Date)
};

AStep.displayName = "AStepper";

export default AStep;
