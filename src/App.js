import React from "react"
import ReactDOM from "react-dom/client"
import WebSocketComponent from "../component/WebSocketComponent"
import Header from "../component/Header"
import Footer from "../component/Footer"
const App=()=>{
    return(
        <div>
            <Header/>
            <WebSocketComponent/>
            <Footer/>
        </div>
    )
}
const root=ReactDOM.createRoot(document.getElementById("root"))
root.render(<App/>)