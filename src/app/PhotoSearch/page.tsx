"use client"
import React, { useState } from 'react';

import {BackButton} from "@/components/backButton/backButton";
import {Camera} from "@/components/camera/camera";
import {TextBox} from "@/components/TextBox/TextBox";

import { FaCamera } from "react-icons/fa";
import { BsRobot } from "react-icons/bs";
import { IoReload } from "react-icons/io5";


export default function Page(){
    const [isCaptureEnabled, setCaptureEnabled] = useState(false);
    const [isCameraStartButton, setCameraStartButton] = useState(true);
    const [ImgUrl, setImgUrl] = useState('');
    const [progress, setProgress] = useState(1);

    const [response, setResponse] = useState<string[] | null>(null);

    const [isApiLoading, setApiLoading] = useState(false);
    const [isApiRequest, setApiRequest] = useState(false);
    const [isError, setIsError] = useState(false);

    const [question, setQuestion] = useState<string| null>(null);
    const [answerText, setAnswerText] = useState<string| null>(null);

    const uploadImage = async (base64EncodedImage:string) => {
        localStorage.setItem('CapturedImage', base64EncodedImage);
    }

    const handleClikApi = async () => {
        try{
            const res= await fetch('/api/visionApi',
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ base64: ImgUrl })
            });
            console.log(res)

            if (!res.ok) {
                throw new Error("response was not ok");
            }

            const data = await res.text();
            const cleanedData = data.replace(/^"|"$/g, '');
            const dataArray = cleanedData.split('\\n'); // 改行文字で分割して配列に変換
            setResponse(dataArray);

            setApiRequest(false);
            setProgress(3);
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
                    setImgUrl={setImgUrl}
                />
                {ImgUrl && (
                <div className=''>
                    <img src={ImgUrl} alt="Screenshot" style={{width: "100%"}}/>
                    
                    { (progress==1 || response)&& (
                    <div className='flex flex-row  justify-between'>
                        <button 
                            className=' rounded-md border bg-white border-gray-200 mx-2 px-5 py-1 md:px-12 font-semibold text-gray-900 shadow-sm'
                            onClick={() => { setImgUrl(''); setCaptureEnabled(true); setProgress(1); setResponse(null)}}>
                            撮り直す
                        </button>
                        {progress == 1 &&(
                            <button 
                            className=' rounded-md border bg-white border-gray-200 mx-2 px-5 py-1 md:px-12 font-semibold text-gray-900 shadow-sm'
                            onClick={() => { setProgress(2); uploadImage(ImgUrl) }}>
                            これでOK
                        </button >
                        )}
                        
                    </div>
                )}
                    
                    
                </div>
                
            )}
            
            {progress >= 2 && (
                <> 
                    <h1 className="mb-5 text-2xl my-10 font-bold">2. 写真から問いを探す</h1>
                    {!isApiRequest && !response &&(
                        <>
                            
                            <div className="mb-3 text-lg text-gray-500">AIが写真から、問いを考えます</div>
                                <button
                                    className="rounded-xl border bg-white border-gray-200  hover:bg-gray-50 px-6 md:px-12 py-6 font-semibold text-gray-800 shadow-sm"
                                    onClick= {() => {handleClikApi(); setApiRequest(true); setApiLoading(true)}}>
                                    <div className = "flex flex-col items-center justify-center ">
                                        <div className=' text-xl'>AIで問いを作る</div>
                                        <BsRobot size={90}/>
                                    </div>
                                </button>
                                <div className='text-xl font-bold'>{response}</div>
                        </>
                    )}
                    {isApiRequest && !isError &&(
                        <>
                            <div className='flex flex-row'>
                                <div className="animate-spin h-5 w-5 border-4 border-gray-300 rounded-full border-t-transparent mx-2"></div>
                                <div className="mb-3 text-lg text-gray-500">AIの処理が完了するまで、しばらくお待ちください。</div>
                            </div>
                        </>
                    )}
                    {isError && (
                        <>
                            <div className="mb-3 text-lg text-gray-500">エラーが起こりました</div>
                            <button
                                    className="rounded-xl border bg-white border-gray-200  hover:bg-gray-50 px-6 md:px-12 py-6 font-semibold text-gray-800 shadow-sm"
                                    onClick= {() => {handleClikApi(); setApiRequest(true); setApiLoading(true); setIsError(false)}}>
                                    <div className = "flex flex-col items-center justify-center ">
                                        <div className=' text-xl'>リトライ</div>
                                        <IoReload size={90}/>
                                    </div>
                            </button>
                        </>
                    )}

                    {response && (
                        <>
                                <div className='text-lg text-gray-600 font-semibold'>
                                    {response.map((item, index) => (
                                        <button key={index} 
                                            className='rounded-xl border bg-white border-gray-200  hover:bg-gray-50 w-full my-2 text-left px-4 md:px-10 py-5 font-semibold text-gray-800 shadow-sm'
                                            onClick={() => {setProgress(3);setQuestion(item)}}
                                        >
                                            {item}
                                        </button>
                                    ))}
                                </div>
                                <div>
                                    <button
                                            className="rounded-xl border bg-white border-gray-200  hover:bg-gray-50 w-full my-4 py-5 font-semibold text-gray-800 shadow-sm"
                                            onClick= {() => {handleClikApi(); setApiRequest(true); setApiLoading(true); setProgress(2); setResponse(null); setQuestion(null)}}>
                                            <div className = "flex flex-col items-center justify-center ">
                                                <div className='text-lg'>同じ写真でもう一度</div>
                                                <IoReload size={50}/>
                                            </div>
                                    </button>
                                </div>
                        
                        </>
                    )}

                </>
            )}

            {(progress >= 3 && question )&& (
                <>
                    <h1 className="mb-5 text-2xl my-10 font-bold">3. 問いについて考えましょう</h1>
                    <div className="mb-3 text-lg text-gray-600">{question}</div>
                    <TextBox text={answerText} setText={setAnswerText} />
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