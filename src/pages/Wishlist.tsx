import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight, Trash2 } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { useWishlist } from '@/context/WishlistContext';

export default function Wishlist() {
  const { items, removeFromWishlist } = useWishlist();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const openModal = (productId: string) => {
    setSelectedProduct(productId);
    setModalOpen(true);
  };

  const confirmRemove = () => {
    if (selectedProduct) {
      removeFromWishlist(selectedProduct);
      setModalOpen(false);
      setSelectedProduct(null);
    }
  };

  const cancelRemove = () => {
    setModalOpen(false);
    setSelectedProduct(null);
  };

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <div className="max-w-md mx-auto text-center">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
              <Heart className="h-12 w-12 text-muted-foreground" />
            </div>
            <h1 className="font-serif text-2xl font-bold mb-4">Your wishlist is empty</h1>
            <p className="text-muted-foreground mb-8">
              Save your favorite handcrafted pieces here for later.
            </p>
            <Link to="/shop">
              <Button size="lg">
                Discover Products
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="text-center mb-8 lg:mb-12">
          <h1 className="font-serif text-3xl lg:text-4xl font-bold mb-4">My Wishlist</h1>
          <p className="text-muted-foreground">
            {items.length} {items.length === 1 ? 'item' : 'items'} saved
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((product, index) => (
            <div key={product.id} className="relative">
              <ProductCard product={product} index={index} />
              {/* Remove button */}
              <button
                onClick={() => openModal(product.id)}
                className="absolute top-2 right-2 p-1 rounded-full bg-red-500 hover:bg-red-600 text-white"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-card p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
              <h2 className="text-lg font-bold mb-4">Remove from Wishlist?</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Are you sure you want to remove this item from your wishlist?
              </p>
              <div className="flex justify-center gap-4">
                <Button variant="outline" onClick={cancelRemove}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={confirmRemove}>
                  Remove
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
