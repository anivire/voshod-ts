import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main style={inter.style} className="min-h-full w-full">
        {children}
      </main>
    </>
  );
}
