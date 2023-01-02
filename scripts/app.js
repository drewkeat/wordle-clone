import GuessBox from "./Components/GuessBox.js";
import Keyboard from "./Components/Keyboard.js"
import {startNewRound, fillGuessBoxContainer, setActiveBox, setActiveRow, checkGuess, handleKeyClick} from "./globals.js"

$(".navbar button").click((e) => alert(`${e.target.parentNode?.id} clicked`));

startNewRound()