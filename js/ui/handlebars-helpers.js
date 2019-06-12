export class HandlebarsHelpers {

    static registerHelpers() {
        Handlebars.registerHelper('dateFormat', function (value) {
            // Datumsformatierung '1.12.2000'
            return value ? value.toLocaleDateString('de-CH') : "";
        });
        Handlebars.registerHelper('checkedwhen', function (value1, value2) {
            return value1 === value2 ? 'checked' : '';
        });
    }

    static compileNode(domId) {
        const src = document.getElementById(domId).innerHTML;
        return Handlebars.compile(src);
    }
}