import Link from 'next/link';
import { getRotatedSchedule, getRecipeById, MealSlot, MealState } from '@/data/recipes';

// Style mappings for different meal states
const mealStateStyles: Record<MealState, { bg: string; text: string; badge?: string }> = {
  planned: { bg: '', text: 'text-gray-800 hover:text-emerald-600' },
  prep: { bg: 'bg-amber-50 rounded px-2 py-0.5', text: 'text-amber-700 font-semibold', badge: '🛠️' },
  unavailable: { bg: 'bg-gray-100 rounded px-2 py-0.5', text: 'text-gray-400' },
  leftovers: { bg: '', text: 'text-gray-500 italic' },
  flexible: { bg: '', text: 'text-gray-500 italic' },
};

function MealDisplay({ meal, mealType }: { meal: MealSlot; mealType: string }) {
  const recipe = meal.recipeId ? getRecipeById(meal.recipeId) : null;
  const styles = mealStateStyles[meal.state];
  
  // Determine what to display
  const emoji = meal.emoji || recipe?.emoji || '';
  const displayText = meal.displayText || recipe?.title || '—';
  const showLink = meal.state === 'planned' && recipe;
  const showPrepLink = meal.state === 'prep' && recipe;
  
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-500 w-16">{mealType}</span>
      <div className={styles.bg}>
        {showLink && recipe ? (
          <Link 
            href={`/recipe/${recipe.id}`}
            className={`text-sm font-medium ${styles.text}`}
          >
            {emoji} {displayText}
            {recipe.isHomechefFavorite && <span className="ml-1">⭐</span>}
          </Link>
        ) : showPrepLink && recipe ? (
          <Link 
            href={`/recipe/${recipe.id}`}
            className={`text-sm ${styles.text}`}
          >
            {emoji} {displayText}
          </Link>
        ) : (
          <span className={`text-sm ${styles.text}`}>
            {emoji} {displayText}
          </span>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const rotatedSchedule = getRotatedSchedule();
  
  return (
    <div className="space-y-6">
      <header className="text-center py-4">
        <h1 className="text-2xl font-bold text-gray-900">This Week</h1>
        <p className="text-gray-500 mt-1">Home Cooking Kickoff</p>
      </header>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 justify-center text-xs">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Planned
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-amber-500"></span> Prep Activity
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-gray-300"></span> Unavailable
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-gray-400"></span> Leftovers/Flex
        </span>
      </div>

      <div className="space-y-3">
        {rotatedSchedule.map((day) => {
          const isToday = day.isToday;
          const isGroceryDay = day.day === 'Friday';
          const isPrepDay = day.day === 'Sunday';

          return (
            <div 
              key={day.day}
              className={`rounded-xl border ${
                isToday 
                  ? 'border-emerald-400 bg-emerald-50' 
                  : isPrepDay 
                    ? 'border-amber-200 bg-amber-50/30'
                    : isGroceryDay
                      ? 'border-blue-200 bg-blue-50/30'
                      : 'border-gray-100 bg-gray-50'
              } p-4`}
            >
              <div className="flex items-center justify-between mb-3">
                <h2 className={`font-semibold ${isToday ? 'text-emerald-700' : 'text-gray-900'}`}>
                  {day.day}
                  {isToday && <span className="ml-2 text-xs bg-emerald-500 text-white px-2 py-0.5 rounded-full">Today</span>}
                  {isGroceryDay && !isToday && <span className="ml-2 text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full">🛒 Grocery Day</span>}
                  {isPrepDay && !isToday && <span className="ml-2 text-xs bg-amber-500 text-white px-2 py-0.5 rounded-full">🥣 Prep Day</span>}
                </h2>
              </div>

              <div className="space-y-2">
                <MealDisplay meal={day.breakfast} mealType="Breakfast" />
                <MealDisplay meal={day.lunch} mealType="Lunch" />
                <MealDisplay meal={day.dinner} mealType="Dinner" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Info footer */}
      <footer className="text-center text-xs text-gray-400 py-4 space-y-1">
        <p>🛒 Grocery pickup: Fridays 2-3pm</p>
        <p>🥣 Burrito prep: Sunday lunch → ready Monday</p>
      </footer>
    </div>
  );
}
