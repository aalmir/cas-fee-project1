export class HandlebarsHelpers {

    static registerHelpers() {
        Handlebars.registerHelper('dateFormat', function (value) {
            // Datumsformatierung '1.12.2000'
            return value ? value.toLocaleDateString('de-CH') : "";
        });
        Handlebars.registerHelper('checkedwhen', function (value1, value2) {
            return value1 === value2 ? 'checked' : '';
        });
        Handlebars.registerHelper('nl2br', function(text) {
            text = Handlebars.Utils.escapeExpression(text);
            text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
            return new Handlebars.SafeString(text);
        });
    }

    static compileNode(domId) {
        const src = document.getElementById(domId).innerHTML;
        return Handlebars.compile(src);
    }
}