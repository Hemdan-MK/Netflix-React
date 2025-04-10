
export const SkeletonLoader = ({ isVertical = false }) => {
    return (
        <div
            className={`animate-pulse rounded-lg bg-zinc-800 overflow-hidden
      ${isVertical ? 'w-[200px] h-[300px]' : 'w-[300px] h-[169px]'}`}
        />
    );
};

export const HeroSkeleton = () => {
    return (
        <div className="relative h-screen bg-zinc-900 animate-pulse">
            <div className="absolute bottom-0 left-0 right-0 p-12 bg-gradient-to-t from-zinc-900">
                <div className="h-12 w-2/3 bg-zinc-800 rounded mb-4" />
                <div className="flex items-center space-x-2 mb-4">
                    <div className="w-24 h-4 bg-zinc-800 rounded" />
                    <div className="w-12 h-6 bg-zinc-800 rounded" />
                    <div className="w-24 h-4 bg-zinc-800 rounded" />
                </div>
                <div className="w-full max-w-2xl h-20 bg-zinc-800 rounded mb-6" />
                <div className="flex space-x-4">
                    <div className="w-24 h-10 bg-zinc-800 rounded" />
                    <div className="w-24 h-10 bg-zinc-800 rounded" />
                </div>
            </div>
        </div>
    );
};

export const MovieSectionSkeleton = ({ isVertical = false, count = 6 }) => {
    return (
        <div className="px-12 py-8">
            <div className="h-8 w-48 bg-zinc-800 rounded mb-4 animate-pulse" />
            <div className={`grid gap-4 ${isVertical
                    ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6'
                    : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                }`}>
                {[...Array(count)].map((_, index) => (
                    <SkeletonLoader key={index} isVertical={isVertical} />
                ))}
            </div>
        </div>
    );
};
