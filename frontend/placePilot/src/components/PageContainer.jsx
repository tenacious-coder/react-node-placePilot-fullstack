import React from "react"
 const PageContainer=({children})=>{
    return(
        <div className="min-h-screen bg-gray-50 p-6">
        <div children className="max-w-6x1 s-auto">
         {children}
        </div>
        </div>
    )
 }

 export default PageContainer;