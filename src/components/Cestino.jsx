
const Cestino = ({cestino}) => {
    const {name, percentage, profit, total} = cestino
  return (
    <>
        <div>{name}</div>
        <div>{percentage}</div>
        <div>{profit}</div>
        <div>{total}</div>
    </>
  )
}

export default Cestino