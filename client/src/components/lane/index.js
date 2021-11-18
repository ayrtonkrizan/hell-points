import React from "react";
import { Link } from "react-router-dom";
import { LaneContainer } from "./styles";
import Typography from "@material-ui/core/Typography";

function Page({ title, children, link="#" }) {
    return (
        <LaneContainer>
            <div className="title-container">
                <Typography variant="h6" component="h1">{title}</Typography>
                <Link to={link}>
                    <Typography variant="caption" color="primary">Ver Tudo</Typography>
                </Link>
            </div>
            <ul>
                {children}
            </ul>
        </LaneContainer>
    )
}
export default Page;