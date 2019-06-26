export class HandlebarsHelpers {
    static registerHelpers() {
        Handlebars.registerHelper('dateFormat', function (value) {
            // Datumsformatierung '1.12.2000', 'today'
            if (!value) {
                return "";
            }

            const date = new Date(value);
            date.setHours(0, 0, 0, 0);
            const dateTime = date.getTime()

            const now = new Date();
            now.setHours(0, 0, 0, 0);
            const nowTime = now.getTime();

            const oneDay = 24 * 60 * 60 * 1000;

            if (nowTime === dateTime) {
                return "today";
            }
            else if (nowTime + oneDay === dateTime) {
                return "tomorrow";
            }
            else if (nowTime - oneDay === dateTime) {
                return "yesterday";
            }

            return value.toLocaleDateString('de-CH');
        });
        Handlebars.registerHelper('checkedwhen', function (value1, value2) {
            return value1.toString() === value2.toString() ? 'checked' : '';
        });
        Handlebars.registerHelper('nl2br', function (text) {
            text = Handlebars.Utils.escapeExpression(text);
            text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
            return new Handlebars.SafeString(text);
        });
        Handlebars.registerHelper('for', function(from, to, incr, block) {
            var accum = '';
            for(var i = from; i < to; i += incr){
                accum += block.fn(i);
            }
            return accum;
        });
    }

    static compileNode(domId) {
        const src = document.getElementById(domId).innerHTML;
        return Handlebars.compile(src);
    }
}