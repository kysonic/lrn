const hbs = require('handlebars');

hbs.registerHelper('list', function(items, options) {

    var out = "<ul>";

    for(var i=0, l=items.length; i<l; i++) {
        out = out + "<li>" + options.fn(items[i]) + "</li>";
    }

    return out + "</ul>";
});


hbs.registerHelper('fullName', function(person) {
    return person.firstName + " " + person.lastName;
});


hbs.registerHelper('agree_button', function() {
    var emotion = hbs.escapeExpression(this.emotion),
        name = hbs.escapeExpression(this.name);

    return new hbs.SafeString(
        "<button>I agree. I " + emotion + " " + name + "</button>"
    );
});