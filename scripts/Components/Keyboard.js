const template = `
  <div id="keyboard-row-1"></div>
  <div id="keyboard-row-2" class="container"></div>
  <div id="keyboard-row-3">
`

class Keyboard extends HTMLElement {
	constructor(){
		super()
		this.attachShadow({mode: "open"})
	this.shadowRoot.appendChild(template.content.cloneNode(true))
	
	// 	let keyboardKeys = "QWERTYUIOPASDFGHJKLZXCVBNM".split("");
	// keyboardKeys.push("DELETE");
	// keyboardKeys.splice(19, 0, "ENTER");
	
	// 	let keyEle = $("<input class='key' type='button'></input>");
		
	// 	keyEle.click((e) => {
	// 	  handleKeyClick(e);
	// 		$(e.target).removeClass('clicked')
	// 	});
		
	// 	keyboardKeys.forEach((ele, i) => {
	// 	  let key = keyEle.clone(true);
	// 	  $(key).attr('value', ele)
	// 	  switch (true) {
	// 	    case i < 10:
	// 	      $("#keyboard-row-1").append(key);
	// 	      break;
	// 	    case i < 19:
	// 	      $("#keyboard-row-2").append(key);
	// 	      break;
	// 	    default:
	// 	      $("#keyboard-row-3").append(key);
	// 	  }
	// 		let enterKey = $(key).attr('value') === 'ENTER'
	// 	});
	
	}
}

customElements.define('keyboard-ele', Keyboard)

export default Keyboard