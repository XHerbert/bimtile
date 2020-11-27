/**
 * 统一配置IP地址以及接口地址
 * 以及常用常量
 **/

var gfmconfigcenter = 'http://10.0.197.82:8079';
var gfmconfigcenter2 = 'http://10.2.65.31:8079';
var gfmbim = 'http://10.0.197.82:8078/bim';
var gfmbim2 = 'http://10.2.65.31:8078/bim';
var gfmdata = 'http://10.0.197.82:82/gfmdata';
var gfmrefer = 'http://10.0.197.82:85/glgx';
var gfmdemo = 'http://10.2.65.31:8001/html';
var gfmeffective = 'http://10.0.197.31:8370/wanda';
//var gfmeffective = 'http://localhost:8370/wanda';

var hostAddr = {
    system_config: gfmconfigcenter + '/conf/system/config/',
    scene: gfmconfigcenter + '/conf/scene/',
    getScene: gfmconfigcenter + '/conf/scene/getScenes',
    authority: gfmconfigcenter + '/conf/appkey/',
    equPropGroup: gfmconfigcenter + '/conf/equPropGroup/',
    threshold: gfmconfigcenter + '/conf/equThreshold/',
    iotequprop: gfmconfigcenter + '/conf/iotEquprops/',
    iotRuncondition: gfmconfigcenter + '/conf/iotRuncondition/',
    runStateLegend: gfmconfigcenter + '/conf/systemLegend/',
    getSystemConfigTree: gfmconfigcenter + '/conf/system/config/getSystemConfigTree',
    getDataTransferTree: gfmconfigcenter + '/conf/system/config/getDataTransferTree',
    getIntegrateByProject: gfmconfigcenter + "/conf/system/config/getIntegrateByProject",

    equTypeListTree: gfmdata + '/equFill/getEquTypeListTree',
    integrateSubFiles: gfmbim + '/integrate/integrateSubFiles',
    integrateHistory: gfmbim + '/integrate/integrateHistory',
    modelInfoList: gfmbim + '/integrate/getModelInfoBeanList',
    startIntegrate: gfmbim + "/integrate/integrateModels",
    getMainEquipmentRoundRef: gfmbim + '/equipmentRefer/getMainEquipmentRoundRef',
    bySystemName: gfmbim + '/equipmentRefer/bySystemName',
    addOrUpdateMainEquipmentRefer: gfmbim + '/equipmentRefer/addOrUpdateMainEquipmentRefer',
    getDrawingSpaceInfo: gfmdata + "/connect/getDrawingSpaceInfo",
    getIntegratePreviewToken: gfmbim + "/token/getIntegratePreviewToken",
    queryAreaInfo: gfmbim + "/area/queryAreaInfo",

    upload: gfmbim + "/file/upload",
    translate: gfmbim + "/file/translate",
    fileToken: gfmbim + "/token/getFilePreviewToken",
    generateOfflineBag: gfmbim + "/file/generateOfflineDataBag",
    downloadOfflineBag: gfmbim + "/file/downloadOfflineDataBag",

    bake: gfmbim + "/bakeOperation/bake",
    queryBake: gfmbim + "/bakeOperation/getBakeProcess",
    bakeIn: gfmbim + "/bakeOperation/bake",
    bakeList: gfmbim + "/bakeOperation/getBakeListByProject",

    confProject: gfmconfigcenter + "/conf/scene/getProjectList",
    multiReferPage: gfmrefer,

    demoList: gfmdemo + '/directory/index.html',

    createMainScene: gfmeffective + '/bimModelEffective/createScene',
    createSceneEffective: gfmeffective + '/bimModelDetailEffective/createSceneDetail',
    getMainSceneList: gfmeffective + '/bimModelEffective/getSceneList',
    getEffectiveList: gfmeffective + '/bimModelDetailEffective/getSceneDetailList',
    deleteScene: gfmeffective + '/bimModelEffective/disableScene',
    deleteDetailStep: gfmeffective + '/bimModelDetailEffective/disableSceneDetail'

};
var JSONTYPE = "application/json";
var httpOk = 20000;
var method = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE"
};
