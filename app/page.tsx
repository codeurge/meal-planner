import Link from 'next/link';
import { weeklySchedule, getRecipeById } from '@/data/recipes';

export default function Home() {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = new Date().getDay();
  const todayName = days[today];
  
  return (
    <div className="space-y-6">
      <header className="text-center py-4">
        <h1 className="text-2xl font-bold text-gray-900">Week 1</h1>
        <p className="text-gray-500 mt-1">Home Cooking Kickoff</p>
      </header>

      <div className="space-y-3">
        {weeklySchedule.map((day) => {
          const isToday = day.day === todayName;
          const breakfast = day.breakfast ? getRecipeById(day.breakfast) : null;
          const lunch = day.lunch ? getRecipeById(day.lunch) : null;
          const dinner = day.dinner ? getRecipeById(day.dinner) : null;

          return (
            <div 
              key={day.day}
              className={`rounded-xl border ${isToday ? 'border-emerald-400 bg-emerald-50' : 'border-gray-100 bg-gray-50'} p-4`}
            >
              <div className="flex items-center justify-between mb-3">
                <h2 className={`font-semibold ${isToday ? 'text-emerald-700' : 'text-gray-900'}`}>
                  {day.day}
                  {isToday && <span className="ml-2 text-xs bg-emerald-500 text-white px-2 py-0.5 rounded-full">Today</span>}
                </h2>
              </div>

              <div className="space-y-2">
                {/* Breakfast */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 w-16">Breakfast</span>
                  {breakfast ? (
                    <Link 
                      href={`/recipe/${breakfast.id}`}
                      className="text-sm font-medium text-gray-800 hover:text-emerald-600"
                    >
                      {breakfast.emoji} {breakfast.title}
                    </Link>
                  ) : (
                    <span className="text-sm text-gray-400">{day.note === 'Big Breakfast' ? '🍳 Big Breakfast' : '—'}</span>
                  )}
                </div>

                {/* Lunch */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 w-16">Lunch</span>
                  {lunch ? (
                    <Link 
                      href={`/recipe/${lunch.id}`}
                      className="text-sm font-medium text-gray-800 hover:text-emerald-600"
                    >
                      {lunch.emoji} {day.note === 'Make freezer burritos!' ? 'Make Burritos! 📦' : 'Freezer Burrito'}
                    </Link>
                  ) : (
                    <span className="text-sm text-gray-400">—</span>
                  )}
                </div>

                {/* Dinner */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 w-16">Dinner</span>
                  {dinner ? (
                    <Link 
                      href={`/recipe/${dinner.id}`}
                      className="text-sm font-medium text-gray-800 hover:text-emerald-600"
                    >
                      {dinner.emoji} {dinner.title}
                      {dinner.isHomechefFavorite && <span className="ml-1">⭐</span>}
                    </Link>
                  ) : (
                    <span className="text-sm text-gray-400 italic">{day.note || 'Leftovers'}</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
