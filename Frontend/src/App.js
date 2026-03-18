import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const colors = {
  X: "red",
  O: "blue"
};

const socket = io("http://localhost:5000");

function App() {

  const [board, setBoard] = useState(Array(9).fill(""));
  const [player, setPlayer] = useState("X");

  useEffect(() => {

    socket.on("boardUpdate", (newBoard) => {
      setBoard(newBoard);
  });

}, []);

  const handleClick = (index) => {

  socket.emit("makeMove", index);

};

  const checkWinner = () => {

    const patterns = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6]
    ];

    for(let pattern of patterns){

      const [a,b,c] = pattern;

      if(board[a] && board[a] === board[b] && board[a] === board[c]){
        return board[a];
      }

    }

    return null;
  };

  const winner = checkWinner();

  return (
    <div style={{textAlign:"center"}}>

      <h1>Tic Tac Toe</h1>

      {winner && <h2>Winner: Player {winner}</h2>}

      <div style={{
        display:"grid",
        gridTemplateColumns:"repeat(3,100px)",
        gap:"10px",
        justifyContent:"center"
      }}>

        {board.map((cell,index)=>(
          <button
            key={index}
            onClick={()=>handleClick(index)}
            style={{
              width:"100px",
              height:"100px",
              fontSize:"30px",
              color: colors[cell]
            }}
          >
            {cell}
          </button>
        ))}

      </div>

    </div>
  );
}

export default App;
