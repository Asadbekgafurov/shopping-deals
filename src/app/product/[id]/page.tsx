import { useParams } from 'next/navigation';
import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
}

const fetchProduct = async (id: string): Promise<Product> => {
  const res = await fetch(`https://api.example.com/products/${id}`, {
    cache: 'no-store', // Dinamik yuklash uchun.
  });

  if (!res.ok) {
    throw new Error('Mahsulot ma’lumotlari yuklanmadi.');
  }

  return res.json();
};

const ProductPage = async () => {
  const params = useParams();
  const productId = params?.id as string;

  if (!productId) {
    return <div>Mahsulot ID topilmadi.</div>;
  }

  try {
    const product = await fetchProduct(productId);

    return (
      <div>
        <h1>{product.name}</h1>
        <Image src={product.imageUrl} alt={product.name} width={500} height={300} />
        <p>{product.description}</p>
        <p>Narxi: ${product.price}</p>
      </div>
    );
  } catch (error) {
    return <div>Mahsulotni yuklashda xatolik yuz berdi.</div>;
  }
};

export default ProductPage;
