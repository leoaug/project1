/*! gaw-dropdown - v1.0.11 - 2017-01-20 */

(function() {
    'use strict';

    /**
     * Dropdown
     */

    angular
        .module('bb.dropdown', ['bb.position'])
        .constant('bbDropdownConfig', {
            appendToOpenClass: 'bb-dropdown-open',
            openClass: 'is-open'
        })
        .service('bbDropdownService', dropdownService)
        .controller('bbDropdownController', dropdownController)
        .directive('bbDropdown', dropdown)
        .directive('bbDropdownMenu', dropdownMenu)
        .directive('bbDropdownToggle', dropdownToggle);

    dropdownService.$inject = ['$document', '$rootScope'];

    function dropdownService($document, $rootScope) {
        /* jshint validthis: true */

        var openScope = null;

        var closeDropdown = function(evt) {
            // This method may still be called during the same mouse event that
            // unbound this event handler. So check openScope before proceeding.
            if (!openScope) {
                return;
            }

            if (evt && openScope.getAutoClose() === 'disabled') {
                return;
            }

            if (evt && evt.which === 3) {
                return;
            }

            var toggleElement = openScope.getToggleElement();

            if (evt && toggleElement && toggleElement[0].contains(evt.target)) {
                return;
            }

            var dropdownElement = openScope.getDropdownElement();

            if (evt && openScope.getAutoClose() === 'outsideClick' &&
                dropdownElement && dropdownElement[0].contains(evt.target)) {
                return;
            }

            openScope.isOpen = false;

            if (!$rootScope.$$phase) {
                openScope.$apply();
            }
        };

        var keybindFilter = function(evt) {
            if (evt.which === 27) {
                openScope.focusToggleElement();
                closeDropdown();
            } else if (openScope.isKeynavEnabled() && [38, 40].indexOf(evt.which) !==
                -1 && openScope.isOpen) {
                evt.preventDefault();
                evt.stopPropagation();
                openScope.focusDropdownEntry(evt.which);
            }
        };

        this.open = function(dropdownScope) {
            if (!openScope) {
                $document.on('click', closeDropdown);
                $document.on('keydown', keybindFilter);
            }

            if (openScope && openScope !== dropdownScope) {
                openScope.isOpen = false;
            }

            openScope = dropdownScope;
        };

        this.close = function(dropdownScope) {
            if (openScope === dropdownScope) {
                openScope = null;
                $document.off('click', closeDropdown);
                $document.off('keydown', keybindFilter);
            }
        };
    }

    dropdownController.$inject = ['$scope', '$element', '$attrs', '$parse',
        'bbDropdownConfig', 'bbDropdownService', '$animate', '$bbPosition',
            '$document', '$compile', '$templateRequest'];

    /* jshint maxparams: false */
    function dropdownController($scope, $element, $attrs, $parse, dropdownConfig,
        dropdownService, $animate, $position, $document, $compile, $templateRequest) {
        /* jshint validthis: true */

        var self = this,
            scope = $scope.$new(), // Create a child scope so we are not polluting original one
            templateScope,
            appendToOpenClass = dropdownConfig.appendToOpenClass,
            openClass = dropdownConfig.openClass,
            getIsOpen,
            setIsOpen = angular.noop,
            toggleInvoker = $attrs.bbOnToggle ? $parse($attrs.bbOnToggle) : angular.noop,
            appendToBody = false,
            appendTo = null,
            keynavEnabled = false,
            body = $document.find('body');

        $element.addClass('dropdown');

        this.init = function() {
            /* jshint maxcomplexity: false */

            if ($attrs.bbAlign) {
                $element.addClass('dropdown--' + $attrs.bbAlign);
            }

            if ($attrs.bbPlacement) {
                $element.addClass('dropdown--' + $attrs.bbPlacement);
            }

            if ($attrs.bbNoArrow === 'true') {
                $element.addClass('dropdown--no-arrow');
            }

            if ($attrs.bbIsOpen) {
                getIsOpen = $parse($attrs.bbIsOpen);
                setIsOpen = getIsOpen.assign;

                $scope.$watch(getIsOpen, function(value) {
                    scope.isOpen = !!value;
                });
            }

            if (angular.isDefined($attrs.bbAppendTo)) {
                var appendToEl = $parse($attrs.bbAppendTo)(scope);

                if (appendToEl) {
                    appendTo = angular.element(appendToEl);
                }
            }

            appendToBody = angular.isDefined($attrs.bbAppendToBody);
            keynavEnabled = angular.isDefined($attrs.bbKeyboardNav);

            if (appendToBody && !appendTo) {
                appendTo = body;
            }

            if (appendTo && self.dropdownMenu) {
                appendTo.append(self.dropdownMenu);
                $element.on('$destroy', function handleDestroyEvent() {
                    self.dropdownMenu.remove();
                });
            }
        };

        /* jshint ignore: start */
        this.toggle = function(open) {
            return scope.isOpen = arguments.length ? !!open : !scope.isOpen;
        };
        /* jshint ignore: end */

        // Allow other directives to watch status
        this.isOpen = function() {
            return scope.isOpen;
        };

        scope.getToggleElement = function() {
            return self.toggleElement;
        };

        scope.getAutoClose = function() {
            return $attrs.bbAutoClose || 'always'; // or 'outsideClick' or 'disabled'
        };

        scope.getElement = function() {
            return $element;
        };

        scope.isKeynavEnabled = function() {
            return keynavEnabled;
        };

        scope.focusDropdownEntry = function(keyCode) {
            var elems = self.dropdownMenu ? // If append to body is used.
                angular.element(self.dropdownMenu).find('a') :
                $element.find('ul').eq(0).find('a');

            switch (keyCode) {
                case 40: {
                    if (!angular.isNumber(self.selectedOption)) {
                        self.selectedOption = 0;
                    } else {
                        self.selectedOption = self.selectedOption === elems.length - 1 ?
                            self.selectedOption :
                            self.selectedOption + 1;
                    }
                    break;
                } case 38: {
                    if (!angular.isNumber(self.selectedOption)) {
                        self.selectedOption = elems.length - 1;
                    } else {
                        self.selectedOption = self.selectedOption === 0 ?
                            0 : self.selectedOption - 1;
                    }
                    break;
                }
            }

            elems[self.selectedOption].focus();
        };

        scope.getDropdownElement = function() {
            return self.dropdownMenu;
        };

        scope.focusToggleElement = function() {
            if (self.toggleElement) {
                self.toggleElement[0].focus();
            }
        };

        scope.$watch('isOpen', function(isOpen, wasOpen) {
            /* jshint maxcomplexity: 16 */

            if (appendTo && self.dropdownMenu) {
                var pos = $position.positionElements($element, self.dropdownMenu,
                    'bottom-left', true),
                    css,
                    rightalign;

                css = {
                    top: pos.top + 'px',
                    display: isOpen ? 'block' : 'none'
                };

                rightalign = self.dropdownMenu.hasClass('dropdown__menu--right');

                if (!rightalign) {
                    css.left = pos.left + 'px';
                    css.right = 'auto';
                } else {
                    css.left = 'auto';
                    css.right = window.innerWidth -
                        (pos.left + $element.prop('offsetWidth')) + 'px';
                }

                // Need to adjust our positioning to be relative to the appendTo container
                // if it's not the body element
                if (!appendToBody) {
                    var appendOffset = $position.offset(appendTo);

                    css.top = pos.top - appendOffset.top + 'px';

                    if (!rightalign) {
                        css.left = pos.left - appendOffset.left + 'px';
                    } else {
                        css.right = window.innerWidth -
                            (pos.left - appendOffset.left + $element.prop('offsetWidth')) + 'px';
                    }
                }

                self.dropdownMenu.css(css);
            }

            var openContainer = appendTo ? appendTo : $element,
                hasOpenClass = openContainer.hasClass(appendTo ? appendToOpenClass : openClass);

            var open = !isOpen;

            if (hasOpenClass === open) {
                $animate[isOpen ? 'addClass' : 'removeClass'](openContainer, appendTo ?
                    appendToOpenClass : openClass).then(function() {
                    if (angular.isDefined(isOpen) && isOpen !== wasOpen) {
                        toggleInvoker($scope, {
                            open: !!isOpen
                        });
                    }
                });
            }

            if (isOpen) {
                if (self.dropdownMenuTemplateUrl) {
                    $templateRequest(self.dropdownMenuTemplateUrl).then(function(tplContent) {
                        templateScope = scope.$new();

                        $compile(tplContent.trim())(templateScope, function(dropdownElement) {
                            var newEl = dropdownElement;

                            self.dropdownMenu.replaceWith(newEl);
                            self.dropdownMenu = newEl;
                        });
                    });
                }

                scope.focusToggleElement();
                dropdownService.open(scope);
            } else {
                if (self.dropdownMenuTemplateUrl) {
                    if (templateScope) {
                        templateScope.$destroy();
                    }

                    var newEl = angular.element('<ul class="dropdown__menu"></ul>');

                    self.dropdownMenu.replaceWith(newEl);
                    self.dropdownMenu = newEl;
                }

                dropdownService.close(scope);
                self.selectedOption = null;
            }

            if (angular.isFunction(setIsOpen)) {
                setIsOpen($scope, isOpen);
            }
        });

        $scope.$on('$locationChangeSuccess', function() {
            if (scope.getAutoClose() !== 'disabled') {
                scope.isOpen = false;
            }
        });
    }

    function dropdown() {
        var directive = {
            controller: 'bbDropdownController',
            link: link
        };

        return directive;

        function link(scope, element, attrs, ctrl) {
            ctrl.init();
        }
    }

    function dropdownMenu() {
        var directive = {
            link: link,
            require: '?^bbDropdown',
            restrict: 'A',
        };

        return directive;

        function link(scope, element, attrs, ctrl) {
            if (!ctrl || angular.isDefined(attrs.bbNested)) {
                return;
            }

            if (ctrl.btnHasMargin) {
                element.css('margin-top', 0);
            }

            element.addClass('dropdown__menu');

            var tplUrl = attrs.bbTemplateUrl;

            if (tplUrl) {
                ctrl.dropdownMenuTemplateUrl = tplUrl;
            }

            if (!ctrl.dropdownMenu) {
                ctrl.dropdownMenu = element;
            }
        }
    }

    dropdownToggle.$inject = ['$window'];

    function dropdownToggle($window) {
        var directive = {
            link: link,
            require: '?^bbDropdown',
        };

        return directive;

        function link(scope, element, attrs, ctrl) {
            if (!ctrl) {
                return;
            }

            // Check if has margin bottom
            var marginBottom = $window.getComputedStyle(element[0], null)
                .getPropertyValue('margin-bottom').replace('px', '');

            if (marginBottom > 0) {
                ctrl.btnHasMargin = true;
            }

            //
            element.addClass('dropdown__toggle');

            ctrl.toggleElement = element;

            var toggleDropdown = function(event) {
                event.preventDefault();

                if (!element.hasClass('is-disabled') && !attrs.disabled) {
                    scope.$apply(function() {
                        ctrl.toggle();
                    });
                }
            };

            // WAI-ARIA
            element.attr({
                'aria-haspopup': true,
                'aria-expanded': false
            });

            scope.$watch(ctrl.isOpen, function(isOpen) {
                element.attr('aria-expanded', !!isOpen);
            });

            element.bind('click', toggleDropdown);

            scope.$on('$destroy', function() {
                element.unbind('click', toggleDropdown);
            });
        }
    }
}());
