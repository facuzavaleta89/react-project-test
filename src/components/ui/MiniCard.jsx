import React from 'react';

export default function MiniCard({ image, name, rating, isOnSale }) {
    return (
        <div className="group relative rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
            {isOnSale && (
                <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-10">
                    OFERTA
                </span>
            )}
            <div className="relative w-full aspect-square mb-4 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
            </div>
            <div className="flex-1 flex flex-col justify-between">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 line-clamp-2 mb-2">{name}</h3>
                <div className="flex items-center gap-1 text-yellow-500">
                    <span className="text-sm font-medium text-zinc-700 dark:text-zinc-400 mr-1">{rating.toFixed(1)}</span>
                    <div className="flex text-lg">
                        {"★".repeat(Math.round(rating))}
                        <span className="text-zinc-200 dark:text-zinc-700">{"★".repeat(5 - Math.round(rating))}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
