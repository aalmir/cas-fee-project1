export class Note {
    constructor(id) {
        id = Number(id);

        this.id = id;
        this.title = "New note";
        this.description = "";
        this.priority = 1;
        this.dueDate = null;
        this.createdDate = new Date();
        this.done = false;
        this.doneDate = null;
    }


    static compareByPriority(s1, s2) {
        return -(s2.priority - s1.priority);
    }
    static compareByDueDate(s1, s2) {
        if (s1.dueDate === s2.dueDate) return 0;
        if (s1.dueDate === null) return 1;
        if (s2.dueDate === null) return -1;
        return -(s2.dueDate - s1.dueDate);
    }
    static compareByCreatedDate(s1, s2) {
        return (s2.createdDate - s1.createdDate);
    }

    static SORT_ORDER() {
        return {
            priority: "priority",
            due: "due",
            created: "created"
        };
    }
    static getComparer(sortOrder) {
        switch (sortOrder) {
            case Note.SORT_ORDER().priority: return Note.compareByPriority;
            case Note.SORT_ORDER().due: return Note.compareByDueDate;
            case Note.SORT_ORDER().created: return Note.compareByCreatedDate;
            default: return Note.compareByPriority;
        }
    }

    static convertFromJson(noteDto) {
        const note = new Note(noteDto.id);
        note.title = noteDto.title;
        note.description = noteDto.description;
        note.priority = noteDto.priority;
        note.dueDate = noteDto.dueDate ? new Date(noteDto.dueDate) : null;
        note.createdDate = new Date(noteDto.createdDate);
        note.done = noteDto.done;
        note.doneDate = noteDto.doneDate ? new Date(noteDto.doneDate) : null;
        return note;
    }
}