import { WebUtils } from '../scripts/package/WebUtils.js'
import { ModelHelper } from '../scripts/package/ModelHelper.js'

var app, viewer, curve, modelHelper, modelId, mock, glowComponent;
var webUtils = new WebUtils();
var BimfaceLoaderConfig = new BimfaceSDKLoaderConfig();
BimfaceLoaderConfig.viewToken = webUtils.getURLParameter('viewToken');
modelId = webUtils.getURLParameter('modelId');
mock = webUtils.getURLParameter('mock');


BimfaceSDKLoader.load(BimfaceLoaderConfig, onSDKLoadSucceeded, onSDKLoadFailed);
function onSDKLoadSucceeded(viewMetaData) {

    if (viewMetaData.viewType == "3DView") {
        var view = document.getElementById('view');
        var config = new Glodon.Bimface.Application.WebApplication3DConfig();
        config.domElement = view;
        var eventManager = Glodon.Bimface.Application.WebApplication3DEvent;
        app = new Glodon.Bimface.Application.WebApplication3D(config);
        viewer = app.getViewer();
        viewer.setCameraAnimation(true);
        //CLOUD.EnumRendererType.IncrementRender = true;
        app.addView(BimfaceLoaderConfig.viewToken);
        //viewer.addModel(viewMetaData);//该方法加入的模型不能渲染烘焙        
        viewer.setBorderLineEnabled(false);
        window.viewer = viewer;
        webUtils.viewer = viewer;
        glowComponent = '';
        modelHelper = new ModelHelper(viewer);
        viewer.addEventListener(Glodon.Bimface.Viewer.Viewer3DEvent.ViewAdded, function () {
            webUtils.initModel();
            viewer.enableGlowEffect(true);
            viewer.addEventListener(Glodon.Bimface.Viewer.Viewer3DEvent.MouseClicked, function (e) {

                if (!e.objectId) return;

                if (window.bim.queryCondition) {
                    let condition = viewer.getObjectDataById(e.objectId);
                    webUtils.layerPanel("#json-renderer", "auto", "auto", "筛选条件", 'layui-layer-molv', condition);
                    return;
                }

                if (window.bim.component) {
                    webUtils.layerPanel("#json-renderer", "auto", undefined, "构件信息", 'layui-layer-lan', e);
                    return;
                }

                if (window.bim.recordObjectId) {
                    webUtils.copyStringValue(e.objectId);
                    return;
                }

                if (window.bim.recordArea) {
                    let id = e.objectId;
                    modelHelper.copyBoundaryData(id);
                    return;
                }
            })
        });
    }
};

//渲染模型
function doAction(element) {
    let id = $(element).attr('data-id');
    layer.msg(id);
}

window.onload = function () {
    //Mock Data
    let mock_data = [];
    mock_data.push({ name: "3032905", baseEquipmentBeanList: [{ "id": 6864, "baseEquipment": "3032905", "name": "机械 空调送风风管 195", "normal": true }, { "id": 6865, "baseEquipment": "3032905", "name": "机械 空调送风风管 1" }, { "id": 6866, "baseEquipment": "3032905", "name": "冷冻水回水管 4" }, { "id": 6867, "baseEquipment": "3032905", "name": "冷冻水供水管 5" }] });
    mock_data.push({ name: "2717733", baseEquipmentBeanList: [{ "id": 6685, "baseEquipment": "2717733", "name": "机械 空调送风风管 224" }, { "id": 6766, "baseEquipment": "2717733", "name": "机械 空调送风风管 110", "normal": true }, { "id": 6883, "baseEquipment": "2717733", "name": "冷冻水回水管 7" }, { "id": 6884, "baseEquipment": "2717733", "name": "冷冻水供水管 10" }] });
    mock_data.push({ name: "2717758", baseEquipmentBeanList: [{ "id": 6687, "baseEquipment": "2717758", "name": "机械 空调送风风管 226" }, { "id": 6765, "baseEquipment": "2717758", "name": "机械 空调送风风管 109", "normal": true }, { "id": 6887, "baseEquipment": "2717758", "name": "冷冻水回水管 9" }, { "id": 6888, "baseEquipment": "2717758", "name": "冷冻水供水管 9" }] });
    mock_data.push({ name: "2717818", baseEquipmentBeanList: [{ "id": 5778, "baseEquipment": "2717818", "name": "机械 空调送风风管 126", "normal": true }, { "id": 6875, "baseEquipment": "2717818", "name": "机械 空调送风风管 196" }] });
    mock_data.push({ name: "2717776", baseEquipmentBeanList: [{ "id": 5775, "baseEquipment": "2717776", "name": "机械 空调送风风管 46", "normal": true }, { "id": 6894, "baseEquipment": "2717776", "name": "冷冻水供水管 13" }, { "id": 6895, "baseEquipment": "2717776", "name": "冷冻水回水管 12" }, { "id": 6896, "baseEquipment": "2717776", "name": "机械 空调送风风管 209" }] });

    //缓存设备影响空间
    let influence_boundary_cache = {};

    //缓存设备所在空间
    let belong_boundary_cache = {};

    webUtils.getValidateEquipment(modelId).then((_data) => {
        let html = '';
        let data = [];
        //如果使用真实返回的数据，将data = _data即可，页面跳转后增加mock参数，如果mock有值则用预定的mock数据，否则用真实的随机数据
        if (mock && mock == "1") {
            data = mock_data;
        } else {
            data = _data;
        }

        for (let i = 0, len = data.length; i < len; i++) {
            html += `<div class="btn-group"><button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">设备` + data[i].name + `<span class="caret"></span></button><ul class="dropdown-menu">`;
            let dropdownlist = data[i].baseEquipmentBeanList;
            for (let j = 0, jlen = dropdownlist.length; j < jlen; j++) {
                html += `<li style="cursor:pointer" data-id=` + dropdownlist[j].id + ` data-equ=` + dropdownlist[j].baseEquipment + `><a>` + dropdownlist[j].name + `</a></li>`;
            }
            html += `</ul></div>`;
        }
        $('#equ').html(html);
        $('#equ li').bind('click', (e) => {
            let inf = [];
            let mepId = $(e.currentTarget).attr('data-id');
            let baseEquipment = $(e.currentTarget).attr('data-equ');
            console.log("mepId", mepId);
            if (glowComponent) {
                //viewer.removeGlowEffectById([glowComponent]);
            }

            viewer.hideAllRooms();


            //viewer.setGlowEffectById([baseEquipment], { type: "outline", color: new Glodon.Web.Graphics.Color(255, 0, 12, 1) });

            //获取MEP回路上所有构件
            webUtils.getNetworkComponents(390, mepId).then((data) => {
                if (!data || data.length == 0) {
                    console.log('该设备无末端！');
                    layer.msg('该设备无末端！', { icon: 4 });
                    return;
                }
                viewer.isolateComponentsById(data, Glodon.Bimface.Viewer.IsolateOption.MakeOthersTranslucent);
                // viewer.overrideComponentsColorById(data, new Glodon.Web.Graphics.Color("#FFFF00"));
                viewer.overrideComponentsColorById([baseEquipment], new Glodon.Web.Graphics.Color("#FF0000"));
                viewer.render();
            });

            //TODO:检查当前【baseEquipment】是否已经计算过空间，如果计算过则直接获取，否则调用接口获取并存储
            if (influence_boundary_cache[mepId]) {
                viewer.showRoomsById(influence_boundary_cache[mepId]);
                viewer.setSelectedComponentsById(influence_boundary_cache[mepId]);
                viewer.zoomToSelectedComponents();
                viewer.removeSelectedId(influence_boundary_cache[mepId]);
                viewer.render();

            }

            //检查缓存中是否已经存在所属空间，存在的话直接从缓存获取
            if (belong_boundary_cache[mepId]) {
                viewer.showRoomsById(belong_boundary_cache[mepId]);
                viewer.render();
                return;
            }

            webUtils.getInflunceArea(1, 390, modelId, mepId).then((data) => {
                if (!data || data.length == 0) {
                    console.log('该设备所处MEP无影响空间！');
                    layer.msg('该设备所处MEP无影响空间！', { icon: 4 });
                    //return;
                } else {
                    let tempArr = [];
                    for (let i = 0, len = data.length; i < len; i++) {
                        let item = data[i];
                        let roomGuid = webUtils.guid();
                        let height = item.bboxMax.z - item.bboxMin.z;
                        let boundary = item.boundary;
                        tempArr.push(roomGuid);
                        inf.push(data[i].name);
                        viewer.createRoom(boundary, height, roomGuid, new Glodon.Web.Graphics.Color(234, 12, 12, 0.3), new Glodon.Web.Graphics.Color(234, 12, 12, 1));
                    }
                    influence_boundary_cache[mepId] = tempArr;
                    tempArr = [];
                    viewer.setSelectedComponentsById(influence_boundary_cache[mepId]);
                    viewer.zoomToSelectedComponents();
                    viewer.removeSelectedId(influence_boundary_cache[mepId]);
                    viewer.render();
                }

                webUtils.getRoomByComponent(1, modelId, baseEquipment, mepId).then((data) => {
                    if (!data || data.length == 0) {
                        console.log('该设备无所属空间！');
                        layer.msg('该设备无所属空间！', { icon: 4 });
                        return;
                    }
                    let belongRoom = data[0].boundary;
                    let belongName = data[0].name;
                    let height = data[0].bboxMax.z - data[0].bboxMin.z;
                    let belongGuid = webUtils.guid();
                    if (inf.indexOf(belongName) == -1) {
                        viewer.createRoom(belongRoom, height, belongGuid);
                    }
                    belong_boundary_cache[mepId] = [belongGuid];
                    viewer.render();
                });
                glowComponent = baseEquipment;
            });

        });

    });
}


function onSDKLoadFailed(error) {
    console.log("Failed to load SDK!");
};