'use client';

import { type Category } from '@/lib/getCategories';
import { TabNavItem } from '@/ui/TabNavItem';
import { useSelectedLayoutSegments } from 'next/navigation';

const SubCategoryNav = ({
  category,
  lng,
}: {
  category: Category;
  lng: string;
}) => {
  const [selectedLayoutSegments] = useSelectedLayoutSegments();

  return (
    <div className="flex items-center space-x-4">
      <TabNavItem
        href={`/${lng}/layouts/${category.slug}`}
        isActive={!selectedLayoutSegments}
      >
        All
      </TabNavItem>

      {category.items.map((item) => (
        <TabNavItem
          key={item.slug}
          href={`${lng}/layouts/${category.slug}/${item.slug}`}
          isActive={item.slug === selectedLayoutSegments}
        >
          {item.name}
        </TabNavItem>
      ))}
    </div>
  );
};

export default SubCategoryNav;
