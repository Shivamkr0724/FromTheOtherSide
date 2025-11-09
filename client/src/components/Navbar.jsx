import { Link } from 'react-router-dom'
import candleLogo from '../assets/candle-logo.png'
const Navbar = () => {
  return (
    <div>
         <Link to="/">
            <img className='w-[6vw] max-w-10 ml-7 mt-4 opacity-70 ' src={candleLogo} />
         </Link>
         
       <div className="flex justify-end mr-6 gap-3 relative bottom-10 underline cursor-pointer">
        <Link
          to="/"
          className="hover:text-blue-400 transition-colors duration-200"
        >
          Home
        </Link>

        <Link
          to="/read"
          className="hover:text-blue-400 transition-colors duration-200"
        >
          Read
        </Link>

        <Link
          to="/upload"
          className="hover:text-blue-400 transition-colors duration-200"
        >
          Upload
        </Link>
      </div>
    </div>
  )
}

export default Navbar