import { NextApiRequest } from "next";
import { genSaltSync, hashSync } from "bcrypt-ts";
import { ResponseStatusCode } from "@/lib/enums";
import { logger } from "@/lib/logger";
import { redis } from "@/lib/redis";
import { ErrorResponse, SuccessResponse } from "@/lib/responses";


export async function GET(request: NextApiRequest) {
    try {
        const {email} = request.query;
        if (Array.isArray(email)) {
            return new ErrorResponse("Multiple illegal path parameters found.", ResponseStatusCode.BadRequest).respond();
        } else if (!email) {
            return new ErrorResponse("No path parameters received.", ResponseStatusCode.BadRequest).respond();
        } else {
            const user = await redis.hget("users", email);
            if (!user) {
                return new ErrorResponse("No user found.", ResponseStatusCode.ResourceNotFound).respond();
            }
            logger.info(user);
            return new SuccessResponse({"users": user}, "User found.", ResponseStatusCode.OK).respond();
        }
    } catch (err: any) {
        return new ErrorResponse(err.message, ResponseStatusCode.InternalServerError).respond();
    }
}


export async function PUT(request: NextApiRequest) {
    try {
        const {email} = request.query;
        const data = request.body.password;
        const salt = genSaltSync(10);
        const hash = hashSync(data, salt);
        if (Array.isArray(email)) {
            return new ErrorResponse("Multiple illegal path parameters found.", ResponseStatusCode.BadRequest).respond();
        } else if (!email) {
            return new ErrorResponse("No path parameters received.", ResponseStatusCode.BadRequest).respond();
        } else {
            const user = await redis.hget("users", email);
            if (!user) {
                return new ErrorResponse("No user found for updation.", ResponseStatusCode.ResourceNotFound).respond();
            }
            logger.info(user);
            const updatedUser = await redis.hset("users", {[email]: hash});
            if (!updatedUser) {
                return new ErrorResponse("Updation failed", ResponseStatusCode.ResourceNotCreated).respond();
            }
            return new SuccessResponse({}, "User updated.", ResponseStatusCode.OK).respond();
        }
    } catch (err: any) {
        return new ErrorResponse(err.message, ResponseStatusCode.InternalServerError).respond();
    }
}


export async function DELETE(request: NextApiRequest) {
    try {
        const {email} = request.query;
        if (Array.isArray(email)) {
            return new ErrorResponse("Multiple illegal path parameters found.", ResponseStatusCode.BadRequest).respond();
        } else if (!email) {
            return new ErrorResponse("No path parameters received.", ResponseStatusCode.BadRequest).respond();
        } else {
            const user = await redis.hdel("users", email);
            if (!user) {
                return new ErrorResponse("No user found.", ResponseStatusCode.ResourceNotFound).respond();
            }
            logger.info(user);
            return new SuccessResponse({}, "User deleted.", ResponseStatusCode.OK).respond();
        }
    } catch (err: any) {
        return new ErrorResponse(err.message, ResponseStatusCode.InternalServerError).respond();
    }
}
