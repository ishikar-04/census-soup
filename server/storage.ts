import { db } from "./db";
import { countries, type Country, type InsertCountry } from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getCountries(): Promise<Country[]>;
  getCountryByCode(code: string): Promise<Country | undefined>;
  createCountry(country: InsertCountry): Promise<Country>;
}

export class DatabaseStorage implements IStorage {
  async getCountries(): Promise<Country[]> {
    return await db.select().from(countries);
  }

  async getCountryByCode(code: string): Promise<Country | undefined> {
    const [country] = await db.select().from(countries).where(eq(countries.code, code));
    return country;
  }

  async createCountry(country: InsertCountry): Promise<Country> {
    const [newCountry] = await db.insert(countries).values(country).returning();
    return newCountry;
  }
}

export const storage = new DatabaseStorage();
