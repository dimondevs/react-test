;(function($, window, document, undefined) {
    'use strict';
    var pluginName = 'sortable',
        defaults = {
            propertyName: 'value'
        };
    function Plugin (element, options) {
        this.element = element;
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }
    $.extend(Plugin.prototype, {
        init: function() {
            this.getTable(this);
        },
        getTable: function() {
            var self = this;
            var el = self.element;
            var th = $(el).find('th');
            var trArr = $(el).find('tr').toArray();
            $(th).on('click', function() {
                var index = $(this).index();
                self.sortTable(trArr, index);
            });
        },
        sortTable: function(arr, idx) {
            console.log(arr);
            console.log(idx);
        }
    });
    $.fn[pluginName] = function(options) {
        return this.each(function() {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' +
                pluginName, new Plugin(this, options));
            }
        });
    };
})(jQuery, window, document);
