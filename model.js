var Model = (function () {

    function load() {
        let notesJson = localStorage.getItem('notes');
        if (!notesJson) {
            return null;
        } 

        var fromStorage = JSON.parse(notesJson);

        // rehydrate dates:
        // WTF, das kann es ja wohl nicht sein
        fromStorage.forEach(x => {
            x.dueDate = x.dueDate === null ? null : new Date(x.dueDate);
            x.createdDate = new Date(x.createdDate);
        })

        notes = fromStorage;
    }

    function clear() {
        notes = [];
        save();
    }

    function seed() {
        notes = [
            {
                "id": 1,
                "title": "Vanille-Glacé",
                "description": "",
                "priority": 1,
                "dueDate": new Date(2019, 7, 7),
                "createdDate": new Date(2019, 5, 1),
                "finished": false
            },
            {
                "id": 2,
                "title": "Schokoladensauce",
                "description": "",
                "priority": 2,
                "dueDate": null,
                "createdDate": new Date(2019, 5, 2),
                "finished": false
            },
            {
                "id": 3,
                "title": "Salat",
                "description": "",
                "priority": 3,
                "dueDate": null,
                "createdDate": new Date(2019, 5, 2),
                "finished": false
            }
        ];
        save();
    }

    function save() {
        let nodesJson = JSON.stringify(notes);
        localStorage.setItem('notes', nodesJson);
    }


    function compareByPriority(s1, s2) {
        return -(s2.priority - s1.priority);
    }
    function compareByDueDate(s1, s2) {
        return -(s2.dueDate - s1.dueDate);
    }
    function compareByCreatedDate(s1, s2) {
        return (s2.createdDate - s1.createdDate);
    }
    function compareByTitle(s1, s2) {
        return s1.title.localeCompare(s2.title);
    }

    function updateFunc(note, data) {
        note.title = data.title;
        note.description = data.description;
        note.priority = data.priority;
        note.dueDate = data.dueDate ? new Date(data.dueDate) : null;
}

    /* init / inner state */
    var notes = [];
    load();
    if(notes === null) {
        notes = seed();
    }

    /* Public API (revealing module pattern) */
    return {
        getListSorted: function (sortOrder, showFinished) { // TODO: Magic string
            var comparer = (function () {
                switch (sortOrder) {
                    case "priority": return compareByPriority;
                    case "dueDate": return compareByDueDate;
                    case "createdDate": return compareByCreatedDate;
                    case "title": return compareByTitle;
                    default:
                        break;
                }
            })();
            return [...notes]
                .filter(x => showFinished || !x.finished)
                .sort(comparer);
        },
        findNote: function (id) {
            return notes.find(x => x.id === parseInt(id));
        },
        delete: function (id) {
            notes = notes.filter(x => x.id !== parseInt(id));
            save();
        },
        toggleFinished: function (id) {
            const note = this.findNote(id);
            if (!note) {
                return false;
            }
            note.finished = !note.finished;
            save();
        }, 
        addNote: function(data) {
            const maxId = notes.length == 0 ? 0 : Math.max(...notes.map(x => x.id));
            var note = {
                "id": maxId + 1,
                "createdDate": new Date(),
                "finished": false
            };
            updateFunc(note, data);
            notes.push(note);
            save();
        }, 
        updateNote: function(data, note) {
            updateFunc(note, data);
            save();
        }, 
        clear: function() {
            clear();
        },
        seed: function() {
            seed();
        }, 
        load: function() {
            load();
        }
    };
})();

