export class StaticData {
    static getSampleData() {
        return [
            {
                "title": "Velo flicken",
                "priority": 2,
                "dueDate": new Date(),
            },
            {
                "title": "Wohnung putzen",
                "priority": 5,
                "dueDate": null
            },
            {
                "title": "Abgabe Projekt 1",
                "description": `Branch erstellen mit dem Namen «Abgabe»
E-Mail erstellen mit folgendem Inhalt:
- Subject: [CAS FEE] Abgabe {{Gruppennummer}}
- Link zum Branch
- Ein ReadMe auf GitHub, falls dieses notwendig ist.
`,
                "priority": 1,
                "dueDate": new Date(2019, 6, 2),
            }
        ];
    }
}