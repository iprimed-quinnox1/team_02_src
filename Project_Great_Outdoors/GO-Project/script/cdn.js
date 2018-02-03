var cart = {
		storage: localStorage,
		lang: "en",
		bs: "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css",
		jq: "https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js",
		bsjs: "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js",
		
		angular: "https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.min.js",
		ng_anim: "https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular-animate.js",
		ng_sanitize:"https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular-sanitize.js",
		
		w3css:"https://www.w3schools.com/w3css/4/w3.css",
		view: "width=device-width, initial-scale=1.0",
		
		init: function (){
		
		//alert("Initializing");
		// <html lang="en">
		document.documentElement.lang = this.lang;
		var head = document.getElementsByTagName("head")[0];
	
		// <meta name="viewport" content="width=device-width, initial-scale=1.0">
		this.addChild(head, "meta", 
				[
					["name", "viewport"],
					["content", this.view],
				]
		);
		
		//<meta charset="utf-8">
		this.addChild(head, "meta", 
				[
					["charset", "utf-8"],
				]
		);
		
	  	//<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
		this.addChild(head, "link", 
				[
					["rel", "stylesheet"],
					["href", this.w3css],
				]
		);
	

		//<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
		this.addChild(head, "link", 
				[
					["rel", "stylesheet"],
					["href", this.bs],
				]
		);
	
	  	//<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
		if(window.jQuery === undefined){
			this.addChild(head, "script", 
					[
						["src", this.jq],
					]
			);
		}
		this.addChild(head,"script",
			[
				["src",this.angular]
			]
	);
		//<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
		if(window.bootstrap === undefined){
			this.addChild(head, "script", 
					[
						["src", this.bsjs],
					]
			);
		}

	},
	
	addChild: function (/* parent element*/ parent, /*child tag name*/ childName, /* key-value pairs*/ attribs ){
		
		if(parent){
			var child = document.createElement(childName);
			for(var i=0; i<attribs.length; i++){
				var prop = attribs[i];
				child[prop[0]] = prop[1];
			}
			
			parent.appendChild(child);
		}
	},
	
};

//initialize
cart.init();

