import Link from 'next/link';
import Image from 'next/image';
import { getRotatedSchedule, getRecipeById, MealSlot, MealState, DateSchedule } from '@/data/recipes';

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
    <div className="flex items-center gap-3 py-2">
      <span
        className="text-xs font-semibold w-16 uppercase tracking-wider"
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
            className="text-[0.6rem] font-bold px-2 py-0.5 rounded-md uppercase tracking-wide"
            style={{ background: 'var(--highlight)', color: 'var(--accent)' }}
          >
            Prep
          </span>
        )}
      </div>
    </div>
  );
}

function formatDate(dateStr: string): string {
  const [y, m, d] = dateStr.split('-').map(Number);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[m - 1]} ${d}`;
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
        boxShadow: isToday ? '0 4px 20px rgba(0,0,0,0.08)' : 'none',
      }}
    >
      {/* Hero image for days with dinner recipes that have real images */}
      {heroImage && (
        <div className="relative h-36 w-full">
          <Image
            src={heroImage}
            alt={dinnerRecipe?.title || ''}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-2 left-4 right-4">
            <span className="text-white text-xs font-semibold opacity-90">
              Tonight: {dinnerRecipe?.title}
            </span>
          </div>
        </div>
      )}

      <div className="p-4">
        {/* Day header */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-base tracking-tight" style={{ color: isToday ? 'var(--primary)' : 'var(--foreground)' }}>
            {day.day} <span className="font-normal text-sm" style={{ color: 'var(--foreground-muted)' }}>{formatDate(day.date)}</span>
          </h2>
          <div className="flex gap-1.5">
            {isToday && (
              <span
                className="text-xs font-bold px-2.5 py-1 rounded-full"
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
        <div className="space-y-0.5 divide-y" style={{ borderColor: 'var(--border-light)' }}>
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
      <header className="text-center py-8">
        <h1 className="text-3xl font-bold tracking-tight" style={{ color: 'var(--foreground)' }}>
          This Week
        </h1>
        <p className="mt-2 text-sm font-medium" style={{ color: 'var(--foreground-muted)' }}>
          Home Cooking Kickoff
        </p>
      </header>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 justify-center text-xs font-medium" style={{ color: 'var(--foreground-muted)' }}>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'var(--primary)' }} /> Planned
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'var(--accent)' }} /> Prep
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'var(--foreground-faint)' }} /> Unavailable
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: 'var(--foreground-muted)' }} /> Flex
        </span>
      </div>

      {/* Day Cards */}
      <div className="space-y-3">
        {rotatedSchedule.map((day) => (
          <DayCard key={day.day} day={day} />
        ))}
      </div>

      {/* Footer */}
      <footer className="text-center text-xs py-8 space-y-1.5 font-medium" style={{ color: 'var(--foreground-faint)' }}>
        <p>🛒 Grocery pickup: Fridays 2-3pm</p>
        <p>🥣 Burrito prep: Sunday lunch → ready Monday</p>
      </footer>
    </div>
  );
}
