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
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openModal = (productId) => {
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
        <div className="container mx-auto px-4 py-16 lg:py-24 text-center">
          <Heart className="h-16 w-16 mx-auto mb-6 text-muted-foreground" />
          <h1 className="font-serif text-4xl font-bold mb-4">Your Wishlist is Empty</h1>
          <p className="text-muted-foreground text-lg mb-8">
            Start adding items you love to your wishlist!
          </p>
          <Button asChild>
            <Link to="/shop">
              Browse Products <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <h1 className="font-serif text-4xl font-bold mb-8">My Wishlist</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((product, index) => (
            <div key={product.id} className="relative">
              <ProductCard product={product} index={index} />
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
