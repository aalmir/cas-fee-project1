var Model = (function () {

    let notes = [
        {
            "id": 1,
            "title": "CAS FEE Projekt 1",
            "description": "Lorem ipsum <b>bold NOT</b>",
            "priority": 1,
            "dueDate": new Date(2019, 7, 7),
            "createdDate": new Date(2019, 5, 1), 
            "finished": false
        },
        {
            "id": 2,
            "title": "Velo putzen",
            "description": "Lorem ipsum dolor sit amet",
            "priority": 2,
            "dueDate": null,
            "createdDate": new Date(2019, 5, 2), 
            "finished": true
        },
    ];

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
        findNote: function(id) {
            return notes.find(x => x.id === parseInt(id));
        },
        delete: function(id) {
            notes = notes.filter(x => x.id !== parseInt(id));
        },
        toggleFinished: function(id) {
            const note = this.findNote(id);
            if(!note) {
                return false;
            }
            note.finished = !note.finished;
            return true;
        }
    };
})();

