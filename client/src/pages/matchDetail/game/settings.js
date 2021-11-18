import React from "react";
import {
    Button,
    Slider,
    TextField,
    Typography
} from "@material-ui/core";
import { useState } from "react";

function Page({ matchId, currentTurn, turnData, turns = {} }) {
    const [sliderVal, setSliderVal] = useState(currentTurn);
    return (
        <div className="column">
            <Typography variant="h6" align="center" color="primary">Game</Typography>
            <Slider
                className="slider"
                step={1}
                value={sliderVal}
                onChange={(evnt, newValue) => setSliderVal(newValue)}
                valueLabelDisplay={sliderVal === currentTurn ? "on" : "auto"}
                marks={Object.keys(turns).map(value => ({ label: parseInt(value) === currentTurn ? 'Atual' : value, value }))}
                max={10}
                min={1}
            />
            <div className="buttons-container">
                <Button variant="outlined" color="primary">Finalizar Apostas</Button>
                <Button variant="outlined" color="primary">Proxima Rodada</Button>
            </div>
        </div>
    )
}
export default Page;