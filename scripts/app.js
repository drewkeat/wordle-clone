import GuessBox from "./Components/GuessBox.js";
import Keyboard from "./Components/Keyboard.js";
import { startNewRound } from "./globals.js";

$(".navbar button").click((e) => alert(`${e.target.parentNode?.id} clicked`));

startNewRound();
