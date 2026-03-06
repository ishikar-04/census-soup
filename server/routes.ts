import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get(api.countries.list.path, async (req, res) => {
    const countries = await storage.getCountries();
    res.json(countries);
  });

  app.get(api.countries.get.path, async (req, res) => {
    const { code } = req.params;
    if (typeof code !== 'string') {
      return res.status(400).json({ message: 'Invalid country code' });
    }
    const country = await storage.getCountryByCode(code);
    if (!country) {
      return res.status(404).json({ message: 'Country not found' });
    }
    res.json(country);
  });

  // Initial Seed Data
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existing = await storage.getCountries();
  if (existing.length === 0) {
    console.log("Seeding database with country data...");
    
    const initialCountries = [
      {
        name: "China",
        code: "CHN",
        population: "1.41 Billion",
        censusFrequency: "Every 10 years",
        description: "China conducts one of the largest peacetime mobilizations in the world for its census.",
        sourceUrl: "http://www.stats.gov.cn/english/",
        surveyQuestions: [
          { question: "Name and ID Number", format: "Open-ended" },
          { question: "Gender and Age", format: "Multiple choice" },
          { question: "Ethnicity", format: "Multiple choice" },
          { question: "Education Level", format: "Multiple choice" },
          { question: "Occupation and Industry", format: "Open-ended" },
          { question: "Migration status (Hukou)", format: "Multiple choice" },
          { question: "Housing details", format: "Multiple choice" },
          { question: "Marital status", format: "Multiple choice" }
        ]
      },
      {
        name: "India",
        code: "IND",
        population: "1.43 Billion",
        censusFrequency: "Every 10 years",
        description: "India's census is massive in scale, covering diverse languages, religions, and cultures.",
        sourceUrl: "https://censusindia.gov.in/",
        surveyQuestions: [
          { question: "Name and Relationship to Head", format: "Open-ended" },
          { question: "Sex and Date of Birth", format: "Multiple choice/Open-ended" },
          { question: "Marital Status", format: "Multiple choice" },
          { question: "Religion", format: "Multiple choice" },
          { question: "Scheduled Caste/Tribe status", format: "Multiple choice" },
          { question: "Disability status", format: "Multiple choice" },
          { question: "Mother tongue and other languages known", format: "Open-ended" },
          { question: "Economic Activity", format: "Multiple choice" }
        ]
      },
      {
        name: "United States",
        code: "USA",
        population: "335 Million",
        censusFrequency: "Every 10 years",
        description: "The US Census determines the number of seats each state has in the House of Representatives.",
        sourceUrl: "https://www.census.gov/",
        surveyQuestions: [
          { question: "Name", format: "Open-ended" },
          { question: "Sex", format: "Multiple choice" },
          { question: "Age and Date of Birth", format: "Open-ended" },
          { question: "Hispanic, Latino, or Spanish origin", format: "Multiple choice" },
          { question: "Race", format: "Multiple choice" },
          { question: "Relationship to Householder", format: "Multiple choice" },
          { question: "Housing Tenure (Owned vs Rented)", format: "Multiple choice" }
        ]
      },
      {
        name: "Indonesia",
        code: "IDN",
        population: "279 Million",
        censusFrequency: "Every 10 years",
        description: "Indonesia's census covers thousands of islands and hundreds of ethnic groups.",
        sourceUrl: "https://www.bps.go.id/",
        surveyQuestions: [
          { question: "Name and NIK (ID)", format: "Open-ended" },
          { question: "Place and Date of Birth", format: "Open-ended" },
          { question: "Religion", format: "Multiple choice" },
          { question: "Marital Status", format: "Multiple choice" },
          { question: "Disability", format: "Multiple choice" },
          { question: "Education", format: "Multiple choice" },
          { question: "Ability to speak Indonesian", format: "Multiple choice" },
          { question: "Housing characteristics", format: "Multiple choice" }
        ]
      },
      {
        name: "Pakistan",
        code: "PAK",
        population: "241 Million",
        censusFrequency: "Every 10 years",
        description: "Pakistan's recent census was its first-ever digital census.",
        sourceUrl: "https://www.pbs.gov.pk/",
        surveyQuestions: [
          { question: "Name and Relationship", format: "Open-ended" },
          { question: "Age and Sex", format: "Open-ended/Multiple choice" },
          { question: "Marital Status", format: "Multiple choice" },
          { question: "Religion", format: "Multiple choice" },
          { question: "Nationality", format: "Multiple choice" },
          { question: "Education/Literacy", format: "Multiple choice" },
          { question: "Economic Activity", format: "Multiple choice" },
          { question: "Language spoken", format: "Multiple choice" }
        ]
      },
      {
        name: "Nigeria",
        code: "NGA",
        population: "223 Million",
        censusFrequency: "Every 10 years",
        description: "Nigeria's census is vital for managing its rapidly growing urban population.",
        sourceUrl: "https://nationalpopulation.gov.ng/",
        surveyQuestions: [
          { question: "Name and Relationship", format: "Open-ended" },
          { question: "Age and Sex", format: "Multiple choice" },
          { question: "Marital Status", format: "Multiple choice" },
          { question: "Educational Attainment", format: "Multiple choice" },
          { question: "Employment Status", format: "Multiple choice" },
          { question: "Housing conditions", format: "Multiple choice" }
        ]
      },
      {
        name: "Brazil",
        code: "BRA",
        population: "215 Million",
        censusFrequency: "Every 10 years",
        description: "Brazil's census uses advanced digital collection methods to reach remote Amazon regions.",
        sourceUrl: "https://www.ibge.gov.br/",
        surveyQuestions: [
          { question: "Identification (Full Name)", format: "Open-ended" },
          { question: "Age and Sex", format: "Multiple choice" },
          { question: "Relationship to Head of Household", format: "Multiple choice" },
          { question: "Color or Race", format: "Multiple choice" },
          { question: "Religion or Creed", format: "Multiple choice" },
          { question: "Disability status", format: "Multiple choice" },
          { question: "Education and Literacy", format: "Multiple choice" },
          { question: "Work and Income", format: "Multiple choice" },
          { question: "Mortality", format: "Multiple choice" }
        ]
      },
      {
        name: "Bangladesh",
        code: "BGD",
        population: "172 Million",
        censusFrequency: "Every 10 years",
        description: "Bangladesh's census is critical for disaster management and resource allocation in densely populated areas.",
        sourceUrl: "http://www.bbs.gov.bd/",
        surveyQuestions: [
          { question: "Household head info", format: "Open-ended" },
          { question: "Age and Gender", format: "Multiple choice" },
          { question: "Relationship to household head", format: "Multiple choice" },
          { question: "Marital Status", format: "Multiple choice" },
          { question: "Religion", format: "Multiple choice" },
          { question: "Literacy and Education", format: "Multiple choice" },
          { question: "Occupation and Industry", format: "Multiple choice" },
          { question: "Disability status", format: "Multiple choice" }
        ]
      },
      {
        name: "Russia",
        code: "RUS",
        population: "144 Million",
        censusFrequency: "Every 10 years",
        description: "Russia's census covers the largest land area of any country, spanning 11 time zones.",
        sourceUrl: "https://rosstat.gov.ru/",
        surveyQuestions: [
          { question: "Gender and Age", format: "Multiple choice" },
          { question: "Citizenship and Nationality", format: "Multiple choice" },
          { question: "Language proficiency", format: "Multiple choice" },
          { question: "Education", format: "Multiple choice" },
          { question: "Source of livelihood", format: "Multiple choice" }
        ]
      },
      {
        name: "Mexico",
        code: "MEX",
        population: "128 Million",
        censusFrequency: "Every 10 years",
        description: "Mexico's census is conducted by INEGI and is known for its high methodological standards.",
        sourceUrl: "https://www.inegi.org.mx/",
        surveyQuestions: [
          { question: "Housing characteristics", format: "Multiple choice" },
          { question: "Age and Sex", format: "Multiple choice" },
          { question: "Relationship to Head of Household", format: "Multiple choice" },
          { question: "Place of birth and migration", format: "Multiple choice" },
          { question: "Indigenous or Afro-Mexican identity", format: "Multiple choice" },
          { question: "Disability status", format: "Multiple choice" },
          { question: "Education level", format: "Multiple choice" },
          { question: "Economic activity and occupation", format: "Multiple choice" },
          { question: "Fertility and Mortality", format: "Multiple choice" }
        ]
      },
      {
        name: "Ethiopia",
        code: "ETH",
        population: "126 Million",
        censusFrequency: "Every 10 years",
        description: "Ethiopia is one of the fastest-growing countries in Africa, making census data critical for planning.",
        sourceUrl: "https://www.statsethiopia.gov.et/",
        surveyQuestions: [
          { question: "Housing and Household Characteristics", format: "Multiple choice" },
          { question: "Age and Sex", format: "Multiple choice" },
          { question: "Ethnicity and Religion", format: "Multiple choice" },
          { question: "Marital status", format: "Multiple choice" },
          { question: "Migration history", format: "Multiple choice" },
          { question: "Education and Literacy", format: "Multiple choice" },
          { question: "Employment and Occupation", format: "Multiple choice" }
        ]
      },
      {
        name: "Japan",
        code: "JPN",
        population: "124 Million",
        censusFrequency: "Every 5 years",
        description: "Japan's census is essential for tracking its rapidly aging population and shrinking workforce.",
        sourceUrl: "https://www.stat.go.jp/",
        surveyQuestions: [
          { question: "Number of household members", format: "Multiple choice" },
          { question: "Type of household", format: "Multiple choice" },
          { question: "Name", format: "Open-ended" },
          { question: "Relationship to the head of household", format: "Multiple choice" },
          { question: "Sex", format: "Multiple choice" },
          { question: "Year and month of birth", format: "Open-ended" },
          { question: "Marital status", format: "Multiple choice" },
          { question: "Nationality", format: "Multiple choice" }
        ]
      },
      {
        name: "Philippines",
        code: "PHL",
        population: "117 Million",
        censusFrequency: "Every 5 years",
        description: "The Philippine census is conducted by the Philippine Statistics Authority (PSA).",
        sourceUrl: "https://psa.gov.ph/",
        surveyQuestions: [
          { question: "Age and Sex", format: "Multiple choice" },
          { question: "Marital status", format: "Multiple choice" },
          { question: "Religious affiliation", format: "Multiple choice" },
          { question: "Ethnicity", format: "Multiple choice" },
          { question: "Literacy and Education", format: "Multiple choice" },
          { question: "Work status", format: "Multiple choice" },
          { question: "Housing and household amenities", format: "Multiple choice" }
        ]
      },
      {
        name: "Egypt",
        code: "EGY",
        population: "112 Million",
        censusFrequency: "Every 10 years",
        description: "Egypt's census tracks population growth in its major cities along the Nile.",
        sourceUrl: "https://www.capmas.gov.eg/",
        surveyQuestions: [
          { question: "Housing conditions", format: "Multiple choice" },
          { question: "Educational attainment", format: "Multiple choice" },
          { question: "Employment status", format: "Multiple choice" }
        ]
      },
      {
        name: "Vietnam",
        code: "VNM",
        population: "99 Million",
        censusFrequency: "Every 10 years",
        description: "Vietnam's census is vital for its rapid economic development and urbanization.",
        sourceUrl: "https://www.gso.gov.vn/",
        surveyQuestions: [
          { question: "Age and Sex", format: "Multiple choice" },
          { question: "Ethnic group and Religion", format: "Multiple choice" },
          { question: "Marital status", format: "Multiple choice" },
          { question: "Migration", format: "Multiple choice" },
          { question: "Education and Professional level", format: "Multiple choice" },
          { question: "Work and Employment", format: "Multiple choice" },
          { question: "Health and disability", format: "Multiple choice" }
        ]
      },
      {
        name: "DR Congo",
        code: "COD",
        population: "102 Million",
        censusFrequency: "Irregular",
        description: "DR Congo faces challenges in conducting regular censuses due to its size and internal conflicts.",
        sourceUrl: "https://www.ins.cd/",
        surveyQuestions: [
          { question: "Household head", format: "Open-ended" },
          { question: "Age and Sex", format: "Multiple choice" },
          { question: "Marital status", format: "Multiple choice" },
          { question: "Place of birth", format: "Open-ended" },
          { question: "Education level", format: "Multiple choice" },
          { question: "Occupation", format: "Multiple choice" }
        ]
      },
      {
        name: "Turkey",
        code: "TUR",
        population: "85 Million",
        censusFrequency: "Every 10 years (now registers-based)",
        description: "Turkey has transitioned to a register-based population system with annual updates.",
        sourceUrl: "https://www.tuik.gov.tr/",
        surveyQuestions: [
          { question: "Age and Sex", format: "Multiple choice" },
          { question: "Place of birth", format: "Open-ended" },
          { question: "Education", format: "Multiple choice" },
          { question: "Employment", format: "Multiple choice" }
        ]
      },
      {
        name: "Iran",
        code: "IRN",
        population: "89 Million",
        censusFrequency: "Every 5 years",
        description: "Iran's census provides detailed data on its young and urbanizing population.",
        sourceUrl: "https://www.amar.org.ir/",
        surveyQuestions: [
          { question: "Age and Gender", format: "Multiple choice" },
          { question: "Relationship to Head of Household", format: "Multiple choice" },
          { question: "Religion and Nationality", format: "Multiple choice" },
          { question: "Disability status", format: "Multiple choice" },
          { question: "Education and Literacy", format: "Multiple choice" },
          { question: "Employment and Occupation", format: "Multiple choice" },
          { question: "Fertility (for women)", format: "Multiple choice" }
        ]
      },
      {
        name: "Germany",
        code: "DEU",
        population: "83 Million",
        censusFrequency: "Every 10 years",
        description: "Germany's census is essential for social policy and economic planning in the EU's largest economy.",
        sourceUrl: "https://www.zensus2022.de/",
        surveyQuestions: [
          { question: "Name and Address", format: "Open-ended" },
          { question: "Education", format: "Multiple choice" },
          { question: "Employment", format: "Multiple choice" },
          { question: "Housing details", format: "Multiple choice" }
        ]
      },
      {
        name: "Thailand",
        code: "THA",
        population: "71 Million",
        censusFrequency: "Every 10 years",
        description: "Thailand's census is conducted by the National Statistical Office.",
        sourceUrl: "http://www.nso.go.th/",
        surveyQuestions: [
          { question: "Age and Sex", format: "Multiple choice" },
          { question: "Nationality and Religion", format: "Multiple choice" },
          { question: "Marital status", format: "Multiple choice" },
          { question: "Education level", format: "Multiple choice" },
          { question: "Work status and Occupation", format: "Multiple choice" },
          { question: "Housing and living conditions", format: "Multiple choice" }
        ]
      }
    ];

    for (const country of initialCountries) {
      await storage.createCountry(country);
    }
  }
}
