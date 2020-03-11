import PropTypes from "prop-types";
import React, {forwardRef, useContext, useEffect, useState} from "react";

import ATabContext from "./ATabContext";
import "./ATabs.scss";

const ATab = forwardRef(
  (
    {
      className: propsClassName,
      children,
      href,
      onClick,
      selected,
      target,
      ...rest
    },
    ref
  ) => {
    const [tabId, setTabId] = useState(null);
    const [isSelected, setIsSelected] = useState(null);
    const {register, tabChanged, setTabChanged} = useContext(ATabContext);
    useEffect(() => {
      if (!tabId) {
        setTabId(register(selected));
      }

      setIsSelected(tabChanged === tabId);
    });

    let className = "a-tab-group__tab";
    if (isSelected) {
      className += " a-tab-group__tab--selected";
    }

    if (propsClassName) {
      className += ` ${propsClassName}`;
    }

    let TagName = "div";
    const props = {
      ...rest,
      "aria-selected": isSelected,
      ref,
      className,
      onClick: e => {
        setTabChanged(tabId);
        onClick && onClick(e);
      },
      role: "tab",
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

ATab.contextType = ATabContext;

ATab.propTypes = {
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

export default ATab;