(function (global) {
    global['env'] = global['env'] || {};
    global['env'].production = '${production}' === 'true';
    global['env'].api = '${api}';
})(typeof window !== 'undefined' ? window : self);
