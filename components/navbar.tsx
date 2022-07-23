import { useState } from "react"
import * as navigation from '../content/navigation.yaml'
import * as settings from '../content/settings.yaml'
import Image from "next/image"

export default function Header() {
    const [ isOpen, setIsOpen ] = useState(false)
    const { name, image, width, height } = settings
    return (
        <div className="lg:sticky z-10 top-0 left-0 w-full shadow-lg bg-white px-3 md:px-6">
            <nav className="flex items-center justify-center lg:justify-between flex-wrap py-3 container mx-auto">
                {/* <!--Logo etc--> */}
                <div className="flex items-center">
                    <a href="/" className="text-indigo-500 font-bold text-lg flex gap-4 items-end">
                        <span className="sr-only">Home</span>
                        <img className="max-h-20 flex-0 basis-10 hidden md:block" src={image} width={width} height={height} alt=""/>
                        <span className="font-stamp text-2xl">{name}</span>
                    </a>
                </div>

                {/* <!--Toggle button (hidden on large screens)--> */}
                <button onClick={() => setIsOpen(!isOpen)} type="button" className={`ml-auto block lg:hidden px-2 text-primary-500 hover:text-primary-500 focus:outline-none focus:text-primary-500 ${isOpen && 'transition transform-180'}`} aria-label="Menu">
                    <svg className="h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path className={isOpen ? '' : 'hidden'} fillRule="evenodd" clipRule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"/>
                        <path className={isOpen ? 'hidden' : ''} fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"/>
                    </svg>
                </button>

                {/* <!--Menu--> */}
                <div className={`w-full flex-grow lg:flex lg:items-center lg:w-auto text-center ${isOpen ? 'blockshadow-3xl' : 'hidden'}`}>

                    { navigation.items && 
                        <ul className="pt-6 lg:pt-0 list-reset lg:flex justify-end flex-1 items-center">
                            { navigation.items.map(({url, text}:any, index:number) => 
                                <li key={index} className="nav__item mr-3">
                                    <a onClick={() => setIsOpen(false)} className="text-xl inline-block text-gray-500 no-underline hover:text-indigo-500 py-2 px-4" href={url}>{text}</a>
                                </li>
                            )}
                        </ul>
                    }
                </div>
            </nav>
        </div>

    )
}