namespace RhodesGallery.Controllers

open System
open System.Collections.Generic
open System.Linq
open System.Threading.Tasks
open Microsoft.AspNetCore.Mvc
open RhodesGallery

[<Route("")>]
[<ApiController>]
type ItemsController () =
    inherit ControllerBase()

    [<HttpGet>]
    [<Route("Books")>]
    member this.GetBooks() =
        DbManager.query Books.getAllQuery Books.reader
    
    [<HttpGet>]
    [<Route("Poem/Types")>]
    member this.GetPoemTypes() =
        DbManager.query PoemType.getAllQuery PoemType.reader
        
    [<HttpGet>]
    [<Route("Poems")>]
    member this.getPoems() =
        DbManager.query Poem.getAllQuery Poem.menuReader
        
    [<HttpGet>]
    [<Route("Poem/Type/{typeId}")>]
    member this.getPoemsByType([<FromRoute>] typeId : int) =
        DbManager.query (Poem.getByTypeQuery typeId) Poem.menuReader
        
    [<HttpGet>]
    [<Route("Poem/{id}")>]
    member this.getPoemsById([<FromRoute>] id : int) =
        DbManager.query (Poem.getByIdQuery id) Poem.reader 
