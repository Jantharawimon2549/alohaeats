export type MenuItem = {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  price: number;
  image: string;
  category: "food" | "drink" | "dessert";
};

export const menuItems: MenuItem[] = [
  {
    id: "f1",
    name: "โพเก้โบว์ล",
    nameEn: "Poke Bowl",
    description: "ทูน่าสด ข้าว อะโวคาโด ถั่วแระ งาขาว",
    price: 259,
    image: "poke-bowl",
    category: "food",
  },
  {
    id: "f2",
    name: "ไก่เทอริยากิฮาวาย",
    nameEn: "Hawaiian Teriyaki Chicken",
    description: "ไก่ย่างซอสเทอริยากิ สับปะรดย่าง",
    price: 229,
    image: "teriyaki-chicken",
    category: "food",
  },
  {
    id: "d1",
    name: "บลูฮาวายเอี้ยน",
    nameEn: "Blue Hawaiian",
    description: "ค็อกเทลสีฟ้าสดใส ตกแต่งร่มและสับปะรด",
    price: 189,
    image: "blue-cocktail",
    category: "drink",
  },
  {
    id: "d2",
    name: "สมูทตี้ทรอปิคอล",
    nameEn: "Tropical Smoothie",
    description: "มะม่วง เสาวรส กล้วย นมมะพร้าว",
    price: 149,
    image: "smoothie",
    category: "drink",
  },
  {
    id: "s1",
    name: "เชฟไอซ์",
    nameEn: "Shave Ice",
    description: "น้ำแข็งไสราดน้ำเชื่อมผลไม้สี่สี มะม่วง มะพร้าว",
    price: 119,
    image: "shave-ice",
    category: "dessert",
  },
  {
    id: "s2",
    name: "พานาคอตต้ามะพร้าว",
    nameEn: "Coconut Panna Cotta",
    description: "พานาคอตต้านมมะพร้าว ซอสมะม่วง เสาวรส",
    price: 159,
    image: "coconut-dessert",
    category: "dessert",
  },
];
