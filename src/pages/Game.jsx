import { useState, useEffect } from "react";
import Board from "../components/Board";
import WinnersBoard from "../components/WinnersBoard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";

export default function Game() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null), coordinates: { row: null, col: null } }]);
  const [currentMove, setCurrentMove] = useState(0);
  const [orden, setOrden] = useState("ascendente");
  const [winners, setWinners] = useState([]);
  const navigate = useNavigate();

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove].squares;

  useEffect(() => {
    const t = localStorage.getItem("jwt-token");
    if (!t) {
      navigate("/login");
    } else {
      const getWinners = async () => {
        try{        
          const response = await axios.get("https://service-backend-tic-tac-toe.onrender.com/api/v1/winners", {
          headers: {
            Authorization: `Bearer ${t}`,
          },
        });
        setWinners(response.data.data);
        }catch (error){
          console.log(error);
        }
      };
      getWinners();
    }
  }, [navigate]);

  const handleWinner = async (w) => {
    const winner = {
      name: w,
    };
    try {
      const t = localStorage.getItem("jwt-token");
      const current_winner = await axios.post("https://service-backend-tic-tac-toe.onrender.com/api/v1/winners", winner, {
        headers: {
          Authorization: `Bearer ${t}`,
        },
      });
      setWinners([...winners, current_winner.data.data]);
    } catch (error) {
      console.log(error);
    }
  };

  function handleSortMoves() {
    if (orden === "ascendente") {
      setOrden("descendente");
    } else {
      setOrden("ascendente");
    }
  }

  function handlePlay(nextSquares) {
    const nextHistory = history.slice(0, currentMove + 1);
    nextHistory.push(nextSquares);
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function handleLogout() {
    localStorage.clear();
    navigate("/login");
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;

    if (move > 0) {
      description = `Ir hacia la jugada # ${move} en la posición (${squares.coordinates.row},${squares.coordinates.col})`;
    } else {
      description = "Ir al inicio del juego";
    }

    let element = <button onClick={() => jumpTo(move)}>{description}</button>;
    if (move === currentMove) {
      element = <span>{"Estás en el movimiento # " + currentMove}</span>;
    }
    return <li key={move}>{element}</li>;
  });

  if (orden === "descendente") {
    moves.reverse();
  }

  return (
    <>
      <Navbar bg="light" variant="light">
        <Container>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="" onClick={handleLogout}>
              Logout
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <div className="game pt-5">
        <div className="game-board">
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} onWinner={handleWinner} />
        </div>
        <div className="game-info">
          <button onClick={handleSortMoves}>{orden === "ascendente" ? "Ordenar Descendentemente" : "Ordenar Ascendentemente"}</button>
          <ol>{moves}</ol>
        </div>
        <div className="game-info">
          <WinnersBoard winners={winners} />
        </div>
      </div>
    </>
  );
}
