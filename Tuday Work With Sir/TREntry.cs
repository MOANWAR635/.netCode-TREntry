using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using SavvyShippingDataFramework;

namespace SeaExportBusinessFramework
{
   public class TREntry
    {
        List<SqlParameter> objSqlParameterList = null;

        public DataTable GetTREntryData(string Flag1, string SHIPPER_CODE)
        {
            DataTable objTable = null;
            objSqlParameterList = new List<SqlParameter>();
            try
            {
                AddSqlParameter.AddNewParameter(objSqlParameterList, "@FLAG", Flag1);
                AddSqlParameter.AddNewParameter(objSqlParameterList, "@SHIPPER_CODE", SHIPPER_CODE);
                //AddSqlParameter.AddNewParameter(objSqlParameterList, "@VOU_DATE_FROM", FromDate1);
                //AddSqlParameter.AddNewParameter(objSqlParameterList, "@VOU_DATE_TO", ToDate1);
                objTable = SqlDBManager.SelectDataset(objSqlParameterList, "UDSP_SHIPPER_TR_ENTRY", CommandType.StoredProcedure, MySqlConnection.CustomConnectionString).Tables[0];
            }
            catch (Exception ex)
            {
                // throw ex;
            }
            return objTable;
        }


        public int SaveTREntryData(string aFlag, string aXMLTRENTRY, string UserId)
        {
            int Result;
            try
            {
                objSqlParameterList = new List<SqlParameter>();
                AddSqlParameter.AddNewParameter(objSqlParameterList, "@XMLTRENTRY", aXMLTRENTRY);
                AddSqlParameter.AddNewParameter(objSqlParameterList, "@FLAG", aFlag);
                AddSqlParameter.AddNewParameter(objSqlParameterList, "@USER_ID", UserId);
                Result = Convert.ToInt32(SqlDBManager.SelectScalarData(objSqlParameterList, "UDSP_SHIPPER_TR_ENTRY", CommandType.StoredProcedure, MySqlConnection.CustomConnectionString));
            }
            catch (Exception ex)
            {
                throw;
            }
            return Result;
        }








    }
}
