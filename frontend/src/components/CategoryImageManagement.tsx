import { useState, useEffect, useRef, type FC } from 'react';
import { ownerService, petService } from '../services/api';
import { imageService } from '../services/imageService';
import { useToast } from './ToastProvider';

/** Static data for veterinarians and receptionists */
const MOCK_VETERINARIANS = [
  { _id: 'vet-001', nombre: 'Dr. Juan Pérez' },
  { _id: 'vet-002', nombre: 'Dra. María López' },
  { _id: 'vet-003', nombre: 'Dr. Carlos Martín' },
] as const;

const MOCK_RECEPTIONISTS = [
  { _id: 'rec-001', nombre: 'Ana García' },
  { _id: 'rec-002', nombre: 'Sofia Mendez' },
] as const;

/** Categories configuration */
const CATEGORIES = [
  { id: 'pets', name: 'Mascotas', emoji: '🐾' },
  { id: 'owners', name: 'Dueños', emoji: '👥' },
  { id: 'veterinarians', name: 'Veterinarios', emoji: '🩺' },
  { id: 'receptionists', name: 'Recepcionistas', emoji: '📞' },
] as const;

/** Valid category types */
type CategoryId = typeof CATEGORIES[number]['id'];
type CategoryType = CategoryId | null;

/** Represents an item that can have an associated image */
interface CategoryItem {
  id: string;
  nombre: string;
  categoryId: string;
  categoryName: string;
  categoryEmoji: string;
  image: string | null;
}

interface CategoryImageManagementProps {
  token?: string;
}

/**
 * CategoryImageManagement Component
 * 
 * Manages image uploads for multiple entity categories (pets, owners, vets, receptionists)
 * Uses localStorage for persistence and provides a user-friendly interface for image management
 */
const CategoryImageManagement: FC<CategoryImageManagementProps> = () => {
  // State management
  const [activeCategory, setActiveCategory] = useState<CategoryType>(null);
  const [items, setItems] = useState<CategoryItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Hooks
  const toast = useToast();

  /**
   * Filter items when category changes
   */
  useEffect(() => {
    filterItemsByCategory();
  }, [activeCategory]);

  /**
   * Fetch all items on component mount
   */
  useEffect(() => {
    loadAllItems();
  }, []);

  /**
   * Filter items based on active category
   */
  const filterItemsByCategory = () => {
    if (!activeCategory) {
      setFilteredItems([]);
      return;
    }

    const categoryNameMap: Record<CategoryId, string> = {
      pets: 'Mascota',
      owners: 'Dueño',
      veterinarians: 'Veterinario',
      receptionists: 'Recepcionista',
    };

    const categoryName = categoryNameMap[activeCategory as CategoryId];
    const filtered = items.filter(item => item.categoryName === categoryName);
    setFilteredItems(filtered);
  };

  /**
   * Load items from API and mock data
   */
  const loadAllItems = async () => {
    setLoading(true);
    try {
      const [owners, pets] = await Promise.all([
        ownerService.getAll(),
        petService.getAll()
      ]);

      const allItems = [
        ...buildPetItems(pets),
        ...buildOwnerItems(owners),
        ...buildVeterinarianItems(),
        ...buildReceptionistItems(),
      ];

      setItems(allItems);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      console.error('Error loading items:', errorMessage);
      toast.addToast('Error cargando datos', 'error');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Build pet items list
   */
  const buildPetItems = (pets: unknown[]): CategoryItem[] => {
    if (!Array.isArray(pets) || pets.length === 0) return [];

    return pets.map((pet: any) => ({
      id: `pet-${pet._id}`,
      nombre: pet.nombre,
      categoryId: pet._id,
      categoryName: 'Mascota',
      categoryEmoji: '🐾',
      image: imageService.getImageForCategory(`pet-${pet._id}`) || pet.imagen_url || null
    }));
  };

  /**
   * Build owner items list
   */
  const buildOwnerItems = (owners: unknown[]): CategoryItem[] => {
    if (!Array.isArray(owners) || owners.length === 0) return [];

    return owners.map((owner: any) => ({
      id: `owner-${owner._id}`,
      nombre: owner.nombre,
      categoryId: owner._id,
      categoryName: 'Dueño',
      categoryEmoji: '👥',
      image: imageService.getImageForCategory(`owner-${owner._id}`) || null
    }));
  };

  /**
   * Build veterinarian items list
   */
  const buildVeterinarianItems = (): CategoryItem[] => {
    return MOCK_VETERINARIANS.map(vet => ({
      id: `vet-${vet._id}`,
      nombre: vet.nombre,
      categoryId: vet._id,
      categoryName: 'Veterinario',
      categoryEmoji: '🩺',
      image: imageService.getImageForCategory(`vet-${vet._id}`) || null
    }));
  };

  /**
   * Build receptionist items list
   */
  const buildReceptionistItems = (): CategoryItem[] => {
    return MOCK_RECEPTIONISTS.map(rec => ({
      id: `rec-${rec._id}`,
      nombre: rec.nombre,
      categoryId: rec._id,
      categoryName: 'Recepcionista',
      categoryEmoji: '📞',
      image: imageService.getImageForCategory(`rec-${rec._id}`) || null
    }));
  };

  /**
   * Handle file selection and upload
   */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (!file || !uploadingId) {
      return;
    }

    if (!file.type.startsWith('image/')) {
      toast.addToast('Por favor selecciona un archivo de imagen válido', 'error');
      return;
    }

    const reader = new FileReader();
    
    reader.onload = (event) => {
      const imageData = event.target?.result;
      
      if (typeof imageData !== 'string') {
        toast.addToast('Error al procesar la imagen', 'error');
        return;
      }

      imageService.saveImageToCategory(uploadingId, imageData);
      
      setItems(prev => prev.map(item => 
        item.id === uploadingId 
          ? { ...item, image: imageData }
          : item
      ));
      
      toast.addToast('¡Imagen cargada exitosamente!', 'success');
      closeImagePicker();
    };
    
    reader.onerror = () => {
      toast.addToast('Error al leer el archivo', 'error');
    };
    
    reader.readAsDataURL(file);
  };

  /**
   * Delete image from category
   */
  const handleDeleteImage = (itemId: string) => {
    imageService.deleteImageFromCategory(itemId);
    
    setItems(prev => prev.map(item => 
      item.id === itemId 
        ? { ...item, image: null }
        : item
    ));
    
    toast.addToast('Imagen eliminada', 'success');
  };

  /**
   * Open image picker modal
   */
  const openImagePicker = (itemId: string) => {
    setUploadingId(itemId);
    setShowModal(true);
  };

  /**
   * Close image picker modal and reset state
   */
  const closeImagePicker = () => {
    setShowModal(false);
    setUploadingId(null);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const currentItem = uploadingId ? items.find(i => i.id === uploadingId) : null;

  return (
    <div className="space-y-6 animate-fade-in">
      <Header />
      <CategoryTabs 
        categories={CATEGORIES}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <ContentSection
        loading={loading}
        activeCategory={activeCategory}
        filteredItems={filteredItems}
        onImagePicker={openImagePicker}
        onImageDelete={handleDeleteImage}
      />
      <ImagePickerModal
        show={showModal}
        currentItem={currentItem}
        fileInputRef={fileInputRef}
        onFileChange={handleFileChange}
        onClose={closeImagePicker}
      />
      <InfoSection />
    </div>
  );
};

/**
 * Header Component
 */
const Header: FC = () => (
  <div>
    <h2 className="text-2xl font-bold text-[#121517]">🖼️ Gestión de Imágenes</h2>
    <p className="text-[#657886] text-sm">Organiza tus imágenes por categoría</p>
  </div>
);

/**
 * Category Tabs Component
 */
interface CategoryTabsProps {
  categories: readonly typeof CATEGORIES[number][];
  activeCategory: CategoryType;
  onCategoryChange: (category: CategoryType) => void;
}

const CategoryTabs: FC<CategoryTabsProps> = ({ categories, activeCategory, onCategoryChange }) => (
  <div className="flex gap-4 flex-wrap">
    {categories.map(cat => (
      <button
        key={cat.id}
        onClick={() => onCategoryChange(activeCategory === cat.id ? null : cat.id)}
        className={`flex items-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all ${
          activeCategory === cat.id
            ? 'bg-primary text-white shadow-lg'
            : 'bg-white text-[#121517] border border-[#dce1e5] hover:border-primary hover:text-primary'
        }`}
      >
        <span className="text-lg">{cat.emoji}</span>
        {cat.name}
      </button>
    ))}
  </div>
);

/**
 * Content Section Component
 */
interface ContentSectionProps {
  loading: boolean;
  activeCategory: CategoryType;
  filteredItems: CategoryItem[];
  onImagePicker: (itemId: string) => void;
  onImageDelete: (itemId: string) => void;
}

const ContentSection: FC<ContentSectionProps> = ({
  loading,
  activeCategory,
  filteredItems,
  onImagePicker,
  onImageDelete,
}) => {
  if (!activeCategory) return null;

  return (
    <div className="rounded-xl bg-white shadow-sm border border-[#dce1e5] overflow-hidden">
      {loading && <LoadingSpinner />}
      {!loading && filteredItems.length === 0 && <EmptyState />}
      {!loading && filteredItems.length > 0 && (
        <ItemsTable
          items={filteredItems}
          onImagePicker={onImagePicker}
          onImageDelete={onImageDelete}
        />
      )}
    </div>
  );
};

/**
 * Loading Spinner Component
 */
const LoadingSpinner: FC = () => (
  <div className="flex items-center justify-center py-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

/**
 * Empty State Component
 */
const EmptyState: FC = () => (
  <div className="text-center py-8">
    <p className="text-[#657886]">No hay items en esta categoría</p>
  </div>
);

/**
 * Items Table Component
 */
interface ItemsTableProps {
  items: CategoryItem[];
  onImagePicker: (itemId: string) => void;
  onImageDelete: (itemId: string) => void;
}

const ItemsTable: FC<ItemsTableProps> = ({ items, onImagePicker, onImageDelete }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-left">
      <thead>
        <tr className="bg-[#f8fafc] text-xs font-semibold uppercase tracking-wider text-[#657886] border-b border-[#dce1e5]">
          <th className="px-6 py-4">Nombre</th>
          <th className="px-6 py-4">ID</th>
          <th className="px-6 py-4">Imagen</th>
          <th className="px-6 py-4 text-right">Acciones</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-[#f0f3f4]">
        {items.map(item => (
          <ItemRow
            key={item.id}
            item={item}
            onImagePicker={onImagePicker}
            onImageDelete={onImageDelete}
          />
        ))}
      </tbody>
    </table>
  </div>
);

/**
 * Table Item Row Component
 */
interface ItemRowProps {
  item: CategoryItem;
  onImagePicker: (itemId: string) => void;
  onImageDelete: (itemId: string) => void;
}

const ItemRow: FC<ItemRowProps> = ({ item, onImagePicker, onImageDelete }) => (
  <tr className="hover:bg-[#f8fafc] transition-colors">
    <td className="px-6 py-4">
      <span className="text-sm font-medium text-[#121517]">{item.nombre}</span>
    </td>
    <td className="px-6 py-4">
      <span className="text-xs font-mono bg-[#f0f3f4] text-[#657886] px-3 py-1 rounded-md">
        {item.categoryId.slice(0, 8)}
      </span>
    </td>
    <td className="px-6 py-4">
      <ImagePreview image={item.image} nombre={item.nombre} />
    </td>
    <td className="px-6 py-4 text-right space-x-2 flex items-center justify-end">
      <button
        onClick={() => onImagePicker(item.id)}
        className="px-3 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 font-semibold text-xs transition-colors"
        title="Cargar o cambiar imagen"
      >
        📁 Cambiar
      </button>
      {item.image && (
        <button
          onClick={() => onImageDelete(item.id)}
          className="px-3 py-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 font-semibold text-xs transition-colors"
          title="Eliminar imagen"
        >
          🗑️ Eliminar
        </button>
      )}
    </td>
  </tr>
);

/**
 * Image Preview Component
 */
interface ImagePreviewProps {
  image: string | null;
  nombre: string;
}

const ImagePreview: FC<ImagePreviewProps> = ({ image, nombre }) => {
  if (image) {
    return (
      <div className="h-12 w-12 rounded-lg bg-cover bg-center border border-[#dce1e5] shadow-sm overflow-hidden">
        <img 
          src={image} 
          alt={nombre}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div className="h-12 w-12 rounded-lg bg-[#f0f3f4] border border-[#dce1e5] flex items-center justify-center">
      <span className="text-xs text-[#657886]">—</span>
    </div>
  );
};

/**
 * Image Picker Modal Component
 */
interface ImagePickerModalProps {
  show: boolean;
  currentItem: CategoryItem | null | undefined;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClose: () => void;
}

const ImagePickerModal: FC<ImagePickerModalProps> = ({
  show,
  currentItem,
  fileInputRef,
  onFileChange,
  onClose,
}) => {
  if (!show || !currentItem) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full mx-4">
        <div className="text-center space-y-4">
          <div className="text-4xl">{currentItem.categoryEmoji}</div>
          <h3 className="text-xl font-bold text-[#121517]">
            Agregar imagen para
          </h3>
          <p className="text-lg font-semibold text-primary">
            {currentItem.nombre}
          </p>
          
          <div className="pt-4">
            <label className="cursor-pointer block">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={onFileChange}
                className="hidden"
              />
              <div className="flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-primary/30 bg-primary/5 py-8 px-4 hover:bg-primary/10 transition-colors">
                <span className="material-symbols-outlined text-4xl text-primary">cloud_upload</span>
                <div>
                  <p className="font-semibold text-[#121517]">Selecciona una imagen</p>
                  <p className="text-xs text-[#657886]">JPG, PNG, WebP o GIF</p>
                </div>
              </div>
            </label>
          </div>

          <button
            onClick={onClose}
            className="w-full mt-4 px-4 py-2 rounded-lg bg-gray-200 text-[#121517] hover:bg-gray-300 font-semibold transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * Info Section Component
 */
const InfoSection: FC = () => (
  <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
    <p className="text-xs text-blue-700 font-semibold">ℹ️ Información:</p>
    <ul className="text-xs text-blue-600 mt-2 space-y-1">
      <li>✓ Haz clic en una categoría para ver sus items</li>
      <li>✓ Usa el botón "📁 Cambiar" para subir o reemplazar una imagen</li>
      <li>✓ Soporta JPG, PNG, WebP y GIF</li>
      <li>✓ Las imágenes se guardan localmente en tu navegador</li>
    </ul>
  </div>
);

export default CategoryImageManagement;
