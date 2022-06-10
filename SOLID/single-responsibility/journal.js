// Single responsibility principle follows the following pattern.
// A class should have only one reason to change.
// Journal class should have only one responsibility.
// Which is to add, remove and print the entry values.

// Any other responsibility that is not related to the journals should
// be handled by other classes. Such as saving the entries to a file. Which is in no way related
// to the journal class.

const fs = require('fs');

class Journal {
  constructor() {
    this.entries = {};
  }

  addEntry(text) {
    let count = Journal.count ++;
    let entry = `${count}: ${text}`
    this.entries[count] = entry;
    return count;
  }

  removeEntry(index) {
    delete this.entries[index];
  }

  toString() {
    return Object.values(this.entries).join('\n');
  }
}

class PersistanceManager {
  constructor() {}
  preProcess() {
    console.log('preProcess');
  }

  saveToFile(journal, filename) {
    fs.writeFileSync(filename, journal.toString());
  }
}

Journal.count = 0;

let j =  new Journal();
j.addEntry('I cried today.');
j.addEntry('I ate a bug.');

console.log(j.toString());

let p = new PersistanceManager();
let filename = `${__dirname}/journal.txt`;
p.saveToFile(j, filename);
