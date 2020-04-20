import React from "react"
import Header from "./Header"
import Footer from "./Footer"

const StyledPage = props => {
    return (
        <div {...props}>
            <Header />
            <div style={{ paddingTop: "64px", paddingBottom: "24.3px" }}>
                {props.children}
            </div>
            <div style={{ zIndex: 999, position: "fixed", bottom: 0 }}>
                <Footer style={{ marginTop: "40px" }} />
            </div>
        </div>
    )
}

export default StyledPage;