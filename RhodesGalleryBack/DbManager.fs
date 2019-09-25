namespace RhodesGallery

open Microsoft.Data.Sqlite
open System.Configuration
open System.Data
open System.IO

open Microsoft.Data.Sqlite
open RhodesGallery.Helpers

module DbManager =    
    let private databaseLocation =
        ConfigurationManager.AppSettings.["DbLocation"]
        |> Helpers.asOption
        
    let private connectionString =
        databaseLocation
        |> Option.map (fun x -> sprintf "Data Source=%s;" x)
        
    let SQLiteConn x = new SqliteConnection(x)
    
    let newConnection() =        
        connectionString
        |> Option.map SQLiteConn
        
    let openConnection (c : SqliteConnection) = c.Open()
    
    let closeConnection (c : SqliteConnection) = c.Close()
    
    let newCommand sql (connection: SqliteConnection) =
        let command = connection.CreateCommand()
        command.CommandText <- sql
        command
        
    let getItem getter (dr : SqliteDataReader) field =
        let ordinal = dr.GetOrdinal(field)
        getter dr ordinal
        
    let getOptionalItem getter (dr : SqliteDataReader) field =
        try
            Some (getItem getter dr field)
        with
        | _ -> None
        
    let getString (dr : SqliteDataReader) =
        getItem (fun dri ord -> dri.GetString(ord)) dr
        
    let getInt (dr : SqliteDataReader) =
        getItem (fun dri ord -> dri.GetInt32(ord)) dr
        
    let getBlob (dr : SqliteDataReader) =
        getItem (fun dri ord -> dri.GetStream(ord)) dr
        
    let getOptionalString (dr : SqliteDataReader) =
        getOptionalItem (fun dri ord -> dri.GetString(ord)) dr
        
    let getOptionalInt (dr : SqliteDataReader) =
        getOptionalItem (fun dri ord -> dri.GetInt32(ord)) dr
        
    let getOptionalBlob (dr : SqliteDataReader) =
        getOptionalItem (fun dri ord -> dri.GetStream(ord)) dr
        
    let collectRows (dr: SqliteDataReader) rd =
        let rec collectRowsInternal acc =
            if (dr.Read()) then
                collectRowsInternal (rd dr :: acc)
            else
                acc
                
        collectRowsInternal []
        
    let query sql reader = async {
        let connection = newConnection()
        try
            try
                let c = Option.get connection
                c.Open()
                let command = newCommand sql c
                let! result = Async.AwaitTask(command.ExecuteReaderAsync())
                let rows = collectRows result reader
                c.Close()
                return Ok rows
            with
            | ex ->
                return Error ex
        finally
            connection |> Option.map (fun x -> x.Close()) |> ignore
    }
