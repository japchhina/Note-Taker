const util = require('util');
const fs = require('fs');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
const uuidv1 = require('uuid/v1');

const db = require('../db/db.json');
const dbPath = './db/db.json';

class Store {
    read () {  
        this.read = function() {
        return readFileAsync(dbPath, 'utf8');
    }
}

    write (note) {
        this.write = function(note) {
        return writeFileAsync(dbPath, JSON.stringify(note));
    }
}

    getNotes () {
        this.getNotes = function() {
            return this.read().then((notes) => {
                let parsedNotes;
                try {
                    parsedNotes = [].concat(JSON.parse(notes));
                } catch (err) {
                    parsedNotes = [];
                }
                return parsedNotes;
            });
        }
    addNote (note); {
        const { title, text } = note;
    const newNote = { titile, text, id: uuidv1() };     
    return this.getNotes()
        .then((notes) => [...notes, newNote])
        .then((updatedNotes) => this.write(updatedNotes))
        .then(() => newNote);
    }
    }
}