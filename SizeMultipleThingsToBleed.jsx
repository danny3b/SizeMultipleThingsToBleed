//SizeMultipleThingsToBleed.jsx
//Based on SizeThingToPage.jsx script by Silicon Publishing, Inc.
//
//Resizes the current selection to the size of the bleed. 
//In contrary to SizeThingToPage.jsx this script doesn't group several selected objects into one but fit each object separately to the parent page. 
/*
    Notes:

    * If the selection contains graphics, the graphics will be scaled according to the frame fitting options of their
      containing frames. If no frame fitting options are specified, only the frame will be scaled.
      
    * If the selection contains text, only the frame will be scaled. Text will remain the same size.
*/
app.scriptPreferences.measurementUnit = MeasurementUnits.POINTS;
main();

function main(){
    if(app.documents.length > 0){
        if(app.documents.item(0).selection.length > 0){
            try{
                var thing = document.selection;
                var page = document.selection[0].parentPage;
                if(page == undefined){
                    var activeWindow = app.activeWindow;
                    page = activeWindow.activePage;
                }      
               for(i = 0; i < document.selection.length; i++) {
                    sizeThingToPage(thing[i].parentPage, thing[i]);
                   
                }
            }
            catch(error){
                alert("Error sizing thing to page. " + error.message);
            }
        }
        else{
            alert("Please select a page item and try again.");
        }
    }
    else{
        alert("Please open a document, select a page item, and try again.");
    }
}

function sizeThingToPage(page, thing){
    var pageNumber = page.name;
    var bottomBleed = (app.documents.item(0).documentPreferences.documentBleedBottomOffset);
    var topBleed = (app.documents.item(0).documentPreferences.documentBleedTopOffset);
    var leftBleed = (app.documents.item(0).documentPreferences.documentBleedInsideOrLeftOffset);
    var rightBleed = (app.documents.item(0).documentPreferences.documentBleedOutsideOrRightOffset);

	if(page.parent.pages.length > 1){
        topLeft = page.resolve(AnchorPoint.TOP_LEFT_ANCHOR, CoordinateSpaces.PASTEBOARD_COORDINATES)[0];
		bottomRight = page.resolve(AnchorPoint.BOTTOM_RIGHT_ANCHOR, CoordinateSpaces.PASTEBOARD_COORDINATES)[0];
        if(pageNumber % 2 == 0) {
            thing.reframe(CoordinateSpaces.PASTEBOARD_COORDINATES, [[topLeft[0]-leftBleed,topLeft[1]-topBleed], [bottomRight[0],bottomRight[1]+bottomBleed]]);
        } else {
            thing.reframe(CoordinateSpaces.PASTEBOARD_COORDINATES, [[topLeft[0],topLeft[1]-topBleed], [bottomRight[0]+rightBleed,bottomRight[1]+bottomBleed]]);
        }
	} else {
		topLeft = page.resolve(AnchorPoint.TOP_LEFT_ANCHOR, CoordinateSpaces.PASTEBOARD_COORDINATES)[0];
		bottomRight = page.resolve(AnchorPoint.BOTTOM_RIGHT_ANCHOR, CoordinateSpaces.PASTEBOARD_COORDINATES)[0];
        thing.reframe(CoordinateSpaces.PASTEBOARD_COORDINATES, [[topLeft[0]-leftBleed,topLeft[1]-topBleed], [bottomRight[0]+rightBleed,bottomRight[1]+bottomBleed]]);
	}
}
