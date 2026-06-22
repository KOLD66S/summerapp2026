import data from './thamar-data.json'

export const summary = data.summary
export const clubs = data.clubs
export const activities = data.activities
export const allActivities = data.allActivities
export const activityTypes = data.activityTypes
export const monthlyTrend = data.monthlyTrend
export const modes = data.modes
export const topSupervisors = data.topSupervisors
export const topStudents = data.topStudents

export const programName = 'ثمر'
export const programTagline = 'منصة الأندية الطلابية الذكية'
export const supervisor = {
  name: 'د. يزيد المزيرعي',
  title: 'المشرف على البرنامج',
  initial: 'ي',
}
export const university = 'جامعة القصيم'

export const activityTypeColors = {
  'تفاعل مع برامج العمادة (حضور فعاليات العمادة)': '#4f46e5',
  'معارض على مستوى الكلية': '#0891b2',
  'حملات وأيام عالمية': '#059669',
  'رحلات وزيارات خارج الجامعة': '#7c3aed',
  'حفلات (مثل حفل الختام)': '#db2777',
  'محاضرات في التوجيه والإرشاد': '#d97706',
  'محاضرات عامة (خارج/داخل الجامعة)': '#0ea5e9',
  'محاضرات عامة (داخل الكلية)': '#14b8a6',
}

export const colorForType = (t, fallback = '#4f46e5') =>
  activityTypeColors[t] || fallback
