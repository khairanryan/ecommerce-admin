import { redirect } from "next/navigation"
import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs/server"
import Navbar from "@/components/navbar"

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { storeId: string }
}) {
  const { userId } = await auth()
  const { storeId } = await params

  // belum login
  if (!userId) {
    redirect("/sign-in")
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: storeId,
      userId,
    },
  })

  if (!store) {
    redirect("/")
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  )
}
