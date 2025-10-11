import { homeContent } from '../../data/home/contents';

export default async function HomePage({ params }: { params: { lang: string } }) {
  const { lang } = await Promise.resolve(params); // Await params properly
  const content = homeContent[lang as keyof typeof homeContent];

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">{content.title}</h1>
      <p className="text-gray-600">{content.description}</p>
    </main>
  );
}
