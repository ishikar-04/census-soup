import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

// GET /api/countries
export function useCountries() {
  return useQuery({
    queryKey: [api.countries.list.path],
    queryFn: async () => {
      const res = await fetch(api.countries.list.path);
      if (!res.ok) throw new Error("Failed to fetch countries");
      return api.countries.list.responses[200].parse(await res.json());
    },
  });
}

// GET /api/countries/:code
export function useCountry(code: string | null) {
  return useQuery({
    queryKey: [api.countries.get.path, code],
    queryFn: async () => {
      if (!code) return null;
      // Manually replace :code in the path
      const url = api.countries.get.path.replace(":code", code);
      const res = await fetch(url);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch country details");
      return api.countries.get.responses[200].parse(await res.json());
    },
    enabled: !!code,
  });
}
