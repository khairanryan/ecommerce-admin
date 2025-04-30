import { PrismaClient } from "@prisma/client";

declare global {
    // eslint-disable-next-line no-var
    var prisma: PrismaClient | undefined // add prisma to global
}

const prismadb = globalThis.prisma || new PrismaClient()
// supaya tidak hot reload
if(process.env.NODE_ENV !== "production") globalThis.prisma = prismadb 

export default prismadb