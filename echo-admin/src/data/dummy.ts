export const dummyData = [
  {
    id: "1242",
    name: "lipstick",
    status: "active",
    price: "124",
    pro_type: "General",
    category: "Home Cleaning",
    menu: "Toiletries, Pharmacy",
    pro_dis: "Clarifying Tea Tree Face Wash 50ml",
    no_pro: "2",
    brand: 'Lakme'
  },
  {
    id: "1245",
    name: "lipstick",
    status: "inactive",
    price: "724",
    pro_type: "General",
    category: "Lips",
    menu: "Beauty, Skincare",
    pro_dis: "Acne Away Cream 20g",
    no_pro: "12",
    brand: 'Molton Brown'
  },
];

interface CustomerDetialstype {
  place: String,
  address: String,
  instruction: String
}

export const Customer_sample_address: CustomerDetialstype[] = [
  { place: "Home", address: "101 Collin Street, Melbourne, VIC 3000, Australia", instruction: "Ring at doorbell" },
  { place: "Work", address: "54 Spring Street, Melbourne, VIC 3000, Australia", instruction: "Ring at doorbell" },
  { place: "Other", address: "1521 Broadway, Melbourne, VIC 3000, Australia", instruction: "Ring at doorbell" }
]
