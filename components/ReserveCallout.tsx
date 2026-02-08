export interface ReserveCalloutData {
  message: string;
  detail?: string;
}

export function ReserveCallout({ message, detail }: ReserveCalloutData) {
  return (
    <div
      className="rounded-xl p-4 mb-2 border-2"
      style={{
        background: 'linear-gradient(135deg, #EDE7F6, #D1C4E9)',
        borderColor: '#7E57C2',
      }}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl flex-shrink-0 mt-0.5">📌</span>
        <div>
          <div className="font-extrabold text-sm uppercase tracking-wide" style={{ color: '#4527A0' }}>
            {message}
          </div>
          {detail && (
            <div className="text-sm mt-1 font-medium" style={{ color: '#512DA8' }}>
              {detail}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
