import { NextRequest, NextResponse } from "next/server";
import { ResponseStatusCode } from "@/utils/enums";
import { ErrorResponse } from "@/utils/responses";
import { redis } from "@/utils/redis";


function getValidUrl(link: string) {
    if (link.indexOf("http://") == 0 || link.indexOf("https://") == 0) {
        return link;
    }
    return "https://" + link;
}


export async function middleware(request: NextRequest) {
    try {
        console.log("hi");
        
        const shortenedLink = request.nextUrl.pathname.split("/").pop();
        if (shortenedLink) {
            const url: string | null = await redis.hget("links", shortenedLink);
            if (url) {
                return NextResponse.redirect(getValidUrl(url));
            }
        }
        return NextResponse.redirect(request.nextUrl.origin);
    } catch (err: any) {
        return new ErrorResponse(err.message, ResponseStatusCode.InternalServerError).respond();
    }
}


export const config = {
    matcher: "/go/:path*"
}
