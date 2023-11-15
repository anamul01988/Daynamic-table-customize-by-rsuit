"use client";
import {
  Table,
  Toggle,
  TagPicker,
  Button,
  Notification,
  Placeholder,
} from "rsuite";
import { mockUsers } from "./mock";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const { Column, HeaderCell, Cell } = Table;
const defaultData = mockUsers(10);

// const CompactCell = (props) => <Cell {...props} style={{ padding: 4 }} />;
const CompactCell = ({ rowData, dataKey, onChange, ...props }) => {
  const editing = rowData.status === "EDIT";
  return (
    <Cell {...props} className={editing ? "table-content-editing" : ""}>
      {editing ? (
        <input
          className="rs-input"
          defaultValue={rowData[dataKey]}
          onChange={(event) => {
            onChange && onChange(rowData.id, dataKey, event.target.value);
          }}
        />
      ) : (
        <span className="table-content-edit-span">{rowData[dataKey]}</span>
      )}
    </Cell>
  );
};
// =====
const ActionCell = ({ rowData, dataKey, onClick, ...props }) => {
  return (
    <Cell {...props} style={{ padding: "6px" }}>
      <Button
        appearance="link"
        onClick={() => {
          onClick(rowData.id);
        }}
      >
        {rowData.status === "EDIT" ? "Save" : "Edit"}
      </Button>
    </Cell>
  );
};

// =====
const CompactHeaderCell = (props) => (
  <HeaderCell {...props} style={{ padding: 4 }} />
);

const defaultColumns = [
  {
    key: "id",
    label: "Id",
    fixed: true,
    width: 70,
  },
  {
    key: "one",
    label: "One",
    fixed: true,
    flexGrow: 1,
  },
  {
    key: "two",
    label: "Two",
    flexGrow: 1,
  },

  {
    key: "three",
    label: "Three",
    flexGrow: 1,
  },
  {
    key: "total",
    label: "Total",
    flexGrow: 1,
  },
  {
    // key: "postcode",
    key: "action",
    label: "Action",
    flexGrow: 1,
  },
];

// Function to generate a random number between min and max (inclusive)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
let defaultValue = [
  {
    id: 1,
    // total: 30,
    total: getRandomInt(50, 100),
    status: "EDIT",
  },
];
export const DynamicColumn = () => {
  // const [data, setData] = React.useState(defaultData);
  const [data, setData] = React.useState(defaultValue);
  const [loading, setLoading] = React.useState(false);
  const [compact, setCompact] = React.useState(true);
  const [bordered, setBordered] = React.useState(true);
  const [noData, setNoData] = React.useState(false);
  const [showHeader, setShowHeader] = React.useState(true);
  const [autoHeight, setAutoHeight] = React.useState(true);
  const [fillHeight, setFillHeight] = React.useState(false);
  const [hover, setHover] = React.useState(true);
  const [columnKeys, setColumnKeys] = React.useState(
    defaultColumns.map((column) => column.key)
  );
  // const notify = (props) =>
  //   toast(props, {
  //     autoClose: false,
  //   });
  const notify = (props) => toast(props);

  const columns = defaultColumns.filter((column) =>
    columnKeys.some((key) => key === column.key)
  );
  const CustomCell = compact ? CompactCell : Cell; //compact false edit korte caile aikhane korbo
  const CustomHeaderCell = compact ? CompactHeaderCell : HeaderCell;
  console.log("data for column value and columns", data, columns);
  // ============
  const handleChange = (id, key, value) => {
    const nextData = Object.assign([], data);
    nextData.find((item) => item.id === id)[key] = value;
    console.log("data for===== nextData1", nextData);
    setData(nextData);
  };
  const handleEditState = (id) => {
    const nextData = Object.assign([], data);
    const activeItem = nextData.find((item) => item.id === id);
    activeItem.status = activeItem.status ? null : "EDIT";
    console.log("data for===== nextData", nextData);
    setData(nextData);
  };
  // ============
  const handleIncreaseRows = () => {
    setData((prevData) => {
      const updatedData = [
        ...prevData,
        {
          id: prevData.length > 0 ? prevData[prevData.length - 1].id + 1 : 1,
          total: getRandomInt(50, 100),
          status: "EDIT",
        },
      ];
      console.log("#1", updatedData); // You can log the updatedData if needed
      return updatedData;
    });
  };

  const handleValidationTotal = (rowData) => {
    console.log("#rowid ", rowData);
    setTimeout(() => {
      const sumOfProperties = Object.keys(rowData)
        .filter((key) => key !== "id" && key !== "total" && key !== "status")
        .reduce((sum, key) => sum + parseInt(rowData[key], 10), 0);
      console.log(
        "#sumOfProperties, rowData.one, rowData.two, rowData.three",
        sumOfProperties,
        rowData.one,
        rowData.two,
        rowData.three
      );
      if (
        parseInt(rowData.one) > rowData.total ||
        parseInt(rowData.two) > rowData.total ||
        parseInt(rowData.three) > rowData.total ||
        sumOfProperties > rowData.total
      ) {
        notify("Value or sum should be lower than total value");
      }
    }, 2000);
  };

  return (
    <div>
      <div>
        <span>
          Compact：
          <Toggle
            checkedChildren="On"
            unCheckedChildren="Off"
            checked={compact}
            onChange={setCompact}
          />
        </span>

        <span>
          Bordered：
          <Toggle
            checkedChildren="On"
            unCheckedChildren="Off"
            checked={bordered}
            onChange={setBordered}
          />
        </span>

        <span>
          Show Header：
          <Toggle
            checkedChildren="On"
            unCheckedChildren="Off"
            checked={showHeader}
            onChange={setShowHeader}
          />
        </span>

        <span>
          Hover：
          <Toggle
            checkedChildren="On"
            unCheckedChildren="Off"
            checked={hover}
            onChange={setHover}
          />
        </span>
        <hr />
        <span>
          Loading：
          <Toggle
            checkedChildren="On"
            unCheckedChildren="Off"
            checked={loading}
            onChange={setLoading}
          />
        </span>

        <span>
          No data：
          <Toggle
            checkedChildren="On"
            unCheckedChildren="Off"
            checked={noData}
            onChange={setNoData}
          />
        </span>

        <span>
          Auto Height：
          <Toggle
            checkedChildren="On"
            unCheckedChildren="Off"
            checked={autoHeight}
            onChange={setAutoHeight}
          />
        </span>

        <span>
          Fill Height：
          <Toggle
            checkedChildren="On"
            unCheckedChildren="Off"
            checked={fillHeight}
            onChange={setFillHeight}
          />
        </span>
      </div>
      <hr />
      Columns：
      <TagPicker
        data={defaultColumns}
        labelKey="label"
        valueKey="key"
        value={columnKeys}
        onChange={setColumnKeys}
        cleanable={false}
      />
      <Button onClick={handleIncreaseRows} appearance="ghost">
        Add Rows
      </Button>
      <hr />
      <div style={{ height: autoHeight ? "auto" : 400 }}>
        <Table
          loading={loading}
          height={300}
          hover={hover}
          fillHeight={fillHeight}
          showHeader={showHeader} //header table
          autoHeight={autoHeight}
          data={noData ? [] : data} //value
          bordered={bordered}
          cellBordered={bordered}
          // headerHeight={compact ? 30 : 40}
          // rowHeight={compact ? 30 : 46}
          headerHeight={compact ? 60 : 70}
          rowHeight={compact ? 60 : 46}
          onRowClick={(data) => {
            handleValidationTotal(data);
          }}
        >
          {columns.map((column) => {
            const { key, label, ...rest } = column;
            console.log("data for  key, label", key, label);
            return (
              <Column {...rest} key={key}>
                <CustomHeaderCell>{label}</CustomHeaderCell>
                {key === "action" ? (
                  // <CustomCell dataKey={key} onClick={handleEditState} />
                  <ActionCell dataKey={key} onClick={handleEditState} />
                ) : (
                  <CustomCell dataKey={key} onChange={handleChange} />
                )}
              </Column>
            );
          })}
        </Table>
      </div>
      <ToastContainer />
    </div>
  );
};
