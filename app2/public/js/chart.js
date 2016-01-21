var r;

var xs = [];
var ys = [];

var data = [];
var axisy = [];
var axisx = [];

var H = 50; // hauteur d'une ligne
var L = 50; // largeur d'une colonne, plus utilisé

var cpt = 0;

var nbRow = 0;
var nbColumn = 0;

var addSerie = function(serie, opts){

	if(r){
		r.clear();
		document.getElementById("graph").innerHTML = "";
	}
	r = Raphael("graph");

	l = serie.length;

	++nbRow;
	++cpt;

	nbColumn = serie.length > nbColumn ? serie.length : nbColumn;

	if(opts['nameY']){
		axisy.push(opts['nameY']);
	} else {
		axisy.push("");
	}

	for (i = 0 ; i < serie.length ; ++i) {
    	xs.push(i);
    	ys.push(nbRow);
	}

	data = data.concat(serie);

	r.dotchart(0, 0, document.getElementById("graph").offsetWidth, nbRow * H, xs, ys, data, {symbol: "o", max: 10, heat: true, axis: "0 0 1 1", axisxstep: nbColumn - 1, axisystep: nbRow == 1 ? 1 : nbRow - 1, axisxlabels: axisx, axisxtype: " ", axisytype: " ", axisylabels: axisy})
    .hover(function () {
        this.marker = this.marker || r.tag(this.x, this.y, this.value, 0, this.r + 2).insertBefore(this);
        this.marker.show();
    }, function () {
        this.marker && this.marker.hide();
    });
}