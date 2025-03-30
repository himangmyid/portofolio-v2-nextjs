import Image from "next/image";

const AuthorCard = ({ author, date }: {
    author: { displayName: string; image: { url: string } };
    date: string
}) => {
    return (
        <div className="flex items-center p-4 bg-gray-700/20 rounded-lg">
            <div className="relative w-10 h-10">
                <Image
                    src={author.image.url}
                    alt={author.displayName}
                    fill
                    sizes="40px"
                    className="rounded-full object-cover"
                />
            </div>
            <div className="ml-4">
                <p className="font-medium text-gray-100">{author.displayName}</p>
                <p className="text-sm text-gray-200">
                    {new Date(date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    })}
                </p>
            </div>
        </div>
    );
};

export default AuthorCard;
