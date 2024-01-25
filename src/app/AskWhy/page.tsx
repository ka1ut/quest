"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {BackButton} from "@/components/backButton/backButton";
import {TextBox} from "@/components/TextBox/TextBox";

import { BsRobot } from "react-icons/bs";
import { IoReload } from "react-icons/io5";
import { GrPowerReset } from "react-icons/gr";

export default function Page(){
    const [progress, setProgress] = useState(1);

    const [answers, setAnswers] = useState<string[]>(['']);

    // API
    const [isApiRequest, setApiRequest] = useState(false);
    const [isError, setIsError] = useState(false);
    const [response, setResponse] = useState<string | undefined>(undefined);

    const handleSetAnswer = (index: number, value: string) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    };

    const addNewWhy = () => {
        if (answers[answers.length - 1].trim() !== '') {
            setAnswers([...answers, '']);
            if(answers.length >= 1){
                setProgress(2);
            }
          }
    };

    const reset = () => () => {
        setAnswers(['']);
        setProgress(1);
        setResponse(undefined);
    }

    const handleClikApi = async () => {
        try{
            const separator = '。なぜなら、';
            const RequestText = answers.join(separator) + '。';
            const res= await fetch('/api/gpt35',
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ RequestText: RequestText})
            });
            console.log(res)

            if (!res.ok) {
                throw new Error("response was not ok");
            }

            const data = await res.text();
            const CleanedData = data.replace(/^"|"$/g, '');
            setResponse(CleanedData);

            setApiRequest(false);
        } catch (error) {
            setIsError(true);
            console.error(error);
            setApiRequest(false);
        }
    }

    return (
        <>
         <section className="bg-[#f4f4f4] py-12">
            <div className="mx-auto max-w-screen-xl px-4 md:px-8">
                <h1 className="mb-5 text-2xl font-bold">なぜなぜアイデアとは</h1>
                <p className="mb-3 text-lg text-gray-500">あなたのアイデアはまだ序章に過ぎません...なぜなのかと考えるうちにアイデアが深まっていくでしょう⛏️</p>
            </div>
        </section>

        <div className="mx-auto max-w-screen-xl px-4 my-10 md:px-8">
            <h1 className="mb-5 text-2xl font-bold">1. アイデア・問いを簡単に教えてください</h1>
            <div className='flex flex-col justify-center md:block md:justify-start'>
            <div className="mb-3 text-lg text-gray-500">あなただけが分かるような内容で構いません</div>
            <TextBox text={answers[0]} setText={(value) => handleSetAnswer(0, value) } addNewWhy={addNewWhy} />
            </div>
        </div>
        
        { progress == 2 && (
            <>
                <div className="mx-auto max-w-screen-xl px-4 my-10 md:px-8">
                    <h1 className="mb-5 text-2xl font-bold">2. なぜなのか考えましょう</h1>
                    <div className="mb-3 text-lg text-gray-500">何度も考えることで自然とひらめくでしょう</div>
                    {
                    answers.map((answer, index) => (
                        <div key={index} className='my-7'>
                            {index > 0 && (
                                <>
                                <div className="mb-3 text-2xl font-bold">
                                    なぜ「{answers[index - 1]}」？
                                </div>
                                <TextBox text={answer} setText={(value)  => handleSetAnswer(index, value)} addNewWhy={addNewWhy}/>
                                
                                </>
                            )}
                        </div>
                    ))
                    }
                    {isApiRequest && (
                        <>
                            <div className='flex flex-row'>
                                <div className="animate-spin h-5 w-5 border-4 border-gray-300 rounded-full border-t-transparent mx-2"></div>
                                <div className="mb-3 text-lg text-gray-500">AIの処理が完了するまで、しばらくお待ちください。</div>
                            </div>
                        </>
                    )}
                    {response && (
                        <>
                            <div className='text-lg text-gray-600 font-semibold'>        
                                <div className='rounded-xl border bg-white border-gray-200  hover:bg-gray-50 w-full my-2 text-left px-4 md:px-10 py-5 font-semibold text-gray-800 shadow-sm'>
                                    {response}
                                </div>
                            </div>
                        </>
                    )}
                    {isError && (
                        <>
                            <div className="mb-3 text-lg text-gray-500">エラーが起こりました</div>
                            <button
                                    className="rounded-xl border bg-white border-gray-200  hover:bg-gray-50 px-6 md:px-12 py-6 font-semibold text-gray-800 shadow-sm"
                                    onClick= {() => {handleClikApi(); setApiRequest(true); setIsError(false)}}>
                                    <div className = "flex flex-col items-center justify-center ">
                                        <div className=' text-xl'>リトライ</div>
                                        <IoReload size={90}/>
                                    </div>
                            </button>
                        </>
                    )}
                    
                    {!isApiRequest && (
                        <>
                            <div className="flex overflow-y-scroll pb-10 md:justify-end">
                                <div className="flex flex-nowrap">
                                    <button
                                        className="mr-3 rounded-xl border bg-white border-gray-200 hover:bg-gray-50 px-6 md:px-6 py-4 text-gray-800 shadow-sm"
                                        onClick={()=> {handleClikApi(); setApiRequest(true);}}>
                                        <div className="flex flex-col items-center justify-center ">
                                            <div className='font-semibold text-base'>AIでまとめる</div>
                                            <p className="mb-3 my-1 text-sm text-gray-500">これまでの内容をまとめます</p>
                                            <BsRobot  size={60} />
                                        </div>
                                    </button>

                                    <button
                                        className="ml-2 rounded-xl border bg-white border-gray-200 hover:bg-gray-50 px-6 md:px-6 py-4 text-gray-800 shadow-sm"
                                        onClick={reset()}>
                                        <div className="flex flex-col items-center justify-center ">
                                            <div className='font-semibold text-base'>リセット</div>
                                            <p className="mb-3 my-1 text-sm text-gray-500">⚠️内容が消えます</p>
                                            < GrPowerReset size={60} />
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </>
        )}

        <div className="flex items-center justify-center my-6">
                <BackButton/>
            </div>
        </>
    )
}