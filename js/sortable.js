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
            this.getTable();
        },
        getTable: function() {
            var self = this;
            var el = self.element;
            var th = $(el).find('th');
            var trArr = $(el).find('tbody tr').toArray();
            $(th).on('click', function() {
                var index = $(this).index();
                self.sortTable(trArr, index);
            });
        },
        sortTable: function(arr, idx) {
            var arr2 = arr.sort(function(tr1, tr2) {
                var td1 = $(tr1).find('td').eq(idx).text();
                var td2 = $(tr2).find('td').eq(idx).text();
                if (td1 < td2) {
                    return -1;
                }
                if (td1 > td2) {
                    return 1;
                }
                return 0;
            });
            console.log(arr2);
            $('#result tbody').empty();
            $.each(arr2, function(idx, item) {
                $('#result tbody').append($(item));
            });
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
