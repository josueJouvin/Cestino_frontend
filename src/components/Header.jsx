import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth";

const Header = () => {
  const { auth } = useAuth();

  return (
    <header className="lg:static py-16">
        <Link to="/admin" className="container mx-auto">
            <h1 className="font-bold text-3xl text-white text-center overflow-hidden">{auth.companyName ? auth.companyName : "Cestino"}</h1>
        </Link>
    </header>
  )
}

export default Header