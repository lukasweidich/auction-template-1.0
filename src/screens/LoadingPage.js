import React from 'react'
import StyledPage from "../components/StyledPage"
const { CircularProgress } = require('@material-ui/core');

const LoadingPage = (props) => {
    return (
        <StyledPage>
            <div style={{ marginTop: "-99px", height: "100vh", backgroundColor: "#e8e8eb", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                <CircularProgress></CircularProgress>
            </div>
        </StyledPage>
    )
}

export default LoadingPage 