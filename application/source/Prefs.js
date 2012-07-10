enyo.kind({
	name: "Prefs",
	kind: enyo.VFlexBox,
	flex: 1,
	className: "basic-back",
	
	_groups: [],
	
	_categories: [
		{category: "accounts", count: 0},
		{category: "backup", count: 0},
		{category: "bluetooth", count: 0},
		{category: "date & time", count: 0},			
		{category: "device info", count: 0},
		{category: "exhibition", count: 0},
		{category: "help", count: 0},
		{category: "just type", count: 0},
		{category: "location services", count: 0},
		{category: "luna", count: 0},
		{category: "print manager", count: 0},			
		{category: "regional settings", count: 0},			
		{category: "screen & lock", count: 0},			
		{category: "software manager", count: 0},			
		{category: "sounds & ringtones", count: 0},			
		{category: "system updates", count: 0},			
		{category: "text assist", count: 0},			
		{category: "VPN", count: 0},			
		{category: "wi-fi", count: 0},						
	],
	
	events: {
		onSelect: ""
	},
	
	components: [
		{kind: "wi.Header", random: [{weight: 100, tagline: "Tweak the hell out of webOS!"}]}, 
		
		{name: "main", layoutKind: "VFlexLayout", flex: 1, components: [
			{name: "scroller", kind: "Scroller", height: "100%", components: [
				{name: "categories", kind: "VirtualRepeater", onSetupRow: "setupCategory", components: [
					{kind: "Item", layoutKind: "HFlexLayout", flex: 1, align: "center", tapHighlight: true, 
						onclick: "handleCategory", components: [
							{name: "icon", kind: "Image", src: "images/icon-generic.png", style: "margin: -10px 18px -8px 5px;"}, 
							{name: "category", flex: 1, style: "text-transform: capitalize; margin-top: -1px;"},
							{name: "count", className: "enyo-label", style: "padding-right: 20px;"}
					]}
				]}
			]}
		]}
	],
	
	adjustInterface: function(inSize) {
		this.$.scroller.applyStyle("height", (inSize.h - 87) + "px");
	},
	
	updateTweaks: function(inTweaks) {
		this.owner._config = inTweaks;
	
		this._groups = [];		
		this._categories = [];
		
		var totalCount = 0;
		
		for(var category in inTweaks) {
			if(category.slice(0,1) == "_")
				continue;

			var count = 0;

			if(inTweaks[category] != undefined) {
				for(var group in inTweaks[category]) {
					for(var j = 0; j < inTweaks[category][group].length; j++) {
						if((inTweaks[category][group][j].deleted == undefined) && 
						((inTweaks[category][group][j].type == "TextField") ||
						(inTweaks[category][group][j].type == "ToggleButton") ||
						(inTweaks[category][group][j].type == "ListSelector") ||
						(inTweaks[category][group][j].type == "IntegerPicker") ||
						(inTweaks[category][group][j].type == "FilePicker")))
						{
							count++;
							totalCount++;
						}
					}
				}
			}

			this._groups.push(inTweaks[category]);
			
			this._categories.push({category: category, count: count});
		}

		this.$.categories.render();
		
		return totalCount;
	},
	
	setupCategory: function(inSender, inIndex) {
		if((this._categories.length > 0) && (this._categories.length > inIndex) && (inIndex >= 0)) {
			this.$.category.setContent(this._categories[inIndex].category);
			this.$.count.setContent(this._categories[inIndex].count);
			
			if((this._categories[inIndex].category == "browser") ||
				(this._categories[inIndex].category == "calendar") ||
				(this._categories[inIndex].category == "camera") ||
				(this._categories[inIndex].category == "clock") ||
				(this._categories[inIndex].category == "contacts") ||
				(this._categories[inIndex].category == "email") ||
				(this._categories[inIndex].category == "messaging") ||
				(this._categories[inIndex].category == "phone") ||
				(this._categories[inIndex].category == "luna"))
			{
				this.$.icon.setSrc("images/icon-" + this._categories[inIndex].category + ".png");
			}
			
			if(this._categories[inIndex].count == 0) {
				this.$.icon.applyStyle("opacity", 0.4);
				
				this.$.category.applyStyle("color", "#666666");
			}
					
			return true;
		}
	},

	handleCategory: function(inSender, inEvent) {
		if(this._categories[inEvent.rowIndex].count > 0) {
	      var list = this.$.categories.getOffset();
		
			this.doSelect(list.top + (inEvent.rowIndex * 45), this._categories[inEvent.rowIndex].category, this._groups[inEvent.rowIndex]);
		}
	}
});

