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

  const categoryColors: Record<string, { bg: string; text: string }> = {
    breakfast: { bg: 'var(--highlight)', text: 'var(--accent)' },
    lunch: { bg: 'var(--highlight)', text: 'var(--primary-dark)' },
    dinner: { bg: 'var(--highlight)', text: 'var(--accent)' },
  };

  const cat = categoryColors[recipe.category] || categoryColors.dinner;
  const hasRealImage = recipe.image?.endsWith('.png');

  return (
    <div className="space-y-6 pb-10">
      {/* Back button */}
      <Link
        href="/"
        className="inline-flex items-center text-sm font-medium transition-colors"
        style={{ color: 'var(--foreground-muted)' }}
      >
        ← Back to week
      </Link>

      {/* Hero */}
      <div className="relative rounded-2xl h-56 overflow-hidden" style={{ background: 'var(--surface)' }}>
        {hasRealImage && recipe.image ? (
          <Image
            src={recipe.image}
            alt={recipe.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div
            className="h-full w-full flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, var(--surface), var(--surface-hover))' }}
          >
            <span className="text-7xl">{recipe.emoji || '🍽️'}</span>
          </div>
        )}
      </div>

      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{ background: cat.bg, color: cat.text }}
          >
            {recipe.category.charAt(0).toUpperCase() + recipe.category.slice(1)}
          </span>
          {recipe.isHomechefFavorite && (
            <span
              className="text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{ background: 'var(--highlight)', color: 'var(--primary)' }}
            >
              ⭐ Derek&apos;s Favorite
            </span>
          )}
        </div>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>
          {recipe.title}
        </h1>
        {recipe.description && (
          <p className="mt-1" style={{ color: 'var(--foreground-muted)' }}>
            {recipe.description}
          </p>
        )}
      </div>

      {/* Meta */}
      <div
        className="flex gap-8 py-4 rounded-xl px-5"
        style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
      >
        <div>
          <div className="text-lg font-bold" style={{ color: 'var(--foreground)' }}>
            {recipe.totalTime}
          </div>
          <div className="text-xs" style={{ color: 'var(--foreground-faint)' }}>
            Total Time
          </div>
        </div>
        <div>
          <div className="text-lg font-bold" style={{ color: 'var(--foreground)' }}>
            {recipe.serves}
          </div>
          <div className="text-xs" style={{ color: 'var(--foreground-faint)' }}>
            Serves
          </div>
        </div>
      </div>

      {/* Ingredients */}
      <section>
        <h2 className="text-lg font-semibold mb-3" style={{ color: 'var(--foreground)' }}>
          Ingredients
        </h2>
        <IngredientList ingredients={recipe.ingredients} />
      </section>

      {/* Instructions — Big text for kitchen use */}
      <section>
        <h2 className="text-lg font-semibold mb-5" style={{ color: 'var(--foreground)' }}>
          Instructions
        </h2>
        <div className="space-y-6">
          {recipe.instructions.map((step) => (
            <div key={step.step} className="flex gap-4">
              <div
                className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm step-number"
              >
                {step.step}
              </div>
              <div className="flex-1 pt-0.5">
                {step.title && (
                  <h3
                    className="font-semibold mb-1"
                    style={{ color: 'var(--foreground)' }}
                  >
                    {step.title}
                  </h3>
                )}
                <p
                  className="text-base leading-relaxed"
                  style={{ color: 'var(--foreground-muted)', fontSize: '1rem', lineHeight: '1.7' }}
                >
                  {step.text}
                </p>
                {step.image && step.image.endsWith('.png') && (
                  <div className="mt-3 relative h-36 w-full rounded-xl overflow-hidden">
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
        <section
          className="rounded-xl p-5"
          style={{ background: 'var(--highlight)', border: '1px solid var(--border)' }}
        >
          <h2 className="text-sm font-semibold mb-2" style={{ color: 'var(--accent)' }}>
            💡 Tips
          </h2>
          <ul className="space-y-1.5">
            {recipe.tips.map((tip, i) => (
              <li key={i} className="text-sm" style={{ color: 'var(--foreground-muted)' }}>
                {tip}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
