import React from 'react'
import { Trophy, Award, Sparkles, Crown, Medal } from 'lucide-react'
import { topStudents, programName } from '../thamar'

export default function LeaderboardPage() {
  const top3 = topStudents.slice(0, 3)
  const rest = topStudents.slice(3, 15)

  const medalColors = ['#d97706', '#94a3b8', '#b45309']

  return (
    <>
      <div className="page-header fade-in">
        <div>
          <h1>لوحة المتميزين</h1>
          <p>الطلاب الأكثر مشاركة وحصداً للنقاط في {programName}</p>
        </div>
        <span className="chip gold"><Sparkles size={12} /> منصة {programName}</span>
      </div>

      <div className="hero fade-in d-1">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18, position: 'relative' }}>
          {top3.map((s, i) => (
            <div
              key={s.studentId}
              className="scale-in"
              style={{
                animationDelay: `${0.1 * (3 - i)}s`,
                background: '#fff',
                border: `2px solid ${medalColors[i]}40`,
                borderRadius: 'var(--radius-lg)',
                padding: '24px 18px',
                textAlign: 'center',
                position: 'relative',
                transform: i === 0 ? 'translateY(-12px)' : 'none',
                boxShadow: i === 0 ? `0 20px 50px ${medalColors[0]}30` : 'var(--shadow-card)',
                order: i === 0 ? 2 : i === 1 ? 1 : 3,
              }}
            >
              <div style={{
                position: 'absolute',
                top: -22,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 44, height: 44, borderRadius: '50%',
                background: `linear-gradient(135deg, ${medalColors[i]}, ${medalColors[i]}cc)`,
                display: 'grid', placeItems: 'center',
                color: '#fff', fontWeight: 900, fontSize: 18,
                boxShadow: `0 8px 24px ${medalColors[i]}55`,
              }}>
                {i === 0 ? <Crown size={20} /> : <Medal size={18} />}
              </div>
              <div style={{
                width: 80, height: 80, borderRadius: '50%', margin: '12px auto 14px',
                background: `linear-gradient(135deg, ${medalColors[i]}25, ${medalColors[i]}08)`,
                border: `2px solid ${medalColors[i]}50`,
                display: 'grid', placeItems: 'center',
                fontSize: 30, fontWeight: 900,
                color: medalColors[i],
              }}>
                {s.name.charAt(0)}
              </div>
              <h3 style={{ fontSize: i === 0 ? 16 : 14, fontWeight: 900, marginBottom: 4, color: 'var(--text-primary)' }}>
                {s.name}
              </h3>
              <p style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 14 }}>
                #{s.studentId}
              </p>
              <div style={{
                display: 'flex', justifyContent: 'space-around',
                padding: '12px 0', borderTop: `1px dashed ${medalColors[i]}40`
              }}>
                <div>
                  <strong style={{ display: 'block', fontSize: 20, fontWeight: 900, color: medalColors[i] }}>
                    {s.points}
                  </strong>
                  <span style={{ fontSize: 10.5, color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>نقطة</span>
                </div>
                <div>
                  <strong style={{ display: 'block', fontSize: 20, fontWeight: 900, color: 'var(--text-primary)' }}>
                    {s.activities}
                  </strong>
                  <span style={{ fontSize: 10.5, color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>نشاط</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card fade-in d-2" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="card-head" style={{ padding: '22px 22px 8px' }}>
          <div>
            <h3>الترتيب الكامل</h3>
            <p>أعلى 15 طالباً تميزاً في المنصة</p>
          </div>
          <span className="chip violet"><Trophy size={11} /> النخبة</span>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>الترتيب</th>
              <th>الطالب</th>
              <th>الرقم الجامعي</th>
              <th>الأنشطة</th>
              <th>النقاط</th>
              <th>الإنجاز</th>
            </tr>
          </thead>
          <tbody>
            {rest.map((s, i) => {
              const rank = i + 4
              return (
                <tr key={s.studentId}>
                  <td>
                    <strong style={{ fontSize: 15, color: rank <= 5 ? 'var(--gold)' : 'var(--text-primary)' }}>#{rank}</strong>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{
                        width: 32, height: 32, borderRadius: '50%',
                        background: 'var(--accent-soft)',
                        color: 'var(--accent)',
                        display: 'grid', placeItems: 'center',
                        fontWeight: 800, fontSize: 12,
                        border: '1px solid var(--accent)',
                      }}>
                        {s.name.charAt(0)}
                      </div>
                      {s.name}
                    </div>
                  </td>
                  <td style={{ fontVariantNumeric: 'tabular-nums', fontSize: 12 }}>{s.studentId}</td>
                  <td><strong>{s.activities}</strong></td>
                  <td><strong style={{ color: 'var(--accent)' }}>{s.points}</strong></td>
                  <td>
                    <div className="progress" style={{ minWidth: 100 }}>
                      <div className="progress-bar" style={{ width: `${(s.points / top3[0].points) * 100}%` }} />
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}
