type Image = {
  name: string;
  image_url: string;
};

type IngregientList = {
  title: string;
  ingredients: string[];
};

type InstructionList = {
  title: string;
  instructions: string[];
};

export type Author = {
  id: number;
  name: string;
  email?: string;
  website_link?: string;
  total_recipes?: number;
  categories?: string[];
};

export type RecipeDetail = {
  id: number;
  title: string;
  categories: string[];
  link: string;
  rating: number;
  author: Author;
  slug: string;
  main_image: string;
};

export type Recipe = RecipeDetail & {
  description: string;
  num_reviews: number;
  prep_time?: number;
  cook_time?: number;
  total_time?: number;
  servings?: number;
  images: Image[];
  ingredients: IngregientList[];
  instructions: InstructionList[];
  notes?: string[];
};
