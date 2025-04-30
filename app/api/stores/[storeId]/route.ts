import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import prismadb from "@/lib/prismadb"

// Patch Route
export async function PATCH(
    req: Request,
    { params }: {
        params: { storeId: string }
    }

) {
    try {
        const { userId } = await auth()
        const body = await req.json()

        const { name } = body
        const { storeId } = await params

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 })
        }
        
        if (!name) {
            return new NextResponse("Name is required", { status: 400 })
        }

        if (!storeId) {
            return new NextResponse("Store id is required", { status: 400 })
        }
        
        const store = await prismadb.store.updateMany({
            where: {
                id: storeId,
                userId
            },
            data: {
                name
            }
        })

        return NextResponse.json(store)
    } catch (error) {
        console.log("[STORE_PATCH", error)
        return new NextResponse("Internal error", { status: 500 })
    }
}

// Delete Route
export async function DELETE(
    req: Request, // unused 
    { params }: {
        params: { storeId: string }
    }
) {
    try {
        const { userId } = await auth()
        const { storeId } = await params
        
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 400 })
        }
        
        if (!storeId) {
            return new NextResponse("Store id is required", { status: 401 })
        }
        
        const store = await prismadb.store.deleteMany({
            where: {
                id: storeId
            }
        })

        return NextResponse.json(store)
    } catch (error) {
        console.log("[STORE_DELETE", error)
        return new NextResponse("Internal error", { status: 500 })
    }
}