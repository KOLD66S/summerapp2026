import React from 'react'
import { MapPin, Clock, Users } from 'lucide-react'

const events = [
  {
    day: '24', month: 'يونيو',
    title: 'هاكاثون القصيم للذكاء الاصطناعي',
    location: 'مبنى الحاسب',
    time: '٩:٠٠ ص',
    attendees: 240,
    tag: 'success',
    tagText: 'مفتوح'
  },
  {
    day: '27', month: 'يونيو',
    title: 'ملتقى رواد الأعمال الطلابي',
    location: 'قاعة المؤتمرات',
    time: '٤:٠٠ م',
    attendees: 180,
    tag: 'info',
    tagText: 'تسجيل'
  },
  {
    day: '02', month: 'يوليو',
    title: 'بطولة كرة القدم بين الكليات',
    location: 'الملعب الرياضي',
    time: '٥:٣٠ م',
    attendees: 520,
    tag: 'warn',
    tagText: 'قريباً'
  },
  {
    day: '08', month: 'يوليو',
    title: 'أمسية شعرية - نادي اللغة العربية',
    location: 'مسرح الجامعة',
    time: '٧:٠٠ م',
    attendees: 95,
    tag: 'violet',
    tagText: 'ثقافي'
  },
]

export default function UpcomingEvents() {
  return (
    <div className="card fade-in d-4">
      <div className="card-head">
        <div>
          <h3>الفعاليات القادمة</h3>
          <p>{events.length} فعاليات مجدولة</p>
        </div>
      </div>

      <div>
        {events.map((e, i) => (
          <div key={i} className="event-item">
            <div className="event-date">
              <strong>{e.day}</strong>
              <span>{e.month}</span>
            </div>
            <div className="event-body">
              <h4>{e.title}</h4>
              <div className="event-meta">
                <span><MapPin size={11} /> {e.location}</span>
                <span><Clock size={11} /> {e.time}</span>
                <span><Users size={11} /> {e.attendees}</span>
                <span className={`chip ${e.tag}`} style={{ padding: '2px 8px', fontSize: 10.5 }}>{e.tagText}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
