import { Link } from "react-router-dom"

const RegisLoginLinks = ({urlLinkF, textLinkF = "¿No tienes una cuenta? Regístrate" , urlLinkS = "olvide-password", textLinkS = "Olvide mi Password"}) => {
  return (
    <nav className="mt-10 lg:flex lg:justify-between font-semibold ">
        <Link className="block text-center my-5 text-gray-600" to={`/auth/${urlLinkF}`}>{textLinkF}</Link>
        <Link className="block text-center my-5 text-gray-600" to={`/auth/${urlLinkS}`}>{textLinkS}</Link>
    </nav>
  )
}

export default RegisLoginLinks