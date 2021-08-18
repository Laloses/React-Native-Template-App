export default function TreeChart(data, backColor){
  return `
  <!DOCTYPE html>
  <html style="height:100%; width: 100%;">
  <head>
    <meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
    
    <script src="https://cdn.jsdelivr.net/gh/deltoss/d3-mitch-tree@1.0.6/dist/js/d3-mitch-tree.min.js"></script>
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/deltoss/d3-mitch-tree@1.0.6/dist/css/d3-mitch-tree.min.css">
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/deltoss/d3-mitch-tree@1.0.6/dist/css/d3-mitch-tree-theme-default.min.css">
  </head>
   
  <body style="height:100%; width: 100%;">
	<style>
		.customStyle: {background-color: ${backColor} !important}
	</style>
	
    <div class="customStyle" id="visualisation" style="height:100%; max-height:100%; width: 100%; max-width:100%">
    </div>

    <script>
      var data = ${JSON.stringify(data)};
      
      var treePlugin = new d3.mitchTree.boxedTree()
		.setData(data)
		.setElement(document.getElementById("visualisation"))
		.setIdAccessor(function(data) {
			return data.id;
		})
		.setChildrenAccessor(function(data) {
			return data.children;
		})
		.setBodyDisplayTextAccessor(function(data) {
			return data.description;
		})
		.setTitleDisplayTextAccessor(function(data) {
			return data.name;
		})
		.setOrientation('topToBottom')
		.setMargins({
			top: 20,
			right: 20,
			bottom: 20,
			left: 20
		})
		.initialize();

    </script>
  </body>
  </html>`
}