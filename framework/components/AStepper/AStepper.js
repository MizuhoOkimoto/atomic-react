import PropTypes from "prop-types";
import React, {forwardRef} from "react";

import AStepperContext from "./AStepperContext";
import "./AStepper.scss";

const AStepper = forwardRef(
  ({activeStep, children, className: propsClassName, ...rest}, ref) => {
    let className = "a-stepper";

    if (propsClassName) {
      className += ` ${propsClassName}`;
    }

    const stepperContext = {
      activeStep
    };

    return (
      <div {...rest} ref={ref} className={className}>
        <AStepperContext.Provider value={stepperContext}>
          {children}
        </AStepperContext.Provider>
      </div>
    );
  }
);

AStepper.propTypes = {
  /**
   * Handles the `change` event for when a date is selected.
   */
  onChange: PropTypes.func,
  /**
   * Sets the date selected.
   */
  value: PropTypes.instanceOf(Date)
};

AStepper.displayName = "AStepper";

export default AStepper;
