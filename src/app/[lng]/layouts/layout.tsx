import { fetchCategories } from '@/lib/getCategories';
import ClickCounter from '@/ui/ClickCounter';
import React, { use } from 'react';
import CategoryNav from './CategoryNav';

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lng: string };
}) {
  const categories = use(fetchCategories());
  return (
    <div className="space-y-9">
      <div className="flex items-center justify-between">
        <CategoryNav categories={categories} lng={params.lng} />
        <ClickCounter />
      </div>

      <div>{children}</div>
    </div>
  );
}
