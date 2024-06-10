import { NextRequest } from "next/server";
import { logger } from "@/lib/logger";
import { ResponseStatusCode } from "@/lib/enums";
import { SuccessResponse, ErrorResponse } from "@/lib/responses";
import { redis } from "@/lib/redis";


function shortenURL() {
    const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const base = characters.length;
    const urlLength = 6;
    let url = "";

    for (let i = 0; i < urlLength; i ++) {
        url += characters.charAt(Math.floor(Math.random() * base));
    }

    return url;
}


export async function POST(request: NextRequest) {
    try {
        const url = (await request.json()).data;        
        if (!url) {
            return new ErrorResponse("No URLs passed. Nothing to return.", ResponseStatusCode.ResourceNotFound).respond();
        }
        const shortenedURL = shortenURL();        
        await redis.hset("links", {[shortenedURL]: url});
        return new SuccessResponse({"link": shortenedURL}, "URL successfully shortened.", ResponseStatusCode.OK).respond();
    } catch (err: any) {
        return new ErrorResponse(err.message, ResponseStatusCode.InternalServerError).respond();
    }
}


export async function GET() {
    try {
        const links = await redis.hgetall("links");
        if (!links) {
            return new ErrorResponse("No links found.", ResponseStatusCode.ResourceNotFound).respond();
        }
        logger.info(links);
        return new SuccessResponse({"links": links}, "URL successfully shortened.", ResponseStatusCode.OK).respond();
    } catch (err: any) {
        return new ErrorResponse(err.message, ResponseStatusCode.InternalServerError).respond();
    }
}
