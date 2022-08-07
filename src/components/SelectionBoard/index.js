import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux'
import { setPlayerOneShips, setPlayerTwoShips } from '../../Redux/slice'
import './index.css'


// Ship names, size.
const SHIPS = [
  { name: "Carries", size: 5, apply: false },
  { name: "Battleship", size: 4, apply: false },
  { name: "Cruiser", size: 3, apply: false },
  { name: "Submarine", size: 3, apply: false },
  { name: "Destroyer", size: 2, apply: false }
];


// Columns and rows for 8x8 board.

const ROWS = ["A", "B", "C", "D", "E", "F", "G", "H"];
const COLUMNS = [1, 2, 3, 4, 5, 6, 7, 8];

const SelectionBoard = ({ playerKey, step, setStep }) => {

  const dispatch = useDispatch();

  const [ships, setShips] = useState(SHIPS); // Store ship data in state.
  const [selectedShip, setSelectedShip] = useState(null); // Selected ship by player from ship list.
  const [rotation, setRotation] = useState("horizontal"); // Is the ship Horizontal or Vertical?
  const [currentColumn, setCurrentColumn] = useState(null); // Which column does the mouse stand on?(onMouseOver).
  const [currentRow, setCurrentRow] = useState(null); // Which rows does the mouse stand on.(onMouseOver).
  const [colored, setColored] = useState([]); // Information of the boxes in which the ships are placed ([A1, A2, A3, A4, A5, A6, A7, A8]).
  const [error, setError] = useState(false); // Error when trying to put a ship outside the area.

  // Set the ship selected from the list in state.(onClick).
  const selectShip = (item) => {
    setSelectedShip(item);
  };
  // Return the selected ship type.
  const rotateShip = () => {
    setRotation(rotation === "horizontal" ? "vertical" : "horizontal");
  };

  // Take the row and column information the mouse is hovering over. Docking the ship is done.( Board mouseOver).
  // Place the ship starting from the point where the mouse is. Either vertical or horizontal.
  const mouseOver = (selectedRow, selectedColumn) => {
    if (selectedShip) { // Only works when there is a selected ship.
      if (rotation === "horizontal") {
        const coords = [selectedColumn]; // Added the mouse-over-column to the array.
        const index = COLUMNS.indexOf(selectedColumn); // Find column index where mouse is hovering over.

        for (let i = index + 1; i < selectedShip?.size + index; i++) { // Returns -1 of the selected ship's length.
          coords.push(COLUMNS[i]); // Push the columns which are next to hovering one.
        }

        setCurrentColumn(coords);  // Pass the information of the column where the selected ship is placed to the state.
        setCurrentRow([selectedRow]); // Pass the information of the row where the selected ship is placed to the state.
      } else {
        const coords = [selectedRow];
        const index = ROWS.indexOf(selectedRow);

        for (let i = index + 1; i < selectedShip?.size + index; i++) {
          coords.push(ROWS[i]);
        }

        setCurrentRow(coords);
        setCurrentColumn([selectedColumn]);
      }
    }
  };
  // Function used to dock the ship. It works when clicking the selected square. (onClick).
  const applyShip = () => {
    if (currentColumn.includes(undefined) || currentRow.includes(undefined) || (rotation === 'horizontal' ? currentColumn.some((item) => colored.includes(currentRow[0] + item)) : currentRow.some((item) => colored.includes(item + currentColumn[0])))) { //Geminin board'a sığmadığı durumlar için kullanılır.
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 300);
    }
    if (
      selectedShip &&
      !currentColumn.includes(undefined) &&
      !currentRow.includes(undefined) &&
      (rotation === 'horizontal' ? currentColumn.every((item) => !colored.includes(currentRow[0] + item)) : currentRow.every((item) => !colored.includes(item + currentColumn[0])))
    ) {  // Work if the ship is suitable for docking.
      const _selectedShip = {
        ...selectedShip,
        apply: true
      }; // Make apply true because the ship is placed.

      setShips([
        ...ships.filter((item) => item.name !== selectedShip.name),
        _selectedShip
      ]); // Update our ship list.
      setSelectedShip(null); // Set null because we don't have any ships to choose from.

      // Keep the placed coordinate by combining rows and columns.
      const result = [];
      if (rotation === "horizontal") {
        currentColumn.map((item) => result.push(currentRow[0] + item));
      } else {
        currentRow.map((item) => result.push(item + currentColumn[0]));
      }
      setColored([...colored, ...result]);

    }
  };

  useEffect(() => { // Are all ships used or not?
    const isAllSelected = ships.every((item) => item.apply === true);

    if (isAllSelected) { // If all the ships are used, save to storage.
      if (playerKey === 'playerOneShips') {
        dispatch(setPlayerOneShips(colored));
      } else {
        dispatch(setPlayerTwoShips(colored));
      }
    }

  }, [ships]);

  return (
    <div className="selection-container">
      {ships.map((item) => (
        <div key={item.name}>
          <button className="ships-button"
            disabled={item.apply ? true : false}
            style={{
              opacity: item.apply ? 0.2 : 1,
              cursor: item.apply ? "not-allowed" : 'pointer',
            }}
            onClick={() => selectShip(item)}>{item.name}
          </button>
          - Size:
          {item.size}
        </div>
      ))}

      {ships.some((item) => item.apply === false) && <button onClick={rotateShip}>Rotate</button>}
      <div className="columns-number-container">
        {COLUMNS.map((column) => <div className="columns-number" key={column}>{column}</div>)}</div>
      {ROWS.map((row) => (
        <div className="row-letter-container"
          key={row}>
          <span className="row-letter">
            {row}
          </span>
          {COLUMNS.map((column) => {
            return (
              <div className="columns-square"
                style={{
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

      {ships.every((item) => item.apply === true) && <button onClick={() => setStep(step + 1)}>
        &#10132;</button>}
    </div>
  );
};

export default SelectionBoard;