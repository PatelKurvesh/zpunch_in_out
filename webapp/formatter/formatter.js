sap.ui.define([
	"sap/ui/core/library"
], function (coreLibrary) {
	"use strict";

	const { ValueState } = coreLibrary;

	const Formatter = {
		formatArrivalStatus: function (fValue) {
			// Ensure fValue is a string and map it to ValueState
			switch (fValue) {
				case "Late":
					return ValueState.Error; // Error state for "Late"
				case "On Time":
					return ValueState.Success; // Success state for "On Time"
				case "Delayed":
					return ValueState.Warning; // Warning state for "Delayed"
				default:
					return ValueState.None; // Default state
			}
		}
		
	};

	return Formatter;
});
