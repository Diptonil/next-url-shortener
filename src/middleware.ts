import { NextRequest, NextResponse } from "next/server";
import { ResponseStatusCode } from "@/lib/enums";
import { ErrorResponse } from "@/lib/responses";
import { redis } from "@/lib/redis";


function getValidUrl(link: string) {
    if (link.indexOf("http://") == 0 || link.indexOf("https://") == 0) {
        return link;
    }
    return "https://" + link;
}


export async function middleware(request: NextRequest) {
    try {
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
