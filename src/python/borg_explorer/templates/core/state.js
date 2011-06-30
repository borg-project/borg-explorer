//
// INTERFACE STATE
//

bv.state = {};

bv.state.initial = function(ui) {
    var parseLocation = function () {
        // compute our relative URL
        var root = $("base").attr("href");
        var href = window.location.href;

        if(href.indexOf(root) != 0) {
            throw {name: "AssertionError", message: "could not match URL with base"};
        }

        var components = {
            root: root,
            trailing: href.substr(root.length).split("/")
        };

        if(components.trailing[0] === "ui") {
            components.category = components.trailing[1];
            components.view = components.trailing[2];
        }

        return components;
    };

    var here = parseLocation();
    var state = Object.create(bv.state);

    if(here.category === undefined) {
        state.category = ui.resources.categories[0];
    }
    else {
        ui.resources.categories.forEach(function(category) {
            if(category.path == here.category) {
                state.category = category;
            }
        });
    }

    if(here.view === undefined) {
        state.viewFactory = bv.views.cluster;
    }
    else {
        state.viewFactory = bv.views[here.view];
    }

    state.options = {};

    return state;
};

bv.state.url = function() {
    return "ui/%s/%s".format(this.category.path, this.viewFactory.name);
};

bv.state.withCategory = function(category, options) {
    var state = Object.create(this);

    state.category = category;
    state.options = options;

    return state;
};

bv.state.withView = function(viewFactory, options) {
    var state = Object.create(this);

    state.viewFactory = viewFactory;
    state.options = options;

    return state;
};

bv.state.create = function() {
    // XXX
    //window.history.pushState(this, null, this.url());

    this.view = this.viewFactory.create(this.options);

    return this;
};

bv.state.destroy = function() {
    this.view.destroy();
};

