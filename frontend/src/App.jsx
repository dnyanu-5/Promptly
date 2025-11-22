import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";
import { MyContext } from "./MyContext"
import './App.css'
function App() {
  const ProviderValues = {};
  return (
    <div className="app">
      <MyContext.Provider values={ProviderValues}>
        <Sidebar></Sidebar>
        <ChatWindow></ChatWindow>
      </MyContext.Provider>
    </div>
  )
}

export default App;
