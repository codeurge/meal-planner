export interface TimingCalloutData {
  message: string;
  detail?: string;
}

export function TimingCallout({ message, detail }: TimingCalloutData) {
  return (
    <div
      className="rounded-xl p-4 mb-2 border-2"
      style={{
        background: 'linear-gradient(135deg, #FFF3E0, #FFE0B2)',
        borderColor: '#FF9800',
      }}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl flex-shrink-0 mt-0.5">⏱️</span>
        <div>
          <div className="font-extrabold text-sm uppercase tracking-wide" style={{ color: '#E65100' }}>
            {message}
          </div>
          {detail && (
            <div className="text-sm mt-1 font-medium" style={{ color: '#BF360C' }}>
              {detail}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
