import { NextApiRequest } from "next";
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
            return new SuccessResponse({"user": user}, "user found.", ResponseStatusCode.OK).respond();
        }
    } catch (err: any) {
        return new ErrorResponse(err.message, ResponseStatusCode.InternalServerError).respond();
    }
}
