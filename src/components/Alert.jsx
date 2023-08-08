
const Alert = ({alert}) => {

  return (
    <div className={`${alert.error || alert.mod ? "from-red-500 to-red-700" : "from-green-500 to-green-700"} bg-gradient-to-br text-center p-3 rounded-xl uppercase text-white font-bold mb-6 whitespace-pre-line`}>{alert.msg}</div>
  )
}

export default Alert