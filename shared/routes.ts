import { z } from 'zod';
import { insertCountrySchema, countries } from './schema';

export const errorSchemas = {
  notFound: z.object({
    message: z.string(),
  }),
};

export const api = {
  countries: {
    list: {
      method: 'GET' as const,
      path: '/api/countries',
      responses: {
        200: z.array(z.custom<typeof countries.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/countries/:code', // Get by ISO code
      responses: {
        200: z.custom<typeof countries.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
  },
};

export type CountryResponse = z.infer<typeof api.countries.get.responses[200]>;
export type CountriesListResponse = z.infer<typeof api.countries.list.responses[200]>;
