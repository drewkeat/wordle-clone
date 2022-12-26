const template =  document.createElement('template')

const style = `
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	width: 100%;
	border: 1px solid grey;
	`

template.innerHTML = `
  <style>
	.guess-box {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		width: 100%;
		border: 1px solid grey;
	}
	h1 {
		margin-top: 0;
  	margin-bottom: 0;
  	font-weight: 500;
  	line-height: 1.2;
		font-size: calc(1.375rem + 1.5vw);
	}
	</style>
	<div class="guess-box">
		<h1></h1>
	</div>
`

const updateLetter=(ele)=>{	ele.shadowRoot.querySelector('h1').textContent = ele.getAttribute('letter')
}

class GuessBox extends HTMLElement{
	 static get observedAttributes() {
    return ['letter'];
  }
	constructor(){
		super()
		this.attachShadow({mode: "open"})
	this.shadowRoot.appendChild(template.content.cloneNode(true))
	this.shadowRoot.querySelector('h1').innerText = this.getAttribute('letter')
	
		this.addEventListener('click', e => {
			let current = $('guess-box.active')
			switch (true) {
				case this.parentNode.classList.contains('active'): 
					current.removeClass('active')
					this.classList.add('active')
					break;
				default:
				  null
			}
		})
	}
	
	connectedCallback(){
	}
	
	attributeChangedCallback(){
		updateLetter(this)
	}
}

customElements.define('guess-box', GuessBox)

export default GuessBox