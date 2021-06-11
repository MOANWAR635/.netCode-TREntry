using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Services;
using System.Web.Script.Services;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using System.Web.Script.Serialization;
using SavvyShippingDataFramework;
using FinanceBusinessFramework;
using FinanceObjectFramework;
using SeaExportBusinessFramework;
public partial class SeaExport_Container_TREntry : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }


    [WebMethod]
    [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Xml)]
    public static string GetTrEntryData(string Flag, string SHIPPER_CODE)
    {
        TREntry obj = new TREntry();
        string Flag1 = HttpUtility.UrlDecode(Flag) ?? "";
        // int aBankBookNo = Convert.ToInt32(BankBookNo);
        // DateTime FromDate1 = Utility.GetFormattedDate(FromDate);
        // DateTime ToDate1 = Utility.GetFormattedDate(ToDate);
        string SHIPPERCODE = HttpUtility.UrlDecode(SHIPPER_CODE) ?? "";
        DataTable dt = obj.GetTREntryData(Flag1, SHIPPER_CODE);
        System.IO.StringWriter writer = new System.IO.StringWriter();
        dt.WriteXml(writer, XmlWriteMode.WriteSchema, false);
        return writer.ToString();
    }


    //Hearing is use to Save Operation
    [WebMethod()]
    public static string SaveTREntryData(string Flag, string XMLTRENTRY)
    {
        TREntry obj = new TREntry();
        string aFlag = HttpUtility.UrlDecode(Flag) ?? "";
        string aXMLTRENTRY = Convert.ToString(XMLTRENTRY);

        string UserId = "0"; //Applicationfields.Login_User_Id;

        string result = "";
        result = Convert.ToString(obj.SaveTREntryData(aFlag, aXMLTRENTRY, UserId));
        return result;
    }







}