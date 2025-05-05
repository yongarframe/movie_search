export default function Skeleton() {
  return (
    <div className="relative w-full h-[600px] bg-gray-900 overflow-hidden">
      {/* 스켈레톤 배경 */}
      <div className="w-full h-full bg-gray-700 animate-pulse object-cover" />

      {/* 오버레이 */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

      {/* 콘텐츠 스켈레톤 */}
      <div className="absolute bottom-10 left-6 md:left-12 max-w-2xl space-y-6">
        <div className="h-10 md:h-14 bg-gray-600 rounded w-3/4 animate-pulse"></div>
        <div className="h-5 bg-gray-600 rounded w-1/3 animate-pulse"></div>
        <div className="h-4 bg-gray-600 rounded w-1/2 animate-pulse"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-600 rounded w-full animate-pulse"></div>
          <div className="h-4 bg-gray-600 rounded w-5/6 animate-pulse"></div>
          <div className="h-4 bg-gray-600 rounded w-2/3 animate-pulse"></div>
        </div>
        <div className="flex gap-4 mt-4">
          <div className="h-10 w-24 bg-gray-600 rounded animate-pulse"></div>
          <div className="h-10 w-28 bg-gray-600 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
