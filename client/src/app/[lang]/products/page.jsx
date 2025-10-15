import productContents from '../../../data/products/content.json';

export default function ProductsPage({ params }) {
  const { lang } = params;

  const headings = productContents.headings[lang] || productContents.headings['en'];
  const importCategories = Object.values(productContents.import).map(category => ({
    category: category[lang]?.category || category['en'].category,
    items: category.items.map(item => ({
      imagePath: item.imagePath,
      imageName: item[lang]?.imageName || item['en'].imageName,
      origins: item[lang]?.origins || item['en'].origins
    }))
  }));
  const exportCategories = Object.values(productContents.export).map(category => ({
    category: category[lang]?.category || category['en'].category,
    items: category.items.map(item => ({
      imagePath: item.imagePath,
      imageName: item[lang]?.imageName || item['en'].imageName,
      origins: item[lang]?.origins || item['en'].origins
    }))
  }));

  return (
    <main className="p-8">
      <h1 className="text-5xl font-bold mb-4 text-center">{headings.heading}</h1>

      {/* Import Section */}
      <h2 className="text-xl text-gray-600 mb-8 text-center">{headings.subheadingImport}</h2>
      {importCategories.map((category, index) => (
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
                  <p className="text-sm text-gray-500">{item.origins.join(', ')}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* Export Section */}
      <h2 className="text-xl text-gray-600 mb-8 text-center">{headings.subheadingExport}</h2>
      {exportCategories.map((category, index) => (
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
                  <p className="text-sm text-gray-500">{item.origins.join(', ')}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
