const apiEndPoint = `https://api.dictionaryapi.dev/api/v2/entries/en/`
const wordForm = document.getElementById('word-form');

wordForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const wordInput = document.getElementById('word-input');
    const value = wordInput.value.trim();

    /* if (value) {
        handleSubmit(value)
    }handleSubmit(value) */

    if (value) {
        handleFetch(value);
    };

});


async function handleFetch(wordInput) {
    const endPointAccess = `${apiEndPoint}${wordInput}`

    try {
        const response = await fetch(endPointAccess);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error.message);
    };
};


function handleSubmit(word) {
    const wordForm = document.getElementById('word-form');
};


function handleData(arrayOfObjectData) {
    const wordData = arrayOfObjectData[0];

    // Word string
    const wordString = wordData.word;

    //Word meanings
    for (let wordMeaning of wordData.meanings) {
        handleDefinitions(wordMeaning);
    };

    //Word phonetics
    for (let phoneticElement of wordData.phonetics) {
        handlePhonetics(phoneticElement);
    };

    const singlePhonetic = wordData.phonetic;
    
    if (!singlePhonetic) {

    };

    const licenseObject = {
        name: wordData.license.name,
        url: wordData.license.url
    };

    const ObjectSourceURL = wordData.sourceUrls[0];
};

function handleDefinitions(meaning) {
    const PartOfSpeech = meaning.PartOfSpeech;

    const definitionsArray  = meaning.definitions;
    //Check for definitionsArray 
    if (definitionsArray.length == 0) {

    } else {
        const wordUseExample = definitionsArray.example;
    };

    const synonymsArray = meaning.synonyms;
    // Check for synonymsArray
    if (synonymsArray.length == 0) {

    } else {

    };

    const anyonymsArray = meaning.antonyms;
    // Check for antonymsArray 
    if (anyonymsArray.length == 0) {

    } else {

    };
};

function handlePhonetics(phoneticObject) {
    const audio = phoneticObject.audio;
    // Checking for existence of audio key
    if (!audio) {

    } else {

    };

    const text = phoneticObject.text;
    if (!text) {

    } else {

    };

};

function displayErrorMessage() {
    const errorMessageElement = document.getElementById('error-message');
};

/* A function should be created to handle the response data.
 For example, if the user searches a word that does not have a synonym, the placeholder element should respond with a `fallback message`.
 Such a message could be 'No synonyms available' */

 // Functionality to handle invalid inputs and empty search queries.