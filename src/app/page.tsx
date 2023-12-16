"use client"
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { MdImageSearch } from "react-icons/md";

export default function Home() {
  const router = useRouter();

  const handleClick = (path:string) => () => {
    router.push(path);
  };

  return (
    <>
    <section className="bg-[#f4f4f4] py-12">
        <div className="mx-auto max-w-screen-xl px-4 md:px-8">
          <h1 className="mb-5 text-2xl font-bold">問いを考える</h1>

          <div className='flex justify-center md:block md:justify-start'>
            <button className="mt-4 rounded-xl border bg-white border-gray-200 px-6 md:px-12 py-6 font-semibold text-gray-600 shadow-sm"
            onClick={handleClick('/PhotoSearch')}>
              <div className = "flex flex-col items-center justify-center ">
                <div className=' text-xl'>写真から問いを作成する</div>
                <div><MdImageSearch size={120}/></div>
              </div>
            </button>
          </div>

        </div>
    </section>

    <div className='my-10'>
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        aaaa
      </div>
    </div>
    
    </>
  )
}
