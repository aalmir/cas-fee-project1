export class StaticData {
    static getSampleData() {
        return [
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
    }
}