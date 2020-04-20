/*@author: Utsav Trivedi*/
import React from "react";
import {Button} from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import "./MarketPlace.css";


//@ref https://www.w3schools.com/colors/colors_names.asp
const themeCost = {

    blue: 100,
    green: 200,
    gray: 300,
    magenta: 100,
    purple: 200,
    crimson: 300,
    black: 400,
    red: 500,
    darkSeaGreen: 600,
    antiqueWhite:700,
    darkKhaki:800,
    darkSlateBlue:900

}

const MarketPlace = props => {
    /**
     * @detail Returns theme colour and cost in JSON to SettingsPage onClick.
     *         TODO: Add lock/unlock
     */

    return (
    
            <div>
                
                <div className="market-content-box">

                    <div className="theme-content-box">
                    
                        <ThemeProvider>
                            <Button value={JSON.stringify({colour: "blue", cost: themeCost.blue})} onClick={event => props.handleThemeClick(event.target.value)} id="color-palette" style={{ backgroundColor: "#3700b3" }} />
                        </ThemeProvider>
                        <h2 style={{textAlign:"right"}}>Cost: {themeCost.blue}</h2>
                        
                    </div>

                    <div className="theme-content-box">
                    
                        <ThemeProvider>
                            <Button value={JSON.stringify({colour: "green", cost: themeCost.green})} onClick={event => props.handleThemeClick(event.target.value)} id="color-palette" style={{ backgroundColor: "#2e7d32" }} />
                        </ThemeProvider>
                        <h2 style={{textAlign:"right"}}>Cost: {themeCost.green}</h2>
                        
                    </div>

                    <div className="theme-content-box">
                    
                        <ThemeProvider>
                            <Button value={JSON.stringify({colour: "gray", cost: themeCost.gray})} onClick={event => props.handleThemeClick(event.target.value)} id="color-palette" style={{ backgroundColor: "gray" }} />
                        </ThemeProvider>
                        <h2 style={{textAlign:"right"}}>Cost: {themeCost.gray}</h2>
                        
                    </div>

                    

                    <div className="theme-content-box">
                    
                        <ThemeProvider>
                            <Button value={JSON.stringify({colour: "magenta", cost: themeCost.magenta})} onClick={event => props.handleThemeClick(event.target.value)} id="color-palette" style={{ backgroundColor: "magenta" }} />
                        </ThemeProvider>
                        <h2 style={{textAlign:"right"}}>Cost: {themeCost.magenta}</h2>
                        
                    </div>

                    <br></br>

                    <div className="theme-content-box">

                    <ThemeProvider>
                            <Button value={JSON.stringify({colour: "purple", cost: themeCost.purple})} onClick={event => props.handleThemeClick(event.target.value)} id="color-palette" style={{ backgroundColor: "purple" }} />
                    </ThemeProvider>
                    <h2 style={{textAlign:"right"}}>Cost: {themeCost.purple}</h2>


                    </div>

                    <div className="theme-content-box">

                    <ThemeProvider>
                            <Button value={JSON.stringify({colour: "crimson", cost: themeCost.crimson})} onClick={event => props.handleThemeClick(event.target.value)} id="color-palette" style={{ backgroundColor: "crimson" }} />
                    </ThemeProvider>
                    <h2 style={{textAlign:"right"}}>Cost: {themeCost.crimson}</h2>


                    </div>

                    <div className="theme-content-box">

                    <ThemeProvider>
                            <Button value={JSON.stringify({colour: "red", cost: themeCost.red})} onClick={event => props.handleThemeClick(event.target.value)} id="color-palette" style={{ backgroundColor: "red" }} />
                    </ThemeProvider>
                    <h2 style={{textAlign:"right"}}>Cost: {themeCost.red}</h2>


                    </div>

                    

                    <div className="theme-content-box">

                    <ThemeProvider>
                            <Button value={JSON.stringify({colour: "black", cost: themeCost.black})} onClick={event => props.handleThemeClick(event.target.value)} id="color-palette" style={{ backgroundColor: "black" }} />
                    </ThemeProvider>
                    <h2 style={{textAlign:"right"}}>Cost: {themeCost.black}</h2>


                    </div>

                    <br></br>

                    <div className="theme-content-box">

                    <ThemeProvider>
                            <Button value={JSON.stringify({colour: "darkSeaGreen", cost: themeCost.darkSeaGreen})} onClick={event => props.handleThemeClick(event.target.value)} id="color-palette" style={{ backgroundColor: "DarkSeaGreen" }} />
                    </ThemeProvider>
                    <h2 style={{textAlign:"right"}}>Cost: {themeCost.darkSeaGreen}</h2>


                    </div>

                    <div className="theme-content-box">

                    <ThemeProvider>
                    <Button value={JSON.stringify({colour: "antiqueWhite", cost: themeCost.antiqueWhite})} onClick={event => props.handleThemeClick(event.target.value)} id="color-palette" style={{ backgroundColor: "AntiqueWhite" }} />
                    </ThemeProvider>
                    <h2 style={{textAlign:"right"}}>Cost: {themeCost.antiqueWhite}</h2>


                    </div>

                    <div className="theme-content-box">

                    <ThemeProvider>
                            <Button value={JSON.stringify({colour: "darkKhaki", cost: themeCost.darkKhaki})} onClick={event => props.handleThemeClick(event.target.value)} id="color-palette" style={{ backgroundColor: "DarkKhaki" }} />
                    </ThemeProvider>
                    <h2 style={{textAlign:"right"}}>Cost: {themeCost.darkKhaki}</h2>


                    </div>

                    <div className="theme-content-box">

                    <ThemeProvider>
                            <Button value={JSON.stringify({colour: "darkSlateBlue", cost: themeCost.darkSlateBlue})} onClick={event => props.handleThemeClick(event.target.value)} id="color-palette" style={{ backgroundColor: "DarkSlateBlue" }} />
                    </ThemeProvider>
                    <h2 style={{textAlign:"right"}}>Cost: {themeCost.darkSlateBlue}</h2>
                    </div>

                </div>
            </div>
      
    );
};

export default MarketPlace;
