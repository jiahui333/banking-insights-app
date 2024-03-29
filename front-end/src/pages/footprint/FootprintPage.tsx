import axios from "axios";
import {SetStateAction, useState} from "react";
import {FootprintPerCatTable} from "../../components/FootprintPerCatTable";
import {FootprintPerDateTable} from "../../components/FootprintPerDateTable";

export default function FootprintPage() {
    const [activeTab, setActiveTab] = useState("Per Category"); // initialize active tab state

    const handleTabClick = (tab: SetStateAction<string>) => {
        setActiveTab(tab); // update active tab state
    };

    return (
        <div className="w-3/5 bg-white/90 shadow-xl rounded-lg m-auto h-[500px]">
            <div className="w-full flex justify-around h-10">
                <button className={`rounded-tl-lg w-1/2 ${activeTab === "Per Category" ? "font-bold" : "bg-white/60"}`} onClick={() => handleTabClick("Per Category")}>
                    Per Category
                </button>
                <button className={`rounded-tr-lg w-1/2 ${activeTab === "Per Month" ? "font-bold" : "bg-white/60"}`} onClick={() => handleTabClick("Per Month")}>
                    Per Month
                </button>
            </div>
            <div className="flex items-center justify-center flex-col px-52 py-20">
                <h1 className="title"> Footprint Overview</h1>
                {activeTab === "Per Category" ? <FootprintPerCatTable/> : <FootprintPerDateTable />}
            </div>
        </div>
    )
}
