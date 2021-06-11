(function ($) {
    $(document).ready(function () {

        $('#ControlAlertBox').SR({ width: 450, height: 100, isModal: true, draggable: false, resizable: false, autoOpen: false });

        $('#BtnRefresh').SBT({ width: '100' });
        $('#BtnSave').SBT({ width: '100' });
        $('#BtnGet').SBT({ width: '120', height: '30' });
        

        BindshipperName();
       

        $('#BtnGet').on('click', function () {
            var ddlShipperName = $('#ddlShipperName').attr('dfield');
        
            if (ddlShipperName == '' || ddlShipperName == undefined) {
                MessageControl('#myMessage', 'myMessageSuccess', 'Please select shipper from List.');
                return;
               
            }
            BindGridTrEntry();
        });


        $('#BtnSave').on('click', function () {
            var flag = 'SAVETRDATA';
            var xmlRequest = '';
            xmlRequest = xmlRequest + '<DATASET>';
            var datainformation = $('#gridTREntry').SBG('getdatainformation');
            var rowscount = datainformation.rowscount;
            if ((rowscount) > 0) {
                for (var m = 0; m < rowscount; m++) {
                    var data = $("#gridTREntry").SBG('getrowdata', m);
                    var trDate = data.TR_DATE.toString();
                    alert(trDate);
                    var trDate1 = trDate.substr(4, 11);
                    alert(trDate1);
                    xmlRequest = xmlRequest + '<RECORD>';
                    xmlRequest = xmlRequest + '<SHIP_BILL_NO>' + data.SHIP_BILL_NO + '</SHIP_BILL_NO>';
                    xmlRequest = xmlRequest + '<TR_DATE>' + trDate1 + '</TR_DATE>';
                    xmlRequest = xmlRequest + '</RECORD>';
                }
            }
            xmlRequest = xmlRequest + '</DATASET>';

            $.ajax({
                type: 'POST',
                url: 'TREntry.aspx/SaveTREntryData',
                async: true,
                cache: true,
                data: "{'Flag':'" + flag + "','XMLTRENTRY':'" + xmlRequest + "'}",
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                success: function (response) {
                    if (parseInt(response.d) > 0) {
                        MessageControl('#myMessage', 'myMessageSuccess', 'Record Saved Successfully.');
                        BindGridTrEntry();
                    }
                    else if (parseInt(response.d) == 0) {
                        MessageControl('#myMessage', 'myMessageError', 'Error during saving.');
                    }
                },
                failure: function (response) {
                    MessageControl('#myMessage', 'myMessageError', 'Try Connecting');
                },
                error: function (xhr, errorType, exception) {
                    var errorMessage = exception || xhr.statusText;
                    MessageControl('#myMessage', 'myMessageError', 'Try Connecting' + errorMessage);
                }
            });
        });



    });
   
    BindshipperName = function () {
        var sourceHdl =
        {
            datatype: "json",
            datafields: [
                { name: 'P_CODE' },
                { name: 'ADD_LINE_ONE' },
                { name: 'ADD_LINE_TWO' },
                { name: 'ADD_LINE_THREE' },
                { name: 'ADD_LINE_FOUR' },
                { name: 'NAME' }
            ],
            url: MyAppURL + '/SeaExport/SeaExportHandler/HandlerSeaExport.ashx',
            async: true
        };
        var flrdataAdapter = new $.Control.dataAdapter(sourceHdl,
            {
                formatData: function (data) {
                    if ($("#ddlShipperName").SP('searchString') != undefined) {
                        data.ShipperMaster_startsWith = $("#ddlShipperName").SP('searchString');
                        return data;
                    }
                }, autoBind: false
            }
        );
        try {
            $("#ddlShipperName").SP(
                {
                    width: "630",
                    height: 30,
                    source: flrdataAdapter,
                    remoteAutoComplete: true,
                    selectedIndex: 0,
                    minLength: 1,
                    dropDownWidth: 620,
                    scrollBarSize: 10,
                    dropDownHeight: 350,
                    placeHolder: "Type Shipper Name",
                    displayMember: "NAME",
                    valueMember: "P_CODE",

                    renderer: function (index, label, value) {
                        var item = flrdataAdapter.records[index];
                        if (item != null) {
                            //var label = '<div onmouseover="getData(\'' + item.NAME + '\')">' + item.NAME + '</div>';
                            var label = '<table><tr><td style="font-weight:bold">' + item.NAME + '{' + item.P_CODE + '}</td></tr><tr><td><div style="font-family: Calibri; margin-left: 15px; font-size: small"><b style ="background-color:lightgray" > Address :</b>' + item.ADD_LINE_ONE + '<br/>' + item.ADD_LINE_TWO + '<br/>' + item.ADD_LINE_THREE + '<br/>' + item.ADD_LINE_FOUR + '</div></td></tr></table>';
                            return label;
                        }
                        return "";
                    },
                    renderSelectedItem: function (index, item) {
                        var item = flrdataAdapter.records[index];
                        if (item != null) {
                            var label = item.NAME + '{' + item.P_CODE + '}';
                            $("#ddlShipperName").attr('dfield', item.P_CODE);
                            $("#ddlShipperName").attr('dname', item.NAME);
                            //$("#ddlShipperName").attr('dfield', item.NAME);
                            //$('#txtShipperAddress').val(item.ADD_LINE_ONE + item.ADD_LINE_TWO + item.ADD_LINE_THREE + item.ADD_LINE_FOUR);

                            return label;
                        }
                        else {
                            $("#ddlShipperName").attr('dfield', '');
                        }
                        return "";
                    },
                    search: function (searchString) {
                        flrdataAdapter.dataBind();
                    }
                });
            //$("#ddlShipperName").on('change', function (event)
            //{
            //    var items = $("#ddlShipperName").SP('getSelectedItem');
            //    var selectedItems = "Address:" + items.label;
            //    $("#dvPopup").html('<b>Address: </b>' +selectedItems);
            //});

        } catch (exce) { }
    }


    BindGridTrEntry = function () {
        var flag = 'TRDATA';
        var SHIPPER_CODE = $('#ddlShipperName').attr('dfield');
        
        var sourceGrid = {
            datatype: "xml",
            datafields: [
                { name: 'CART_ORDER_DT' },
                { name: 'SHIP_BILL_NO' },
                { name: 'DISCHARGE_PORT' },
                { name: 'SECTOR_NAME' },
                { name: 'GROSS_WT' },
                { name: 'NO_OF_PACK' },
                { name: 'TR_DATE' },
                { name: 'SHIPPER_CODE' },                
            ],
            async: false,
            record: 'OutputTable',
            data: { 'Flag': "'" + flag + "'", 'SHIPPER_CODE': "'" + SHIPPER_CODE + "'"},
            url: 'TREntry.aspx/GetTrEntryData',
        };

       

        var dataAdapterGrid = new $.Control.dataAdapter(sourceGrid, {
            contentType: 'application/json; charset=utf-8',
            loadError: function (ControlHR, status, error) {
                alert(error);
            }
        });

        var cellbeginedit = function (row, datafield, columntype, value) {
        }

        $("#gridTREntry").SBG({
            source: dataAdapterGrid,
            width: "100%",
            height: "310px",
            //pageable: true,
            filterable: true,
            sortable: true,
            enabletooltips: true,
            //selectionmode: 'checkbox',
            //selectionmode: 'singlecell',
            editable: true,
            columnsresize: true,
            altrows: true,
            virtualmode: false,
            //editable: true,
            rendergridrows: function (args) {
                return args.data;
            },
            columns: [
               { text: 'Cart Date', dataField: 'CART_ORDER_DT', width: "15%", pinned: true, editable: false },
                { text: 'S. B. NO.', dataField: 'SHIP_BILL_NO', width: "15%", pinned: true, editable: false },
                { text: 'Discharge Port', dataField: 'DISCHARGE_PORT', width: "10%", pinned: true, editable: false },
                { text: 'Sector Name', dataField: 'SECTOR_NAME', width: "25%", pinned: true, editable: false },
                { text: 'Gross Weight', dataField: 'GROSS_WT', width: "10%", pinned: true, editable: false },
                { text: 'No. Of Pack', dataField: 'NO_OF_PACK', width: "10%", pinned: true, editable: false },
                {
                    text: 'TR Entry Date', width: "15%", datafield: 'TR_DATE', filtertype: 'date', cellsformat: 'dd/MM/yyyy', editable: true, align: 'center', cellsalign: 'center', columntype: 'datetimeinput',
                    createeditor: function (row, cellvalue, editor) {
                        editor.SI({ formatString: 'dd/MM/yyyy' });
                    }
                },



            ]
        });
        $("#gridTREntry").SBG('clearSelection');
    };


})(jQuery);