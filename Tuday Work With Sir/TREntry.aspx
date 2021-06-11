<%@ Page Title="TR Entry" Language="C#" MasterPageFile="~/MainMaster.master" AutoEventWireup="true" CodeFile="TREntry.aspx.cs" Inherits="SeaExport_Container_TREntry" %>

<asp:Content ID="Content1" ContentPlaceHolderID="ContentPlaceHolder1" runat="Server">

    <style>
        .clsFontBold {
            font-weight: bold;
        }

        .forFieldset {
            margin: 5px;
            border: 1px solid #aaa;
            margin-bottom: 0px;
        }

        .forFieldsetButton {
            margin: 5px;
            border: 1px solid #aaa;
            text-align: center;
            vertical-align: central;
            background-color: #E8E8E8;
            height: 30px;
            margin-top: 15px;
        }

            .forFieldsetButton input {
                margin-top: 2px;
                margin-right: 5px;
            }


        .table > thead > tr > th, .table > tbody > tr > th, .table > tfoot > tr > th, .table > thead > tr > td, .table > tbody > tr > td, .table > tfoot > tr > td {
            padding: 3px;
            border-top: 0px solid #ddd;
        }

        .table {
            margin-bottom: 0px;
        }
    </style>
    <script type="text/javascript" src="../Javascript/TREntry.js"></script>

    <div style="margin-top: 5px">
        <table style="width: 100%">
            <tr>
                <td style="width: 100%;">
                    <div id="dvTREntry">
                    <fieldset class="forFieldset">      
                        <legend style="background-color:gray;padding:2px;margin-left:20px;color:white;font-size:larger;font-weight:bold">TR Entry</legend> 
                         <table style="width: 100%;">
                            <tr>
                                <td style="width: 100%;">
                                    <table style="width: 100%;">
                                        <tr>
                                            <td style="width: 10%;">
                                                Shipper Name:
                                            </td>
                                            <td style="width: 60%;">
                                               <div id="ddlShipperName"></div>                                                                                         
                                            </td>  
                                            <td style="width:20%;">
                                                <input type="button" value="Get" id="BtnGet" />                                                                                    
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td style="width: 100%;">
                                    <fieldset class="forFieldset" style="width: 100%;height:425px">
                                    <div id="gridTREntry"></div>
                                    </fieldset>
                                </td>
                            </tr>
                        </table>
                    </fieldset>
                    </div>
                </td>
            </tr>
            <tr>
                <td style="width: 100%;text-align:center">
                    <div class="forFieldsetButton">
                        <table style="width: 100%">
                            <tr>
                                <td class="clsFontBold" style="text-align: center">
                                    <input type="button" value="Save" id='BtnSave' />
                                    <input type="button" value="Refresh" id='BtnRefresh' />                                   
                                </td>
                            </tr>
                        </table>
                    </div>
                </td>
            </tr> 
        </table>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
    </div>

    <div id='ControlAlertBox' style="display: none;">
        <div>
            <span style="font-weight: bold; font-size: 15px; font-family: Calibri">Delete Record</span>
        </div>
        <br />
        <div>
            Are You Sure, Do you want to delete ?&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="button" style="width: 50px" value="Yes" id="btnYes" />&nbsp;&nbsp;  
                <input type="button" style="width: 50px" value="No" id="btnNo" />
        </div>
    </div>



</asp:Content>
