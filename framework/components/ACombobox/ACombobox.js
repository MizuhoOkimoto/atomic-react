import PropTypes from "prop-types";
import React, {forwardRef, useRef, useState} from "react";

import "./ACombobox.scss";
import {ADropdown, ADropdownMenu, ADropdownMenuItem} from "../ADropdown";
import AInputBase from "../AInputBase";
import AIcon from "../AIcon";
import {useCombinedRefs} from "../../utils/hooks";
import {keyCodes} from "../../utils/helpers";

let comboboxCounter = 0;

const ACombobox = forwardRef(
  (
    {
      className: propsClassName,
      clearable,
      disabled,
      hint,
      itemText = "text",
      itemValue = "value",
      items = [],
      label,
      noDataContent,
      onChange,
      onClear,
      onSelected,
      placeholder,
      readOnly,
      validationState,
      value,
      ...rest
    },
    ref
  ) => {
    const comboboxRef = useRef(null);
    const dropdownMenuRef = useRef(null);
    const combinedRef = useCombinedRefs(ref, comboboxRef);

    const [comboboxId] = useState(comboboxCounter++);
    const [isFocused, setIsFocused] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const chevronProps = {
      className: "a-combobox__chevron",
      size: 10
    };

    if (!disabled && !readOnly) {
      chevronProps.onClick = () => {
        setIsOpen(!isOpen);
        combinedRef.current.querySelector(".a-combobox__input").focus();
      };
    }

    const inputBaseProps = {
      ...rest,
      ref: combinedRef,
      className: "a-combobox",
      clearable,
      disabled,
      focused: Boolean(isFocused || isOpen),
      append: <AIcon {...chevronProps}>chevron-down</AIcon>,
      hint,
      label,
      labelFor: `a-combobox_${comboboxId}`,
      onClear: () => {
        const e = combinedRef.current.querySelector(".a-combobox__input");
        var nativeInputValueSetter = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          "value"
        ).set;
        nativeInputValueSetter.call(e, "");
        var event = new Event("input", {bubbles: true});
        e.dispatchEvent(event);
        setIsOpen(false);
        onClear && onClear(e);
      },
      readOnly,
      validationState
    };

    if (propsClassName) {
      inputBaseProps.className += ` ${propsClassName}`;
    }

    const inputProps = {
      autoComplete: "off",
      className: "a-combobox__input",
      disabled,
      id: `a-combobox_${comboboxId}`,
      onBlur: () => {
        setIsFocused(false);
      },
      onChange: (e) => {
        setIsOpen(items.length || noDataContent);
        onChange && onChange(e);
      },
      onClick: () => setIsOpen(items.length || noDataContent),
      onFocus: () => {
        setIsFocused(true);
      },
      onKeyDown: (e) => {
        if (e.keyCode === keyCodes.up) {
          e.preventDefault();
          setIsOpen(items.length || noDataContent);
          const menuItems = Array.from(
            dropdownMenuRef.current.querySelectorAll(
              ".a-dropdown__item[tabindex]"
            )
          );
          if (menuItems.length) {
            menuItems[menuItems.length - 1].focus();
          }
        } else if (e.keyCode === keyCodes.down) {
          e.preventDefault();
          setIsOpen(items.length || noDataContent);
          const menuItems = Array.from(
            dropdownMenuRef.current.querySelectorAll(
              ".a-dropdown__item[tabindex]"
            )
          );
          if (menuItems.length) {
            menuItems[0].focus();
          }
        }
      },
      placeholder,
      readOnly,
      value
    };

    return (
      <AInputBase {...inputBaseProps}>
        <ADropdown style={{width: "100%"}}>
          <input {...inputProps} />
          <ADropdownMenu
            focusOnOpen={false}
            open={Boolean((items.length || noDataContent) && isOpen)}
            onClose={() => setIsOpen(false)}
            ref={dropdownMenuRef}
            role="listbox"
            className="a-combobox__menu-items">
            {!items.length && !!noDataContent && (
              <ADropdownMenuItem>{noDataContent}</ADropdownMenuItem>
            )}
            {items.map((item, index) => {
              const itemProps = {
                value: null,
                children: null,
                className: "a-combobox__menu-item",
                role: "option",
                "aria-selected": false,
                onClick: () => {
                  onSelected && onSelected(item);
                  setTimeout(() => {
                    combinedRef.current
                      .querySelector(".a-combobox__input")
                      .focus();
                  }, 30);
                }
              };

              if (typeof item === "string") {
                itemProps.value = item;
                itemProps.children = item;
              } else if (typeof item === "object") {
                itemProps.value = item[itemValue];
                itemProps.children = item[itemText];
              }

              return (
                <ADropdownMenuItem
                  key={`a-combobox__menu-item_${index}`}
                  {...itemProps}
                />
              );
            })}
          </ADropdownMenu>
        </ADropdown>
      </AInputBase>
    );
  }
);

ACombobox.propTypes = {
  /**
   * Toggles whether to display a clearable icon.
   */
  clearable: PropTypes.bool,
  /**
   * Toggles the disabled state.
   */
  disabled: PropTypes.bool,
  /**
   * Sets the hint content.
   */
  hint: PropTypes.node,
  /**
   * The property name of the option text when `items` is an array of objects.
   */
  itemText: PropTypes.string,
  /**
   * The property name of the option value when `items` is an array of objects.
   */
  itemValue: PropTypes.string,
  /**
   * An array of select options.
   */
  items: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.object)
  ]),
  /**
   * Sets the label content.
   */
  label: PropTypes.node,
  /**
   * Sets the content for when no matches are available.
   */
  noDataContent: PropTypes.node,
  /**
   * Handles the `change` event for when the text input is modified.
   */
  onChange: PropTypes.func,
  /**
   * Handles the `clear` event (for supplemental handling).
   */
  onClear: PropTypes.func,
  /**
   * Handles the `selected` event for when a selection is chosen in the dropdown.
   */
  onSelected: PropTypes.func,
  /**
   * Sets the text when no option is selected.
   */
  placeholder: PropTypes.string,
  /**
   * Toggles the `readOnly` state.
   */
  readOnly: PropTypes.bool,
  /**
   * Applies a validation state.
   */
  validationState: PropTypes.oneOf(["default", "warning", "danger"]),
  /**
   * Sets the text input value.
   */
  value: PropTypes.string
};

ACombobox.displayName = "ACombobox";

export default ACombobox;
