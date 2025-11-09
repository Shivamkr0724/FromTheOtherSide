import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Read from "./pages/Read"
import Upload from "./pages/Upload"
import NotFound from "./pages/NotFound"

function App() {
  return (
    <Router>
      <div>
        {/* ✅ Navbar inside Router */}
        <Navbar />

        <main className="grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/read" element={<Read />} />
            <Route path="/upload" element={<Upload />} />
             <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
         <div className='flex justify-center'>
            <Footer />
        </div>
      
      </div>
    </Router>
  )
}

export default App
