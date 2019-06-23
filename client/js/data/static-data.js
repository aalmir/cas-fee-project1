export class StaticData {
    static getSampleData() {
        return [
            {
                "title": "Vanille-Glacé",
                "priority": 1,
                "dueDate": new Date(2019, 7, 7),
            },
            {
                "title": "Schokoladensauce",
                "priority": 2,
                "dueDate": null,
            },
            {
                "title": "Salat",
                "description": "Lorem ipsum dolor\nSit amet",
                "priority": 3,
                "dueDate": new Date(2019, 8, 2),
            }
        ];
    }
}