// Animated placeholder that mirrors the shape of a content card.
export function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-sand-200 bg-white p-5 flex flex-col gap-4 animate-pulse">
      <div className="flex items-center justify-between gap-3">
        <div className="h-6 w-20 rounded-full bg-sand-200" />
        <div className="h-5 w-16 rounded-full bg-sand-100" />
      </div>
      <div className="flex flex-col gap-2">
        <div className="h-5 w-3/4 rounded bg-sand-200" />
        <div className="h-4 w-1/3 rounded bg-sand-100" />
      </div>
      <div className="flex flex-col gap-2">
        <div className="h-3 w-full rounded bg-sand-100" />
        <div className="h-3 w-5/6 rounded bg-sand-100" />
        <div className="h-3 w-2/3 rounded bg-sand-100" />
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-sand-100">
        <div className="h-3 w-24 rounded bg-sand-100" />
        <div className="h-3 w-16 rounded bg-sand-200" />
      </div>
    </div>
  )
}

export function CardSkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  )
}
