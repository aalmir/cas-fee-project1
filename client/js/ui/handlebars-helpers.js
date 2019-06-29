export class HandlebarsHelpers {

    static registerHelpers() {

        Handlebars.registerHelper("dateFormat", (value) => {
            // Datumsformatierung '1.12.2000', 'today'
            if (!value) {
                return "";
            }

            const date = new Date(value);
            date.setHours(0, 0, 0, 0);
            const dateTime = date.getTime();

            const now = new Date();
            now.setHours(0, 0, 0, 0);
            const nowTime = now.getTime();

            const oneDay = 24 * 60 * 60 * 1000;

            if (nowTime === dateTime) {
                return "today";
            }
            if (nowTime + oneDay === dateTime) {
                return "tomorrow";
            }
            if (nowTime - oneDay === dateTime) {
                return "yesterday";
            }

            return value.toLocaleDateString("de-CH");
        });

        // eslint-disable-next-line arrow-body-style
        Handlebars.registerHelper("checkedwhen", (value1, value2) => {
            return value1.toString() === value2.toString() ? "checked" : "";
        });

        Handlebars.registerHelper("nl2br", (text) => {
            let returnText = Handlebars.Utils.escapeExpression(text);
            returnText = returnText.replace(/(\r\n|\n|\r)/gm, "<br>");
            return new Handlebars.SafeString(returnText);
        });

        Handlebars.registerHelper("for", (from, to, incr, block) => {
            let accum = "";
            for (let i = from; i < to; i += incr) {
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
