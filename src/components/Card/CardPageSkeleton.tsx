export default function CardPageSkeleton() {
  return (
    <>
      <div className="flex h-[450px] max-w-full animate-pulse flex-row rounded-2xl bg-zinc-900">
        <div className="h-full w-[450px] bg-zinc-950/50" />
        <div className="flex flex-col gap-5 p-5">
          <div className="w-32 rounded-full bg-zinc-800 py-2" />
          <div className="w-48 rounded-full bg-zinc-800 py-2" />
          <div className="w-32 rounded-full bg-zinc-800 py-2" />
        </div>
      </div>
    </>
  );
}
