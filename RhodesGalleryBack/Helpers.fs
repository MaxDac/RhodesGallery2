namespace RhodesGallery

open Microsoft.AspNetCore.Http
open Microsoft.Extensions.Primitives
open System
open System.Threading.Tasks

module Helpers =    
    let asOption s =
        match s with
        | v when String.IsNullOrEmpty v -> None
        | v -> Some v
        
    type OptionContructor() =
        member __.Bind(x, f) = Option.bind f x
        member __.Return x = Some x
        member __.ReturnFrom x = x
        
    let opt = OptionContructor()
    
    let addCorsHeaders(ctx: HttpContext) =
        ctx.Response.Headers.Add("Access-Control-Allow-Headers", new StringValues("Content-Type"))
        ctx.Response.Headers.Add("Access-Control-Allow-Origin", new StringValues("http://localhost:4200"))
        ctx
        
    let setOkResponse(ctx: HttpContext) =
        ctx.Response.StatusCode <- 200
        ctx
        
    let okResponse(ctx: HttpContext) =
        addCorsHeaders ctx |> setOkResponse
        
    ///
    /// <summary>
    /// This middleware is only for development purpose.
    /// </summary
    let devCorsHandler(ctx: HttpContext)(next: Func<Task>) =
        match ctx.Request.Method with
        | "OPTIONS" ->
            // Returning Ok
            okResponse ctx |> ignore
            Task.CompletedTask
        | _ ->
            addCorsHeaders ctx |> ignore
            next.Invoke()
