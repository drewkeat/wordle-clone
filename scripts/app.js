import GuessBox from "./Components/GuessBox.js"
import randomWord from "./wordGen.js"

const keyWord = randomWord.split('')
console.log(keyWord.join())

$(".navbar button").click(e=>alert(`${e.target.parentNode?.id} clicked`))

const fillGuessBoxContainer = () => {
	const container = $('#guess-box-container')
  for (var i = 0; i < 6; i++) {
		let guessRow = $(`
			<div class="guess-row row g-1"></div>
		`)
		for (var j = 0; j < 5; j++){
			guessRow.append('<guess-box class="col" letter=""></guess-box>')	
		}
		container.append(guessRow)
	}
	// $('.guess-row').first().addClass('active')
}

fillGuessBoxContainer()

const setActiveRow=()=>{
	const guessRows = $(".guess-row")
	let current = $(".guess-row.active")
	const currentIdx = guessRows.index(current)
	$(current).removeClass('active')
	current = guessRows.get(currentIdx+1)
	$(current).addClass('active')
}

setActiveRow()

const setActiveBox=(target)=>{
	const boxes = $('.guess-row.active guess-box')
	let current = $('guess-box.active')
	const currentIdx = boxes.index(current)
	switch (true) {
		case !!target || target === 0:
		  $(current).removeClass('active')
			current = target
			$(current).addClass('active')
			$(current).attr('letter','')
			break;
		case currentIdx >= boxes.length - 1:
		  null
		  break;
		default:
			$(current).index() < boxes.length ?
		  ($(current).removeClass('active'),
	 		current = boxes.get(currentIdx+1),
			$(current).addClass('active')) :
			null
			break;
	}
}

setActiveBox()

const checkGuess = () => {
	let boxes = $('.guess-row.active guess-box')
	boxes.each((i,b)=>{
		let letter = $(b).attr('letter')
		console.log($(b).attr('letter'), keyWord[i])
		switch (true) {
			case letter === keyWord[i]:
				$(b).addClass('correct')
				break
			case keyWord.includes(letter):
			  $(b).addClass('includes')
				break
			default:
			  null
		}
	})
	let correctCount = $('.guess-row.active guess-box.correct')
	correctCount.length === 5 ? alert('you win!') : null
}

let keyboardKeys = "QWERTYUIOPASDFGHJKLZXCVBNM".split('')
keyboardKeys.push("DELETE")
keyboardKeys.splice(19,0,"ENTER")

let keyEle = $("<div class='key'></div>")

const handleKeyClick = (e) => {
	let letter = e.target.innerText
	let activeBox = $('guess-box.active')
  let idx = activeBox.index()
	let prevBox = $('.active guess-box').get(idx-1)
	switch (true) {
		case letter==="ENTER": 
		  checkGuess()
		  setActiveRow();
			setActiveBox();
			break;
		case letter === "DELETE":
			!!$(activeBox).attr('letter') ?
			$(activeBox).attr('letter', '') :
			setActiveBox($(prevBox))
		  break;
		default:
			activeBox.attr('letter',letter)
			setActiveBox()
		  break;
	}
}

keyEle.click(e=>{
	handleKeyClick(e)
})

keyboardKeys.forEach((ele,i) => {
	let key = keyEle.clone(true)
	key.text(ele)
	switch(true){
		case i < 10:
			$('#keyboard-row-1').append(key)
			break;
		case i < 19: 
			$('#keyboard-row-2').append(key)
			break;
		default:
			$('#keyboard-row-3').append(key)
	}
})

