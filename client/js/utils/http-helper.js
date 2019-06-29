/* eslint-disable class-methods-use-this */

export class HttpHelper {

    async ajax(method, url, data, headers) {
        const fetchHeaders = new Headers(
            {
                "content-type": "application/json",
                ...(headers || {})
            }
        );

        const x = await fetch(url, {
            method,
            headers: fetchHeaders,
            body: JSON.stringify(data)
        });
        return x.json();
    }

}
