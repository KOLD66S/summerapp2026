import React from 'react'
import { UserPlus, CheckCircle2, FileText, Award, Calendar } from 'lucide-react'

const items = [
  { icon: UserPlus, color: 'var(--accent)', bg: 'var(--accent-soft)', text: 'انضم 18 عضواً جديداً لـ', bold: 'نادي الذكاء الاصطناعي', time: 'قبل 12 دقيقة' },
  { icon: CheckCircle2, color: 'var(--emerald)', bg: 'var(--emerald-soft)', text: 'تمت الموافقة على', bold: 'فعالية ملتقى رواد الأعمال', time: 'قبل ساعة' },
  { icon: Award, color: 'var(--gold)', bg: 'var(--gold-soft)', text: 'فاز', bold: 'فريق نادي البرمجة', text2: ' بالمركز الأول', time: 'قبل 3 ساعات' },
  { icon: FileText, color: 'var(--sky)', bg: 'var(--sky-soft)', text: 'تم تقديم طلب إنشاء', bold: 'نادي ريادة الأعمال الرقمية', time: 'قبل 5 ساعات' },
  { icon: Calendar, color: 'var(--violet)', bg: 'var(--violet-soft)', text: 'تم جدولة', bold: 'بطولة الكليات الرياضية', time: 'أمس' },
]

export default function RecentActivity() {
  return (
    <div className="card fade-in d-5">
      <div className="card-head">
        <div>
          <h3>آخر النشاطات</h3>
          <p>تحديثات لحظية من جميع الأندية</p>
        </div>
        <span className="chip success">
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--emerald)', boxShadow: '0 0 8px var(--emerald)' }} />
          مباشر
        </span>
      </div>

      <div>
        {items.map((it, i) => (
          <div key={i} className="activity-item">
            <div className="activity-dot" style={{ background: it.bg, color: it.color }}>
              <it.icon size={15} strokeWidth={2.4} />
            </div>
            <div className="activity-body">
              <p>
                {it.text} <strong>{it.bold}</strong>{it.text2 || ''}
              </p>
              <span>{it.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
