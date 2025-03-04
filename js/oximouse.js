//Oximouse js fnxns
/// @author Devin K Schweppe
/// All rights reserved, 2019
/// Authors, Gygi Lab, President and Fellows of Harvard University
///

/**
 * Consume flat file data, featureViewer relies on d3 v3.5, use that for tsv reading
 * @param newDataSource
 * @returns
 */
function ConsumeSearchData(newDataSource){
    return d3.tsv(newDataSource).then(function(value) {
    	//generate protein list for searching
    	allSiteData = value;
		$( "#sitesSearchInput" ).autocomplete({
			source: [...new Set(allSiteData.map(b=>b.Gene))],
			minLength: 2
		});
		$( "#sitesSearchInputHome" ).autocomplete({
			source: [...new Set(allSiteData.map(b=>b.Gene))],
			minLength: 2
		});
    });
}

$("#sitesSearchInput").keypress(function(e) {
	if(e.keyCode==13){
		SearchSites(document.getElementById('sitesSearchInput').value);
	}
});

$("#sitesSearchInputHome").keypress(function(e) {
	if(e.keyCode==13){
		SearchSites(document.getElementById('sitesSearchInputHome').value);
	}
});

/**
 * Search for a symbol or geneID
 * @param query
 * @param focus
 * @returns
 */
function SearchSites(query, focus = true){
	if(typeof allSiteData == "undefined"){
		alert("Data is being loaded, please try search again in a few moments.")
	}
	var protein;
	protein = allSiteData.filter(b=>b.Gene.toUpperCase() == query.toUpperCase() || b.Uniprot.toUpperCase() == query.toUpperCase());
	if(protein.length < 1){
		return false;
	}
}