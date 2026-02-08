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
    lunch: { bg: 'var(--highlight)', text: 'var(--primary)' },
    dinner: { bg: 'var(--highlight)', text: 'var(--accent)' },
  };

  const cat = categoryColors[recipe.category] || categoryColors.dinner;
  const hasRealImage = recipe.image?.endsWith('.png');

  return (
    <div className="space-y-8 pb-12">
      {/* Back button */}
      <Link
        href="/"
        className="inline-flex items-center text-sm font-semibold transition-colors"
        style={{ color: 'var(--foreground-muted)' }}
      >
        ← Back to week
      </Link>

      {/* Hero */}
      <div className="relative rounded-2xl overflow-hidden" style={{ background: 'var(--surface)' }}>
        {hasRealImage && recipe.image ? (
          <div className="relative h-64">
            <Image
              src={recipe.image}
              alt={recipe.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
        ) : (
          <div
            className="h-48 w-full flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, var(--surface), var(--surface-hover))' }}
          >
            <span className="text-7xl">{recipe.emoji || '🍽️'}</span>
          </div>
        )}
      </div>

      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span
            className="text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide"
            style={{ background: cat.bg, color: cat.text }}
          >
            {recipe.category}
          </span>
          {recipe.isHomechefFavorite && (
            <span
              className="text-xs font-bold px-2.5 py-1 rounded-full"
              style={{ background: 'var(--highlight)', color: 'var(--primary)' }}
            >
              ⭐ Derek&apos;s Favorite
            </span>
          )}
        </div>
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--foreground)' }}>
          {recipe.title}
        </h1>
        {recipe.description && (
          <p className="mt-2 text-base" style={{ color: 'var(--foreground-muted)' }}>
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
          <div className="text-xs font-medium" style={{ color: 'var(--foreground-faint)' }}>
            Total Time
          </div>
        </div>
        <div>
          <div className="text-lg font-bold" style={{ color: 'var(--foreground)' }}>
            {recipe.serves}
          </div>
          <div className="text-xs font-medium" style={{ color: 'var(--foreground-faint)' }}>
            Serves
          </div>
        </div>
      </div>

      {/* Ingredients */}
      <section>
        <h2 className="text-lg font-bold mb-4 tracking-tight" style={{ color: 'var(--foreground)' }}>
          Ingredients
        </h2>
        <IngredientList ingredients={recipe.ingredients} />
      </section>

      {/* Prep */}
      {recipe.prepSteps && recipe.prepSteps.length > 0 && (
        <section className="prep-section rounded-xl p-6">
          <h2 className="text-lg font-bold mb-1 tracking-tight flex items-center gap-2" style={{ color: 'var(--primary-dark)' }}>
            🔪 Prep
          </h2>
          <p className="text-xs font-medium mb-4" style={{ color: 'var(--foreground-faint)' }}>
            Get everything ready before you start cooking
          </p>
          {recipe.prepSteps[0]?.image && (
            <div className="relative h-48 w-full rounded-xl overflow-hidden mb-5">
              <Image
                src={recipe.prepSteps[0].image}
                alt={`Prep for ${recipe.title}`}
                fill
                className="object-cover"
              />
            </div>
          )}
          <ul className="space-y-3">
            {recipe.prepSteps.map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span
                  className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mt-0.5"
                  style={{ background: 'var(--primary-light)', color: '#FFFFFF' }}
                >
                  {i + 1}
                </span>
                <span className="text-sm leading-relaxed" style={{ color: 'var(--foreground)' }}>
                  {step.text}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Instructions */}
      <section>
        <h2 className="text-lg font-bold mb-6 tracking-tight" style={{ color: 'var(--foreground)' }}>
          Instructions
        </h2>
        <div className="space-y-8">
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
                    className="font-bold mb-1.5"
                    style={{ color: 'var(--foreground)' }}
                  >
                    {step.title}
                  </h3>
                )}
                <p
                  className="leading-relaxed"
                  style={{ color: 'var(--foreground-muted)', fontSize: '1.05rem', lineHeight: '1.75' }}
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
          <h2 className="text-sm font-bold mb-3" style={{ color: 'var(--accent)' }}>
            💡 Tips
          </h2>
          <ul className="space-y-2">
            {recipe.tips.map((tip, i) => (
              <li key={i} className="text-sm leading-relaxed" style={{ color: 'var(--foreground-muted)' }}>
                • {tip}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
