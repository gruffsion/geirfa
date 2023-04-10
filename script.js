let wordsMap = new Map();
const processedTranslations = new Set();
const fetchDataBtn = document.getElementById("submit");
const loader = document.querySelector(".loader");
const paragraphs = document.querySelectorAll("p");


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
    return results;
  }
  


  // Create the floating dislpay with the translated word
  function createTooltip(text) {
    const tooltip = document.createElement('span');
    tooltip.innerHTML = text;
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
  
  for (const paragraph of paragraphs){
    wrapWordsWithSpan(paragraph);
  };


  

