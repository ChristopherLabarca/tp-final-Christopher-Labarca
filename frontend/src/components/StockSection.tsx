import { useState, useEffect } from 'react';
import { categoryService, productService } from '../services/api';
import type { Category, Product } from '../types/index';

export default function StockSection() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [catsData, prodsData] = await Promise.all([
          categoryService.getAll(),
          productService.getAll(),
        ]);
        setCategories(catsData);
        setProducts(prodsData);
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('No se pudieron cargar los datos del backend');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="p-4 text-center">Cargando datos del backend...</div>;

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#121517]">Gestión de Stock</h2>
          <p className="text-[#657886] text-sm">
            Datos en tiempo real desde el backend
          </p>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Categorías */}
        <div className="rounded-xl bg-white p-6 shadow-sm border border-[#dce1e5]">
          <h3 className="mb-4 text-lg font-bold text-[#121517]">Categorías ({categories.length})</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {categories.map((cat) => (
              <div key={cat._id} className="p-3 bg-[#f8fafc] rounded-lg border border-[#dce1e5]">
                <p className="font-medium text-[#121517]">{cat.name}</p>
                <p className="text-xs text-[#657886]">{cat._id}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Productos */}
        <div className="rounded-xl bg-white p-6 shadow-sm border border-[#dce1e5]">
          <h3 className="mb-4 text-lg font-bold text-[#121517]">Productos ({products.length})</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {products.map((prod) => (
              <div key={prod._id} className="p-3 bg-[#f8fafc] rounded-lg border border-[#dce1e5]">
                <p className="font-medium text-[#121517]">{prod.name}</p>
                <p className="text-xs text-[#657886]">{prod.description}</p>
                <div className="flex justify-between mt-2 text-sm">
                  <span className="text-primary font-bold">${prod.price}</span>
                  <span className="text-[#657886]">Stock: {prod.stock}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
