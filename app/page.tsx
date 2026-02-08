import Link from 'next/link';
import Image from 'next/image';
import { getRotatedSchedule, getRecipeById, MealSlot, MealState } from '@/data/recipes';

const mealStateStyles: Record<MealState, { text: string; badge?: string }> = {
  planned: { text: 'planned' },
  prep: { text: 'prep', badge: '🛠️' },
  unavailable: { text: 'unavailable' },
  leftovers: { text: 'leftovers' },
  flexible: { text: 'flexible' },
};

function MealDisplay({ meal, mealType }: { meal: MealSlot; mealType: string }) {
  const recipe = meal.recipeId ? getRecipeById(meal.recipeId) : null;
  const state = mealStateStyles[meal.state];
  const emoji = meal.emoji || recipe?.emoji || '';
  const displayText = meal.displayText || recipe?.title || '—';
  const showLink = (meal.state === 'planned' || meal.state === 'prep') && recipe;

  const textStyle: React.CSSProperties =
    meal.state === 'unavailable'
      ? { color: 'var(--foreground-faint)' }
      : meal.state === 'leftovers' || meal.state === 'flexible'
        ? { color: 'var(--foreground-muted)', fontStyle: 'italic' }
        : meal.state === 'prep'
          ? { color: 'var(--accent)', fontWeight: 600 }
          : { color: 'var(--foreground)' };

  return (
    <div className="flex items-center gap-3 py-1.5">
      <span
        className="text-xs font-medium w-16 uppercase tracking-wide"
        style={{ color: 'var(--foreground-faint)', fontSize: '0.65rem' }}
      >
        {mealType}
      </span>
      <div className="flex-1 flex items-center gap-2 min-w-0">
        {showLink && recipe ? (
          <Link
            href={`/recipe/${recipe.id}`}
            className="text-sm font-medium truncate hover:underline underline-offset-2"
            style={textStyle}
          >
            {emoji} {displayText}
            {recipe.isHomechefFavorite && <span className="ml-1">⭐</span>}
          </Link>
        ) : (
          <span className="text-sm truncate" style={textStyle}>
            {emoji} {displayText}
          </span>
        )}
        {state.badge && meal.state === 'prep' && (
          <span
            className="text-[0.6rem] font-semibold px-1.5 py-0.5 rounded-md"
            style={{ background: 'var(--highlight)', color: 'var(--accent)' }}
          >
            PREP
          </span>
        )}
      </div>
    </div>
  );
}

function DayCard({
  day,
}: {
  day: ReturnType<typeof getRotatedSchedule>[0];
}) {
  const isToday = day.isToday;
  const isGroceryDay = day.day === 'Friday';
  const isPrepDay = day.day === 'Sunday';

  // Find dinner recipe for hero image
  const dinnerRecipe = day.dinner.recipeId ? getRecipeById(day.dinner.recipeId) : null;
  const heroImage = dinnerRecipe?.image?.endsWith('.png') ? dinnerRecipe.image : null;

  return (
    <div
      className="rounded-2xl overflow-hidden transition-all"
      style={{
        background: isToday ? 'var(--surface)' : 'var(--background-card)',
        border: isToday
          ? '2px solid var(--primary)'
          : '1px solid var(--border)',
      }}
    >
      {/* Hero image for days with dinner recipes that have real images */}
      {heroImage && (
        <div className="relative h-32 w-full">
          <Image
            src={heroImage}
            alt={dinnerRecipe?.title || ''}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
      )}

      <div className="p-4">
        {/* Day header */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-base" style={{ color: isToday ? 'var(--primary)' : 'var(--foreground)' }}>
            {day.day}
          </h2>
          <div className="flex gap-1.5">
            {isToday && (
              <span
                className="text-xs font-semibold px-2.5 py-1 rounded-full"
                style={{ background: 'var(--primary)', color: 'var(--background)' }}
              >
                Today
              </span>
            )}
            {isGroceryDay && !isToday && (
              <span
                className="text-xs font-medium px-2.5 py-1 rounded-full"
                style={{ background: 'var(--highlight)', color: 'var(--foreground-muted)' }}
              >
                🛒 Grocery
              </span>
            )}
            {isPrepDay && !isToday && (
              <span
                className="text-xs font-medium px-2.5 py-1 rounded-full"
                style={{ background: 'var(--highlight)', color: 'var(--accent)' }}
              >
                🥣 Prep Day
              </span>
            )}
          </div>
        </div>

        {/* Meals */}
        <div className="space-y-0.5">
          <MealDisplay meal={day.breakfast} mealType="Breakfast" />
          <MealDisplay meal={day.lunch} mealType="Lunch" />
          <MealDisplay meal={day.dinner} mealType="Dinner" />
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const rotatedSchedule = getRotatedSchedule();

  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="text-center py-6">
        <h1 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>
          This Week
        </h1>
        <p className="mt-1 text-sm" style={{ color: 'var(--foreground-muted)' }}>
          Home Cooking Kickoff
        </p>
      </header>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 justify-center text-xs" style={{ color: 'var(--foreground-muted)' }}>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full" style={{ background: 'var(--primary)' }} /> Planned
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full" style={{ background: 'var(--accent)' }} /> Prep
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full" style={{ background: 'var(--foreground-faint)' }} /> Unavailable
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full" style={{ background: 'var(--foreground-muted)' }} /> Flex
        </span>
      </div>

      {/* Day Cards */}
      <div className="space-y-3">
        {rotatedSchedule.map((day) => (
          <DayCard key={day.day} day={day} />
        ))}
      </div>

      {/* Footer */}
      <footer className="text-center text-xs py-6 space-y-1" style={{ color: 'var(--foreground-faint)' }}>
        <p>🛒 Grocery pickup: Fridays 2-3pm</p>
        <p>🥣 Burrito prep: Sunday lunch → ready Monday</p>
      </footer>
    </div>
  );
}
