export default function CardSkeleton() {
  return (
    <>
      <div className="flex h-[336px] max-w-72 animate-pulse flex-col rounded-2xl bg-zinc-900">
        <div className="h-36 bg-zinc-950/50" />
        <div className="flex flex-col gap-5 p-5">
          <div className="w-32 rounded-full bg-zinc-800 py-2" />
          <div className="w-48 rounded-full bg-zinc-800 py-2" />
          <div className="w-32 rounded-full bg-zinc-800 py-2" />
          <div className="mt-2 w-full rounded-xl bg-zinc-800 py-4" />
        </div>
      </div>
    </>
  );
}
