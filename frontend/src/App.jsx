
import './App.css'
import AddPost from './components/Home/AddPost'
import LeftBar from './components/LeftBar/LeftBar'
import Follows from './components/RIghtBar/FollowComponent/Follows'
import RightBar from './components/RIghtBar/RIghtBar'
import { Login, SignUp, Home } from "./index"
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <>
      <BrowserRouter>
        {/* <Login /> */}

        <div className='main-container'>
          <div className='component-container'>
            <LeftBar />
            <main>
              <Home />
            </main>
            
          </div>
        </div>
        
      </BrowserRouter>
    </>
  )
}

export default App
