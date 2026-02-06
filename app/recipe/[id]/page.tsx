import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { recipes, getRecipeById } from '@/data/recipes';
import { IngredientList } from '@/components/IngredientList';

export function generateStaticParams() {
  return recipes.map((recipe) => ({
    id: recipe.id,
  }));
}

export default async function RecipePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const recipe = getRecipeById(id);
  
  if (!recipe) {
    notFound();
  }

  const categoryColors = {
    breakfast: 'bg-amber-100 text-amber-700',
    lunch: 'bg-blue-100 text-blue-700', 
    dinner: 'bg-purple-100 text-purple-700',
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Back button */}
      <Link 
        href="/"
        className="inline-flex items-center text-sm text-gray-500 hover:text-emerald-600"
      >
        ← Back to week
      </Link>

      {/* Hero area */}
      <div className="relative rounded-2xl h-48 overflow-hidden">
        {recipe.image ? (
          <Image
            src={recipe.image}
            alt={recipe.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-full w-full flex items-center justify-center">
            <span className="text-6xl">{recipe.emoji || '🍽️'}</span>
          </div>
        )}
      </div>

      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${categoryColors[recipe.category]}`}>
            {recipe.category.charAt(0).toUpperCase() + recipe.category.slice(1)}
          </span>
          {recipe.isHomechefFavorite && (
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-emerald-100 text-emerald-700">
              ⭐ Derek's Favorite
            </span>
          )}
        </div>
        <h1 className="text-2xl font-bold text-gray-900">{recipe.title}</h1>
        {recipe.description && (
          <p className="text-gray-500 mt-1">{recipe.description}</p>
        )}
      </div>

      {/* Meta info */}
      <div className="flex gap-6 py-4 border-y border-gray-100">
        <div className="text-center">
          <div className="text-lg font-semibold text-gray-900">{recipe.totalTime}</div>
          <div className="text-xs text-gray-500">Total Time</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-gray-900">{recipe.serves}</div>
          <div className="text-xs text-gray-500">Serves</div>
        </div>
      </div>

      {/* Ingredients */}
      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Ingredients</h2>
        <IngredientList ingredients={recipe.ingredients} />
      </section>

      {/* Instructions */}
      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Instructions</h2>
        <div className="space-y-4">
          {recipe.instructions.map((step) => (
            <div key={step.step} className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-sm">
                {step.step}
              </div>
              <div className="flex-1 pt-1">
                {step.title && (
                  <h3 className="font-medium text-gray-900 mb-1">{step.title}</h3>
                )}
                <p className="text-gray-700 leading-relaxed">{step.text}</p>
                {step.image && (
                  <div className="mt-3 relative h-32 w-48 rounded-lg overflow-hidden">
                    <Image
                      src={step.image}
                      alt={step.title || `Step ${step.step}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tips */}
      {recipe.tips && recipe.tips.length > 0 && (
        <section className="bg-amber-50 rounded-xl p-4">
          <h2 className="text-sm font-semibold text-amber-800 mb-2">💡 Tips</h2>
          <ul className="space-y-1">
            {recipe.tips.map((tip, i) => (
              <li key={i} className="text-sm text-amber-700">{tip}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
