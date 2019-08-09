/*! gaw-table - v1.0.35 - 2019-05-13 */

(function() {
'use strict';

angular.module('bb.table.tmpl', []).run(['$templateCache', function ($templateCache) {
    $templateCache.put('bb/filterRow.html',
        '<tr ng-show="show_filter" class="ng-table-filters">\n' +
        '    <th \n' +
        'data-title-text="{{$column.titleAlt(this) || $column.title(this)}}" \n' +
        'ng-repeat="$column in $columns" ng-if="$column.show(this)" \n' +
        'class="filter {{$column.class(this)}}" \n' +
        'ng-class="params.settings().filterOptions.filterLayout === \'horizontal\' ?\n' +
        '            \'filter-horizontal\' : \'\'">\n' +
        '        <div ng-repeat="(name, filter) in $column.filter(this)" \n' +
        'ng-include="config.getTemplateUrl(filter)" class="filter-cell" \n' +
        'ng-class="[\n' +
        '                getFilterCellCss($column.filter(this),\n' +
        '                params.settings().filterOptions.filterLayout), $last ? \'last\' : \'\'\n' +
        '            ]">\n' +
        '</div>\n' +
        '    </th>\n' +
        '</tr>\n' +
        '');
    $templateCache.put('bb/groupRow.html',
        '<tr ng-if="params.hasGroup()" ng-show="$groupRow.show" \n' +
        'class="ng-table-group-header">\n' +
        '    <th \n' +
        'colspan="{{getVisibleColumns().length}}" class="sortable" \n' +
        'ng-class="{\n' +
        '            \'sort-asc\': params.hasGroup($selGroup, \'asc\'),\n' +
        '            \'sort-desc\':params.hasGroup($selGroup, \'desc\')\n' +
        '        }">\n' +
        '        <a href ng-click="isSelectorOpen = !isSelectorOpen" \n' +
        'class="ng-table-group-selector">\n' +
        '            <strong class="sort-indicator">\n' +
        '{{$selGroupTitle}}</strong>\n' +
        '            <button \n' +
        'class="btn btn--default btn--xs ng-table-group-close" \n' +
        'ng-click="\n' +
        '                    $groupRow.show = false;\n' +
        '                    $event.preventDefault();\n' +
        '                    $event.stopPropagation();\n' +
        '                ">\n' +
        '                <span class="glyphicon glyphicon-remove"></span>\n' +
        '            \n' +
        '</button>\n' +
        '            <button \n' +
        'class="btn btn--default btn--xs ng-table-group-toggle" \n' +
        'ng-click="\n' +
        '                    toggleDetail();\n' +
        '                    $event.preventDefault();\n' +
        '                    $event.stopPropagation();\n' +
        '                ">\n' +
        '                <span class="glyphicon" \n' +
        'ng-class="{\n' +
        '                        \'glyphicon-resize-small\':\n' +
        '                            params.settings().groupOptions.isExpanded,\n' +
        '                        \'glyphicon-resize-full\':\n' +
        '                            !params.settings().groupOptions.isExpanded\n' +
        '                    }">\n' +
        '</span>\n' +
        '            </button>\n' +
        '        </a>\n' +
        '        <div class="list-group" \n' +
        'ng-if="isSelectorOpen">\n' +
        '            <a href class="list-group-item" \n' +
        'ng-repeat="group in getGroupables()" ng-click="groupBy(group)">\n' +
        '                <strong>{{getGroupTitle(group)}}</strong>\n' +
        '                \n' +
        '<strong ng-class="isSelectedGroup(group) && \'sort-indicator\'"></strong>\n' +
        '\n' +
        '            </a>\n' +
        '        </div>\n' +
        '    </th>\n' +
        '</tr>\n' +
        '');
    $templateCache.put('bb/header.html',
        '<ng-table-group-row></ng-table-group-row>\n' +
        '<ng-table-sorter-row>\n' +
        '</ng-table-sorter-row>\n' +
        '<ng-table-filter-row></ng-table-filter-row>\n' +
        '');
    $templateCache.put('bb/pager.html',
        '<div class="row" ng-if="params.data.length">\n' +
        '    <div class="col-sm-8 ta-left" \n' +
        'ng-if="params.settings().counts.length">\n' +
        '        Visualizar&nbsp;\n' +
        '        <div \n' +
        'class="btn-group">\n' +
        '            <button type="button" class="btn btn--primary" \n' +
        'ng-repeat="count in params.settings().counts" \n' +
        'ng-class="{\'is-active\': params.count()==count}" ng-click="params.count(count)">\n' +
        '                <span ng-bind="count"></span>\n' +
        '            </button>\n' +
        '        \n' +
        '</div>\n' +
        '        &nbsp;registros\n' +
        '    </div>\n' +
        '    <div class="col-sm-16 ta-right">\n' +
        '        <ul class="pagination">\n' +
        '            <li \n' +
        'ng-class="{\n' +
        '                    \'is-disabled\': !page.active && !page.current,\n' +
        '                    \'is-active\': page.current\n' +
        '                }" \n' +
        'ng-repeat="page in pages" ng-switch="page.type">\n' +
        '                <a href \n' +
        'ng-switch-when="prev" ng-click="params.page(page.number)">&laquo;</a>\n' +
        '                <a href ng-switch-when="first" \n' +
        'ng-click="params.page(page.number)">\n' +
        '                    <span \n' +
        'ng-bind="page.number"></span>\n' +
        '                </a>\n' +
        '                <a href \n' +
        'ng-switch-when="page" ng-click="params.page(page.number)">\n' +
        '                    \n' +
        '<span ng-bind="page.number"></span>\n' +
        '                </a>\n' +
        '                <a \n' +
        'href ng-switch-when="more" ng-click="params.page(page.number)">&#8230;</a>\n' +
        '                <a href ng-switch-when="last" \n' +
        'ng-click="params.page(page.number)">\n' +
        '                    <span \n' +
        'ng-bind="page.number"></span>\n' +
        '                </a>\n' +
        '                <a href \n' +
        'ng-switch-when="next" ng-click="params.page(page.number)">&raquo;</a>\n' +
        '\n' +
        '            </li>\n' +
        '        </ul>\n' +
        '    </div>\n' +
        '</div>\n' +
        '');
    $templateCache.put('bb/sorterRow.html',
        '<tr class="ng-table-sort-header">\n' +
        '    <th class="{{$column.class(this)}}" \n' +
        'title="{{$column.headerTitle(this)}}" ng-repeat="$column in $columns" \n' +
        'ng-class="{\n' +
        '            \'sortable\': $column.sortable(this),\n' +
        '            \'sort-asc\': params.sorting()[$column.sortable(this)]==\'asc\',\n' +
        '            \'sort-desc\': params.sorting()[$column.sortable(this)]==\'desc\'\n' +
        '        }" \n' +
        'ng-click="sortBy($column, $event)" ng-if="$column.show(this)" \n' +
        'ng-init="template = $column.headerTemplateURL(this)">\n' +
        '        <div \n' +
        'ng-if="!template" class="ng-table-header" \n' +
        'ng-class="{\'sort-indicator\': params.settings().sortingIndicator == \'div\'}">\n' +
        '            <span ng-bind="$column.title(this)" \n' +
        'ng-class="{\'sort-indicator\': params.settings().sortingIndicator == \'span\'}">\n' +
        '</span>\n' +
        '        </div>\n' +
        '        <div ng-if="template" ng-include="template">\n' +
        '</div>\n' +
        '    </th>\n' +
        '</tr>\n' +
        '');
}]);
}());

(function() {
    'use strict';

    /**
     * Table
     */

    angular
        .module('bb.table', [
            'ngTable',
            'bb.table.tmpl'
        ])
        .run(configureDefaults);

    configureDefaults.$inject = ['ngTableDefaults'];

    function configureDefaults(ngTableDefaults) {
        ngTableDefaults.params.page = 1;
        ngTableDefaults.params.count = 5;
        ngTableDefaults.settings.counts = [5, 10];
    }
}());

(function () {
    'use strict';

    /**
     * Table
     */
    angular
        .module('bb.table')
        .directive('bbExpandableTable', expandableTable)
        .directive('bbExpandableTrigger', expandableTrigger);

    function expandableTable() {
        return {
            restrict: 'A',
            controller: expandableCtrl
        };
    }

    expandableCtrl.$inject = ['$scope', '$element', '$attrs'];

    function expandableCtrl($scope, $element, $attrs) {
        /* jshint validthis: true */
        var vm = this;
        var registeredExpandableRows = [];
        $element.addClass('table--expandable');
        vm.register = register;
        vm.oneAtOnceHandler = oneAtOnceHandler;

        function register(elem) {
            registeredExpandableRows.push(elem);
        }

        function oneAtOnceHandler() {
            if (angular.isDefined($attrs.bbOneAtOnce)) {
                registeredExpandableRows.forEach(function (row) {
                    row.elem.removeClass('is-expanded');
                    row.elemToBeExpanded.removeClass('is-expanded');
                });
            }
        }
    }

    expandableTrigger.$inject = ['$timeout'];

    function expandableTrigger($timeout) {
        return {
            restrict: 'A',
            link: link,
            require: '^bbExpandableTable'
        };

        function link(scope, elem, attrs, ctrl) {
            elem.addClass('table--expandable__trigger');
            var elemToBeExpanded;
            $timeout(function () {
                elemToBeExpanded = angular.element(document.querySelectorAll(
                    attrs.bbExpandableTrigger));
                elemToBeExpanded.addClass('table--expandable__container');
                ctrl.register({elem: elem, elemToBeExpanded: elemToBeExpanded});
            });

            elem.bind('click', function () {
                if (elem.hasClass('is-expanded')) {
                    elem.removeClass('is-expanded');
                    elemToBeExpanded.removeClass('is-expanded');
                } else {
                    ctrl.oneAtOnceHandler();
                    elem.addClass('is-expanded');
                    elemToBeExpanded.addClass('is-expanded');
                }
            });

            elem.attr('tabindex', '0');
            elem.bind('focus focusin', function () {
                elem.attr('aria-expanded', 'false');
            });
            elem.bind('keydown', function (evt) {
                if (evt.keyCode === 13 || evt.keyCode === 32) {
                    if (elem.hasClass('is-expanded')) {
                        elem.removeClass('is-expanded');
                        elemToBeExpanded.removeClass('is-expanded');
                        elem.attr('aria-expanded', 'false');
                    } else {
                        ctrl.oneAtOnceHandler();
                        elem.addClass('is-expanded');
                        elemToBeExpanded.addClass('is-expanded');
                        elem.attr('aria-expanded', 'true');
                    }
                }
            });
        }
    }
})();

