
// Mock API services matching the backend specification

export interface DesignRequest {
  bedrooms: number;
  bathrooms: number;
  plotSize: number;
  budget: number;
  location: string;
  buildingType: string;
  style: string;
  floors: number;
}

export interface Design {
  id: number;
  name: string;
  description: string;
  rooms: string[];
  area: string;
  cost: string;
  type: string;
}

export interface BudgetItem {
  category: string;
  material: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  totalPrice: number;
  supplier: string;
}

export interface ScheduleTask {
  id: string;
  name: string;
  duration: string;
  dependencies: string[];
  materials: string[];
  labor: string[];
}

// Mock pricing data from Kenyan suppliers
const kenyanPricing = {
  cement: { price: 850, unit: "bag", supplier: "Bamburi Cement" },
  steel: { price: 85, unit: "kg", supplier: "Devki Steel" },
  tiles: { price: 1200, unit: "m²", supplier: "Tile & Carpet Centre" },
  paint: { price: 1500, unit: "litre", supplier: "Crown Paints" },
  timber: { price: 2500, unit: "m³", supplier: "Timsales Kenya" },
  sand: { price: 2500, unit: "tonne", supplier: "Local Supplier" },
  ballast: { price: 2800, unit: "tonne", supplier: "Local Supplier" }
};

// Design API - /api/design
export const generateDesign = async (params: DesignRequest): Promise<Design[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const designs: Design[] = [
    {
      id: 1,
      name: `Modern ${params.bedrooms}BR ${params.style}`,
      description: `Contemporary open-plan design optimized for ${params.location}`,
      rooms: [`Living Room`, `Kitchen`, `${params.bedrooms} Bedrooms`, `${params.bathrooms} Bathrooms`, `Dining`],
      area: `${Math.floor(params.plotSize * 0.6)} m²`,
      cost: `${Math.floor(params.budget * 0.95).toLocaleString()}`,
      type: params.buildingType
    },
    {
      id: 2,
      name: `Traditional ${params.bedrooms}BR Layout`,
      description: `Classic Kenyan design with separate living areas`,
      rooms: [`Sitting Room`, `Kitchen`, `${params.bedrooms} Bedrooms`, `${params.bathrooms} Bathrooms`, `Store`],
      area: `${Math.floor(params.plotSize * 0.55)} m²`,
      cost: `${Math.floor(params.budget * 0.88).toLocaleString()}`,
      type: params.buildingType
    },
    {
      id: 3,
      name: `Compact ${params.bedrooms}BR Efficient`,
      description: `Space-efficient design maximizing functionality`,
      rooms: [`Open Living`, `Kitchen`, `${params.bedrooms} Bedrooms`, `${params.bathrooms} Bathrooms`],
      area: `${Math.floor(params.plotSize * 0.5)} m²`,
      cost: `${Math.floor(params.budget * 0.82).toLocaleString()}`,
      type: params.buildingType
    }
  ];
  
  return designs;
};

// Budget API - /api/budget
export const getBudgetEstimate = async (design: Design): Promise<BudgetItem[]> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const area = parseInt(design.area);
  
  return [
    {
      category: "Foundation",
      material: "Concrete (C25)",
      quantity: Math.floor(area * 0.15),
      unit: "m³",
      unitPrice: 12000,
      totalPrice: Math.floor(area * 0.15) * 12000,
      supplier: "Bamburi Cement"
    },
    {
      category: "Structure",
      material: "Steel Reinforcement",
      quantity: Math.floor(area * 8),
      unit: "kg",
      unitPrice: kenyanPricing.steel.price,
      totalPrice: Math.floor(area * 8) * kenyanPricing.steel.price,
      supplier: kenyanPricing.steel.supplier
    },
    {
      category: "Walling",
      material: "Machine Cut Blocks",
      quantity: Math.floor(area * 2.5),
      unit: "pieces",
      unitPrice: 35,
      totalPrice: Math.floor(area * 2.5) * 35,
      supplier: "Local Supplier"
    },
    {
      category: "Roofing",
      material: "Iron Sheets (Gauge 30)",
      quantity: Math.floor(area * 1.2),
      unit: "m²",
      unitPrice: 850,
      totalPrice: Math.floor(area * 1.2) * 850,
      supplier: "Mabati Rolling Mills"
    },
    {
      category: "Flooring",
      material: "Ceramic Tiles",
      quantity: area,
      unit: "m²",
      unitPrice: kenyanPricing.tiles.price,
      totalPrice: area * kenyanPricing.tiles.price,
      supplier: kenyanPricing.tiles.supplier
    },
    {
      category: "Finishing",
      material: "Emulsion Paint",
      quantity: Math.floor(area * 0.5),
      unit: "litres",
      unitPrice: kenyanPricing.paint.price,
      totalPrice: Math.floor(area * 0.5) * kenyanPricing.paint.price,
      supplier: kenyanPricing.paint.supplier
    }
  ];
};

// BOM API - /api/bom
export const generateBOM = async (design: Design): Promise<BudgetItem[]> => {
  return getBudgetEstimate(design);
};

// Schedule API - /api/schedule
export const getConstructionSchedule = async (design: Design): Promise<ScheduleTask[]> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return [
    {
      id: "1",
      name: "Site Preparation & Excavation",
      duration: "1-2 weeks",
      dependencies: [],
      materials: ["Fuel", "Equipment rental"],
      labor: ["Excavator operator", "General laborers"]
    },
    {
      id: "2", 
      name: "Foundation Work",
      duration: "2-3 weeks",
      dependencies: ["1"],
      materials: ["Concrete", "Steel reinforcement", "Formwork"],
      labor: ["Mason", "Steel fixer", "General laborers"]
    },
    {
      id: "3",
      name: "Superstructure",
      duration: "4-5 weeks", 
      dependencies: ["2"],
      materials: ["Blocks", "Cement", "Steel", "Timber"],
      labor: ["Mason", "Carpenter", "Steel fixer"]
    },
    {
      id: "4",
      name: "Roofing",
      duration: "2 weeks",
      dependencies: ["3"],
      materials: ["Iron sheets", "Timber", "Nails"],
      labor: ["Carpenter", "Roofer"]
    },
    {
      id: "5",
      name: "Electrical & Plumbing",
      duration: "2-3 weeks",
      dependencies: ["4"],
      materials: ["Cables", "Pipes", "Fittings"],
      labor: ["Electrician", "Plumber"]
    },
    {
      id: "6",
      name: "Finishing Works",
      duration: "3-4 weeks",
      dependencies: ["5"],
      materials: ["Tiles", "Paint", "Fixtures"],
      labor: ["Tiler", "Painter", "General laborers"]
    }
  ];
};

// IFC Export API - /api/export/ifc
export const exportToIFC = async (design: Design): Promise<string> => {
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // Mock IFC file URL
  return `https://example.com/exports/${design.id}_${Date.now()}.ifc`;
};

// Real-time pricing update (mock)
export const updatePricing = async (location: string): Promise<typeof kenyanPricing> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Mock location-based pricing adjustments
  const locationMultiplier = location === "nairobi" ? 1.1 : location === "mombasa" ? 1.05 : 1.0;
  
  const updatedPricing = Object.fromEntries(
    Object.entries(kenyanPricing).map(([key, value]) => [
      key,
      { ...value, price: Math.floor(value.price * locationMultiplier) }
    ])
  );
  
  return updatedPricing as typeof kenyanPricing;
};
