namespace RhodesGallery
open Microsoft.Data.Sqlite
open Newtonsoft.Json

type Biography = {
    id: int;
    code: string;
    order: int;
    text: string;
} with
    static member reader (dr : SqliteDataReader) = {
        id = DbManager.getInt dr "Id";
        code = DbManager.getString dr "Code";
        order = DbManager.getInt dr "Order";
        text = DbManager.getString dr "SectionText";
    }
    
    static member inline getAllQuery = "SELECT * FROM Biography"

type Books = {
    id: int;
    code: string;
    name: string;
    url: string;
    order: int;
    [<JsonConverter(typedefof<OptionConverter>)>]
    imageUrl: string option;
    [<JsonConverter(typedefof<OptionConverter>)>]
    description: string option;
} with
    static member reader (dr : SqliteDataReader) = {
        id = DbManager.getInt dr "Id";
        code = DbManager.getString dr "Code";
        name = DbManager.getString dr "Name";
        url = DbManager.getString dr "Url";
        order = DbManager.getInt dr "Order";
        imageUrl = DbManager.getOptionalString dr "ImageUrl";
        description = DbManager.getOptionalString dr "Description";
    }
    
    static member inline getAllQuery = "SELECT * FROM Books"
    
type PoemType = {
    id: int;
    code: string;
    [<JsonConverter(typedefof<OptionConverter>)>]
    description: string option;
} with
    static member reader (dr : SqliteDataReader) = {
        id = DbManager.getInt dr "Id";
        code = DbManager.getString dr "Code";
        description = DbManager.getOptionalString dr "Description";
    }
    
    static member inline getAllQuery = "SELECT * FROM PoemTypes"
    
type Poem = {
    id: int;
    code: string;
    name: string;
    [<JsonConverter(typedefof<OptionConverter>)>]
    poemText: string option;
    poemTypeId: int;
} with
    static member reader (dr : SqliteDataReader) = {
        id = DbManager.getInt dr "Id";
        code = DbManager.getString dr "Code";
        name = DbManager.getString dr "Name";
        poemText = DbManager.getOptionalString dr "PoemText";
        poemTypeId = DbManager.getInt dr "PoemTypeId";
    }
    
    static member menuReader (dr : SqliteDataReader) = {
        id = DbManager.getInt dr "Id";
        code = DbManager.getString dr "Code";
        name = DbManager.getString dr "Name";
        poemText = DbManager.getOptionalString dr "PoemText";
        poemTypeId = DbManager.getInt dr "PoemTypeId";
    }
    
    static member inline getAllQuery = "SELECT * FROM Poems"
    
    static member inline getByTypeQuery typeId = sprintf "SELECT * FROM Poems WHERE PoemTypeId = '%d'" typeId 
    
    static member inline getByIdQuery id = sprintf "SELECT * FROM Poems WHERE Id = '%d'" id
    