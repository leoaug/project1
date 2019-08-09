/*! gaw-alert - v1.0.16 - 2018-12-11 */

(function() {
    'use strict';
    
    angular.module('bb.alert.tmpl', []).run(['$templateCache', function ($templateCache) {
        $templateCache.put('bb/alert-content.html',
            '<div class="alert__area">\n' +
            '    <i class="{{ $parent.icon }}" \n' +
            'ng-show="$parent.icon" aria-hidden="true"></i>\n' +
            '    <span class="sr-only">\n' +
            'Mensagem {{ $parent.type === \'success\' ? \'de sucesso\' : ($parent.type === \'info\' ? \'informativa\' : ($parent.type === \'error\' ? \'de erro\' : \'de alerta\')) }}.\n' +
            '</span>\n' +
            '    <div class="alert__desc" ng-transclude></div>\n' +
            '    <button \n' +
            'class="alert__button" ng-click="$parent.vm.openDetails()" \n' +
            'ng-show="$parent.vm.details.hasTranscluded">\n' +
            '        <i \n' +
            'class="mi mi--keyboard-arrow-down" ng-show="!$parent.vm.details.open"></i>\n' +
            '        <i class="mi mi--keyboard-arrow-up" ng-show="$parent.vm.details.open">\n' +
            '</i>\n' +
            '    </button>\n' +
            '    <button \n' +
            'class="btn btn--xs btn--line btn--default alert__detail" \n' +
            'ng-click="$parent.vm.openDetails()" \n' +
            'ng-show="$parent.vm.details.hasTranscluded" aria-label="Detalhar alerta.">\n' +
            'Detalhar</button>\n' +
            '    <button type="button" class="alert__close" \n' +
            'ng-show="$parent.vm.closeable" ng-click="$parent.close({$event: $event})">\n' +
            '        <span aria-hidden="true">&times;</span>\n' +
            '        <span class="sr-only">\n' +
            'Fechar.</span>\n' +
            '    </button>\n' +
            '</div>');
        $templateCache.put('bb/alert-details.html',
            '<span class="sr-only" ng-show="$parent.vm.details.open">Detalhamento do alerta:\n' +
            '</span>\n' +
            '<div class="alert__details" ng-transclude></div>');
        $templateCache.put('bb/alert.html',
            '<div class="alert" ng-class="{\'is-open\': vm.details.open}" tabindex="0" \n' +
            'ng-transclude></div>\n' +
            '');
    }]);
    }());
    
    (function() {
        'use strict';
    
        angular
            .module('bb.alert', ['bb.alert.tmpl'])
            .controller('bbAlertController', controller)
            .directive('bbAlert', alert)
            .directive('bbAlertContent', alertContent)
            .directive('bbAlertDetails', alertDetails);
    
        controller.$inject = ['$scope', '$element', '$attrs', '$interpolate', '$timeout'];
    
        function controller($scope, $element, $attrs, $interpolate, $timeout) {
            /* jshint validthis: true */
    
            var vm = this;
    
            // Check if have close
            vm.closeable = !!$attrs.bbClose;
    
            if (vm.closeable) {
                $element.addClass('alert--dismissible');
            }
    
            // Dismiss functionality
            var dismissOnTimeout = angular.isDefined($attrs.dismissOnTimeout) ?
                $interpolate($attrs.dismissOnTimeout)($scope.$parent) : null;
    
            if (dismissOnTimeout) {
                $timeout(function() {
                    $scope.close();
                }, parseInt(dismissOnTimeout, 10));
            }
    
            // FIXME: GAW has types in uppercase
    
            // Convert to lowercase the type attribute and apply
            $timeout(function() {
                if (typeof $scope.type === 'string') {
                    $scope.type = $scope.type.toLowerCase();
                }
    
                $element.addClass('alert--' + ($scope.type || 'warn'));
            });
    
            // Set defulat icon by message type
            $timeout(function() {
                if ($scope.icon === 'false') {
                    $scope.icon = false;
                } else if (!$scope.icon) {
                    switch ($scope.type) {
                        case 'success':
                            $scope.icon = 'mi mi--check-circle';
                            break;
                        case 'info':
                            $scope.icon = 'mi mi--info';
                            break;
                        case 'error':
                            $scope.icon = 'mi mi--cancel';
                            break;
                        case 'warn':
                            $scope.icon = 'mi mi--warning';
                            break;
                    }
                }
            });
    
            // square option
            if ($scope.square === 'true') {
                $element.addClass('alert--square');
            }
        }
    
        function alert() {
            var directive = {
                controller: 'bbAlertController',
                controllerAs: 'vm',
                replace: true,
                scope: {
                    type: '@?bbType',
                    close: '&?bbClose',
                    icon: '@?bbIcon',
                    square: '@?bbSquare'
                },
                templateUrl: 'bb/alert.html',
                transclude: true
            };
    
            return directive;
        }
    
        function alertContent() {
            var directive = {
                link: link,
                require: '^bbAlert',
                replace: true,
                scope: false,
                templateUrl: 'bb/alert-content.html',
                transclude: true
            };
    
            return directive;
    
            function link(scope, element, attrs, ctrl) {
                // Enable option to show details
                ctrl.details = {
                    open: false
                };
    
                ctrl.openDetails = function() {
                    ctrl.details.open = !ctrl.details.open;
                };
            }
        }
    
        function alertDetails() {
            var directive = {
                link: link,
                require: '^bbAlert',
                replace: false,
                scope: false,
                templateUrl: 'bb/alert-details.html',
                transclude: true
            };
    
            return directive;
    
            function link(scope, element, attrs, ctrl, transcludeFn) {
                transcludeFn(function(clone) {
                    if (clone.length) {
                        ctrl.details.hasTranscluded = true;
                    }
                });
            }
        }
    }());
    