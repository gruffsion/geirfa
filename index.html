let wordsMap = new Map();
const processedTranslations = new Set();
let loader = 0;
const paragraphs = document.querySelectorAll("p");
const headerElement = document.querySelector("header");


async function getEnlemmaFromLemma(wordsMap) {
    // Show the loader animation while the function is running
    loader.style.display = "block";
    fetchDataBtn.style.display = "none";  

    //make the api call. this currently points to data from Kaggle, but would be adapted to another library
    const url = "https://raw.githubusercontent.com/gruffsion/geiriadursyml/main/geiriadur.json";
    const response = await fetch(url);
    const data = await response.json();
    const results = {};
    wordsMap.forEach((wordData, word) => {
      const wordEntry = data[0].words.find(entry => entry.lemma.toLowerCase() === word.toLowerCase());
      const enlemma = wordEntry ? wordEntry.enlemma : data[0].words.find(entry => entry.surface?.toLowerCase() === word.toLowerCase())?.enlemma;
      if (enlemma) {
        results[wordData.id] = { enlemma };
      } else {
        results[wordData.id] = { enlemma: "" };
      }
    });
  
    // Hide the loader animation when done
    loader.style.display = "none";  
    fetchDataBtn.style.display = "block";
    fetchDataBtn.style.borderColor = "#3498db";
    return results;
  }
  


  // Create the floating dislpay with the translated word
  function createTooltip(text) {
    const tooltip = document.createElement('span');
    tooltip.innerHTML = text.replace(/_/g, ' '); // replace all underscores with spaces
    tooltip.classList.add('tooltip');
    return tooltip;
  }
  
  function showTooltip(event, tooltip) {
    tooltip.style.display = 'block';
    tooltip.style.left = `${event.pageX}px`;
    tooltip.style.top = `${event.pageY - tooltip.offsetHeight}px`;
  }
  
  function hideTooltip(tooltip) {
    tooltip.style.display = 'none';
  }



//scrape the page for text within any <p> elements
async function translateWordsInParagraphs(wordsMap) {
  const words = [];
  let wordId = 0;

  // wrap words in all paragraphs with a <span>
  for (const paragraph of paragraphs) {
    wrapWordsWithSpan(paragraph);
  }

  // scrape the page for text within any <p> elements
  for (const paragraph of paragraphs) {
    const paragraphWords = paragraph.textContent.trim().split(/\s+/);
    for (const word of paragraphWords) {
      const cleanedWord = word.replace(/"/g, ''); // Remove double quotation marks
      if (cleanedWord.length > 3) {
        wordsMap.set(cleanedWord, { id: wordId++ });
        words.push(cleanedWord);
      }
    }
  }

  const results = await getEnlemmaFromLemma(wordsMap);

  for (const word of words) {
    const { enlemma } = results[wordsMap.get(word).id];
    const elements = document.querySelectorAll(`p :not(.translate)[data-word="${word}"]`);

    // Check if the enlemma hasn't been processed before
    if (enlemma && !processedTranslations.has(enlemma)) {
      processedTranslations.add(enlemma); // Add enlemma to the set of processed translations

      for (const element of elements) {
        element.classList.add('translated'); // Add 'translated' class to the original word

        const tooltip = createTooltip(word + ": " + enlemma);
        document.body.appendChild(tooltip);

        element.addEventListener('click', event => {
          showTooltip(event, tooltip);
        });

        element.addEventListener('mouseleave', () => {
          hideTooltip(tooltip);
        });
      }
    }
  }
}


  function wrapWordsWithSpan(paragraph) {
    const words = paragraph.textContent.split(/\s+/);
    const wrappedWords = words.map(word => {
      const sanitizedWord = word.replace(/[^\w]/g, ''); // Remove any non-alphanumeric characters
      return `<span data-word="${sanitizedWord}">${word}</span>`;
    });
    paragraph.innerHTML = wrappedWords.join(' ');
  }
  


  function createGeurfaPlugin() {
    // Create the container div element
    const geurfaPluginDiv = document.createElement("div");
    geurfaPluginDiv.id = "geurfa-plugin";
  
    // Create the submit button element
    const submitButton = document.createElement("button");
    submitButton.id = "submit";
    submitButton.innerHTML = "Geurfa";
    submitButton.onclick = function() {
      translateWordsInParagraphs(wordsMap);
    };
  
    // Create the loader span element
    const loaderSpan = document.createElement("span");
    loaderSpan.classList.add("loader");
  
    // Append the button and span elements to the container div element
    geurfaPluginDiv.appendChild(submitButton);
    geurfaPluginDiv.appendChild(loaderSpan);
  
  
  
    // Return the container div element
    return geurfaPluginDiv;
  }

const geurfaPlugin = createGeurfaPlugin();
headerElement.appendChild(geurfaPlugin);

//global variables after plugin has been created
loader = document.querySelector(".loader");
const fetchDataBtn = document.getElementById("submit");

  // Add the CSS dynamically
    const style = document.createElement('style');
    style.innerHTML = `
  
      .translated {
        text-decoration: underline;
        text-decoration-color:  #3498db;
        cursor: pointer;
        position: relative; 
      }
    
      
      .tooltip {
        display: none;
        position: absolute;
        background-color: white;
        border: 1px solid red;
        padding: 5px;
        z-index: 9999;
        margin-top: -10px; 
      }
      
    
      button{
        border: 10px solid #e3e3e3; 
        border-radius: 50%;
        width: 80px;
        height: 80px;
        padding:10px;
        background-color: white;
        transition: border-color 0.3s ease-in-out;
        
      }
      
    button:hover {
        border-color: rgb(182, 182, 182);
      }
    
      .loader {
        display: none;
        border: 10px solid #f3f3f3; 
        border-top: 10px solid #3498db; 
        border-radius: 50%;
        width: 60px;
        height: 60px;
        animation: spin 2s linear infinite;
      }
      
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
