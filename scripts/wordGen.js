import { faker } from 'https://cdn.skypack.dev/@faker-js/faker';

const options = `
adjective
adverb
conjunction
interjection
noun
preposition
verb`.split(/\n/)

const type = options[(Math.floor(Math.random()*options.length))]

const randomWord = faker.word[type](5,5).toUpperCase()

export default randomWord