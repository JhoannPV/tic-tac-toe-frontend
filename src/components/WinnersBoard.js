export default function WinnersBoard({ winners }) {
  const formatDate = (timestamp) => {
    const day = new Date(timestamp).getDate();
    const month = new Date(timestamp).getMonth() + 1;
    const year = new Date(timestamp).getFullYear();

    return `${day}/${month}/${year}`;
  };
  return (
    <>
      <h1>Ganadores</h1>
      <div>
        {winners.map((winner) => (
          <p key={winner.id}>
            <h2>
              Ganó {winner.nombre} el día {formatDate(winner.createdAt)}
            </h2>
          </p>
        ))}
      </div>
    </>
  );
}
