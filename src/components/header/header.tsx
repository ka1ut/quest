import Link from "next/link";

export function Header() {
    return (
        <header className="relative flex h-16 md:h-20 items-center border-b border-gray-200 bg-white">
            <div className="mx-auto flex w-full max-w-screen-xl px-4 md:px-8">
                <Link href="/" className="flex items-center text-2xl font-bold">
                    QuestApp
                </Link>
            </div>
        </header>
    )
    
}