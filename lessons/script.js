	var saveTimeout;
	var globResult;

	function save() {
		if (saveTimeout) clearTimeout(saveTimeout);
    
		localStorage.setItem("codeCafe_text", myCodeMirror.getValue());
		$("#save").html("Saved!");

		var saveTimeout = setTimeout(function() {
			$("#save").html("Save");
		}, 1000);
	
		myCodeMirror.focus();
	}

	function saveOffline(){
		codeText = myCodeMirror.getValue();
		var blob = new Blob([codeText], {type: "text/javascript;charset=utf-8"});
		saveAs(blob, "CodeCafeCode.js");
	}

	function runData() {
		save();
		try {
			var code = String(myCodeMirror.getValue());
			var start = new Date().getMilliseconds();
			code = "var start = new Date().getTime();\n" + code;
			if((code.indexOf("while") > -1) || ((code.indexOf("for") > -1)))
			{
				code = code.replace("{","{\nvar end = new Date().getTime();\nif(end - start >= 2000){\nprint('You probably hit an  infinite loop');\n break;\n}\n");
			}
			var result = eval(String(code));
		} catch (e) {
			console.log(e);
			result = e.message;
			$("#rightText").val($("#rightText").val() +"\n"+ ">: "+result);
		}
	}

	function clearIDE() {
		myCodeMirror.setValue("");
		
		myCodeMirror.focus();
	}
	
	function clearTerminal() {
		$("#rightText").val("");
		
		myCodeMirror.focus();
	}

	function Print(input) {
		var result;
		var answer = "Hello";
	
		if (typeof(input) === 'string') {
			result = input.trim();
		} else if(typeof(input) === 'boolean') {
			console.log("Boolean: "+input)
			result = input;
		} else {
			result = eval(String(input))
		}
     
		$("#rightText").val($("#rightText").val() +"\n"+ ">: "+result);
		dispRepeat = input;
		$("#rightText").animate({ scrollTop: "+=200"},1);
	}

	function switchTheme() {
		var theme = localStorage.getItem("theme");

		if (theme === "dark") {
			myCodeMirror.setOption("theme", "xq-light");
			localStorage.setItem("theme", "light");
			$("#dark").html("Dark");
		} else {
			myCodeMirror.setOption("theme", "monokai");
			localStorage.setItem("theme", "dark");
			$("#dark").html("Light");
		}
		
		myCodeMirror.focus();
	}
	
	function fontInc() {
		var fontSize = parseInt(localStorage.getItem("fontSize"));
		if (fontSize >= 56) return;
		fontSize = fontSize+2;
		$('.CodeMirror').css("font-size", fontSize+"px");
		$('#rightText').css("font-size", fontSize+"px");
		localStorage.setItem("fontSize", fontSize);
		myCodeMirror.refresh();
		myCodeMirror.focus();
	}
	
	function fontDec() {
		var fontSize = parseInt(localStorage.getItem("fontSize"));
		if (fontSize <= 2) return;
		fontSize = fontSize-2;
		$('.CodeMirror').css("font-size", fontSize+"px");
		$('#rightText').css("font-size", fontSize+"px");
		localStorage.setItem("fontSize", fontSize);	
		myCodeMirror.refresh();
		myCodeMirror.focus();
	}
  
	window.print = Print;