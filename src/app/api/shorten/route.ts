import { NextApiRequest } from "next";
import { ResponseStatusCode } from "@/utils/enums";
import { SuccessResponse, ErrorResponse } from "@/utils/responses";


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


export function POST(request: NextApiRequest) {
    try {
        const { url } = request.body;
        console.log(url);
        
        if (!url) {
            return new SuccessResponse({}, "No URLs passed. Nothing to return.", ResponseStatusCode.NoContent).respond();
        }
        return new SuccessResponse({"data": shortenURL()}, "URL successfully shortened.", ResponseStatusCode.OK).respond();
    } catch (err: any) {
        console.log(err.message);
        
        return new ErrorResponse(err.message, ResponseStatusCode.InternalServerError).respond();
    }
}
