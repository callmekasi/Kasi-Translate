async function fetchAcronymsList() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/callmekasi/Kasi-Translate/main/assets/misc/acronyms.txt');
        const data = await response.text();
        return data;
    } catch (error) {
        console.error('Error fetching acronyms list:', error);
        return '';
    }
}

async function translateAndDisplay() {
    const inputText = document.getElementById('translateMessage').value;
    const acronymsList = await fetchAcronymsList();

    const translationMap = {};
    acronymsList.split('\n').forEach(line => {
        const [acronym, meaning] = line.split('=');
        if (acronym && meaning) {
            translationMap[acronym.trim().toLowerCase()] = meaning.trim();
        }
    });

    const words = inputText.match(/\w+|[^\w\s]/g);
    const translatedWords = words.map(word => translationMap[word.toLowerCase()] || word);

    const translatedPhrase = translatedWords.join(' ');
    document.getElementById('translatedResult').innerText = translatedPhrase;
}

async function translateAcronyms(inputString) {
    const acronymsList = await fetchAcronymsList();

    const translationMap = {};
    acronymsList.split('\n').forEach(line => {
        const [acronym, meaning] = line.split('=');
        if (acronym && meaning) {
            translationMap[acronym.trim().toLowerCase()] = meaning.trim();
        }
    });

    const words = inputString.match(/\w+|[^\w\s]/g);
    const translatedWords = words.map(word => translationMap[word.toLowerCase()] || word);

    const translatedPhrase = translatedWords.join(' ');

    return translatedPhrase;
}