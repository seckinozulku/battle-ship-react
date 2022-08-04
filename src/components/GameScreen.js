import { useState } from "react";

const Board = () => {
  const rows = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const columns = [1, 2, 3, 4, 5, 6, 7, 8];
  const availableShips = [
    { name: "carries", size: 5 },
    { name: "battleship", size: 4 },
    { name: "cruiser", size: 3 },
    { name: "submarine", size: 3 },
    { name: "destroyer", size: 2 }
  ];

  const [selectedShips, setSelectedShips] = useState([]);
  const [selected, setSelected] = useState(null);
  const [rotation, setRotation] = useState("horizontal");
  const [currentColumn, setCurrentColumn] = useState(null);
  const [currentRow, setCurrentRow] = useState(null);

  const selectShip = (item) => {
    console.log("selectShip", item);
    setSelectedShips([...selectedShips, item.name]);
    setSelected(item);
  };

  const rotateShip = () => {
    console.log(rotation)
    setRotation(rotation === "horizontal" ? "vertical" : "horizontal");
    setCurrentRow(null);
    setCurrentColumn(null);
  };

  const mouseOver = (selectedRow, selectedColumn) => {
    console.log("mouseOver", rotation)
    if (rotation === "horizontal") {
      const coords = [selectedColumn];
      const index = columns.indexOf(selectedColumn);

      for (let i = index + 1; i < selected?.size + index; i++) {
        coords.push(columns[i]);
      }

      console.log("if", coords, [selectedRow]);
      setCurrentColumn(coords);
      setCurrentRow([selectedRow]);
    } else {
      const coords = [selectedRow];
      const index = rows.indexOf(selectedRow);

      for (let i = index + 1; i < selected?.size + index; i++) {
        coords.push(rows[i]);
      }

      console.log("else", coords, [selectedColumn]);
      setCurrentRow(coords);
      setCurrentColumn([selectedColumn]);
    }
  };

  return (
    <>
      {availableShips.map((item) => (
        <div
          style={{
            display: selectedShips.includes(item.name) ? "none" : "block"
          }}
          onClick={() => selectShip(item)}
          key={item.name}
        >
          {item.name}
        </div>
      ))}

      {rows.map((row) => (
        <div
          key={row}
          style={{
            display: "flex",
          }}
        >
          {columns.map((column) => (
            <div
              style={{
                width: "50px",
                height: "50px",
                border: "1px solid black",
                background: currentColumn?.includes(column) && currentRow?.includes(row) ? "red" : "white"
              }}
              key={column}
              onMouseDown={rotateShip}
              onMouseOver={() => mouseOver(row, column)}
            ></div>
          ))}
        </div>
      ))}
    </>
  );
};

export default Board;