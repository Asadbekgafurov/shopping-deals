import { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
}

interface PageProps {
  product: Product;
}

export const getStaticProps: GetStaticProps<PageProps> = async ({ params }) => {
  const { id } = params as { id: string };

  // Mahsulot ma'lumotlarini olish
  const res = await fetch(`https://api.example.com/products/${id}`);
  const product: Product = await res.json();

  return {
    props: {
      product,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  // Mavjud mahsulot IDlarini olish
  const res = await fetch('https://api.example.com/products');
  const products: Product[] = await res.json();

  const paths = products.map((product) => ({
    params: { id: product.id },
  }));

  return {
    paths,
    fallback: false,
  };
};

const ProductPage: NextPage<PageProps> = ({ product }) => {
  const router = useRouter();

  // Agar sahifa hali yaratilmagan bo'lsa
  if (router.isFallback) {
    return <div>Yuklanmoqda...</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <Image src={product.imageUrl} alt={product.name} width={500} height={300} />
      <p>{product.description}</p>
      <p>Narxi: ${product.price}</p>
    </div>
  );
};

export default ProductPage;
