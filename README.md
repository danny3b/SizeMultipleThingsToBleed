SizeMultipleThingsToBleed InDesign Script

Based on SizeThingToPage.jsx script by Silicon Publishing, Inc.

Resizes the current selection to the size of the bleed. 
In contrary to SizeThingToPage.jsx this script doesn't group several selected objects into one but fit each object separately to the parent page. 

Notes:
* If the selection contains graphics, the graphics will be scaled according to the frame fitting options of their containing frames. If no frame fitting options are specified, only the frame will be scaled.
* If the selection contains text, only the frame will be scaled. Text will remain the same size.
