const textInput = document.getElementById('text-input');
const charCount = document.getElementById('char-count');
const wordCount = document.getElementById('word-count');
const sentenceCount = document.getElementById('sentence-count');
const paragraphCount = document.getElementById('paragraph-count');
const spaceCount = document.getElementById('space-count');
const punctuationCount = document.getElementById('punctuation-count');
const numberCount = document.getElementById('number-count');
const linkCount = document.getElementById('link-count');
const upperCount = document.getElementById('upper-count');
const lowerCount = document.getElementById('lower-count');
const readability = document.getElementById('readability');

textInput.addEventListener('input', () => {
	const text = textInput.value;

	charCount.textContent = text.length;
	const words = text.trim().split(/\s+/).filter(Boolean);
	wordCount.textContent = words.length;
	const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
	sentenceCount.textContent = sentences.length;
	const paragraphs = text.split(/\n+/).filter(p => p.trim().length > 0);
	paragraphCount.textContent = paragraphs.length;
	spaceCount.textContent = (text.match(/ /g) || []).length;
	punctuationCount.textContent = (text.match(/[.,!?;:–—'"(){}[\]]/g) || []).length;
	numberCount.textContent = (text.match(/\d/g) || []).length;
	linkCount.textContent = (text.match(/https?:\/\/\S+|www\.\S+|\S+@\S+\.\S+/g) || []).length;
	upperCount.textContent = (text.match(/[A-Z]/g) || []).length;
	lowerCount.textContent = (text.match(/[a-z]/g) || []).length;

	const totalWords = words.length || 1;
	const totalSentences = sentences.length || 1;
	const totalSyllables = words.reduce((sum, word) => {
		const sylls = word.toLowerCase().match(/[aeiouy]/g);
		return sum + (sylls ? sylls.length : 1);
	}, 0);
	const flesch = Math.round(206.835 - 1.015 * (totalWords / totalSentences) - 84.6 * (totalSyllables / totalWords));
	readability.textContent = flesch;
});