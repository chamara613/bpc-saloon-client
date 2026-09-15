import prisma from "@/lib/prisma";
import { compare } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

export async function POST(request : NextRequest) {

    const body = await request.json();

    console.log(body)

    const user = await prisma.user.findFirst(
        {
        where : {
            email: body.email
        }
    }
    )
    console.log(user)

    if(user == null){
        return NextResponse.json({
            message : "User not found"
        })
    }


const isPasswordValid = await compare(body.password, user.password)

if(isPasswordValid){
    
    const secretText = process.env.JOSE_SECRET

    const sectet = new TextEncoder().encode(secretText)

    const token = await new jose.SignJWT({
        email : user.email,
        firstName : user.firstName,
        lastName : user.lastName,
        role : user.role,
        privileges : user.privileges
    
    }).setProtectedHeader({ alg : "HS256"}).sign(sectet)

    const response = NextResponse.json(
        {
            message : "Login Successful",
            role : user.role,
        }
    )
    response.cookies.set({
        name : "login-token",
        value : "token",
        httpOnly : true,
        secure : false,
        sameSite : "lax",
        maxAge : 60 * 60 * 24 * 7

    })

    console.log(token)
    return response

}else{
    return NextResponse.json({
        message : "Login Fail"
})
}

}