import rawData from './specialized-clubs-raw.json'

/**
 * آلية تقييم الأنشطة الطلابية - عمادة شؤون الطلاب - جامعة القصيم
 * كل فعالية تأخذ نقاطًا حسب (نوع الفعالية + فئة التقييم أ/ب/ج/د)
 */
const POINTS_TABLE = {
  'محاضرات (حضوري)':                      { 'أ': 20, 'ب': 15, 'ج': 10, 'د': 5 },
  'محاضرات (عن بعد)':                     { 'أ': 15, 'ب': 10, 'ج': 5,  'د': 5 },
  'دورات وورش عمل (حضوري)':               { 'أ': 20, 'ب': 15, 'ج': 10, 'د': 5 },
  'دورات وورش عمل (عن بعد)':              { 'أ': 15, 'ب': 10, 'ج': 5,  'د': 5 },
  'لقاءات اجتماعية':                       { 'أ': 5,  'ب': 40, 'ج': 5,  'د': 5 },
  'مسابقات ثقافية':                        { 'أ': 10, 'ب': 10, 'ج': 10, 'د': 10 },
  'رحلات / زيارات':                        { 'أ': 10, 'ب': 5,  'ج': 5,  'د': 5 },
  'مسرحيات':                               { 'أ': 45, 'ب': 30, 'ج': 15, 'د': 10 },
  'معارض':                                 { 'أ': 40, 'ب': 40, 'ج': 30, 'د': 20 },
  'الحملات والأيام العاليمة':              { 'أ': 10, 'ب': 10, 'ج': 10, 'د': 10 },
  'الفعاليات الرياضية المتنوعة':           { 'أ': 10, 'ب': 40, 'ج': 20, 'د': 10 },
  'مبادرة':                                { 'أ': 20, 'ب': 15, 'ج': 10, 'د': 5 },
  'التفاعل في البرامج الوطنية وبرامج الرؤية': { 'أ': 60, 'ب': 30, 'ج': 20, 'د': 10 },
  'التفاعل مع الأنشطة المركزية في عمادة شؤون الطلاب': { 'أ': 50, 'ب': 15, 'ج': 10, 'د': 10 },
  'التفاعل مع العمادة':                    { 'أ': 50, 'ب': 30, 'ج': 20, 'د': 10 },
  'عروض مرئية':                            { 'أ': 15, 'ب': 10, 'ج': 5,  'د': 5 },
  'مطبوعات و منشورات':                     { 'أ': 10, 'ب': 8,  'ج': 5,  'د': 3 },
  'زيارة أمير المنطقة':                     { 'أ': 100,'ب': 60, 'ج': 40, 'د': 20 },
}

export function computeEventPoints(eventType, catLabel) {
  const table = POINTS_TABLE[eventType?.trim()]
  if (!table) return 5
  return table[catLabel?.trim()] ?? 5
}

/**
 * ألوان الكليات - كل كلية لها لون مميز
 */
const COLLEGE_THEME = {
  'كلية الطب':                              { color: '#dc2626', gradient: 'linear-gradient(135deg, #dc2626, #f97316)', logo: '🩺' },
  'كلية طب الاسنان':                        { color: '#0891b2', gradient: 'linear-gradient(135deg, #0891b2, #06b6d4)', logo: '🦷' },
  'كلية الصيدلة':                           { color: '#059669', gradient: 'linear-gradient(135deg, #059669, #10b981)', logo: '💊' },
  'كلية التمريض':                           { color: '#ec4899', gradient: 'linear-gradient(135deg, #ec4899, #f472b6)', logo: '🏥' },
  'كلية العلوم الطبية التطبيقية':           { color: '#14b8a6', gradient: 'linear-gradient(135deg, #14b8a6, #06b6d4)', logo: '🧬' },
  'كلية الطب البيطري':                       { color: '#84cc16', gradient: 'linear-gradient(135deg, #84cc16, #65a30d)', logo: '🐾' },
  'كلية الهندسة':                           { color: '#4f46e5', gradient: 'linear-gradient(135deg, #4f46e5, #6366f1)', logo: '⚙️' },
  'كلية الحاسب':                            { color: '#7c3aed', gradient: 'linear-gradient(135deg, #7c3aed, #a78bfa)', logo: '💻' },
  'كلية العمارة والتخطيط':                  { color: '#d97706', gradient: 'linear-gradient(135deg, #d97706, #f59e0b)', logo: '🏛️' },
  'كلية العلوم':                            { color: '#0ea5e9', gradient: 'linear-gradient(135deg, #0ea5e9, #38bdf8)', logo: '🔬' },
  'كلية التربية':                           { color: '#8b5cf6', gradient: 'linear-gradient(135deg, #8b5cf6, #a78bfa)', logo: '📚' },
  'كلية الشريعة':                           { color: '#16a34a', gradient: 'linear-gradient(135deg, #16a34a, #22c55e)', logo: '🕌' },
  'كلية اللغات والعلوم الإنسانية':          { color: '#db2777', gradient: 'linear-gradient(135deg, #db2777, #ec4899)', logo: '📖' },
  'كلية الفنون والتصاميم':                  { color: '#f97316', gradient: 'linear-gradient(135deg, #f97316, #fb923c)', logo: '🎨' },
  'كلية الأعمال والاقتصاد':                 { color: '#0d9488', gradient: 'linear-gradient(135deg, #0d9488, #14b8a6)', logo: '💼' },
  'كلية الزراعة والأغذية':                   { color: '#65a30d', gradient: 'linear-gradient(135deg, #65a30d, #84cc16)', logo: '🌾' },
  'الكلية التطبيقية':                       { color: '#9333ea', gradient: 'linear-gradient(135deg, #9333ea, #a855f7)', logo: '🛠️' },
}

const DEFAULT_BRANCH_THEME = { color: '#475569', gradient: 'linear-gradient(135deg, #475569, #64748b)', logo: '🏢' }

function themeFor(college) {
  if (COLLEGE_THEME[college]) return COLLEGE_THEME[college]
  if (college?.includes('مقر')) return DEFAULT_BRANCH_THEME
  return { color: '#6366f1', gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)', logo: '🎓' }
}

function slugify(college, section) {
  const map = {
    'كلية الطب':'med','كلية طب الاسنان':'dentistry','كلية الصيدلة':'pharm','كلية التمريض':'nursing',
    'كلية العلوم الطبية التطبيقية':'amsc','كلية الطب البيطري':'vet','كلية الهندسة':'eng',
    'كلية الحاسب':'cs','كلية العمارة والتخطيط':'arch','كلية العلوم':'sci','كلية التربية':'edu',
    'كلية الشريعة':'sharia','كلية اللغات والعلوم الإنسانية':'lang','كلية الفنون والتصاميم':'arts',
    'كلية الأعمال والاقتصاد':'biz','كلية الزراعة والأغذية':'agri','الكلية التطبيقية':'applied',
  }
  let base = map[college]
  if (!base) {
    if (college?.includes('الرس')) base = 'rass'
    else if (college?.includes('عنيزة')) base = 'unyzh'
    else if (college?.includes('البدائع')) base = 'badaie'
    else if (college?.includes('البكيرية')) base = 'bukyriah'
    else if (college?.includes('المذنب')) base = 'mithnab'
    else if (college?.includes('رياض الخبراء')) base = 'rkhabra'
    else if (college?.includes('ضريه')) base = 'dhurayya'
    else if (college?.includes('النبهانية')) base = 'nabhaniya'
    else if (college?.includes('عقلة الصقور')) base = 'aqlat'
    else if (college?.includes('الاسياح')) base = 'asyah'
    else base = 'club'
  }
  const sx = section === 'طلاب' ? 'm' : 'f'
  return `${base}-${sx}`
}

function normalizeDate(d) {
  if (!d) return null
  const m = d.match(/^(\d{2})\/(\d{2})\/(\d{2,4})$/)
  if (!m) return null
  const [, dd, mm, yy] = m
  const yyyy = yy.length === 2 ? `20${yy}` : yy
  return `${yyyy}-${mm}-${dd}`
}

const MONTHS_AR = ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر']

function buildClub(raw) {
  const id = slugify(raw.college, raw.section)
  const theme = themeFor(raw.college)
  const name = `نادي ${raw.college} - ${raw.section}`

  const events = (raw.events || []).map((e, idx) => {
    const points = computeEventPoints(e.eventType, e.catLabel)
    const isoDate = normalizeDate(e.date)
    const dateObj = isoDate ? new Date(isoDate) : null
    return {
      eventId: `${id}-${e.id || idx}`,
      title: e.title || '— بدون عنوان —',
      details: e.details || '',
      date: isoDate,
      day: dateObj ? String(dateObj.getDate()).padStart(2, '0') : '—',
      month: dateObj ? MONTHS_AR[dateObj.getMonth()] : '—',
      year: dateObj ? dateObj.getFullYear() : null,
      time: e.time || '—',
      hour: e.hour || '',
      minute: e.minute || '',
      category: e.category || 'عام',
      type: e.eventType || 'فعالية',
      label: e.catLabel || 'ج',
      location: e.location || '—',
      participants: parseInt(e.beneficiaries) || 0,
      points,
      images: [e.img1, e.img2, e.img3, e.img4].filter(Boolean),
      video: e.video || null,
      entryBy: e.entryBy || '',
    }
  })

  const totalPoints = events.reduce((s, ev) => s + ev.points, 0)
  const totalParticipants = events.reduce((s, ev) => s + ev.participants, 0)
  const categoriesMap = {}
  const typesMap = {}
  events.forEach(ev => {
    categoriesMap[ev.category] = (categoriesMap[ev.category] || 0) + 1
    typesMap[ev.type] = (typesMap[ev.type] || 0) + 1
  })

  return {
    id,
    name,
    college: raw.college,
    section: raw.section,
    sectionIcon: raw.section === 'طلاب' ? '👨‍🎓' : '👩‍🎓',
    color: theme.color,
    gradient: theme.gradient,
    logo: theme.logo,
    totalEvents: raw.totalEvents,
    sampleCount: events.length,
    totalPoints,
    totalParticipants,
    categoriesCount: Object.keys(categoriesMap).length,
    typesCount: Object.keys(typesMap).length,
    categories: categoriesMap,
    types: typesMap,
    events,
  }
}

export const specializedClubs = rawData
  .filter(r => r.college && r.section)
  .map(buildClub)
  .sort((a, b) => b.totalEvents - a.totalEvents)

export const specializedClubsById = Object.fromEntries(
  specializedClubs.map(c => [c.id, c])
)

export const specializedSummary = {
  totalClubs: specializedClubs.length,
  totalEvents: specializedClubs.reduce((s, c) => s + c.totalEvents, 0),
  totalSampleEvents: specializedClubs.reduce((s, c) => s + c.sampleCount, 0),
  totalPoints: specializedClubs.reduce((s, c) => s + c.totalPoints, 0),
  totalParticipants: specializedClubs.reduce((s, c) => s + c.totalParticipants, 0),
  uniqueColleges: new Set(specializedClubs.map(c => c.college)).size,
}

export const categoryColors = {
  'المجال الثقافي': '#4f46e5',
  'المجال الإجتماعي': '#0891b2',
  'المجال العلمي': '#059669',
  'المجال الوطني': '#16a34a',
  'المجال الرياضي': '#f97316',
  'المجال التطوعي': '#ec4899',
  'المجال الفني': '#a855f7',
  'التوجيه والإرشاد': '#d97706',
  'المجال الصحي': '#dc2626',
  'استقبال المستجدين': '#0ea5e9',
  'برنامج طموح': '#8b5cf6',
  'برنامج واعي': '#14b8a6',
  'المجال الفكري': '#7c3aed',
  'المجال التقني': '#6366f1',
  'المجال النفسي': '#db2777',
  'المجال الوظيفي': '#0d9488',
  'المجال التربوي': '#84cc16',
}

export const colorForCategory = (cat, fallback = '#4f46e5') =>
  categoryColors[cat] || fallback
