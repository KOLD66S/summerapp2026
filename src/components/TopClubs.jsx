import React from 'react'
import { ChevronLeft, Crown } from 'lucide-react'

const clubs = [
  { logo: '🤖', name: 'نادي الذكاء الاصطناعي', college: 'كلية الحاسب', members: 412, events: 18, color: '#6366f1' },
  { logo: '🎭', name: 'نادي المسرح والفنون', college: 'كلية الآداب', members: 287, events: 14, color: '#a855f7' },
  { logo: '⚽', name: 'النادي الرياضي', college: 'مشترك', members: 624, events: 22, color: '#10b981' },
  { logo: '📚', name: 'نادي القراءة', college: 'كلية اللغة العربية', members: 198, events: 9, color: '#f59e0b' },
  { logo: '🔬', name: 'نادي البحث العلمي', college: 'كلية العلوم', members: 156, events: 12, color: '#38bdf8' },
]

export default function TopClubs() {
  return (
    <div className="card fade-in d-3">
      <div className="card-head">
        <div>
          <h3>الأندية الأكثر نشاطاً</h3>
          <p>ترتيب الأندية حسب الأداء هذا الفصل</p>
        </div>
        <button className="chip">
          عرض الكل <ChevronLeft size={14} />
        </button>
      </div>

      <div>
        {clubs.map((c, i) => (
          <div key={i} className="club-row">
            <div
              className="club-logo"
              style={{ background: `linear-gradient(135deg, ${c.color}25, ${c.color}10)`, border: `1px solid ${c.color}30` }}
            >
              {c.logo}
            </div>
            <div className="club-info">
              <h4>
                {i === 0 && <Crown size={13} color="var(--gold)" style={{ verticalAlign: 'middle', marginLeft: 4 }} />}
                {c.name}
              </h4>
              <span>{c.college}</span>
            </div>
            <div className="club-meta">
              <div className="meta-item">
                <strong>{c.members}</strong>
                <span>عضو</span>
              </div>
              <div className="meta-item">
                <strong>{c.events}</strong>
                <span>فعالية</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
