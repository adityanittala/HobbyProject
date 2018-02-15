/* Save this file with a jsx extension and place in your
Illustrator/Presets/en_US/Scripts folder. You can then 
access it from the File > Scripts menu */

if (app.documents.length > 0) {

	if (app.activeDocument.selection.length < 1) {
		alert('Select a path first');
	} else if (app.activeDocument.selection[0].area) {
		// Individual Items
		var objects =  app.activeDocument.selection;
	} else if (app.activeDocument.selection[0].pathItems) {
		// Group/Compound Shape
		var objects = app.activeDocument.selection[0].pathItems;
		alert(objects);
	} else { 
		alert('Please select a path or group.');
	}
	
	// Collect info
	var totalArea = 0;
	for (var i=0; i<objects.length; i++) {
		if (objects[i].area) {
			var totalArea = totalArea + objects[i].area;
		}
	}
    
	// Conversions    
	var ppi = 72;
	var areaInInches = Math.round((totalArea / ppi / ppi) * 100) / 100;
	if (areaInInches < 0) var areaInInches = -areaInInches;
	
	// Display
	alert('Shape Area\n' + areaInInches + ' square inches \n' + i + ' shapes');

}