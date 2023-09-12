import useCestino from "../hooks/useCestino";

const GridCestini = ({children}) => {
  const { cestini } = useCestino()

  return (
    <div className={`grid ${cestini.length > 1 ? "grid-cols-responsive w-[90%] xl:w-[85%]": "w-[90%] md:w-[26rem]"} gap-8 md:mt-6 lg:mb-5`}>
        {children}
    </div>
  )
}

export default GridCestini