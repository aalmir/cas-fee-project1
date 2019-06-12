export class Note {
    constructor(id) {
        id = Number(id);

        this.id = id;
        this.title = "New note";
        this.description = "";
        this.priority = 1;
        this.dueDate = null;
        this.createdDate = new Date();
        this.finished = false; 
    }

    static compareByPriority (s1, s2) {
        return -(s2.priority - s1.priority);
    }
    static compareByDueDate (s1, s2) {
        return -(s2.dueDate - s1.dueDate);
    }
    static compareByCreatedDate (s1, s2) {
        return (s2.createdDate - s1.createdDate);
    }
    static compareByTitle (s1, s2) {
        return s1.title.localeCompare(s2.title);
    }
}