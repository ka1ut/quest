"use client"
import React, { useState } from 'react';

import {BackButton} from "@/components/backButton/backButton";
import { FaCamera } from "react-icons/fa";
import { BsRobot } from "react-icons/bs";
import {Camera} from "@/components/camera/camera";

export default function Page(){
    const [isCaptureEnabled, setCaptureEnabled] = useState(false);
    const [isCameraStartButton, setCameraStartButton] = useState(true);
    const [url, setUrl] = useState('');
    const [progress, setProgress] = useState(1);
    const [response, setResponse] = useState('');
    const [isApiLoading, setApiLoading] = useState(false);
    const [isAPIrequest, setAPIrequest] = useState(false);
    const [isError, setIsError] = useState(false);

    const uploadImage = async (base64EncodedImage:string) => {
        localStorage.setItem('CapturedImage', base64EncodedImage);
    }

    const handleClikApi = async () => {
        try{
            const response = await fetch('/api/visionAPI',{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({data: url})
            });

            if (!response.ok) {
                throw new Error("response was not ok");
            }

            console.log(response);
        } catch (error) {
            setIsError(true);
            console.error(error);
        }finally {
            setApiLoading(false);
        }
    }

    return (
        <>
        <section className="bg-[#f4f4f4] py-12">
            <div className="mx-auto max-w-screen-xl px-4 md:px-8">
                <h1 className="mb-5 text-2xl font-bold">写真から問いを作成するとは</h1>
                <p className="mb-3 text-lg text-gray-500">目の前の風景や、写真を見て、その中にある問いを考えることができます。</p>
            </div>
        </section>
        
        <div className="mx-auto max-w-screen-xl px-4 my-10 md:px-8">
            <h1 className="mb-5 text-2xl font-bold">1. 写真を撮る</h1>
            
            <div className='flex flex-col justify-center md:block md:justify-start'>
                {!isCaptureEnabled && isCameraStartButton && (
                    <>
                        <div className="mb-3 text-lg text-gray-500">カメラを起動すると、写真を撮ることができます。</div>
                        <button
                            className="rounded-xl border bg-white border-gray-200 hover:bg-gray-50 px-6 md:px-12 py-6 font-semibold text-gray-600 shadow-sm"
                            onClick={() => {setCaptureEnabled(true) , setCameraStartButton(false)}}
                        >
                            <div className = "flex flex-col items-center justify-center ">
                                <div className=' text-xl'>カメラを起動する</div>
                                <FaCamera size={90}/>
                            </div>
                        </button>
                    </>
                )}

                <Camera
                    isCaptureEnabled={isCaptureEnabled}
                    setCameraStartButton={setCameraStartButton}
                    setCaptureEnabled={setCaptureEnabled}
                    setUrl={setUrl}
                />
                {url && (
                <div className=''>
                    <img src={url} alt="Screenshot" style={{width: "100%"}}/>

                    <div className='flex flex-row  justify-between'>
                        <button 
                            className=' rounded-md border bg-white border-gray-200 mx-2 px-5 py-1 md:px-12 font-semibold text-gray-900 shadow-sm'
                            onClick={() => { setUrl(''); setCaptureEnabled(true); setProgress(1)}}>
                            撮り直す
                        </button>
                        <button 
                            className=' rounded-md border bg-white border-gray-200 mx-2 px-5 py-1 md:px-12 font-semibold text-gray-900 shadow-sm'
                            onClick={() => { setProgress(2); uploadImage(url) }}>
                            これでOK
                        </button >
                    </div>
                    
                    
                </div>
                
            )}
            
            {progress == 2 && (
                <> 
                    <h1 className="mb-5 text-2xl my-10 font-bold">2. 写真から問いを探す</h1>
                    {!isAPIrequest && (
                        <>
                            
                            <div className="mb-3 text-lg text-gray-500">AIが写真から、問いを考えます</div>
                                <button
                                    className="rounded-xl border bg-white border-gray-200  hover:bg-gray-50 px-6 md:px-12 py-6 font-semibold text-gray-600 shadow-sm"
                                    onClick= {() => {handleClikApi(); setAPIrequest(true); setApiLoading(true)}}>
                                    <div className = "flex flex-col items-center justify-center ">
                                        <div className=' text-xl'>AIで問いを作る</div>
                                        <BsRobot size={90}/>
                                    </div>
                                </button>
                        </>
                    )}
                    {isAPIrequest && !isError &&(
                        <>
                            <div className="mb-3 text-lg text-gray-500">AIの処理が完了するまで、しばらくお待ちください。</div>
                        </>
                    )}
                    {isError && (
                        <>
                            <div className="mb-3 text-lg text-gray-500">エラーが起こりました</div>
                        </>
                    )}

                    {response && (
                        
                        <>
                            <div className='text-xl font-bold'>{response}</div>
                        </>
                    )}
                </>

            )}
                
            </div>

        </div>
            

       
            <div className="flex items-center justify-center my-6">
                <BackButton/>
            </div>
        
        </>
    )
}