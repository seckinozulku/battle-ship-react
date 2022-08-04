import { useEffect, useState } from "react";

const SHIPS = [
  { name: "Carries", size: 5, apply: false },
  { name: "Battleship", size: 4, apply: false },
  { name: "Cruiser", size: 3, apply: false },
  { name: "Submarine", size: 3, apply: false },
  { name: "Destroyer", size: 2, apply: false }
];

const Board = ({ playerKey, step, setStep }) => {
  const rows = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const columns = [1, 2, 3, 4, 5, 6, 7, 8];

  const [ships, setShips] = useState(SHIPS);
  const [selectedShip, setSelectedShip] = useState(null);
  const [rotation, setRotation] = useState("horizontal");
  const [currentColumn, setCurrentColumn] = useState(null);
  const [currentRow, setCurrentRow] = useState(null);
  const [colored, setColored] = useState([]);
  const [error, setError] = useState(false);

  const selectShip = (item) => {
    setSelectedShip(item);
  };

  const rotateShip = () => {
    setRotation(rotation === "horizontal" ? "vertical" : "horizontal");
  };

  const mouseOver = (selectedRow, selectedColumn) => {
    if (selectedShip) {
      if (rotation === "horizontal") {
        const coords = [selectedColumn];
        const index = columns.indexOf(selectedColumn);

        for (let i = index + 1; i < selectedShip?.size + index; i++) {
          coords.push(columns[i]);
        }

        setCurrentColumn(coords);
        setCurrentRow([selectedRow]);
      } else {
        const coords = [selectedRow];
        const index = rows.indexOf(selectedRow);

        for (let i = index + 1; i < selectedShip?.size + index; i++) {
          coords.push(rows[i]);
        }

        setCurrentRow(coords);
        setCurrentColumn([selectedColumn]);
      }
    }
  };

  const applyShip = () => {
    console.log(currentColumn, currentRow);
    if (currentColumn.includes(undefined) || currentRow.includes(undefined)) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 300);
    }

    if (
      selectedShip &&
      !currentColumn.includes(undefined) &&
      !currentRow.includes(undefined)
    ) {
      const _selectedShip = {
        ...selectedShip,
        apply: true
      };

      setShips([
        ...ships.filter((item) => item.name !== selectedShip.name),
        _selectedShip
      ]);
      setSelectedShip(null);

      const result = [];
      if (rotation === "horizontal") {
        currentColumn.map((item) => result.push(currentRow[0] + item));
      } else {
        currentRow.map((item) => result.push(item + currentColumn[0]));
      }
      setColored([...colored, ...result]);
      // console.log(currentRow, currentColumn, result);
    }
  };

  useEffect(() => {
    const isAllSelected = ships.every((item) => item.apply === true);

    if (isAllSelected) {
      localStorage.setItem(playerKey, colored)
    }

  }, [ships]);

  return (
    <>
      {ships.map((item) => (
        <div
          style={{
            textDecoration: item.apply ? 'line-through' : 'none'
          }}
          onClick={() => selectShip(item)}
          key={item.name}
        >
          {item.name} - Size:
          {item.size}
        </div>
      ))}

      {ships.some((item) => item.apply === false) && <button onClick={rotateShip}>Rotate</button>}

      {rows.map((row) => (
        <div
          key={row}
          style={{
            display: "flex"
          }}
        >
          {columns.map((column) => {
            return (
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  border: "1px solid black",
                  background:
                    (currentColumn?.includes(column) &&
                      currentRow?.includes(row)) ||
                      colored.includes(row + column)
                      ? error
                        ? "red "
                        : "blue"
                      : "white"
                }}
                key={column}
                onMouseOver={() => mouseOver(row, column)}
                onClick={applyShip}
              ></div>
            );
          })}
        </div>
      ))}
      {console.log(localStorage.getItem(playerKey))}
      {ships.every((item) => item.apply === true)  && <button onClick={() => setStep(step + 1)}>
        &#10132;</button>}
    </>
  );
};

export default Board;