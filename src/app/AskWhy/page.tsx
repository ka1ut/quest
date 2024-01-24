"use client"
import React, { useState } from 'react';

import {BackButton} from "@/components/backButton/backButton";
import {TextBox} from "@/components/TextBox/TextBox";

import { MdSentimentVerySatisfied } from "react-icons/md";

export default function Page(){
    const [progress, setProgress] = useState(1);

    const [answers, setAnswers] = useState<string[]>(['']);

    const handleSetAnswer = (index: number, value: string) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    };

    const addNewWhy = () => {
        setAnswers([...answers, '']);
    };



    return (
        <>
         <section className="bg-[#f4f4f4] py-12">
            <div className="mx-auto max-w-screen-xl px-4 md:px-8">
                <h1 className="mb-5 text-2xl font-bold">なぜなぜアイデアとは</h1>
                <p className="mb-3 text-lg text-gray-500">あなたのアイデアはまだ序論に過ぎません...なぜなのかと考えるうちにアイデアが深まっていくでしょう⛏️</p>
            </div>
        </section>

        <div className="mx-auto max-w-screen-xl px-4 my-10 md:px-8">
            <h1 className="mb-5 text-2xl font-bold">1. アイデア・問いを簡単に教えてください</h1>
            <div className='flex flex-col justify-center md:block md:justify-start'>
            <div className="mb-3 text-lg text-gray-500">あなただけが分かるような内容で構いません</div>
            <TextBox text={answers[0]} setText={(value) => handleSetAnswer(0, value)} />
            </div>
        </div>

        {
            answers.map((answer, index) => (
                <div key={index} className="mx-auto max-w-screen-xl px-4 my-10 md:px-8">
                    {index > 0 && (
                        <>
                        <h1 className="mb-5 text-2xl font-bold">
                            なぜ「{answers[index - 1]}」？
                        </h1>
                        <TextBox text={answer} setText={(value) => handleSetAnswer(index, value)} />
                        </>
                    )}
                </div>
            ))
        }


            <div className="mx-auto max-w-screen-xl px-4 my-10 md:px-8">
                <button
                    onClick={addNewWhy}
                    className="rounded-xl border bg-white border-gray-200 hover:bg-gray-50 px-6 md:px-12 py-6 text-gray-800 shadow-sm">
                    <div className="flex flex-col items-center justify-center ">
                        <div className='font-semibold text-xl'>もっと理由を教えてください</div>
                        <MdSentimentVerySatisfied size={90} />
                    </div>
                </button>
            </div>


        <div className="flex items-center justify-center my-6">
                <BackButton/>
            </div>
        </>
    )
}