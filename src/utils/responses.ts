import { NextResponse } from "next/server";


export class ErrorResponse {
    errorMessage: string;
    statusCode: number;

    constructor(errorMessage: string = 'Invalid Request.', statusCode: number = 400) {
        this.errorMessage = errorMessage;
        this.statusCode = statusCode;
    }

    respond() {
        return NextResponse.json({ error: this.errorMessage }, { status: this.statusCode });
    }
}


export class SuccessResponse {
    message: string;
    statusCode: number;
    data: object;

    constructor(data: object = {}, message: string = "", statusCode: number = 200) {
        this.data = data;
        this.message = message;
        this.statusCode = statusCode;
    }

    respond() {
        return NextResponse.json({ data: this.data, message: this.message }, { status: this.statusCode });
    }
}
