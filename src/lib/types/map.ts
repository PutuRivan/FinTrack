import {
  AlertTriangle,
  Banknote,
  Book,
  Briefcase,
  Bus,
  Car,
  Coffee,
  CreditCard,
  Droplets,
  Dumbbell,
  Film,
  Fuel,
  Gamepad2,
  Gift,
  Globe,
  GraduationCap,
  Heart,
  Home,
  Hospital,
  Landmark,
  Laptop,
  type LucideIcon,
  MoreHorizontal,
  Palette,
  ParkingCircle,
  PiggyBank,
  Pill,
  Plane,
  Receipt,
  Settings,
  ShoppingCart,
  Smartphone,
  Target,
  TrendingDown,
  TrendingUp,
  Tv,
  Users,
  Utensils,
  Wallet,
  Wifi,
  Wrench,
  Zap
} from "lucide-react";

export const iconMap: Record<string, { icon: LucideIcon; label: string }> = {
  // Income
  Wallet: { icon: Wallet, label: "Wallet" },
  "TrendingUp": { icon: TrendingUp, label: "Income" },
  gift: { icon: Gift, label: "Bonus / Gift" },
  briefcase: { icon: Briefcase, label: "Freelance / Work" },
  "piggy-bank": { icon: PiggyBank, label: "Savings" },

  // Food & Beverage
  utensils: { icon: Utensils, label: "Food" },
  coffee: { icon: Coffee, label: "Coffee / Hangout" },
  "shopping-cart": { icon: ShoppingCart, label: "Groceries" },

  // Living & Utilities
  home: { icon: Home, label: "Home / Rent" },
  wifi: { icon: Wifi, label: "Internet" },
  smartphone: { icon: Smartphone, label: "Mobile Data" },
  zap: { icon: Zap, label: "Electricity" },
  droplets: { icon: Droplets, label: "Water" },
  tv: { icon: Tv, label: "Streaming / TV" },

  // Transportation
  bus: { icon: Bus, label: "Public Transport" },
  car: { icon: Car, label: "Car / Ride" },
  fuel: { icon: Fuel, label: "Fuel" },
  "parking-circle": { icon: ParkingCircle, label: "Parking" },
  wrench: { icon: Wrench, label: "Vehicle Service" },
  plane: { icon: Plane, label: "Travel" },

  // Entertainment & Lifestyle
  film: { icon: Film, label: "Entertainment" },
  gamepad: { icon: Gamepad2, label: "Games" },
  palette: { icon: Palette, label: "Hobby" },
  dumbbell: { icon: Dumbbell, label: "Gym" },

  // Education
  "graduation-cap": { icon: GraduationCap, label: "Education" },
  book: { icon: Book, label: "Books" },

  // Health
  hospital: { icon: Hospital, label: "Hospital" },
  pill: { icon: Pill, label: "Medicine" },

  // Finance & Bills
  "credit-card": { icon: CreditCard, label: "Credit / Installment" },
  receipt: { icon: Receipt, label: "Bills" },
  landmark: { icon: Landmark, label: "Tax" },
  "trending-down": { icon: TrendingDown, label: "Expense" },

  // Social
  heart: { icon: Heart, label: "Donation" },
  users: { icon: Users, label: "Family" },

  // Work & Tools
  laptop: { icon: Laptop, label: "Work Tools" },
  settings: { icon: Settings, label: "Software / Tools" },
  globe: { icon: Globe, label: "Domain / Hosting" },

  // Others
  target: { icon: Target, label: "Goal" },
  "alert-triangle": { icon: AlertTriangle, label: "Emergency" },
  more: { icon: MoreHorizontal, label: "Other" },
};

export const walletIconMap: Record<string, { icon: LucideIcon, label: string }> = {
  cash: { icon: Wallet, label: "Cash" },
  bank: { icon: Banknote, label: "Bank" },
  savings: { icon: PiggyBank, label: "Savings" },
  "e-wallet": { icon: CreditCard, label: "E-Wallet" },
};

export const categoryIconMap: Record<string, { icon: LucideIcon, label: string }> = {
  income: { icon: TrendingUp, label: "Income" },
  expense: { icon: TrendingDown, label: "Expense" },
};