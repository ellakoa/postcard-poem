import * as attributes from '../content/settings.yaml'

export default function() {
    const {name,author} = attributes
    return (
        <footer className="bg-white shadow text-center w-full py-4">
            <small className="text-gray-500">
                <span>{`Copyright © ${name} 2022. Made with ❤ by ${author}`}</span>
            </small>
        </footer>
    )
}