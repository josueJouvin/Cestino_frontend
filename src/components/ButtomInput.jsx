
const ButtomInput = ({type = "submit", value}) => {
  return (
    <input
            type={type}
            value={value}
            className="bg-lime-600 w-full px-10 py-3 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-lime-700 transition-colors md:w-auto"
          />
  )
}

export default ButtomInput