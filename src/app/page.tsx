"use client"
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { MdImageSearch } from "react-icons/md";
import { TbMessageCircleQuestion } from "react-icons/tb";

export default function Home() {
  const router = useRouter();

  const handleClick = (path:string) => () => {
    router.push(path);
  };

  return (
    <>
    <section className="bg-[#f4f4f4] py-12">
        <div className="mx-auto max-w-screen-xl px-4 md:px-8">
          <h1 className="mb-5 text-2xl font-bold">問い・アイデアを考える</h1>
          <div className="flex overflow-y-scroll pb-10 md:px-10">
            <div className="flex flex-nowrap">
                {/* 写真から問いを作成する */}
                <button className="mt-4 mx-3 rounded-xl  border bg-white border-gray-200 px-12 py-6 font-semibold text-gray-600 shadow-sm hover:shadow-xl transition-shadow duration-300 ease-in-out"
                onClick={handleClick('/PhotoSearch')}>
                  <div className = "flex flex-col items-center justify-center ">
                    <div className=' text-xl'>写真から問いを作成する</div>
                    <div><MdImageSearch size={120}/></div>
                  </div>
                </button>

            </div>
          </div>
        </div>
    </section>


    <section className="bg-[#ffffff] py-12">
        <div className="mx-auto max-w-screen-xl px-4 md:px-8">
          <h1 className="mb-5 text-2xl font-bold">問い・アイデアを深める</h1>
          <div className="flex overflow-y-scroll pb-10 md:px-10">
            <div className="flex flex-nowrap">
              {/* 解像度を高める */}
              <button className="mt-4 mx-3 rounded-xl border bg-white border-gray-200 px-12 py-6 font-semibold text-gray-600 shadow-sm hover:shadow-xl transition-shadow duration-300 ease-in-out"
                onClick={handleClick('/AskWhy')}>
                  <div className = "flex flex-col items-center justify-center ">
                    <div className=' text-xl'>なぜなぜアイデア</div>
                    <div><TbMessageCircleQuestion size={120}/></div>
                  </div>
                </button>

            </div>
          </div>
        </div>
    </section>
    
    </>
  )
}
