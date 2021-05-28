var style = [{
			"selector": "core",
			"style": {
				"selection-box-color": "#AAD8FF",
				"selection-box-border-color": "#8BB0D0",
				"selection-box-opacity": "0.5"
			}
		}, {
			"selector": "node",
			"style": {
				/*
				"width": "mapData(score, 0, 0.006769776522008331, 20, 60)",
				"height": "mapData(score, 0, 0.006769776522008331, 20, 60)",
				*/
				"content": "data(name)",
				"font-size": "8px",
				"text-valign": "center",
				"text-halign": "center",				
                                "background-color": "#555",
				"text-outline-color": "#555",
				"text-outline-width": "2px",
				"color": "#fff",                                
				"overlay-padding": "6px",
				"z-index": "10"
			}
		}, {
			"selector": "node:selected",
			"style": {
				"border-width": "6px",
				"border-color": "#AAD8FF",
				"border-opacity": "0.5",
				"background-color": "#77828C",
				"text-outline-color": "#77828C"
			}
		}, {
			"selector": "node.highlighted",
			"style": {
				"border-width": "6px",
				"border-color": "#AAD8FF",
				"border-opacity": "0.5",
				"background-color": "#394855",
				"text-outline-color": "#394855"
			}
		}, {
			"selector": "node.unhighlighted",
			"style": {
				"opacity": "0.2"
			}
		}, {
			"selector": "edge",
			"style": {

				'target-arrow-shape': 'triangle',
				'line-color': '#9dbaea',
				'target-arrow-color': '#9dbaea',
				'curve-style': 'bezier'
                                /*
                                "curve-style": "haystack",
                                "haystack-radius": "0.5",
                                "opacity": "0.4",
                                "line-color": "#bbb",
                                "width": "mapData(weight, 0, 1, 1, 8)",
                                "overlay-padding": "3px"
                                */
			}
		}, {
			"selector": "edge.filtered",
			"style": {
				"opacity": "0"
			}
		}];