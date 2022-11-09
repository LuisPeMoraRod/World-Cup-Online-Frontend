import { Outlet } from "react-router-dom";

const LayoutNew = () => {
    return(
        <main className="App">
            <Outlet/>
        </main>
    )
}

export default LayoutNew;