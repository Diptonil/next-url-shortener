export enum ResponseStatusCode {
    OK = 200,
    ResourceCreated = 201,
    NoContent = 204,
    Unauthorized = 403,
    ResourceNotFound = 404,
    ResourceAlreadyExists = 409,
    ResourceNotCreated = 424,
    InternalServerError = 500
}
