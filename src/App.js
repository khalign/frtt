import * as React from "react";
import styled from "styled-components";
import { useTable, useSortBy } from "react-table";
// import logo from './logo.svg';
import { getList } from "./prepareData";
import "./App.css";

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`;

function Table({ columns, data }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
        initialState: { sortBy: [{ id: "increase", desc: true }] },
      },
      useSortBy
    );

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render("Header")}
                <span>
                  {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>

      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function App() {
  const [list, setList] = React.useState([]);

  React.useEffect(() => {
    const fetchList = async () => {
      const data = await getList();
      data && setList(data);
    };

    fetchList();
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: "Coin Name",
        accessor: "name",
      },
      {
        Header: "Current Price (USD)",
        accessor: "current",
      },
      {
        Header: "Opening price (USD)",
        accessor: "opening",
      },
      {
        Header: "Price Increase",
        accessor: "increase",
      },
    ],
    []
  );

  return (
    <Styles>
      <Table columns={columns} data={list} />
    </Styles>
  );
}

export default App;
