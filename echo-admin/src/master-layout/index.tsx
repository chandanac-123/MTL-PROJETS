import Header from "./header";
import Sidebar from "./sidebar";

export default function MasterLayout({ children }: any) {
    return (
        <div className='flex flex-col min-h-screen bg-bg_primary'>
            <Header />
            <div className="flex flex-1 p-8 mt-24 top-24 w-full h-full">
                <Sidebar />
                <div className="flex-1 w-full ml-[350px] h-full overflow-auto">
                    {children}
                </div>
            </div>
        </div>
    )
}
