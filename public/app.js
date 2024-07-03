import Dictionary from "./dictionary.js";
import WordDefinition from "./wordDefinition.js";
import WordSetDefinition from "./wordSetDefinition.js";

class App {
  constructor() {
    this.dictionary = new Dictionary();
    this.onSearch = this.onSearch.bind(this);
    this.onSet = this.onSet.bind(this);
    this.onDelete = this.onDelete.bind(this);
    const searchForm = document.querySelector('#search');
    searchForm.addEventListener('submit', this.onSearch);
    const setForm = document.querySelector('#set');
    setForm.addEventListener('submit', this.onSet);
    const deleteForm = document.querySelector('#delete');
    deleteForm.addEventListener('submit', this.onDelete);
    }


  onSearch(event) {
    event.preventDefault();
    const status = results.querySelector('#status');
    status.textContent = '';
    const deleteStatus = document.querySelector('#delete-status');
    deleteStatus.textContent = '';
    const input = document.querySelector('#word-input');
    const word = input.value.trim();
    this.dictionary.doLookup(word)
      .then(this.showResults);
  }

  onSet(event) {
    event.preventDefault();
    const resultsContainer = document.querySelector('#results');
    const wordSetDefinition = new WordSetDefinition(resultsContainer);
    const postBody = wordSetDefinition.read();
    const status = results.querySelector('#status');
    status.textContent = '';
    const deleteStatus = document.querySelector('#delete-status');
    deleteStatus.textContent = '';
    this.dictionary.save(postBody)
      .then(result => {
        // Update definition
        new WordDefinition(resultsContainer, postBody);
        status.textContent = 'Saved.';
      });
  }
  
  onDelete(event) {
    event.preventDefault();
    const input = document.querySelector('#word-input-delete');
    const word = input.value.trim();
    this.dictionary.delete(word)
      .then(response => response.json())
      .then (value => {
        const deleteStatus = document.querySelector('#delete-status');
          if (value === null) deleteStatus.textContent = "Word Not Found!";
          else deleteStatus.textContent = "Word Deleted!";
      });
    }

  showResults(result) {
    const resultsContainer = document.querySelector('#results');
    resultsContainer.classList.add('hidden');
    // Show Word Definition.
    new WordDefinition(resultsContainer, result);
    // Prep set definition form.
    const wordSetDefinition = new WordSetDefinition(resultsContainer);
    wordSetDefinition.show(result);
    // Display.
    resultsContainer.classList.remove('hidden');
  }
}

// Init app
new App();