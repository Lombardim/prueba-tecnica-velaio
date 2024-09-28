(function (window) {
    window['env'] = window['env'] || {};
    window['env'].production = '${production}' === 'true';
    window['env'].api = '${api}';
})(this);