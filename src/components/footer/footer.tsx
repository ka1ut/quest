import Link from "next/link";

export function Footer() {
    return (
        <footer className="py-14 border-t border-gray-200 bg-white">
            <div className="mx-auto flex w-full max-w-screen-xl px-6 md:px-16">
                <Link href="/" className="flex items-center text-2xl font-bold">
                    QuestApp
                </Link>
            </div>
        </footer>
    )
    
}
