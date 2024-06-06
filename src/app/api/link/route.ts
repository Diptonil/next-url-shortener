import { NextRequest } from "next/server";
import { ResponseStatusCode } from "@/utils/enums";
import { SuccessResponse, ErrorResponse } from "@/utils/responses";
import { redis } from "@/utils/redis";


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
        console.log(shortenedURL);
        
        await redis.set(shortenedURL, url);
        return new SuccessResponse({"data": shortenedURL}, "URL successfully shortened.", ResponseStatusCode.OK).respond();
    } catch (err: any) {
        return new ErrorResponse(err.message, ResponseStatusCode.InternalServerError).respond();
    }
}
