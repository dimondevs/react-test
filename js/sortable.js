;(function($, window, document, undefined) {
    'use strict';
    var pluginName = 'sortable',
        defaults = {
            propertyName: 'value'
        };
    function Plugin (element, options) {
        this.element = $(element);
        this.tbody = this.element.find('tbody');
        this.rows = this.tbody.find('tr').toArray();
        this.thead = this.element.find('th');
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }
    $.extend(Plugin.prototype, {
        init: function() {
            this.handleSort();
            this.updateTable(this.rows);
        },
        updateTable: function(rows) {
            var self = this;
            this.tbody.empty();
            $.each(rows, function(idx, item) {
                self.tbody.append($(item));
            });
        },
        handleSort: function() {
            var self = this;
            var count = 0;
            self.thead.on('click', function() {
                var rows = self.tbody.find('tr').toArray();
                var state = {};
                state.index = $(this).index();
                if (count === 1) {
                    state.type = 'desc';
                    $(self.thead).removeClass('ask');
                    $(this).addClass('desc');
                } else {
                    state.type = 'asc';
                    count = 0;
                    $(self.thead).removeClass('desc');
                    $(this).addClass('ask');
                }
                count++;
                self.sortRows(rows, state);
            });
        },
        isNumeric: function(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        },
        sortRows: function(arr, state) {
            var self = this;
            var sortingRows = arr.sort(function(tr1, tr2) {
                var td1 = $(tr1).find('td').eq(state.index).text();
                var td2 = $(tr2).find('td').eq(state.index).text();
                if (self.isNumeric(td1) === true && state.index !== 1) {
                    td1 = parseFloat(td1);
                }
                if (self.isNumeric(td2) === true && state.index !== 1) {
                    td2 = parseFloat(td2);
                }
                if (td1 < td2) {
                    return state.type === 'desc' ? 1 : -1;
                }
                if (td1 > td2) {
                    return state.type === 'desc' ? -1 : 1;
                }
                return 0;
            });
            this.updateTable(sortingRows);
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
