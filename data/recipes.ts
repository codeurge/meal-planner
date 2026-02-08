export interface Ingredient {
  item: string;
  amount?: string;
}

export interface PrepStep {
  text: string;
  image?: string;
}

export interface Recipe {
  id: string;
  title: string;
  emoji?: string;
  image?: string;
  category: 'breakfast' | 'lunch' | 'dinner';
  prepTime?: string;
  cookTime?: string;
  totalTime: string;
  serves: string;
  isHomechefFavorite?: boolean;
  description?: string;
  ingredients: Ingredient[];
  prepSteps?: PrepStep[];
  instructions: {
    step: number;
    title?: string;
    text: string;
    image?: string;
  }[];
  tips?: string[];
}

// Meal state types for schedule display
export type MealState = 'planned' | 'prep' | 'unavailable' | 'leftovers' | 'flexible';

export interface MealSlot {
  recipeId?: string;      // Optional recipe reference
  state: MealState;       // Display state
  displayText?: string;   // Override text (e.g., "PREP: Make Freezer Burritos")
  emoji?: string;         // Override emoji
}

export interface DaySchedule {
  day: string;
  breakfast: MealSlot;
  lunch: MealSlot;
  dinner: MealSlot;
}

export const recipes: Recipe[] = [
  // BREAKFASTS
  {
    id: 'classic-eggs-bacon',
    title: 'Classic Eggs & Bacon',
    emoji: '🥓',
    image: '/images/recipes/classic-eggs-bacon.png',
    category: 'breakfast',
    totalTime: '10 min',
    serves: '2-3',
    ingredients: [
      { item: 'Bacon strips', amount: '4-6' },
      { item: 'Eggs', amount: '4' },
      { item: 'Salt', amount: 'to taste' },
      { item: 'Pepper', amount: 'to taste' },
      { item: 'Grands biscuits', amount: '1 can (optional)' },
    ],
    prepSteps: [
      { text: 'Gather eggs, bacon, salt, pepper, and biscuits on the counter', image: '/images/prep/classic-eggs-bacon-prep.png' },
      { text: 'Set out a plate lined with paper towels for draining bacon' },
      { text: 'If making biscuits, preheat oven per package directions' },
    ],
    instructions: [
      { step: 1, text: 'Cook 4-6 strips bacon in skillet over medium heat until crispy (8-10 min)' },
      { step: 2, text: 'Remove bacon, drain most grease (leave ~1 tbsp)' },
      { step: 3, text: 'Crack 4 eggs into same pan, cook to preference' },
      { step: 4, text: 'Season with salt & pepper' },
      { step: 5, text: 'Serve with biscuits' },
    ],
  },
  {
    id: 'sausage-gravy-biscuits',
    title: 'Sausage Gravy & Biscuits',
    emoji: '🍳',
    image: '/images/recipes/sausage-gravy-biscuits.png',
    category: 'breakfast',
    totalTime: '15 min',
    serves: '3-4',
    ingredients: [
      { item: 'Breakfast sausage', amount: '8 oz' },
      { item: 'All-purpose flour', amount: '3 tbsp' },
      { item: 'Milk', amount: '2 cups' },
      { item: 'Salt', amount: 'to taste' },
      { item: 'Pepper', amount: 'to taste' },
      { item: 'Cayenne', amount: 'dash' },
      { item: 'Grands biscuits', amount: '1 can' },
    ],
    prepSteps: [
      { text: 'Measure out 3 tbsp flour and set aside in a small bowl', image: '/images/prep/sausage-gravy-biscuits-prep.png' },
      { text: 'Measure 2 cups milk and have it ready to pour' },
      { text: 'Gather cayenne, salt, and pepper near the stove' },
      { text: 'Preheat oven for biscuits per package directions' },
    ],
    instructions: [
      { step: 1, title: 'Brown the sausage', text: 'Brown 8 oz breakfast sausage in skillet, breaking into crumbles' },
      { step: 2, title: 'Make the roux', text: "Don't drain! Add 3 tbsp flour, stir 1 minute", image: '/images/steps/making-gravy.png' },
      { step: 3, title: 'Add milk', text: 'Slowly pour in 2 cups milk, stirring constantly' },
      { step: 4, title: 'Simmer', text: 'Simmer until thick (3-5 min)' },
      { step: 5, title: 'Season', text: 'Season with salt, pepper, dash of cayenne' },
      { step: 6, title: 'Biscuits', text: 'Bake Grands biscuits per package (usually 375°F, 12-15 min)' },
      { step: 7, title: 'Serve', text: 'Split biscuits, smother with gravy' },
    ],
  },
  {
    id: 'scrambled-eggs-cheese',
    title: 'Scrambled Eggs with Cheese',
    emoji: '🧀',
    image: '/images/recipes/scrambled-eggs-cheese.png',
    category: 'breakfast',
    totalTime: '8 min',
    serves: '2-3',
    ingredients: [
      { item: 'Eggs', amount: '4' },
      { item: 'Milk', amount: '2 tbsp' },
      { item: 'Butter', amount: '1 tbsp' },
      { item: 'Shredded cheese', amount: '1/4 cup' },
      { item: 'Salt', amount: 'to taste' },
      { item: 'Pepper', amount: 'to taste' },
    ],
    prepSteps: [
      { text: 'Crack 4 eggs into a mixing bowl', image: '/images/prep/scrambled-eggs-cheese-prep.png' },
      { text: 'Measure 2 tbsp milk and add to the bowl' },
      { text: 'Shred or measure 1/4 cup cheese and set aside' },
      { text: 'Have butter, salt, and pepper within reach of the stove' },
    ],
    instructions: [
      { step: 1, text: 'Whisk 4 eggs with 2 tbsp milk, salt, pepper' },
      { step: 2, text: 'Melt 1 tbsp butter in nonstick pan over medium-low' },
      { step: 3, text: 'Pour in eggs, gently push with spatula as they set', image: '/images/steps/scrambling-eggs.png' },
      { step: 4, text: 'When almost done, sprinkle 1/4 cup shredded cheese' },
      { step: 5, text: "Fold and serve immediately (don't overcook!)" },
    ],
  },

  // LUNCH
  {
    id: 'freezer-breakfast-burritos',
    title: 'Make-Ahead Freezer Burritos',
    emoji: '🌯',
    image: '/images/recipes/freezer-breakfast-burritos.png',
    category: 'lunch',
    totalTime: '45 min prep',
    serves: '10 burritos',
    description: 'Sunday prep for the whole week',
    ingredients: [
      { item: 'Breakfast sausage', amount: '8 oz' },
      { item: 'Frozen hash browns', amount: '3 cups' },
      { item: 'Eggs', amount: '8' },
      { item: 'Shredded Mexican cheese', amount: '1 cup' },
      { item: 'Large flour tortillas', amount: '10' },
      { item: 'Salt', amount: 'to taste' },
      { item: 'Pepper', amount: 'to taste' },
      { item: 'Garlic powder', amount: 'to taste' },
    ],
    prepSteps: [
      { text: 'Measure 3 cups frozen hash browns and set out to partially thaw', image: '/images/prep/freezer-breakfast-burritos-prep.png' },
      { text: 'Crack 8 eggs into a large bowl and whisk together' },
      { text: 'Shred or measure 1 cup Mexican cheese' },
      { text: 'Lay out 10 tortillas and have foil/plastic wrap ready for wrapping' },
      { text: 'Clear freezer space and set out a baking sheet for freezing burritos flat' },
    ],
    instructions: [
      { step: 1, text: 'Brown sausage in large skillet, remove and set aside' },
      { step: 2, text: 'In same pan, cook hash browns until crispy (10-12 min)' },
      { step: 3, text: 'Scramble eggs in separate pan, season well' },
      { step: 4, text: 'Mix sausage, hash browns, eggs, and cheese in large bowl' },
      { step: 5, text: 'Warm tortillas in microwave (10 sec each) so they\'re pliable' },
      { step: 6, text: 'Divide filling among tortillas (~1/2 cup each)' },
      { step: 7, text: 'Fold: bottom up, sides in, roll tight', image: '/images/steps/folding-burrito.png' },
      { step: 8, text: 'Wrap each in foil or plastic wrap' },
      { step: 9, text: 'Freeze flat on baking sheet, then transfer to freezer bag' },
    ],
    tips: [
      'To reheat: Remove wrapper, wrap in damp paper towel',
      'Microwave 2-2.5 min, flip halfway',
      'Let rest 30 seconds before eating',
    ],
  },

  // DINNERS
  {
    id: 'turkey-burrito-skillet',
    title: 'One-Pan Turkey Burrito Skillet',
    emoji: '🍲',
    image: '/images/recipes/turkey-burrito-skillet.png',
    category: 'dinner',
    totalTime: '35 min',
    serves: '4',
    isHomechefFavorite: true,
    description: "Derek's Home Chef Favorite - Recreated",
    ingredients: [
      { item: 'Ground turkey', amount: '1.5 lbs' },
      { item: 'Black beans (drained)', amount: '1 can' },
      { item: 'Diced tomatoes with green chiles', amount: '1 can' },
      { item: 'Long grain rice (uncooked)', amount: '1 cup' },
      { item: 'Chicken broth', amount: '1.5 cups' },
      { item: 'Cumin', amount: '2 tsp' },
      { item: 'Chili powder', amount: '1 tsp' },
      { item: 'Garlic powder', amount: '1 tsp' },
      { item: 'Salt & pepper', amount: 'to taste' },
      { item: 'Mexican shredded cheese', amount: '1 cup' },
      { item: 'Sour cream', amount: 'for serving' },
      { item: 'Fresh cilantro', amount: 'for serving' },
      { item: 'Lime', amount: 'for serving' },
    ],
    prepSteps: [
      { text: 'Drain and rinse the can of black beans', image: '/images/prep/turkey-burrito-skillet-prep.png' },
      { text: 'Measure 1 cup rice and 1.5 cups chicken broth' },
      { text: 'Mix together cumin, chili powder, garlic powder, salt, and pepper in a small bowl' },
      { text: 'Shred 1 cup Mexican cheese' },
      { text: 'Chop cilantro and cut lime into wedges for serving' },
    ],
    instructions: [
      { step: 1, title: 'Brown the turkey', text: 'Heat 1 tbsp oil in large skillet over medium-high. Add turkey, break up with spatula. Season with cumin, chili powder, garlic powder, salt, pepper. Cook until no pink remains. (5 min)' },
      { step: 2, title: 'Add liquids and rice', text: 'Stir in rice, black beans, tomatoes (with juice), and chicken broth. Bring to boil. (2 min)' },
      { step: 3, title: 'Simmer covered', text: "Reduce heat to low. Cover with tight-fitting lid. Don't peek! Rice needs steam. (18-20 min)", image: '/images/steps/rice-simmer.png' },
      { step: 4, title: 'Check and finish', text: 'Rice should be tender and liquid absorbed. If still wet, cook uncovered 2-3 min. Top with cheese, cover 2 min to melt. (5 min)' },
      { step: 5, title: 'Serve', text: 'Dollop sour cream, squeeze fresh lime, sprinkle cilantro' },
    ],
    tips: ['Leftovers are great in tortillas for next-day burritos'],
  },
  {
    id: 'cajun-sirloin',
    title: 'Cajun Sirloin with Parmesan Smashed Potatoes',
    emoji: '🥩',
    image: '/images/recipes/cajun-sirloin.png',
    category: 'dinner',
    totalTime: '40 min',
    serves: '4',
    ingredients: [
      { item: 'Sirloin steak', amount: '1.5 lbs' },
      { item: 'Cajun seasoning', amount: '2 tbsp' },
      { item: 'Russet potatoes', amount: '3 lbs' },
      { item: 'Butter', amount: '4 tbsp' },
      { item: 'Parmesan cheese (or cheddar)', amount: '1/2 cup' },
      { item: 'Sour cream', amount: '1/4 cup' },
      { item: 'Salt & pepper', amount: 'to taste' },
      { item: 'Green beans', amount: '1 lb fresh or frozen' },
      { item: 'Vegetable oil', amount: '1 tbsp' },
    ],
    prepSteps: [
      { text: 'Cut potatoes into 1-inch chunks (skin on is fine)', image: '/images/prep/cajun-sirloin-prep.png' },
      { text: 'Pat steaks dry with paper towels and let come to room temperature' },
      { text: 'Measure 2 tbsp Cajun seasoning for the steak' },
      { text: 'Measure butter, sour cream, and parmesan for the potatoes' },
      { text: 'Trim green beans if using fresh' },
    ],
    instructions: [
      { step: 1, title: 'Start potatoes', text: 'Cut potatoes into 1-inch chunks (skin on is fine). Boil in salted water until fork-tender (15-20 min). Drain, return to pot. (25 min)' },
      { step: 2, title: 'Season steak', text: 'Pat steaks dry with paper towel. Coat both sides generously with Cajun seasoning. Let sit at room temp 15 min.' },
      { step: 3, title: 'Smash the potatoes', text: 'Add butter, sour cream, parmesan to pot. Smash with fork or masher (leave chunky!). Season with salt & pepper. Cover to keep warm.', image: '/images/steps/smashing-potatoes.png' },
      { step: 4, title: 'Cook steak', text: 'Heat cast iron or heavy skillet over high heat (get it HOT). Add 1 tbsp oil. Sear steaks 4-5 min per side for medium. Rest 5 minutes before slicing. (8-12 min)', image: '/images/steps/searing-steak.png' },
      { step: 5, title: 'Quick green beans', text: 'Sauté in butter with garlic salt, 5 min. Or microwave frozen per package.' },
      { step: 6, title: 'Serve', text: 'Slice steak against the grain. Plate with potatoes and green beans.' },
    ],
  },
  {
    id: 'bbq-chicken-quesadillas',
    title: 'BBQ Chicken Quesadillas with Lime Crema',
    emoji: '🫓',
    image: '/images/recipes/bbq-chicken-quesadillas.png',
    category: 'dinner',
    totalTime: '30 min',
    serves: '4',
    ingredients: [
      { item: 'Boneless skinless chicken breasts', amount: '1.5 lbs' },
      { item: 'BBQ sauce', amount: '1/2 cup + more for dipping' },
      { item: 'Cajun or Southwest seasoning', amount: '1 tbsp' },
      { item: 'Medium flour tortillas', amount: '8' },
      { item: 'Shredded cheddar/Mexican cheese', amount: '2 cups' },
      { item: 'Bell pepper (sliced)', amount: '1' },
      { item: 'Onion (sliced)', amount: '1/2' },
      { item: 'Sour cream', amount: '1/2 cup' },
      { item: 'Limes', amount: '2' },
      { item: 'Garlic powder', amount: '1/4 tsp' },
      { item: 'Salt', amount: 'pinch' },
    ],
    prepSteps: [
      { text: 'Slice bell pepper into thin strips', image: '/images/prep/bbq-chicken-quesadillas-prep.png' },
      { text: 'Slice onion into thin half-moons' },
      { text: 'Juice 2 limes into a small bowl' },
      { text: 'Measure sour cream, garlic powder, and salt for the lime crema' },
      { text: 'Shred 2 cups cheese and have tortillas ready' },
    ],
    instructions: [
      { step: 1, title: 'Make lime crema', text: 'Mix sour cream, lime juice, garlic powder, salt. Refrigerate until serving. (2 min)' },
      { step: 2, title: 'Cook chicken', text: 'Season chicken with Cajun seasoning, salt, pepper. Grill or pan-sear over medium-high, 6-7 min per side. Internal temp 165°F. Rest 5 min, then slice thin. (15 min)' },
      { step: 3, title: 'Quick-sauté veggies', text: 'Cook sliced peppers and onions in 1 tbsp oil. Season with salt, pepper. Cook until slightly charred. (5 min)' },
      { step: 4, title: 'Assemble quesadillas', text: 'Heat large skillet or griddle over medium. Lay tortilla flat, add cheese on half, sliced chicken, BBQ sauce drizzle, peppers & onions, more cheese. Fold in half.' },
      { step: 5, title: 'Cook quesadillas', text: 'Cook until golden, flip, repeat. Press gently with spatula. (3-4 min each)' },
      { step: 6, title: 'Serve', text: 'Cut into triangles. Serve with lime crema and extra BBQ sauce.' },
    ],
  },
  {
    id: 'sheet-pan-pork-chops',
    title: 'Sheet Pan Pork Chops with Roasted Vegetables',
    emoji: '🥬',
    image: '/images/recipes/sheet-pan-pork-chops.png',
    category: 'dinner',
    totalTime: '35 min',
    serves: '4',
    ingredients: [
      { item: 'Boneless pork chops', amount: '4 (1.5 lbs)' },
      { item: 'Olive oil', amount: '2 tbsp' },
      { item: 'Italian seasoning', amount: '1 tbsp' },
      { item: 'Smoked paprika', amount: '1 tsp' },
      { item: 'Garlic powder', amount: '1 tsp' },
      { item: 'Salt & pepper', amount: 'to taste' },
      { item: 'Broccoli florets', amount: '1 lb' },
      { item: 'Baby potatoes (halved)', amount: '1 lb' },
      { item: 'Honey', amount: '2 tbsp' },
      { item: 'Whole grain mustard (optional)', amount: '1 tbsp' },
    ],
    prepSteps: [
      { text: 'Halve baby potatoes and break broccoli into florets', image: '/images/prep/sheet-pan-pork-chops-prep.png' },
      { text: 'Mix Italian seasoning, paprika, garlic powder, salt, and pepper in a small bowl' },
      { text: 'Pat pork chops dry with paper towels' },
      { text: 'Mix honey and mustard glaze in a small bowl' },
      { text: 'Line a sheet pan with parchment paper or foil' },
    ],
    instructions: [
      { step: 1, title: 'Preheat oven', text: 'Preheat oven to 425°F' },
      { step: 2, title: 'Prep vegetables', text: 'Toss potatoes with 1 tbsp oil, salt, pepper. Spread on sheet pan. Roast 15 min while you prep pork. (5 min)' },
      { step: 3, title: 'Season pork chops', text: 'Mix Italian seasoning, paprika, garlic powder, salt, pepper. Rub both sides of chops with oil then seasoning.' },
      { step: 4, title: 'Add to sheet pan', text: 'Push potatoes to one side. Add pork chops. Add broccoli (tossed with oil, salt, pepper). Roast 15 minutes. (15 min)' },
      { step: 5, title: 'Glaze and finish', text: 'Mix honey with mustard (or just honey). Brush on pork chops. Roast 5 more min until pork hits 145°F. Broccoli should have charred edges. (5 min)' },
      { step: 6, title: 'Rest and serve', text: 'Let pork rest 5 min. Plate family style or individual.' },
    ],
  },
];

// Weekly schedule with grocery day (Friday) and prep day (Sunday) logic built-in
// Week starts on Friday (grocery pickup day at 2-3pm)
export const weeklySchedule: DaySchedule[] = [
  // FRIDAY - Grocery day (pickup 2-3pm)
  {
    day: 'Friday',
    breakfast: { state: 'unavailable', displayText: 'Grab something', emoji: '🚗' },
    lunch: { state: 'unavailable', displayText: 'Grab something', emoji: '🚗' },
    dinner: { state: 'planned', recipeId: 'turkey-burrito-skillet' }, // Groceries arrive in time!
  },
  // SATURDAY - Full groceries available
  {
    day: 'Saturday',
    breakfast: { state: 'planned', recipeId: 'classic-eggs-bacon', displayText: 'Big Breakfast', emoji: '🍳' },
    lunch: { state: 'leftovers', displayText: 'Leftovers', emoji: '📦' },
    dinner: { state: 'planned', recipeId: 'cajun-sirloin' },
  },
  // SUNDAY - Prep day (make burritos at lunch)
  {
    day: 'Sunday',
    breakfast: { state: 'planned', recipeId: 'sausage-gravy-biscuits' },
    lunch: { state: 'prep', recipeId: 'freezer-breakfast-burritos', displayText: 'PREP: Make Freezer Burritos', emoji: '🥣' },
    dinner: { state: 'planned', recipeId: 'bbq-chicken-quesadillas' },
  },
  // MONDAY - Burritos now available!
  {
    day: 'Monday',
    breakfast: { state: 'planned', recipeId: 'scrambled-eggs-cheese' },
    lunch: { state: 'planned', recipeId: 'freezer-breakfast-burritos', displayText: 'Freezer Burrito', emoji: '🌯' },
    dinner: { state: 'leftovers', displayText: 'Leftovers', emoji: '📦' },
  },
  // TUESDAY
  {
    day: 'Tuesday',
    breakfast: { state: 'planned', recipeId: 'classic-eggs-bacon' },
    lunch: { state: 'planned', recipeId: 'freezer-breakfast-burritos', displayText: 'Freezer Burrito', emoji: '🌯' },
    dinner: { state: 'planned', recipeId: 'sheet-pan-pork-chops' },
  },
  // WEDNESDAY
  {
    day: 'Wednesday',
    breakfast: { state: 'planned', recipeId: 'scrambled-eggs-cheese' },
    lunch: { state: 'planned', recipeId: 'freezer-breakfast-burritos', displayText: 'Freezer Burrito', emoji: '🌯' },
    dinner: { state: 'leftovers', displayText: 'Leftovers', emoji: '📦' },
  },
  // THURSDAY
  {
    day: 'Thursday',
    breakfast: { state: 'planned', recipeId: 'sausage-gravy-biscuits' },
    lunch: { state: 'planned', recipeId: 'freezer-breakfast-burritos', displayText: 'Freezer Burrito', emoji: '🌯' },
    dinner: { state: 'flexible', displayText: 'Leftovers or Takeout', emoji: '🤷' },
  },
];

export function getRecipeById(id: string): Recipe | undefined {
  return recipes.find(r => r.id === id);
}

export function getRecipesByCategory(category: 'breakfast' | 'lunch' | 'dinner'): Recipe[] {
  return recipes.filter(r => r.category === category);
}

// Helper to get the schedule rotated to start from today
export function getRotatedSchedule(): (DaySchedule & { isToday: boolean; daysFromNow: number })[] {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayIndex = new Date().getDay();
  
  const rotatedSchedule = [];
  for (let i = 0; i < 7; i++) {
    const dayIndex = (todayIndex + i) % 7;
    const dayName = days[dayIndex];
    const scheduleEntry = weeklySchedule.find(s => s.day === dayName);
    if (scheduleEntry) {
      rotatedSchedule.push({
        ...scheduleEntry,
        isToday: i === 0,
        daysFromNow: i
      });
    }
  }
  
  return rotatedSchedule;
}
