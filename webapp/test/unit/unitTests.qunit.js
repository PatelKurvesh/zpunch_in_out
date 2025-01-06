/* global QUnit */
// https://api.qunitjs.com/config/autostart/
QUnit.config.autostart = false;

sap.ui.require([
	"zpunch_in_out/test/unit/AllTests"
], function (Controller) {
	"use strict";
	QUnit.start();
});