import React from "react"
import ReactDOM from "react-dom/client"
import WebSocketComponent from "../component/WebSocketComponent"
const App=()=>{
    return(
        <div>
            <h1>test</h1>
            <WebSocketComponent/>
        </div>
    )
}
const root=ReactDOM.createRoot(document.getElementById("root"))
root.render(<App/>)