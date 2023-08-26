import { Link } from "react-router-dom"

const Header = () => {
  return (
    <header className="lg:static py-16">
        <Link to="/admin" className="container mx-auto">
            <h1 className="font-bold text-3xl text-white text-center">Un postre mas</h1>
        </Link>
    </header>
  )
}

export default Header