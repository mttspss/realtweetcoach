// import '../../styles/globals.css'; // Rimosso perché importato nel RootLayout

export const metadata = {
  title: 'Tweetcoa.ch - Grow Your X Account',
  description: 'Discover how Tweetcoa.ch can elevate your X presence with AI-driven analytics.',
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
} 