(function (global) {
    global['env'] = global['env'] || {};
    global['env'].production = 'false' === 'true';
    global['env'].api = 'https://jsonplaceholder.typicode.com/';
})(typeof window !== 'undefined' ? window : self);
