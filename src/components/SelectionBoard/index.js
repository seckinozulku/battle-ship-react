import { useEffect, useState } from "react";
import './index.css'
import { useDispatch } from 'react-redux'
import { setPlayerOneShips , setPlayerTwoShips } from '../../Redux/slice'

const SHIPS = [
  { name: "Carries", size: 5, apply: false },
  { name: "Battleship", size: 4, apply: false },
  { name: "Cruiser", size: 3, apply: false },
  { name: "Submarine", size: 3, apply: false },
  { name: "Destroyer", size: 2, apply: false }
];

const ROWS = ["A", "B", "C", "D", "E", "F", "G", "H"];
const COLUMNS = [1, 2, 3, 4, 5, 6, 7, 8];

const SelectionBoard = ({ playerKey, step, setStep }) => {

  const dispatch = useDispatch();

  const [ships, setShips] = useState(SHIPS); //Elimizdeki Gemilerin Datasını State'te tutuyoruz.
  const [selectedShip, setSelectedShip] = useState(null); //Kullanıcı Listeden Seçtiği Gemi.
  const [rotation, setRotation] = useState("horizontal"); // Gemi Yatay mı Dikey mi?
  const [currentColumn, setCurrentColumn] = useState(null); //Mouse'un Hangi Kolonun Üstünde Durduğu.(onMouseOver)
  const [currentRow, setCurrentRow] = useState(null); //Mouse'un Hangi Satırın Üstünde Durduğu.(onMouseOver)
  const [colored, setColored] = useState([]); //Gemilerin Yerleştiği Kutuların Bilgisi (Örneğin [A1, A2, A3, A4, A5, A6, A7, A8])
  const [error, setError] = useState(false); // Alanın dışına gemi konulmaya çalıştığında alınan hata.

  //Listeden seçilen gemiyi state'te tutar.(onClick)
  const selectShip = (item) => {
    setSelectedShip(item);
  };
  //Seçilen gemi tipini döndürür.
  const rotateShip = () => {
    setRotation(rotation === "horizontal" ? "vertical" : "horizontal");
  };

  // Mouse'un üstünde durduğu row ve col bilgisini alır. Gemiyi yerleştirme işlemi yapılır.( Board mouseOver)
  // Mouse'ın olduğu noktadan başlayarak gemiyi yerleştirir. Ya dikey yada yatay.
  const mouseOver = (selectedRow, selectedColumn) => {
    if (selectedShip) { //Sadece seçilen bir gemi olduğunda çalışır.
      if (rotation === "horizontal") { 
        const coords = [selectedColumn]; // Mouse'ın üstünde durduğu kolon array'e eklendi.
        const index = COLUMNS.indexOf(selectedColumn); //Mouse'ın üstünde durduğu kolonun indexi bulunuyor.

        for (let i = index + 1; i < selectedShip?.size + index; i++) { //Seçilen geminin uzunluğunun -1'i  kadar döner.
          coords.push(COLUMNS[i]); //Yan tarafındaki kolonları arrayin içine pushluyoruz.
        }

        setCurrentColumn(coords);  // Seçilen geminin yerleştirildiği kolonun bilgisini state'e atıyoruz.
        setCurrentRow([selectedRow]); // Seçilen geminin yerleştirildiği satır bilgisini state'e atıyoruz.
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
 //Gemiyi yerleştirmek için kullanılan fonksiyon. Seçilen kareye tıklandığında çalışır. (onClick).
  const applyShip = () => {
    if (currentColumn.includes(undefined) || currentRow.includes(undefined) || (rotation === 'horizontal' ? currentColumn.some((item) => colored.includes(currentRow[0] + item)) : currentRow.some((item) => colored.includes(item + currentColumn[0]))))  { //Geminin board'a sığmadığı durumlar için kullanılır.
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 300);
    }
    console.log(colored, currentRow, currentColumn);
    if (
      selectedShip &&
      !currentColumn.includes(undefined) &&
      !currentRow.includes(undefined) &&
      (rotation === 'horizontal' ? currentColumn.every((item) => !colored.includes(currentRow[0] + item)) : currentRow.every((item) => !colored.includes(item + currentColumn[0])))
    ) {  //Gemi yerleştirilmeye uygunsa çalışır.
      const _selectedShip = {
        ...selectedShip,
        apply: true
      }; //Gemi yerleştirildiği için apply değerini true yapar.

      setShips([ 
        ...ships.filter((item) => item.name !== selectedShip.name), 
        _selectedShip
      ]); // Elimizdeki gemi listesini günceller.
      setSelectedShip(null); // Elimizde seçili gemi kalmadığı için null'a çekiyoruz.

      //Yerleştirilen koordinatı satır ve kolon birleştirerek tutar.
      const result = [];
      if (rotation === "horizontal") {
        currentColumn.map((item) => result.push(currentRow[0] + item));
      } else {
        currentRow.map((item) => result.push(item + currentColumn[0]));
      }
      setColored([...colored, ...result]);
     
    }
  };

  useEffect(() => { //Bütün gemiler kullanıldı mı kullanılmadı mı
    const isAllSelected = ships.every((item) => item.apply === true);

    if (isAllSelected) { // Tüm değerler kullanıldıysa storage'e kaydeder.
      if(playerKey === 'playerOneShips') {
       dispatch(setPlayerOneShips(colored)) ;
      }else {
        dispatch(setPlayerTwoShips(colored));
      }
    }

  }, [ships]);

  return (
    <div style={{display:'inline-block'}}>
      {ships.map((item) => (
        <div key={item.name}>
          <button className="shipsButton"
          disabled={item.apply ? true : false}
          style={{ opacity: item.apply ? 0.2 : 1, cursor: item.apply ? "not-allowed" : 'pointer' }}
          onClick={() => selectShip(item)}>{item.name}
          </button>
          - Size:
          {item.size}
        </div>
      ))}

      {ships.some((item) => item.apply === false) && <button onClick={rotateShip}>Rotate</button>}

      {ROWS.map((row) => (
        <div
          key={row}
          style={{
            display: "flex"
          }}
        >
          {COLUMNS.map((column) => {
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
      
      {ships.every((item) => item.apply === true) && <button onClick={() => setStep(step + 1)}>
        &#10132;</button>}
    </div>
  );
};

export default SelectionBoard;