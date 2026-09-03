import { Card } from "@/shared/ui/card"
import Header from "@/widgets/header/Header"
import { Outlet } from "react-router"
function MainLayout() {
    return (
        <div className="p-[5px] bg-[#F3F4F6] flex flex-col gap-3">
            <div className="h-[60px]">
                <Header />
            </div>
            <div>
                <main>
                    <Card className="p-0 border-[1px] min-h-[calc(100vh-82px)] max-h-[calc(100vh-82px)] bg-white flex-1 rounded-md relative  shadow-sm overflow-y-auto overflow-x-hidden ">
                        <Outlet/>
                    </Card>
                </main>
            </div>
        </div>
    )
}

export default MainLayout
