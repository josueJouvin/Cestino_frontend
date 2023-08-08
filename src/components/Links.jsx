import { Link } from "react-router-dom"
const Links = ({children}) => {
  return (
    <Link className="flex gap-2 items-center px-2 py-3 rounded-md hover:bg-lime-700 transition-colors">
            {children}
    </Link>
  )
}

export default Links