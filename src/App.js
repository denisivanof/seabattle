import {Routes, Route} from "react-router-dom";
import MainPage from "./pages/MainPage";
import EditorPage from "./pages/EditorPage";
import BotPage from "./pages/BotPage";

const App = () => {
  return (
      <Routes >
        <Route path='/' element={<MainPage/>}/>
        <Route path='/editor' element={<EditorPage/>}/>
        <Route path='/bot' element={<BotPage/>}/>
      </Routes>
  )
}
export default App
