import { faker } from 'https://cdn.skypack.dev/@faker-js/faker';

const options = `
adjective
adverb
conjunction
interjection
noun
preposition
verb`.split(/\n/)

const type = options[_.random(options.length-1)]

const randomWord = faker.word[type](5,5).toUpperCase()

export default randomWord