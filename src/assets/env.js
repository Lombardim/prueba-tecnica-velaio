(function (window) {
    window['env'] = window['env'] || {};
    window['env'].production = 'false' === 'true';
    window['env'].api = 'https://jsonplaceholder.typicode.com/';
})(this);