import {Link} from 'react-router-dom';

export default function Header({
    heading,
    paragraph,
    linkName,
    linkUrl="/signup"
}){
    return(
        <div className="mb-10">
            <div className="max-w-lg mx-auto"> 
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    {heading}
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600 mt-5">
                {paragraph} {' '}
                <Link to={linkUrl} className="font-medium text-blue-500 hover:text-purple-500">
                    {linkName}
                </Link>
                </p>
            </div>
        </div>
    )
}
