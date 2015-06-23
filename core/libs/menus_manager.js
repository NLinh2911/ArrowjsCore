'use strict';
/**
 * Created by thanhnv on 2/23/15.
 */
let menus = {};

module.exports = function () {
    // Main Navigation group
    menus.default = {
        title: 'Main Navigation',
        sort: 1,
        modules: {}
    };

    // System group
    menus.systems = {
        title: 'Systems',
        sort: 2,
        modules: {}
    };

    // Sorting menu
    menus.sorting = {};
    menus.sorting.default = [
        //"dashboard",
        //"blog"
        //"logs"
    ];
    menus.sorting.systems = [
        //"users",
        //"roles",
        //"menus",
        //"widgets",
        //"modules",
        //"plugins",
        //"configurations"
    ];
    return menus;
};

module.exports.addMenu = function (module) {
    if (__modules[module].hasOwnProperty('backend_menu')) {
        if (!__modules[module].system) {
            __menus.sorting.default.push(module);
            __menus.default.modules[module] = __modules[module].backend_menu;
        }
        else {
            __menus.sorting.systems.push(module);
            __menus.systems.modules[module] = __modules[module].backend_menu;
        }
    }
};

module.exports.modifyMenu = function (module) {
    let _ = require('lodash');
    if (!__modules[module].system) {
        _.assign(__menus.default.modules[module], __modules[module].backend_menu);
    } else {
        _.assign(__menus.systems.modules[module], __modules[module].backend_menu);
    }
};

module.exports.removeMenu = function (module) {
    if (__modules[module].hasOwnProperty('backend_menu')) {
        if (!__modules[module].system) {
            let i = __menus.sorting.default.indexOf(module);
            if (i > -1) __menus.sorting.default.splice(i, 1);
            delete __menus.default.modules[module];
        }
        else {
            let i = __menus.sorting.systems.indexOf(module);
            if (i > -1) __menus.sorting.systems.splice(i, 1);
            delete __menus.systems.modules[module];
        }
    }
};