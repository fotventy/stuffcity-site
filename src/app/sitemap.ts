import { MetadataRoute } from 'next';
import { professionsData } from '@/data/professions';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://стаффсити.рф';
  
  type SitemapEntry = {
    url: string;
    lastModified: Date;
    changeFrequency: "weekly" | "monthly" | "always" | "hourly" | "daily" | "yearly" | "never";
    priority: number;
  };
  
  // Основные страницы
  const staticPages: SitemapEntry[] = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/professions`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contacts`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];
  
  // Страницы профессий
  const professionPages: SitemapEntry[] = professionsData.map((profession) => ({
    url: `${baseUrl}/professions/${profession.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));
  
  return [...staticPages, ...professionPages];
} 