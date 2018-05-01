/*
 * By Bryce Shelley
 * To create:
 *
   if (window.Worker) {
        var worker = "<URL of this file>";
        var importFromCSV = new Worker(worker);


        importFromCSV.postMessage({
            realm: <QB REALM>,
            apptoken: <APP TOKEN>,
            dbid: <DBID TO WRITE TO>,
            csv: <CSV>,
            clist: <CSV COLUM FIDS>})

        importFromCSV.onmessage = function(e) {
            var xmlResult = e.data;
            var response = XML2OBJ($.parseXML(xmlResult));
        }
    }
 */
onmessage = function(e) {
    var url = "https://" + e.data.realm + ".quickbase.com/db/" + e.data.dbid + "?a=API_ImportFromCSV";
    url +=  "&apptoken=" + e.data.apptoken + "&records_csv=" + encodeURIComponent(e.data.csv);
    if (e.data.clist) url += "&clist=" + e.data.clist;
    if (e.data.ticket) url += "&ticket=" + e.data.ticket;
    if (e.data.clist_output) url += "&clist_output=" + e.data.clist_output;
    if (e.data.decimalPercent) url += "&decimalPercent=" + e.data.decimalPercent;
    if (e.data.skipfirst) url += "&skipfirst=" + e.data.skipfirst;
    if (e.data.msInUTC) url += "&msInUTC=" + e.data.msInUTC;
    if (e.data.udata) url += "&udata=" + e.data.udata;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            var result = xmlHttp.responseText;
            self.postMessage(result);
        }
    };
    xmlHttp.open("GET", url, true); // true for asynchronous
    xmlHttp.send(null);
};