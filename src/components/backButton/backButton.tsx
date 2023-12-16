"use client"

import { useRouter } from 'next/navigation';

export function BackButton() {
    const router = useRouter();

    const handleClick = (path:string) => () => {
        router.push(path);
    };

    return (
        <>
          <button className="mt-4 rounded-xl border bg-white border-gray-200 hover:bg-gray-50  px-6 md:px-12 py-2 font-semibold text-gray-600 shadow-sm"
            onClick={handleClick('/')}>
                <div className=' text-sm'>ホームに戻る</div>
            </button>
        </>
    )
}