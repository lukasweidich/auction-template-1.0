import React from "react"
import Header from "./Header"
import Footer from "./Footer"

const StyledPage = props => {
    return (
        <div >
            <Header />
            <div style={{ paddingTop: "69px" }}>
                {props.children}
            </div>
            <div style={{ zIndex: 98, position: "fixed", bottom: 0 }}>
                <Footer />
            </div>
        </div>
    )
}

export default StyledPage;