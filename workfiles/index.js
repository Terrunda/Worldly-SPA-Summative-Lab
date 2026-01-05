const apiEndPoint = `https://api.dictionaryapi.dev/api/v2/entries/en/`
const wordForm = document.getElementById('word-form');

wordForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const wordInput = document.getElementById('word-input');
    const value = wordInput.value.trim();

    if (value) {
        handleFetch(value);
    };
});


async function handleFetch(wordInput) {
    const endPointAccess = `${apiEndPoint}${wordInput}`

    try {
        const response = await fetch(endPointAccess);
        if (!response.ok) {
            throw new Error('Word not found.')
        }
        const data = await response.json();
        handleData(data);
    } catch (error) {
        console.error(error.message);
        displayErrorMessage(error.message);
    };
};

function handleData(arrayOfObjectData) {
    const wordData = arrayOfObjectData[0];
    
    document.getElementById('word-definition-container').innerHTML = '';

    const divContainer = document.createElement('div');
    divContainer.id = "current-word-container"; 
    addElementTODOM('word-definition-container', divContainer);

    const wordString = wordData.word;
    const wordElement = document.createElement('h2');
    wordElement.textContent = wordString;
    addElementTODOM('current-word-container', wordElement);


    const singlePhonetic = wordData.phonetic;
    if (singlePhonetic) {
        const singlePhoneticElement = document.createElement('p');
        singlePhoneticElement.style.fontStyle = "italic";
        singlePhoneticElement.textContent = `Phonetic: ` + singlePhonetic;
        addElementTODOM('current-word-container', singlePhoneticElement);
    };


    for (let wordMeaning of wordData.meanings) {
        handleDefinitions(wordMeaning);
    };


    for (let phoneticElement of wordData.phonetics) {
        handlePhonetics(phoneticElement);
    };

    let wordDefinitionContainer = document.getElementById('word-definition-container');
    wordDefinitionContainer.style.border = "2px solid #333";
    wordDefinitionContainer.style.borderRadius = "5px";

};

// Used in handleData
function handleDefinitions(meaning) {

    const partOfSpeech = meaning.partOfSpeech; 
    
    const section = document.createElement('div');
    section.className = "meaning-section";
    
    const partOfSpeechHeader = document.createElement('h3');
    partOfSpeechHeader.textContent = partOfSpeech;
    section.appendChild(partOfSpeechHeader);

    const definitionsArray = meaning.definitions;
    if (definitionsArray.length == 0) {
        // Nothing happens here.
    } else {
        const ul = document.createElement('ul');
        
    
        definitionsArray.forEach((definitionItem) => {
            const li = document.createElement('li');
            li.textContent = definitionItem.definition;
            ul.appendChild(li);

            if (definitionItem.example) {
                const exampleText = document.createElement('p');
                exampleText.textContent = `Example: "${definitionItem.example}"`;
                li.appendChild(exampleText);
            }
        });
        section.appendChild(ul);
    };


    const synonymsArray = meaning.synonyms;
    if (synonymsArray.length == 0) {

    } else {
        const synonymElement = document.createElement('p');
        synonymElement.innerHTML = `Synonyms: ${synonymsArray.join(', ')}`; // Array as string
        section.appendChild(synonymElement);
    }

    const antonymsArray = meaning.antonyms;
    if (antonymsArray.length == 0) {

    } else {
        const antonymElement = document.createElement('p');
        antonymElement.innerHTML = `Antonyms: ${antonymsArray.join(', ')}`; // Array as string
        section.appendChild(antonymElement);
    }

    addElementTODOM('current-word-container', section);
};

function handlePhonetics(phoneticObject) {
    if (!phoneticObject) return;

    const audio = phoneticObject.audio;
    if (!audio || audio === '') {
    } else {
        const audioContainer = document.createElement('div');
        audioContainer.className = 'audio-container';

        // Audio tag
        const audioPlayer = document.createElement('audio');
        audioPlayer.controls = true;
        audioPlayer.src = audio;
        
        audioContainer.appendChild(audioPlayer);
        addElementTODOM('current-word-container', audioContainer);
    };
};

function displayErrorMessage(message) {
    const errorMessageElement = document.getElementById('error-message');
    errorMessageElement.textContent = message;
    errorMessageElement.style.display = 'block';
};

function addElementTODOM(parentElementID, elementtoAdd) {
    const parentElement = document.getElementById(`${parentElementID}`);
    parentElement.appendChild(elementtoAdd)

}

// End of functions used in handleData

/* A function should be created to handle the response data.
 For example, if the user searches a word that does not have a synonym, the placeholder element should respond with a `fallback message`.
 Such a message could be 'No synonyms available' */

 // Functionality to handle invalid inputs and empty search queries.