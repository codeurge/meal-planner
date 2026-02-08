import Link from 'next/link';
import Image from 'next/image';
import { recipes } from '@/data/recipes';

function RecipeCard({ recipe }: { recipe: (typeof recipes)[0] }) {
  const hasRealImage = recipe.image?.endsWith('.png');

  return (
    <Link
      href={`/recipe/${recipe.id}`}
      className="block rounded-xl overflow-hidden transition-all hover:scale-[1.01]"
      style={{ background: 'var(--background-card)', border: '1px solid var(--border)' }}
    >
      {/* Image */}
      {hasRealImage && recipe.image ? (
        <div className="relative h-36 w-full">
          <Image
            src={recipe.image}
            alt={recipe.title}
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <div
          className="h-24 w-full flex items-center justify-center"
          style={{ background: 'var(--surface)' }}
        >
          <span className="text-4xl">{recipe.emoji || '🍽️'}</span>
        </div>
      )}

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold" style={{ color: 'var(--foreground)' }}>
          {recipe.title}
          {recipe.isHomechefFavorite && <span className="ml-1">⭐</span>}
        </h3>
        <p className="text-sm mt-0.5" style={{ color: 'var(--foreground-muted)' }}>
          {recipe.totalTime} · Serves {recipe.serves}
        </p>
      </div>
    </Link>
  );
}

export default function RecipesPage() {
  const breakfasts = recipes.filter((r) => r.category === 'breakfast');
  const lunches = recipes.filter((r) => r.category === 'lunch');
  const dinners = recipes.filter((r) => r.category === 'dinner');

  return (
    <div className="space-y-10 pb-8">
      <header className="pt-2">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>
          All Recipes
        </h1>
        <p className="mt-1 text-sm" style={{ color: 'var(--foreground-muted)' }}>
          Week 1 Collection
        </p>
      </header>

      <section>
        <h2
          className="text-base font-semibold mb-4 flex items-center gap-2"
          style={{ color: 'var(--foreground)' }}
        >
          <span>🌅</span> Breakfasts
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {breakfasts.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </section>

      <section>
        <h2
          className="text-base font-semibold mb-4 flex items-center gap-2"
          style={{ color: 'var(--foreground)' }}
        >
          <span>🥪</span> Lunches
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {lunches.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </section>

      <section>
        <h2
          className="text-base font-semibold mb-4 flex items-center gap-2"
          style={{ color: 'var(--foreground)' }}
        >
          <span>🍽️</span> Dinners
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {dinners.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </section>
    </div>
  );
}
