import PropTypes from "prop-types";
import React, {forwardRef} from "react";

import AIcon from "../AIcon";
import ASimpleTable from "../ASimpleTable";
import "./ADataTable.scss";

const ADataTable = forwardRef(
  ({className: propsClassName, headers, items, onSort, sort, ...rest}, ref) => {
    let className = "a-data-table";

    if (propsClassName) {
      className += ` ${propsClassName}`;
    }

    let sortedItems = items;
    if (sort) {
      const sortDir = sort.direction === "desc" ? -1 : 1;
      const targetHeader = Object.values(headers).find(
        (x) => x.key === sort.key
      );

      let sortFunc = (a, b) => (a === b ? 0 : a < b ? -1 : 1);

      if (targetHeader && typeof targetHeader.sort === "function") {
        sortFunc = targetHeader.sort;
      }

      if (!targetHeader || targetHeader.sort !== false) {
        sortedItems.sort(
          (a, b) => sortDir * sortFunc(a[sort.key], b[sort.key])
        );
      }
    }

    return (
      headers &&
      items && (
        <ASimpleTable {...rest} ref={ref} className={className}>
          {headers && (
            <thead>
              <tr>
                {headers.map((x, i) => {
                  const headerProps = {
                    className: `a-data-table__header ${
                      x.sortable ? "a-data-table__header--sortable" : ""
                    } text-${x.align || "start"} ${x.className || ""}`
                      .replace("  ", " ")
                      .trim(),
                    role: "columnheader",
                    scope: "col",
                    "aria-label": x.name
                  };

                  if (x.sortable) {
                    if (!sort || x.key !== sort.key) {
                      headerProps["aria-label"] +=
                        ": Not sorted. Activate to sort ascending.";
                      headerProps["aria-sort"] = "none";
                    } else if (sort && sort.direction === "asc") {
                      headerProps["aria-label"] +=
                        ": Sorted ascending. Activate to sort descending.";
                      headerProps["aria-sort"] = "ascending";
                    } else {
                      headerProps["aria-label"] +=
                        ": Sorted descending. Activate to remove sorting.";
                      headerProps["aria-sort"] = "descending";
                    }

                    headerProps.onClick = () => {
                      onSort &&
                        onSort(
                          sort &&
                            sort.key === x.key &&
                            sort.direction === "desc"
                            ? null
                            : {
                                key: x.key,
                                direction:
                                  sort &&
                                  x.key === sort.key &&
                                  sort.direction === "asc"
                                    ? "desc"
                                    : "asc"
                              }
                        );
                    };
                  }

                  return (
                    <th {...headerProps} key={`a-data-table_header_${i}`}>
                      {x.align !== "end" ? x.name : ""}
                      {x.sortable && (
                        <AIcon
                          left={x.align === "end"}
                          right={x.align !== "end"}
                          className={`a-data-table__header__sort ${
                            sort && x.key === sort.key
                              ? "a-data-table__header__sort--active"
                              : ""
                          }`}>
                          {sort &&
                          x.key === sort.key &&
                          sort.direction === "desc"
                            ? "chevron-down"
                            : "chevron-up"}
                        </AIcon>
                      )}
                      {x.align === "end" ? x.name : ""}
                    </th>
                  );
                })}
              </tr>
            </thead>
          )}
          <tbody>
            {sortedItems.map((x, i) => (
              <tr key={`a-data-table_row_${i}`}>
                {headers.map((y, j) => (
                  <td
                    key={`a-data-table_cell_${j}`}
                    className={`text-${y.align || "start"} ${
                      y.cell?.className || ""
                    }`.trim()}>
                    {y.cell && y.cell.component
                      ? y.cell.component(x)
                      : x[y.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </ASimpleTable>
      )
    );
  }
);

ADataTable.propTypes = {
  /**
   * Toggles the `altLinks` display variant. If the table has many links, use this to display them in the base text color.
   */
  altLinks: PropTypes.bool,
  /**
   * Sets the table headers.
   */
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      key: PropTypes.string,
      className: PropTypes.string,
      align: PropTypes.oneOf(["start", "center", "end"]),
      sortable: PropTypes.bool,
      sort: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
      cell: PropTypes.shape({
        className: PropTypes.string,
        component: PropTypes.func
      })
    })
  ),
  /**
   * Sets the table data.
   */
  items: PropTypes.arrayOf(PropTypes.object),
  /**
   * Handles the `sort` event.
   */
  onSort: PropTypes.func,
  /**
   * Sets the sort.
   */
  sort: PropTypes.shape({
    key: PropTypes.string,
    direction: PropTypes.oneOf(["asc", "desc"])
  }),
  /**
   * Toggles the `striped` display variant. Darkened backgrounds for alternate rows.
   */
  striped: PropTypes.bool,
  /**
   * Toggles the `tight` display variant. Smaller row heights.
   */
  tight: PropTypes.bool
};

ADataTable.displayName = "ADataTable";

export default ADataTable;
