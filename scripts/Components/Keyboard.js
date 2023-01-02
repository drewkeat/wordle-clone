import {startNewRound, fillGuessBoxContainer, setActiveBox, setActiveRow, checkGuess, handleKeyClick} from "../globals.js"

const template = document.createElement('template')

template.innerHTML = `
  <div id="keyboard-row-1"></div>
  <div id="keyboard-row-2" class="container"></div>
  <div id="keyboard-row-3">
`


class Keyboard extends HTMLElement {
	
	static get observedAttributes() {
    return ['key'];
  }
	
	constructor(){
		super()		
		this.attachShadow({mode: "open"})
	this.shadowRoot.appendChild(template.content.cloneNode(true))	
	
		this.render()
	
	}
	
	attributeChangedCallback(){
		this.keyWord = this.getAttribute('key')
	}
	
	render(){
		let keyboardKeys = "QWERTYUIOPASDFGHJKLZXCVBNM".split("");
	keyboardKeys.push("DELETE");
	keyboardKeys.splice(19, 0, "ENTER");
	
		let keyEle = $("<input class='key' type='button'></input>");
		
		keyEle.click((e) => {
		  handleKeyClick(e, this.keyWord);
		});
		
		keyboardKeys.forEach((ele, i) => {
		  let key = keyEle.clone(true);
		  $(key).attr('value', ele)
		  switch (true) {
		    case i < 10:
		      $("#keyboard-row-1").append(key);
		      break;
		    case i < 19:
		      $("#keyboard-row-2").append(key);
		      break;
		    default:
		      $("#keyboard-row-3").append(key);
		  }
			let enterKey = $(key).attr('value') === 'ENTER'
		});
	}
}

customElements.define('keyboard-ele', Keyboard)

export default Keyboard