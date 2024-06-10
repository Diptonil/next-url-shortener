import { ResponseStatusCode } from "@/lib/enums";
import { logger } from "@/lib/logger";
import { redis } from "@/lib/redis";
import { ErrorResponse, SuccessResponse } from "@/lib/responses";


export async function GET() {
    try {
        const users = await redis.hgetall("users");
        if (!users) {
            return new ErrorResponse("No users found.", ResponseStatusCode.ResourceNotFound).respond();
        }
        logger.info(users);
        return new SuccessResponse({"users": users}, "Users found.", ResponseStatusCode.OK).respond();
    } catch (err: any) {
        return new ErrorResponse(err.message, ResponseStatusCode.InternalServerError).respond();
    }
}
