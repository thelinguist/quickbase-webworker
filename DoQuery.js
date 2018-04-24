/**
 * By Bryce Shelley
 * To Create:

 if (window.Worker) {

    const worker = "<url of this file>"
    let doQueryW = new Worker(worker);

    doQueryW.postMessage({
        dbid: "<DBID>"
        query: "<QB QUERY>",
        clist: "<CLIST>",
        realm: "<REALM>",
        apptoken: "<APPTOKEN>",
    });

    doQueryW.onmessage = function(e) {
        let xmlResult = e.data;
        let rawData = XML2OBJ($.parseXML(xmlResult));
    };
 }
 */
onmessage = function(e) {
    var url = "https://" + e.data.realm + ".quickbase.com/db/" + e.data.dbid + "?a=API_DoQuery" +  "&app_token=" + e.data.apptoken + "&query=" + e.data.query + "&clist=" + e.data.clist;
    if (e.data.ticket) url += "&ticket=" + e.data.ticket;
    if (e.data.slist) url += "&slist=" + e.data.slist;
    if (e.data.options) url += "&options=" + e.data.options;
    url += "&fmt=structured";
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