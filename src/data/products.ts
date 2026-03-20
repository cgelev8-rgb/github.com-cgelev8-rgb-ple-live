export interface WholesaleProduct {
    id: string;
    sku: string;
    name: string;
    category: string;
    price: number; // 500 Unit wholesale price
    moq: number;
    form: string;
    stock: 'In Stock' | 'Low Stock' | 'Out of Stock';
    dropShip: boolean;
}

export const WHOLESALE_CATALOG: WholesaleProduct[] = [
    // Image 1 Batch
    { id: '1', sku: 'WW200-439-060', name: 'Advanced Joint Complex Plus, 60 ct', category: 'Joint Support', price: 6.50, moq: 500, form: 'Tablets', stock: 'In Stock', dropShip: true },
    { id: '2', sku: 'WW200-431-060', name: 'Advanced Zen Rest Defense, 60 ct', category: 'Sleep & Mood', price: 7.30, moq: 500, form: 'Veggie Capsules', stock: 'In Stock', dropShip: true },
    { id: '3', sku: 'CW250-388-060', name: 'Apple Cider Vinegar Gummies, 60 ct', category: 'General Health', price: 6.20, moq: 500, form: 'Pectin Gummies', stock: 'Low Stock', dropShip: true },
    { id: '4', sku: 'CW250-471-060', name: 'ACV + Beet Root Gummies, 60 ct', category: 'General Health', price: 7.55, moq: 500, form: 'Pectin Gummies', stock: 'In Stock', dropShip: true },
    { id: '5', sku: 'WW200-398-060', name: 'Ashwagandha 650mg w/ Black Pepper, 60 ct', category: 'Stress Support', price: 6.55, moq: 500, form: 'Veggie Capsules', stock: 'In Stock', dropShip: true },
    { id: '6', sku: 'CW250-440-060', name: 'Ashwagandha Plus, Zen-Gummies, 60 ct', category: 'Stress Support', price: 8.25, moq: 500, form: 'Pectin Gummies', stock: 'In Stock', dropShip: true },
    { id: '7', sku: 'WW200-261-120', name: 'Astaxanthin 10mg, 120 ct', category: 'Antioxidants', price: 7.35, moq: 500, form: 'Gelatin Softgels', stock: 'In Stock', dropShip: true },
    { id: '8', sku: 'WW200-381-060', name: 'Berberine 600mg, 60 ct', category: 'Blood Sugar', price: 6.50, moq: 500, form: 'Veggie Capsules', stock: 'In Stock', dropShip: true },
    { id: '9', sku: 'WW200-381-090', name: 'Berberine 600mg, 90 ct', category: 'Blood Sugar', price: 7.95, moq: 500, form: 'Veggie Capsules', stock: 'In Stock', dropShip: true },
    { id: '10', sku: 'WW250-381-120', name: 'Berberine 600mg, 120 ct', category: 'Blood Sugar', price: 9.30, moq: 500, form: 'Veggie Capsules', stock: 'In Stock', dropShip: true },
    { id: '11', sku: 'WW200-484-060', name: 'Berberine HCL 500mg, 60 ct', category: 'Blood Sugar', price: 5.99, moq: 500, form: 'Veggie Capsules', stock: 'In Stock', dropShip: true },
    { id: '12', sku: 'WW200-340-060', name: 'BHB 800mg Advanced Keto Complex, 60 ct', category: 'Weight Management', price: 6.70, moq: 500, form: 'Veggie Capsules', stock: 'In Stock', dropShip: true },
    { id: '13', sku: 'WW200-284-060', name: 'Black Currant Oil 500mg, 60 ct', category: 'General Health', price: 5.35, moq: 500, form: 'Gelatin Softgels', stock: 'Low Stock', dropShip: true },
    { id: '14', sku: 'WW200-415-060', name: 'Black Elderberry Caps, 60 ct', category: 'Immune Support', price: 5.95, moq: 500, form: 'Veggie Capsules', stock: 'In Stock', dropShip: true },
    { id: '15', sku: 'WW200-263-060', name: 'Black Maca 500mg, 60 ct', category: 'Energy & Vitality', price: 5.30, moq: 500, form: 'Veggie Capsules', stock: 'In Stock', dropShip: true },
    { id: '16', sku: 'WW200-263-090', name: 'Black Maca 500mg, 90 ct', category: 'Energy & Vitality', price: 6.50, moq: 500, form: 'Veggie Capsules', stock: 'In Stock', dropShip: true },
    { id: '17', sku: 'WW400-263-180', name: 'Black Maca 500mg, 180 ct', category: 'Energy & Vitality', price: 8.70, moq: 500, form: 'Veggie Capsules', stock: 'In Stock', dropShip: true },
    { id: '18', sku: 'WW300-315-120', name: 'Ceylon Cinnamon 600mg, 120 ct', category: 'Blood Sugar', price: 8.10, moq: 500, form: 'Veggie Capsules', stock: 'In Stock', dropShip: true },
    { id: '19', sku: 'WW400-218-180', name: 'Chlorella 600mg, 180 ct', category: 'Superfoods', price: 9.25, moq: 500, form: 'Veggie Capsules', stock: 'In Stock', dropShip: true },
    { id: '20', sku: 'WW200-252-060', name: 'Coconut Oil 1000mg, 60 ct', category: 'General Health', price: 5.20, moq: 500, form: 'Gelatin Softgels', stock: 'In Stock', dropShip: true },

    // Image 2 Batch
    { id: '21', sku: 'WW200-355-060', name: 'CoQ10 200mg, 60 ct', category: 'Heart Health', price: 5.65, moq: 500, form: 'Veggie Capsules', stock: 'In Stock', dropShip: true },
    { id: '22', sku: 'CWXXX-520-060', name: 'Creatine Gummies 60 ct', category: 'Sports Nutrition', price: 7.60, moq: 500, form: 'Pectin Gummies', stock: 'In Stock', dropShip: true },
    { id: '23', sku: 'WW200-358-060', name: 'Diet Super Blend Plus, 60 ct', category: 'Weight Management', price: 5.50, moq: 500, form: 'Veggie Capsules', stock: 'In Stock', dropShip: true },
    { id: '24', sku: 'CW500-413-120', name: 'Elderberry Gummy, 120 ct', category: 'Immune Support', price: 9.25, moq: 500, form: 'Pectin Gummies', stock: 'In Stock', dropShip: true },
    { id: '25', sku: 'WW200-295-060', name: 'Fish Oil Omega 3 1250mg, 60 ct', category: 'Heart Health', price: 7.25, moq: 500, form: 'Gelatin Softgels', stock: 'In Stock', dropShip: true },
    { id: '26', sku: 'WW200-091-090', name: 'Garcinia Cambogia 800mg, 90 ct', category: 'Weight Management', price: 6.45, moq: 500, form: 'Veggie Capsules', stock: 'In Stock', dropShip: true },
    { id: '27', sku: 'WW200-165-060', name: 'Ginseng Panax 500mg, 60 ct', category: 'Energy & Vitality', price: 5.20, moq: 500, form: 'Veggie Capsules', stock: 'In Stock', dropShip: true },
    { id: '28', sku: 'WW200-165-090', name: 'Ginseng Panax 500mg, 90 ct', category: 'Energy & Vitality', price: 6.00, moq: 500, form: 'Veggie Capsules', stock: 'In Stock', dropShip: true },
    { id: '29', sku: 'WW400-165-180', name: 'Ginseng Panax 500mg, 180 ct', category: 'Energy & Vitality', price: 8.40, moq: 500, form: 'Veggie Capsules', stock: 'In Stock', dropShip: true },
    { id: '30', sku: 'DK200-324-060', name: 'Horny Goat Weed Complex, 60 ct', category: 'Men\'s Health', price: 6.50, moq: 500, form: 'Veggie Capsules', stock: 'In Stock', dropShip: true },
    { id: '31', sku: 'WW200-490-060', name: 'Irish Sea Moss Complex, 60 ct', category: 'Superfoods', price: 5.99, moq: 500, form: 'Capsules', stock: 'In Stock', dropShip: true },
    { id: '32', sku: 'WW200-419-060', name: 'Irish Sea Moss, 60 ct', category: 'Superfoods', price: 6.00, moq: 500, form: 'Veggie Capsules', stock: 'In Stock', dropShip: true },
    { id: '33', sku: 'WW400-365-180', name: 'Liposomal Vitamin C 750, 180 ct', category: 'Immune Support', price: 8.80, moq: 500, form: 'Veggie Capsules', stock: 'In Stock', dropShip: true },
    { id: '34', sku: 'BW300-331-200', name: 'Milk Thistle 250mg, 200 ct', category: 'Liver Support', price: 8.15, moq: 500, form: 'Veggie Capsules', stock: 'In Stock', dropShip: true },
    { id: '35', sku: 'WW500-020-180', name: 'Moringa Oleifera 600mg, 180 ct', category: 'Superfoods', price: 8.45, moq: 500, form: 'Veggie Capsules', stock: 'Low Stock', dropShip: true },
    { id: '36', sku: 'CW250-496-060', name: 'New Apple Cider Vinegar Gummies, 60 ct', category: 'General Health', price: 6.20, moq: 500, form: 'Pectin Gummies', stock: 'In Stock', dropShip: true },
    { id: '37', sku: 'CW250-475-060', name: 'New Biotin Gummies, 60 ct', category: 'Beauty', price: 6.40, moq: 500, form: 'Pectin Gummies', stock: 'In Stock', dropShip: true },
    { id: '38', sku: 'CW250-478-060', name: 'New Collagen Gummies, 60 ct', category: 'Beauty', price: 5.75, moq: 500, form: 'Pectin Gummies', stock: 'In Stock', dropShip: true },
    { id: '39', sku: 'CW250-495-060', name: 'New Hair, Skin, & Nail Gummies, 60 ct', category: 'Beauty', price: 7.25, moq: 500, form: 'Pectin Gummies', stock: 'In Stock', dropShip: true },
    { id: '40', sku: 'CW250-477-060', name: 'New Multivitamin Gummies, 60 ct', category: 'General Health', price: 5.85, moq: 500, form: 'Pectin Gummies', stock: 'In Stock', dropShip: true },
    { id: '41', sku: 'WW200-446-060', name: 'Nootropic Zen Energy Plus, 60 ct', category: 'Cognitive', price: 7.35, moq: 500, form: 'Capsules', stock: 'In Stock', dropShip: true },
    { id: '42', sku: 'WW200-021-030', name: 'Phytoceramides, 30 ct', category: 'Beauty', price: 5.75, moq: 500, form: 'Veggie Capsules', stock: 'In Stock', dropShip: false },
    { id: '43', sku: 'WW120-511-030', name: 'Probiotics 50 Billion CFU, 30 ct', category: 'Digestive Health', price: 6.15, moq: 500, form: 'Capsules', stock: 'In Stock', dropShip: true },

    // Image 3 Batch
    { id: '44', sku: 'WW120-511-060', name: 'Probiotics 50 Billion CFU, 60 ct', category: 'Digestive Health', price: 8.85, moq: 500, form: 'Capsules', stock: 'In Stock', dropShip: true },
    { id: '45', sku: 'WW400-135-180', name: 'Pure Raspberry Ketone 500mg, 180 ct', category: 'Weight Management', price: 7.45, moq: 500, form: 'Veggie Capsules', stock: 'In Stock', dropShip: true },
    { id: '46', sku: 'BW400-383-200', name: 'Quercetin 500mg, 200 ct', category: 'Immune Support', price: 10.75, moq: 500, form: 'Veggie Capsules', stock: 'In Stock', dropShip: true },
    { id: '47', sku: 'WW250-300-120', name: 'Rhodiola Rosea 500mg, 120 ct', category: 'Stress Support', price: 7.65, moq: 500, form: 'Veggie Capsules', stock: 'In Stock', dropShip: true },
    { id: '48', sku: 'WW400-300-180', name: 'Rhodiola Rosea 500mg, 180 ct', category: 'Stress Support', price: 8.40, moq: 500, form: 'Veggie Capsules', stock: 'In Stock', dropShip: true },
    { id: '49', sku: 'WW200-325-060', name: 'Saffron Extract, 60 ct', category: 'Stress Support', price: 5.20, moq: 500, form: 'Veggie Capsules', stock: 'In Stock', dropShip: true },
    { id: '50', sku: 'BW200-376-090', name: 'Sam-e 400mg, 90 ct', category: 'Mood Support', price: 9.05, moq: 500, form: 'Veggie Capsules', stock: 'In Stock', dropShip: true },
    { id: '51', sku: 'WW200-370-060', name: 'Sam-e 500mg, 60 ct', category: 'Mood Support', price: 8.85, moq: 500, form: 'Veggie Capsules', stock: 'In Stock', dropShip: true },
    { id: '52', sku: 'BW200-370-090', name: 'Sam-e 500mg, 90 ct', category: 'Mood Support', price: 10.15, moq: 500, form: 'Veggie Capsules', stock: 'In Stock', dropShip: true },
    { id: '53', sku: 'WW400-209-180', name: 'Spirulina 500mg, 180 ct', category: 'Superfoods', price: 8.45, moq: 500, form: 'Veggie Capsules', stock: 'Low Stock', dropShip: true },
    { id: '54', sku: 'WW200-277-060', name: 'Turmeric 600mg w/ Black Pepper, 60 ct', category: 'Inflammation', price: 5.95, moq: 500, form: 'Veggie Capsules', stock: 'In Stock', dropShip: true },
    { id: '55', sku: 'WW200-287-060', name: 'Turmeric 750mg w/ Black Pepper, 60 ct', category: 'Inflammation', price: 6.35, moq: 500, form: 'Veggie Capsules', stock: 'In Stock', dropShip: true },
    { id: '56', sku: 'WW200-327-060', name: 'Turmeric 750mg w/ Ginger, 60 ct', category: 'Inflammation', price: 6.35, moq: 500, form: 'Veggie Capsules', stock: 'In Stock', dropShip: false },
    { id: '57', sku: 'WW200-393-060', name: 'Vitamin B-Complex + Folic Acid, 60 ct', category: 'Energy & Vitality', price: 5.30, moq: 500, form: 'Tablets', stock: 'In Stock', dropShip: true },
    { id: '58', sku: 'WW200-414-060', name: 'Vitamin C 1000mg, 60 ct', category: 'Immune Support', price: 5.35, moq: 500, form: 'Tablets', stock: 'In Stock', dropShip: true },
    { id: '59', sku: 'WW120-251-060', name: 'Vitamin D3 5000 IU, 60 ct', category: 'Immune Support', price: 5.50, moq: 500, form: 'Gelatin Softgels', stock: 'In Stock', dropShip: true },
];

// Helper to generate descriptions based on category
const getDescription = (category: string) => {
    const descriptions: Record<string, string> = {
        'Joint Support': 'Premium formula designed to support joint mobility and comfort.',
        'Sleep & Mood': 'Natural blend to promote relaxation and restful sleep.',
        'General Health': 'Daily essential for overall wellness and vitality.',
        'Stress Support': 'Adaptogenic blend to help manage stress and anxiety.',
        'Antioxidants': 'Powerful antioxidant support for cellular health.',
        'Blood Sugar': 'Supports healthy blood sugar levels within normal range.',
        'Weight Management': 'Formulated to support metabolism and healthy weight goals.',
        'Immune Support': 'Boosts immune system defense with potent ingredients.',
        'Energy & Vitality': 'Natural energy boost without the jitters.',
        'Superfoods': 'Nutrient-dense superfood complex for daily nutrition.',
        'Cognitive': 'Supports focus, memory, and cognitive performance.',
        'Beauty': 'Promotes healthy hair, skin, and nails from within.',
        'Heart Health': 'Supports cardiovascular health and circulation.',
        'Sports Nutrition': 'Enhances performance and recovery for active lifestyles.',
        'Men\'s Health': 'Targeted support for men\'s vitality and wellness.',
        'Liver Support': 'Promotes healthy liver function and detoxification.',
        'Digestive Health': 'Supports healthy digestion and gut microbiome.',
        'Inflammation': 'Supports healthy inflammatory response.',
        'Mood Support': 'Promotes positive mood and emotional balance.',
    };
    return descriptions[category] || 'Premium private label supplement ready for your brand.';
};

// Shared Mapped Product (Compatible with ProductCard)
export const UNIFIED_PRODUCTS = WHOLESALE_CATALOG.map(item => ({
    id: item.id,
    name: item.name,
    description: getDescription(item.category),
    image: '/placeholder.jpg',
    moq: item.moq,
    leadTime: '10-14 Days',
    costPerUnit: item.price,
    msrp: Number((item.price * 4.5).toFixed(2)), // Est. 4.5x markup
    category: item.category,
    isTrending: Number(item.id) % 7 === 0,
    isLowStock: item.stock === 'Low Stock'
}));
