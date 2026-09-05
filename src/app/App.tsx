import MainProvider from "./providers/MainProvider"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
        <MainProvider/>
        <ToastContainer position="bottom-right" autoClose={3000} />
        
    </div>
  )
}

export default App