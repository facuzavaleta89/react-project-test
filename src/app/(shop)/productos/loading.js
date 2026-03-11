export default function ProductosLoading() {
    return (
        <div className="min-h-[calc(100vh-80px)] bg-[#fafafa] dark:bg-zinc-950 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header skeleton */}
                <div className="mb-8 animate-pulse">
                    <div className="h-8 w-48 bg-gray-300 dark:bg-zinc-700 rounded mb-2"></div>
                    <div className="h-4 w-64 bg-gray-200 dark:bg-zinc-800 rounded"></div>
                </div>

                {/* Toolbar skeleton */}
                <div className="mb-6 flex flex-col md:flex-row gap-4 animate-pulse">
                    <div className="flex-1 h-10 bg-gray-300 dark:bg-zinc-700 rounded"></div>
                    <div className="h-10 w-48 bg-gray-300 dark:bg-zinc-700 rounded"></div>
                </div>

                {/* Products grid skeleton */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} className="bg-white dark:bg-zinc-900 rounded-lg h-80 animate-pulse"></div>
                    ))}
                </div>
            </div>
        </div>
    )
}
