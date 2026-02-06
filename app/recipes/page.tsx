import Link from 'next/link';
import { recipes } from '@/data/recipes';

export default function RecipesPage() {
  const breakfasts = recipes.filter(r => r.category === 'breakfast');
  const lunches = recipes.filter(r => r.category === 'lunch');
  const dinners = recipes.filter(r => r.category === 'dinner');

  const RecipeCard = ({ recipe }: { recipe: typeof recipes[0] }) => (
    <Link
      href={`/recipe/${recipe.id}`}
      className="block p-4 rounded-xl border border-gray-100 hover:border-emerald-200 hover:bg-emerald-50 transition-colors"
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">{recipe.emoji || '🍽️'}</span>
        <div>
          <h3 className="font-medium text-gray-900">
            {recipe.title}
            {recipe.isHomechefFavorite && <span className="ml-1">⭐</span>}
          </h3>
          <p className="text-sm text-gray-500">{recipe.totalTime} • Serves {recipe.serves}</p>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-gray-900">All Recipes</h1>
        <p className="text-gray-500 mt-1">Week 1 Collection</p>
      </header>

      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <span className="text-amber-500">🌅</span> Breakfasts
        </h2>
        <div className="space-y-2">
          {breakfasts.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <span className="text-blue-500">🥪</span> Lunches
        </h2>
        <div className="space-y-2">
          {lunches.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <span className="text-purple-500">🍽️</span> Dinners
        </h2>
        <div className="space-y-2">
          {dinners.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </section>
    </div>
  );
}
