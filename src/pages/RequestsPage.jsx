import React from 'react'
import { Check, X, Eye, Clock, Users } from 'lucide-react'
import { requests } from '../data'

export default function RequestsPage() {
  return (
    <>
      <div className="page-header fade-in">
        <div>
          <h1>طلبات اعتماد الأندية</h1>
          <p>مراجعة واعتماد طلبات تأسيس الأندية الطلابية الجديدة</p>
        </div>
      </div>

      <div className="kpi-grid fade-in d-1">
        <div className="kpi-mini">
          <div className="kpi-mini-label">قيد المراجعة</div>
          <div className="kpi-mini-value" style={{ color: 'var(--amber)' }}>{requests.filter(r => r.status === 'قيد المراجعة').length}</div>
          <div className="kpi-mini-sub">بانتظار قرار الإدارة</div>
        </div>
        <div className="kpi-mini">
          <div className="kpi-mini-label">معتمدة</div>
          <div className="kpi-mini-value" style={{ color: 'var(--emerald)' }}>{requests.filter(r => r.status === 'معتمد').length}</div>
          <div className="kpi-mini-sub">جاهزة للإطلاق</div>
        </div>
        <div className="kpi-mini">
          <div className="kpi-mini-label">إجمالي الأعضاء المؤسسين</div>
          <div className="kpi-mini-value">{requests.reduce((s, r) => s + r.members, 0)}</div>
          <div className="kpi-mini-sub">طالب وطالبة</div>
        </div>
      </div>

      <div className="card fade-in d-2" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-wrap" style={{ border: 'none', borderRadius: 0, background: 'transparent' }}>
          <table className="table">
            <thead>
              <tr>
                <th>اسم النادي المقترح</th>
                <th>الكلية</th>
                <th>المؤسس</th>
                <th>الأعضاء</th>
                <th>تاريخ التقديم</th>
                <th>الحالة</th>
                <th>إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((r) => (
                <tr key={r.id}>
                  <td>{r.club}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{r.college}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{r.founder}</td>
                  <td>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontWeight: 800 }}>
                      <Users size={12} /> {r.members}
                    </span>
                  </td>
                  <td>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, color: 'var(--text-muted)', fontSize: 12 }}>
                      <Clock size={11} /> {r.date}
                    </span>
                  </td>
                  <td><span className={`chip ${r.tag}`}>{r.status}</span></td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="icon-btn" style={{ width: 32, height: 32 }} title="عرض"><Eye size={14} /></button>
                      <button className="icon-btn" style={{ width: 32, height: 32, color: 'var(--emerald)', borderColor: 'var(--emerald)' }} title="اعتماد"><Check size={14} /></button>
                      <button className="icon-btn" style={{ width: 32, height: 32, color: 'var(--rose)', borderColor: 'var(--rose)' }} title="رفض"><X size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
