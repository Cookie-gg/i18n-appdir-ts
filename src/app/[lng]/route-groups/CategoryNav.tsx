'use client';

import { type Category } from '@/lib/getCategories';
import { TabNavItem } from '@/ui/TabNavItem';
import { useSelectedLayoutSegments } from 'next/navigation';

const CategoryNav = ({
  categories,
  lng,
}: {
  categories: Category[];
  lng: string;
}) => {
  const [selectedLayoutSegments] = useSelectedLayoutSegments();

  return (
    <div className="flex items-center space-x-4">
      <TabNavItem
        href={`/${lng}/route-groups`}
        isActive={!selectedLayoutSegments}
      >
        Home
      </TabNavItem>

      {categories.map((item) => (
        <TabNavItem
          key={item.slug}
          href={`/${lng}/route-groups/${item.slug}`}
          isActive={item.slug === selectedLayoutSegments}
        >
          {item.name}
        </TabNavItem>
      ))}

      <TabNavItem href={`/${lng}/route-groups/checkout`}>Checkout</TabNavItem>

      <TabNavItem
        href={`/${lng}/route-groups/blog`}
        isActive={'blog' === selectedLayoutSegments}
      >
        Blog
      </TabNavItem>
    </div>
  );
};

export default CategoryNav;
