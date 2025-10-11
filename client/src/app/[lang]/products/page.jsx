import { productContents } from '../../../data/products/contents';

export default function ProductsPage({ params }) {
  const lang = params.lang || 'en';
  const content = productContents[lang] || productContents['en'];

  return (
    <main className="p-8">
      <h1 className="text-5xl font-bold mb-4 text-center">{content.heading}</h1>

      {/* Import Section */}
      <h2 className="text-xl text-gray-600 mb-8 text-center">{content.subheadingImport}</h2>
      {content.importCategories?.map((category, index) => (
        <section key={index} className="mb-12">
          <h3 className="text-2xl font-semibold mb-4">{category.category}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {category.items.map((item, idx) => (
              <div
                key={idx}
                className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={item.imagePath}
                  alt={item.imageName}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h4 className="text-lg font-bold mb-2">{item.imageName}</h4>
                  <p className="text-sm text-gray-500">
                    {item.origins.join(', ')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* Export Section */}
      <h2 className="text-xl text-gray-600 mb-8 text-center">{content.subheadingExport}</h2>
      {content.exportCategories?.map((category, index) => (
        <section key={index} className="mb-12">
          <h3 className="text-2xl font-semibold mb-4">{category.category}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {category.items.map((item, idx) => (
              <div
                key={idx}
                className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={item.imagePath}
                  alt={item.imageName}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h4 className="text-lg font-bold mb-2">{item.imageName}</h4>
                  <p className="text-sm text-gray-500">
                    {item.origins.join(', ')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}

