/**
 * 统一配置IP地址以及接口地址
 * 以及常用常量
 **/


var wandademo = 'http://39.105.64.228:90/bim/';
var wandademo2 = 'http://10.0.197.82:8078/bim/';

var hostAddr = {

    getIntegratePreviewToken: wandademo + "/token/getIntegratePreviewToken",
    upload: wandademo + "/file/upload",
    translate: wandademo + "/file/translate",
    fileToken: wandademo + "/token/getFilePreviewToken",
    generateOfflineBag: wandademo + "/file/generateOfflineDataBag",
    downloadOfflineBag: wandademo + "/file/downloadOfflineDataBag",
    getEquReferArea: wandademo + "/equipmentRefer/getRoomByComponent",
    saveMepData: wandademo + "/fetch/saveMepData"

};
var JSONTYPE = "application/json";
var httpOk = 20000;
var method = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE"
};
