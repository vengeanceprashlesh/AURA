import { NavigationCategory } from '@/types';
import { navigationCategories } from '@/data/categories';

/**
 * Get a category by its slug
 */
export const getCategoryBySlug = (slug: string): NavigationCategory | undefined => {
  return navigationCategories.find(category => category.slug === slug);
};

/**
 * Get a category by its ID
 */
export const getCategoryById = (id: string): NavigationCategory | undefined => {
  return navigationCategories.find(category => category.id === id);
};

/**
 * Get all subcategories for a given category
 */
export const getSubcategoriesByCategory = (categoryId: string) => {
  const category = getCategoryById(categoryId);
  return category?.subcategories || [];
};

/**
 * Generate a breadcrumb path for a given category URL
 */
export const generateBreadcrumb = (href: string): string[] => {
  // Remove leading slash and split by slash
  const pathSegments = href.replace(/^\//, '').split('/');

  // Generate breadcrumb labels
  const breadcrumb: string[] = [];

  // Find the category
  const categorySlug = pathSegments[1]; // categories/[slug]
  const category = getCategoryBySlug(categorySlug);

  if (category) {
    breadcrumb.push('Home', category.name);

    // If there are subcategory segments
    if (pathSegments.length > 2) {
      const subcategorySlug = pathSegments[2];
      const subcategory = category.subcategories?.find(sub => sub.slug === subcategorySlug);

      if (subcategory) {
        breadcrumb.push(subcategory.name);

        // If there are item segments
        if (pathSegments.length > 3) {
          const itemSlug = pathSegments[3];
          const item = subcategory.items?.find(item => item.href.includes(itemSlug));

          if (item) {
            breadcrumb.push(item.name);
          }
        }
      }
    }
  }

  return breadcrumb;
};

/**
 * Get all categories that are marked as featured
 */
export const getFeaturedCategories = (): NavigationCategory[] => {
  return navigationCategories.filter(category => category.featured);
};

/**
 * Get all categories that are marked as hot
 */
export const getHotCategories = (): NavigationCategory[] => {
  return navigationCategories.filter(category => category.hot);
};

/**
 * Get all categories that are marked as sale
 */
export const getSaleCategories = (): NavigationCategory[] => {
  return navigationCategories.filter(category => category.sale);
};

/**
 * Get all navigation links in a flat structure (useful for sitemaps, mobile menus, etc.)
 */
export const getAllNavigationLinks = () => {
  const links: Array<{
    name: string;
    href: string;
    level: number;
    parentId?: string;
    badge?: string;
    isNew?: boolean;
  }> = [];

  navigationCategories.forEach(category => {
    // Add main category
    links.push({
      name: category.name,
      href: category.href,
      level: 0,
    });

    // Add subcategories
    category.subcategories?.forEach(subcategory => {
      links.push({
        name: subcategory.name,
        href: subcategory.href,
        level: 1,
        parentId: category.id,
      });

      // Add items
      subcategory.items?.forEach(item => {
        links.push({
          name: item.name,
          href: item.href,
          level: 2,
          parentId: subcategory.id,
          badge: item.badge,
          isNew: item.isNew,
        });
      });
    });
  });

  return links;
};

/**
 * Search categories and subcategories by name
 */
export const searchCategories = (query: string): Array<{
  category: NavigationCategory;
  subcategory?: any;
  item?: any;
  matchType: 'category' | 'subcategory' | 'item';
}> => {
  const results: Array<{
    category: NavigationCategory;
    subcategory?: any;
    item?: any;
    matchType: 'category' | 'subcategory' | 'item';
  }> = [];

  const normalizedQuery = query.toLowerCase();

  navigationCategories.forEach(category => {
    // Check category name
    if (category.name.toLowerCase().includes(normalizedQuery)) {
      results.push({
        category,
        matchType: 'category',
      });
    }

    // Check subcategories
    category.subcategories?.forEach(subcategory => {
      if (subcategory.name.toLowerCase().includes(normalizedQuery)) {
        results.push({
          category,
          subcategory,
          matchType: 'subcategory',
        });
      }

      // Check items
      subcategory.items?.forEach(item => {
        if (item.name.toLowerCase().includes(normalizedQuery)) {
          results.push({
            category,
            subcategory,
            item,
            matchType: 'item',
          });
        }
      });
    });
  });

  return results;
};

/**
 * Get category path from URL
 */
export const getCategoryPathFromUrl = (url: string): string[] => {
  const pathSegments = url.replace(/^\//, '').split('/');

  if (pathSegments[0] !== 'categories') {
    return [];
  }

  return pathSegments.slice(1); // Remove 'categories' prefix
};

/**
 * Check if a URL belongs to a specific category
 */
export const isUrlInCategory = (url: string, categorySlug: string): boolean => {
  const path = getCategoryPathFromUrl(url);
  return path.length > 0 && path[0] === categorySlug;
};

/**
 * Generate category URL from slug and optional subcategory/item slugs
 */
export const generateCategoryUrl = (
  categorySlug: string,
  subcategorySlug?: string,
  itemSlug?: string
): string => {
  let url = `/categories/${categorySlug}`;

  if (subcategorySlug) {
    url += `/${subcategorySlug}`;
  }

  if (itemSlug) {
    url += `/${itemSlug}`;
  }

  return url;
};

/**
 * Get menu layout type for category
 */
export const getCategoryMenuLayout = (categoryId: string): 'simple' | 'columns' | 'grid' | 'revolve' => {
  const category = getCategoryById(categoryId);
  return category?.megaMenuLayout || 'simple';
};

export default {
  getCategoryBySlug,
  getCategoryById,
  getSubcategoriesByCategory,
  generateBreadcrumb,
  getFeaturedCategories,
  getHotCategories,
  getSaleCategories,
  getAllNavigationLinks,
  searchCategories,
  getCategoryPathFromUrl,
  isUrlInCategory,
  generateCategoryUrl,
  getCategoryMenuLayout,
};
