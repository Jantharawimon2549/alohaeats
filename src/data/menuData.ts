import pokeBowl from "@/assets/poke-bowl.jpg";
import salmonPoke from "@/assets/salmon-poke.jpg";
import teriyakiChicken from "@/assets/teriyaki-chicken.jpg";
import mahiMahi from "@/assets/mahi-mahi.jpg";
import kaluaPork from "@/assets/kalua-pork.jpg";
import locoMoco from "@/assets/loco-moco.jpg";
import shrimpSkewer from "@/assets/shrimp-skewer.jpg";
import blueCocktail from "@/assets/blue-cocktail.jpg";
import sunrisePassion from "@/assets/sunrise-passion.jpg";
import coconutMojito from "@/assets/coconut-mojito.jpg";
import smoothie from "@/assets/smoothie.jpg";
import dragonfruitSmoothie from "@/assets/dragonfruit-smoothie.jpg";
import shaveIce from "@/assets/shave-ice.jpg";
import haupia from "@/assets/haupia.jpg";
import doleWhip from "@/assets/dole-whip.jpg";
import mangoSticky from "@/assets/mango-sticky.jpg";
import coconutDessert from "@/assets/coconut-dessert.jpg";
import fruitPlatter from "@/assets/fruit-platter.jpg";

export type MenuCategory = "food" | "drink" | "dessert";

export type Badge = "hot" | "new" | "vegan" | "bestseller";

export interface MenuItem {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  price: number;
  image: string;
  category: MenuCategory;
  badges: Badge[];
  prepTime: number; // minutes
  tags: string[]; // seafood, meat, vegan etc
}

export interface CartItem extends MenuItem {
  quantity: number;
  notes?: string;
}

export const menuItems: MenuItem[] = [
  // === FOOD ===
  {
    id: "f1",
    name: "Salmon Poke Bowl",
    nameEn: "Salmon Poke Bowl",
    description: "แซลมอนสดจากทะเล ข้าวญี่ปุ่น อะโวคาโด สาหร่าย มะม่วง งาขาว",
    price: 289,
    image: salmonPoke,
    category: "food",
    badges: ["hot", "bestseller"],
    prepTime: 10,
    tags: ["seafood"],
  },
  {
    id: "f2",
    name: "Tuna Poke Bowl",
    nameEn: "Tuna Poke Bowl",
    description: "ทูน่าสด ข้าว อะโวคาโด ถั่วแระ งาขาว ซอสโชยุ",
    price: 259,
    image: pokeBowl,
    category: "food",
    badges: ["hot"],
    prepTime: 10,
    tags: ["seafood"],
  },
  {
    id: "f3",
    name: "Grilled Mahi-Mahi",
    nameEn: "Grilled Mahi-Mahi",
    description: "ปลามาฮีมาฮีย่าง ซัลซ่าผลไม้ทรอปิคอล มะนาวสด",
    price: 349,
    image: mahiMahi,
    category: "food",
    badges: ["new"],
    prepTime: 20,
    tags: ["seafood"],
  },
  {
    id: "f4",
    name: "Shrimp Skewer",
    nameEn: "Grilled Shrimp Skewer",
    description: "กุ้งย่างเสียบไม้สไตล์ฮาวาย สับปะรด พริกหวาน",
    price: 279,
    image: shrimpSkewer,
    category: "food",
    badges: ["hot"],
    prepTime: 15,
    tags: ["seafood"],
  },
  {
    id: "f5",
    name: "Kalua Pork Rice Bowl",
    nameEn: "Kalua Pork Rice Bowl",
    description: "หมูคาลัวฉีก ข้าวสวย สลัดโคล์สลอว์ สับปะรด",
    price: 229,
    image: kaluaPork,
    category: "food",
    badges: ["bestseller"],
    prepTime: 15,
    tags: ["meat"],
  },
  {
    id: "f6",
    name: "Loco Moco",
    nameEn: "Loco Moco",
    description: "เบอร์เกอร์สเต็ก ไข่ดาว ข้าวสวย ซอสเกรวี่ สไตล์ฮาวาย",
    price: 249,
    image: locoMoco,
    category: "food",
    badges: [],
    prepTime: 15,
    tags: ["meat"],
  },
  {
    id: "f7",
    name: "Hawaiian BBQ Chicken",
    nameEn: "Hawaiian BBQ Chicken",
    description: "ไก่ย่างซอสเทอริยากิฮาวาย สับปะรดย่าง ข้าวสวย",
    price: 229,
    image: teriyakiChicken,
    category: "food",
    badges: ["hot"],
    prepTime: 20,
    tags: ["meat"],
  },
  // === DRINKS ===
  {
    id: "d1",
    name: "Blue Hawaii",
    nameEn: "Blue Hawaiian Mocktail",
    description: "ม็อคเทลสีฟ้าสดใสสไตล์ฮาวาย ร่มเล็ก สับปะรด",
    price: 189,
    image: blueCocktail,
    category: "drink",
    badges: ["hot", "bestseller"],
    prepTime: 5,
    tags: [],
  },
  {
    id: "d2",
    name: "Sunrise Passion",
    nameEn: "Sunrise Passion Mocktail",
    description: "ม็อคเทลส้มพาสชั่นฟรุ้ต gradient สีพระอาทิตย์ตก",
    price: 179,
    image: sunrisePassion,
    category: "drink",
    badges: ["new"],
    prepTime: 5,
    tags: [],
  },
  {
    id: "d3",
    name: "Coconut Mojito",
    nameEn: "Coconut Mojito Mocktail",
    description: "โมจิโต้มะพร้าว สะระแหน่สด มะนาว สดชื่น",
    price: 169,
    image: coconutMojito,
    category: "drink",
    badges: [],
    prepTime: 5,
    tags: ["vegan"],
  },
  {
    id: "d4",
    name: "Mango-Pineapple Smoothie",
    nameEn: "Mango-Pineapple Smoothie",
    description: "สมูทตี้มะม่วง-สับปะรด เย็นฉ่ำ เสาวรส",
    price: 149,
    image: smoothie,
    category: "drink",
    badges: ["vegan"],
    prepTime: 5,
    tags: ["vegan"],
  },
  {
    id: "d5",
    name: "Dragonfruit Smoothie",
    nameEn: "Dragonfruit Smoothie",
    description: "สมูทตี้แก้วมังกรสีชมพูสดใส กล้วย นมมะพร้าว",
    price: 159,
    image: dragonfruitSmoothie,
    category: "drink",
    badges: ["new", "vegan"],
    prepTime: 5,
    tags: ["vegan"],
  },
  // === DESSERTS ===
  {
    id: "s1",
    name: "Shave Ice Rainbow",
    nameEn: "Rainbow Shave Ice",
    description: "น้ำแข็งไสราดน้ำเชื่อมผลไม้ 10 สี มะม่วง มะพร้าว",
    price: 119,
    image: shaveIce,
    category: "dessert",
    badges: ["hot", "bestseller"],
    prepTime: 5,
    tags: ["vegan"],
  },
  {
    id: "s2",
    name: "Haupia Coconut Pudding",
    nameEn: "Haupia Coconut Pudding",
    description: "พุดดิ้งมะพร้าวฮาวาย เนื้อเนียนนุ่ม หอมมะพร้าวสด",
    price: 139,
    image: haupia,
    category: "dessert",
    badges: ["vegan"],
    prepTime: 5,
    tags: ["vegan"],
  },
  {
    id: "s3",
    name: "Pineapple Dole Whip",
    nameEn: "Pineapple Dole Whip Soft Serve",
    description: "ซอฟท์เสิร์ฟสับปะรดในถ้วยสับปะรด หวานเย็นสดชื่น",
    price: 149,
    image: doleWhip,
    category: "dessert",
    badges: ["hot"],
    prepTime: 5,
    tags: ["vegan"],
  },
  {
    id: "s4",
    name: "Mango Sticky Rice Twist",
    nameEn: "Mango Sticky Rice Twist",
    description: "ข้าวเหนียวมะม่วงฟิวชั่น กะทิสด ถั่วคั่ว",
    price: 159,
    image: mangoSticky,
    category: "dessert",
    badges: ["bestseller"],
    prepTime: 10,
    tags: ["vegan"],
  },
  {
    id: "s5",
    name: "Coconut Panna Cotta",
    nameEn: "Coconut Panna Cotta",
    description: "พานาคอตต้านมมะพร้าว ซอสมะม่วง เสาวรส",
    price: 169,
    image: coconutDessert,
    category: "dessert",
    badges: ["new"],
    prepTime: 10,
    tags: [],
  },
  {
    id: "s6",
    name: "Tropical Fruit Platter",
    nameEn: "Tropical Fruit Platter",
    description: "จานผลไม้ทรอปิคอล มะม่วง แก้วมังกร สับปะรด กีวี มะละกอ",
    price: 199,
    image: fruitPlatter,
    category: "dessert",
    badges: ["vegan"],
    prepTime: 5,
    tags: ["vegan"],
  },
];

export const promotions = [
  {
    id: "p1",
    title: "🌺 Aloha Combo",
    description: "อาหาร + เครื่องดื่ม + ของหวาน ลด 15%",
    code: "ALOHA15",
    discount: 15,
    type: "percent" as const,
  },
  {
    id: "p2",
    title: "🌅 Sunset Happy Hour",
    description: "15:00-18:00 เครื่องดื่มทุกแก้วลด 30%",
    code: "SUNSET30",
    discount: 30,
    type: "percent" as const,
  },
  {
    id: "p3",
    title: "🎉 First Order Special",
    description: "สั่งครั้งแรก ลด 100 บาท",
    code: "FIRST100",
    discount: 100,
    type: "fixed" as const,
  },
  {
    id: "p4",
    title: "🏖️ Tropical Friday",
    description: "ทุกวันศุกร์ เมนูทะเลลด 25%",
    code: "TGIF25",
    discount: 25,
    type: "percent" as const,
  },
];
