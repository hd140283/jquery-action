/*!
 * jQuery Action 1.0.0
 * http://plugins.jquery.com/action/
 *
 * Copyright 2013 Taiki Watanabe
 * Released under the MIT license
 * https://raw.github.com/hd140283/jquery-action/master/LICENSE
 *
 */
(function($) {
    var actions = {
        init: {},
        run: {},
        done: {},
        fail: {},
        finish: {}
    };
    function promises(functions, dto) {
        var values = [];
        var array = functions || [];
        for (var i = 0; i < array.length; i++) {
            values.push((array[i])(dto));
        }
        return values;
    }
    $.extend({
        action: function(name,arg) {
            if (!name) {
                return actions;
            }
            var dto = $.extend({},arg);
            $.when.apply(null, promises(actions.init[name], dto)).then(function() {
                return $.when.apply(null, promises(actions.run[name], dto));
            }).then(function() {
                return $.when.apply(null, promises(actions.done[name], dto));
            }).fail(function() {
                $.when.apply(null, promises(actions.fail[name], dto));
            }).always(function() {
                $.when.apply(null, promises(actions.finish[name], dto));
            });
            return this;
        }
    });
    $.fn.extend({
        action: function(name, method, fn) {
            actions[method][name] = actions[method][name] || [];
            return this.each(function() {
                actions[method][name].push($.proxy(fn, this));
            });
        }
    });
})(jQuery);