import { site as fr } from "../lang/fr";
import { site as hi } from "../lang/hi";
import type { Language, Verdict } from "../schema";

/** Interface text for navigation, the home page sections, Learn, Practice and About. */
export type SiteStrings = {
  nav: { check: string; learn: string; practice: string; help: string; about: string };
  home: {
    eyebrow: string;
    heroBefore: string;
    heroEmph: string;
    heroAfter: string;
    helpTitle: string;
    helpBody: string;
    helpCta: string;
  };
  checkingSteps: string[];
  scale: Record<Verdict, string>;
  learn: {
    eyebrow: string;
    title: string;
    intro: string;
    exampleLabel: string;
    howLabel: string;
    signsLabel: string;
    todoLabel: string;
    checkCta: string;
    practiceCta: string;
    allTypes: string;
    next: string;
  };
  practice: {
    eyebrow: string;
    title: string;
    intro: string;
    start: string;
    progress: string; // "{n}" and "{total}"
    fromLabel: string;
    scamButton: string;
    realButton: string;
    correct: string;
    wrong: string;
    answerScam: string;
    answerReal: string;
    cluesLabel: string;
    next: string;
    finish: string;
    scoreTitle: string; // "{n}" and "{total}"
    scoreHigh: string;
    scoreLow: string;
    again: string;
    checkReal: string;
  };
  about: {
    eyebrow: string;
    title: string;
    intro: string;
    sections: { title: string; body: string[] }[];
  };
  notFound: { title: string; body: string };
  footerAbout: string;
  footerMade: string;
};

const en: SiteStrings = {
  nav: { check: "Check", learn: "Learn", practice: "Practice", help: "Get help", about: "About" },
  home: {
    eyebrow: "Free · No sign-up · Nothing saved",
    heroBefore: "Check a message before you ",
    heroEmph: "reply, click or pay",
    heroAfter: ".",
    helpTitle: "Already clicked, replied or paid?",
    helpBody: "Don't panic. Acting quickly helps, and we'll show you exactly what to do.",
    helpCta: "Get help now",
  },
  checkingSteps: ["Reading your message…", "Looking for warning signs…", "Getting your next steps ready…"],
  scale: { no_signs: "No common signs", careful: "Be careful", likely_scam: "Likely scam" },
  learn: {
    eyebrow: "Learn",
    title: "Know the common scams",
    intro: "Scammers change their stories, but their tricks stay the same. Here are the ones we see most.",
    exampleLabel: "What it looks like",
    howLabel: "How it works",
    signsLabel: "Warning signs",
    todoLabel: "What to do",
    checkCta: "Got one like this? Check it",
    practiceCta: "Practice spotting scams",
    allTypes: "All scam types",
    next: "Next",
  },
  practice: {
    eyebrow: "Practice",
    title: "Can you spot the scam?",
    intro: "We'll show you 8 messages. Some are scams and some are real. Decide for each one, then see the clues.",
    start: "Start",
    progress: "Message {n} of {total}",
    fromLabel: "From",
    scamButton: "Looks like a scam",
    realButton: "Looks real",
    correct: "You got it!",
    wrong: "Not quite.",
    answerScam: "This one is a scam.",
    answerReal: "This one looks real.",
    cluesLabel: "The clues",
    next: "Next message",
    finish: "See my score",
    scoreTitle: "You spotted {n} of {total}",
    scoreHigh: "Great eye. Share this practice with someone you love, so they can try it too.",
    scoreLow: "Scams are designed to fool people. Every round you play makes the next real one easier to spot.",
    again: "Practice again",
    checkReal: "Check a real message",
  },
  about: {
    eyebrow: "About",
    title: "How ScamShield works",
    intro: "ScamShield is a free tool that helps people check a suspicious message before they act on it.",
    sections: [
      {
        title: "What it checks",
        body: [
          "It reads the message, a screenshot, or your description of a call, and looks for 11 common warning signs, like rushing you, threats, strange ways to pay, or asking for codes.",
          "Every sign it shows points to the exact words in your message, so you can see the evidence yourself.",
        ],
      },
      {
        title: "How the answer is decided",
        body: [
          "A computer program reads the message and lists the warning signs. The answer itself follows fixed rules: two or more signs, or one serious sign like asking for gift cards or your PIN, means \"Very likely a scam.\"",
          "ScamShield never says a message is safe. It can miss new tricks, so when money or personal details are involved, always contact the company using a number you already trust.",
        ],
      },
      {
        title: "Your privacy",
        body: [
          "We don't save your messages, and there's no account. Your message is checked and then forgotten.",
          "Your language choice is remembered only on your own device.",
        ],
      },
      {
        title: "For community groups",
        body: [
          "Rotary clubs, libraries, senior centers and faith groups can use the Practice and Learn pages in workshops. They work on any phone, in 7 languages, with no sign-up.",
        ],
      },
    ],
  },
  notFound: { title: "We couldn't find that page", body: "The link may be old or mistyped. You can still check a message or learn about common scams." },
  footerAbout: "How ScamShield works",
  footerMade: "Made for the Rotary AI for Good hackathon.",
};

const es: SiteStrings = {
  nav: { check: "Revisar", learn: "Aprender", practice: "Practicar", help: "Ayuda", about: "Acerca de" },
  home: {
    eyebrow: "Gratis · Sin registrarse · No guardamos nada",
    heroBefore: "Revise un mensaje antes de ",
    heroEmph: "responder, hacer clic o pagar",
    heroAfter: ".",
    helpTitle: "¿Ya hizo clic, respondió o pagó?",
    helpBody: "No se asuste. Actuar rápido ayuda, y le mostramos exactamente qué hacer.",
    helpCta: "Obtener ayuda ahora",
  },
  checkingSteps: ["Leyendo su mensaje…", "Buscando señales de alerta…", "Preparando sus próximos pasos…"],
  scale: { no_signs: "Sin señales comunes", careful: "Cuidado", likely_scam: "Probable estafa" },
  learn: {
    eyebrow: "Aprender",
    title: "Conozca las estafas comunes",
    intro: "Los estafadores cambian sus historias, pero sus trucos son los mismos. Estos son los que más vemos.",
    exampleLabel: "Cómo se ve",
    howLabel: "Cómo funciona",
    signsLabel: "Señales de alerta",
    todoLabel: "Qué hacer",
    checkCta: "¿Recibió uno así? Revíselo",
    practiceCta: "Practique cómo detectar estafas",
    allTypes: "Todos los tipos de estafa",
    next: "Siguiente",
  },
  practice: {
    eyebrow: "Practicar",
    title: "¿Puede detectar la estafa?",
    intro: "Le mostraremos 8 mensajes. Algunos son estafas y otros son reales. Decida en cada uno y luego vea las pistas.",
    start: "Empezar",
    progress: "Mensaje {n} de {total}",
    fromLabel: "De",
    scamButton: "Parece una estafa",
    realButton: "Parece real",
    correct: "¡Correcto!",
    wrong: "No exactamente.",
    answerScam: "Este es una estafa.",
    answerReal: "Este parece real.",
    cluesLabel: "Las pistas",
    next: "Siguiente mensaje",
    finish: "Ver mi resultado",
    scoreTitle: "Detectó {n} de {total}",
    scoreHigh: "Muy buen ojo. Comparta esta práctica con alguien querido para que también la intente.",
    scoreLow: "Las estafas están hechas para engañar. Cada ronda que juega hace más fácil detectar la próxima de verdad.",
    again: "Practicar otra vez",
    checkReal: "Revisar un mensaje real",
  },
  about: {
    eyebrow: "Acerca de",
    title: "Cómo funciona ScamShield",
    intro: "ScamShield es una herramienta gratuita que ayuda a revisar un mensaje sospechoso antes de actuar.",
    sections: [
      {
        title: "Qué revisa",
        body: [
          "Lee el mensaje, una captura o su descripción de una llamada, y busca 11 señales de alerta comunes, como apurarle, amenazas, formas de pago extrañas o pedir códigos.",
          "Cada señal que muestra apunta a las palabras exactas de su mensaje, para que usted mismo vea la evidencia.",
        ],
      },
      {
        title: "Cómo se decide la respuesta",
        body: [
          "Un programa de computadora lee el mensaje y enumera las señales de alerta. La respuesta sigue reglas fijas: dos o más señales, o una señal grave como pedir tarjetas de regalo o su PIN, significa \"Muy probablemente es una estafa\".",
          "ScamShield nunca dice que un mensaje es seguro. Puede no detectar trucos nuevos, así que cuando hay dinero o datos personales de por medio, comuníquese siempre con la empresa usando un número en el que ya confía.",
        ],
      },
      {
        title: "Su privacidad",
        body: [
          "No guardamos sus mensajes y no hay cuentas. Su mensaje se revisa y luego se olvida.",
          "Su idioma se recuerda solo en su propio aparato.",
        ],
      },
      {
        title: "Para grupos comunitarios",
        body: [
          "Clubes Rotarios, bibliotecas, centros para personas mayores y grupos de fe pueden usar las páginas de Practicar y Aprender en talleres. Funcionan en cualquier teléfono, en 7 idiomas, sin registrarse.",
        ],
      },
    ],
  },
  notFound: { title: "No encontramos esa página", body: "Puede que el enlace sea antiguo o tenga un error. Aún puede revisar un mensaje o conocer las estafas comunes." },
  footerAbout: "Cómo funciona ScamShield",
  footerMade: "Hecho para el hackathon Rotary AI for Good.",
};

const zh: SiteStrings = {
  nav: { check: "检查", learn: "了解", practice: "练习", help: "求助", about: "关于" },
  home: {
    eyebrow: "免费 · 无需注册 · 不保存任何内容",
    heroBefore: "在",
    heroEmph: "回复、点击或付款",
    heroAfter: "之前，先检查一下信息。",
    helpTitle: "已经点击、回复或付款了？",
    helpBody: "别慌。尽快行动会有帮助，我们会一步步告诉您该怎么做。",
    helpCta: "立即求助",
  },
  checkingSteps: ["正在阅读您的信息…", "正在寻找警告信号…", "正在准备下一步建议…"],
  scale: { no_signs: "无常见信号", careful: "请小心", likely_scam: "很可能是诈骗" },
  learn: {
    eyebrow: "了解",
    title: "了解常见诈骗",
    intro: "骗子会换说法，但手法不变。下面是我们最常见到的几种。",
    exampleLabel: "看起来是什么样",
    howLabel: "骗局怎么运作",
    signsLabel: "警告信号",
    todoLabel: "该怎么做",
    checkCta: "收到类似的？检查一下",
    practiceCta: "练习识破诈骗",
    allTypes: "所有诈骗类型",
    next: "下一个",
  },
  practice: {
    eyebrow: "练习",
    title: "您能识破诈骗吗？",
    intro: "我们会给您看 8 条信息，有些是诈骗，有些是真的。逐条判断，然后看看线索。",
    start: "开始",
    progress: "第 {n} 条，共 {total} 条",
    fromLabel: "发件人",
    scamButton: "像是诈骗",
    realButton: "看起来是真的",
    correct: "答对了！",
    wrong: "不太对。",
    answerScam: "这条是诈骗。",
    answerReal: "这条看起来是真的。",
    cluesLabel: "线索",
    next: "下一条",
    finish: "查看我的成绩",
    scoreTitle: "您识破了 {total} 条中的 {n} 条",
    scoreHigh: "眼力很好！把这个练习分享给您关心的人，让他们也试试。",
    scoreLow: "诈骗就是设计来骗人的。每多练一次，下次遇到真的就更容易识破。",
    again: "再练一次",
    checkReal: "检查一条真实信息",
  },
  about: {
    eyebrow: "关于",
    title: "ScamShield 如何运作",
    intro: "ScamShield 是一个免费工具，帮助人们在采取行动之前检查可疑信息。",
    sections: [
      {
        title: "检查什么",
        body: [
          "它会阅读信息、截图或您对来电的描述，寻找 11 种常见的警告信号，例如催促您、威胁、奇怪的付款方式或索要验证码。",
          "它显示的每个信号都会指向您信息中的具体字句，让您亲眼看到证据。",
        ],
      },
      {
        title: "结论如何得出",
        body: [
          "电脑程序阅读信息并列出警告信号。结论遵循固定规则：两个或以上信号，或一个严重信号（例如要求礼品卡或 PIN 码），就判定为\"很可能是诈骗\"。",
          "ScamShield 从不说一条信息是安全的。它可能识别不出新手法，所以只要涉及钱或个人资料，请务必用您本来就信任的号码联系对方。",
        ],
      },
      {
        title: "您的隐私",
        body: ["我们不保存您的信息，也不需要账户。信息检查完就会被丢弃。", "您选择的语言只保存在您自己的设备上。"],
      },
      {
        title: "给社区团体",
        body: [
          "扶轮社、图书馆、老年中心和宗教团体可以在讲座中使用\"练习\"和\"了解\"页面。任何手机都能用，支持 7 种语言，无需注册。",
        ],
      },
    ],
  },
  notFound: { title: "找不到这个页面", body: "链接可能已失效或输入有误。您仍然可以检查信息，或了解常见诈骗。" },
  footerAbout: "ScamShield 如何运作",
  footerMade: "为 Rotary AI for Good 黑客松而做。",
};

const vi: SiteStrings = {
  nav: { check: "Kiểm tra", learn: "Tìm hiểu", practice: "Luyện tập", help: "Trợ giúp", about: "Giới thiệu" },
  home: {
    eyebrow: "Miễn phí · Không cần đăng ký · Không lưu gì cả",
    heroBefore: "Kiểm tra tin nhắn trước khi ",
    heroEmph: "trả lời, bấm vào hay trả tiền",
    heroAfter: ".",
    helpTitle: "Đã bấm vào, trả lời hoặc trả tiền?",
    helpBody: "Đừng hoảng sợ. Hành động nhanh sẽ giúp ích, và chúng tôi sẽ chỉ rõ cần làm gì.",
    helpCta: "Nhận trợ giúp ngay",
  },
  checkingSteps: ["Đang đọc tin nhắn của quý vị…", "Đang tìm dấu hiệu cảnh báo…", "Đang chuẩn bị các bước tiếp theo…"],
  scale: { no_signs: "Không có dấu hiệu", careful: "Cẩn thận", likely_scam: "Có thể lừa đảo" },
  learn: {
    eyebrow: "Tìm hiểu",
    title: "Các kiểu lừa đảo thường gặp",
    intro: "Kẻ lừa đảo đổi câu chuyện, nhưng mánh khóe vẫn vậy. Đây là những kiểu chúng tôi gặp nhiều nhất.",
    exampleLabel: "Trông như thế nào",
    howLabel: "Cách chúng lừa",
    signsLabel: "Dấu hiệu cảnh báo",
    todoLabel: "Nên làm gì",
    checkCta: "Nhận được tin như vậy? Kiểm tra ngay",
    practiceCta: "Luyện tập nhận ra lừa đảo",
    allTypes: "Tất cả các kiểu lừa đảo",
    next: "Tiếp theo",
  },
  practice: {
    eyebrow: "Luyện tập",
    title: "Quý vị có nhận ra lừa đảo không?",
    intro: "Chúng tôi sẽ cho quý vị xem 8 tin nhắn. Có tin là lừa đảo, có tin là thật. Hãy chọn cho từng tin, rồi xem manh mối.",
    start: "Bắt đầu",
    progress: "Tin nhắn {n} / {total}",
    fromLabel: "Từ",
    scamButton: "Giống lừa đảo",
    realButton: "Trông như thật",
    correct: "Đúng rồi!",
    wrong: "Chưa đúng.",
    answerScam: "Tin này là lừa đảo.",
    answerReal: "Tin này trông như thật.",
    cluesLabel: "Manh mối",
    next: "Tin nhắn tiếp theo",
    finish: "Xem kết quả",
    scoreTitle: "Quý vị nhận ra {n} / {total}",
    scoreHigh: "Tinh mắt lắm. Hãy chia sẻ bài luyện tập này với người thân để họ cùng thử.",
    scoreLow: "Lừa đảo được tạo ra để đánh lừa. Mỗi lần luyện tập giúp quý vị dễ nhận ra vụ thật hơn.",
    again: "Luyện tập lại",
    checkReal: "Kiểm tra một tin nhắn thật",
  },
  about: {
    eyebrow: "Giới thiệu",
    title: "ScamShield hoạt động thế nào",
    intro: "ScamShield là công cụ miễn phí giúp mọi người kiểm tra tin nhắn đáng ngờ trước khi làm theo.",
    sections: [
      {
        title: "Kiểm tra những gì",
        body: [
          "Nó đọc tin nhắn, ảnh chụp màn hình hoặc lời kể về cuộc gọi, và tìm 11 dấu hiệu cảnh báo thường gặp, như hối thúc, đe dọa, cách trả tiền lạ hoặc đòi mã số.",
          "Mỗi dấu hiệu đều chỉ đúng những chữ trong tin nhắn, để quý vị tự thấy bằng chứng.",
        ],
      },
      {
        title: "Kết luận được đưa ra thế nào",
        body: [
          "Một chương trình máy tính đọc tin nhắn và liệt kê dấu hiệu cảnh báo. Kết luận theo quy tắc cố định: từ hai dấu hiệu trở lên, hoặc một dấu hiệu nghiêm trọng như đòi thẻ quà tặng hay mã PIN, nghĩa là \"Rất có thể là lừa đảo\".",
          "ScamShield không bao giờ nói một tin nhắn là an toàn. Nó có thể bỏ sót mánh mới, nên khi liên quan đến tiền hay thông tin cá nhân, hãy luôn liên lạc bằng số điện thoại quý vị đã tin tưởng.",
        ],
      },
      {
        title: "Quyền riêng tư",
        body: [
          "Chúng tôi không lưu tin nhắn và không cần tài khoản. Tin nhắn được kiểm tra rồi bị xóa khỏi bộ nhớ.",
          "Ngôn ngữ quý vị chọn chỉ được nhớ trên thiết bị của quý vị.",
        ],
      },
      {
        title: "Cho các nhóm cộng đồng",
        body: [
          "Câu lạc bộ Rotary, thư viện, trung tâm người cao tuổi và các nhóm tôn giáo có thể dùng trang Luyện tập và Tìm hiểu trong các buổi hội thảo. Dùng được trên mọi điện thoại, 7 ngôn ngữ, không cần đăng ký.",
        ],
      },
    ],
  },
  notFound: { title: "Không tìm thấy trang này", body: "Đường dẫn có thể đã cũ hoặc bị gõ sai. Quý vị vẫn có thể kiểm tra tin nhắn hoặc tìm hiểu các kiểu lừa đảo thường gặp." },
  footerAbout: "ScamShield hoạt động thế nào",
  footerMade: "Làm cho cuộc thi Rotary AI for Good.",
};

const tl: SiteStrings = {
  nav: { check: "Suriin", learn: "Alamin", practice: "Magsanay", help: "Tulong", about: "Tungkol" },
  home: {
    eyebrow: "Libre · Walang sign-up · Walang sine-save",
    heroBefore: "Suriin ang mensahe bago ka ",
    heroEmph: "sumagot, mag-click o magbayad",
    heroAfter: ".",
    helpTitle: "Nakapag-click, sumagot o nagbayad na?",
    helpBody: "Huwag mag-panic. Makatutulong ang mabilis na pagkilos, at ipapakita namin ang eksaktong gagawin.",
    helpCta: "Humingi ng tulong ngayon",
  },
  checkingSteps: ["Binabasa ang iyong mensahe…", "Naghahanap ng mga babala…", "Inihahanda ang susunod mong hakbang…"],
  scale: { no_signs: "Walang karaniwang babala", careful: "Mag-ingat", likely_scam: "Malamang scam" },
  learn: {
    eyebrow: "Alamin",
    title: "Ang mga karaniwang scam",
    intro: "Binabago ng mga scammer ang kanilang kuwento, pero pareho pa rin ang taktika. Ito ang madalas naming makita.",
    exampleLabel: "Ganito ang itsura",
    howLabel: "Paano ito gumagana",
    signsLabel: "Mga babala",
    todoLabel: "Ano ang gagawin",
    checkCta: "May natanggap kang ganito? Suriin ito",
    practiceCta: "Magsanay makakita ng scam",
    allTypes: "Lahat ng uri ng scam",
    next: "Susunod",
  },
  practice: {
    eyebrow: "Magsanay",
    title: "Kaya mo bang makita ang scam?",
    intro: "Magpapakita kami ng 8 mensahe. Ang ilan ay scam at ang ilan ay totoo. Pumili para sa bawat isa, saka tingnan ang mga palatandaan.",
    start: "Magsimula",
    progress: "Mensahe {n} sa {total}",
    fromLabel: "Mula kay",
    scamButton: "Mukhang scam",
    realButton: "Mukhang totoo",
    correct: "Tama ka!",
    wrong: "Hindi pa tama.",
    answerScam: "Scam ito.",
    answerReal: "Mukhang totoo ito.",
    cluesLabel: "Mga palatandaan",
    next: "Susunod na mensahe",
    finish: "Tingnan ang iskor ko",
    scoreTitle: "Nakita mo ang {n} sa {total}",
    scoreHigh: "Matalas ang mata mo. Ibahagi ang pagsasanay na ito sa mahal mo sa buhay para masubukan din nila.",
    scoreLow: "Ginawa ang scam para manlinlang. Bawat round na nilalaro mo ay nagpapadali sa pagkakita sa susunod na totoong scam.",
    again: "Magsanay ulit",
    checkReal: "Suriin ang totoong mensahe",
  },
  about: {
    eyebrow: "Tungkol",
    title: "Paano gumagana ang ScamShield",
    intro: "Ang ScamShield ay libreng tool na tumutulong suriin ang kahina-hinalang mensahe bago kumilos.",
    sections: [
      {
        title: "Ano ang sinusuri nito",
        body: [
          "Binabasa nito ang mensahe, screenshot o ang paglalarawan mo sa tawag, at naghahanap ng 11 karaniwang babala, tulad ng pagmamadali, pananakot, kakaibang paraan ng bayad o paghingi ng code.",
          "Bawat babalang ipinapakita ay tumuturo sa eksaktong mga salita sa iyong mensahe, para makita mo mismo ang ebidensya.",
        ],
      },
      {
        title: "Paano napagpapasyahan ang sagot",
        body: [
          "Isang computer program ang nagbabasa ng mensahe at naglilista ng mga babala. Ang sagot ay sumusunod sa nakapirming tuntunin: dalawa o higit pang babala, o isang seryosong babala tulad ng paghingi ng gift card o PIN, ay nangangahulugang \"Malamang na scam ito.\"",
          "Hindi kailanman sasabihin ng ScamShield na ligtas ang isang mensahe. Maaari itong makaligtaan ng bagong taktika, kaya kapag may pera o personal na detalye, laging kontakin ang kumpanya gamit ang numerong pinagkakatiwalaan mo na.",
        ],
      },
      {
        title: "Ang iyong privacy",
        body: [
          "Hindi namin sine-save ang iyong mensahe at walang account. Sinusuri ang mensahe at saka kinakalimutan.",
          "Ang napili mong wika ay naaalala lang sa sarili mong device.",
        ],
      },
      {
        title: "Para sa mga grupo sa komunidad",
        body: [
          "Magagamit ng mga Rotary club, aklatan, senior center at grupo ng simbahan ang mga page na Magsanay at Alamin sa mga workshop. Gumagana sa kahit anong telepono, sa 7 wika, nang walang sign-up.",
        ],
      },
    ],
  },
  notFound: { title: "Hindi namin makita ang page na iyan", body: "Maaaring luma o mali ang pagkaka-type ng link. Puwede ka pa ring magsuri ng mensahe o alamin ang mga karaniwang scam." },
  footerAbout: "Paano gumagana ang ScamShield",
  footerMade: "Ginawa para sa Rotary AI for Good hackathon.",
};

export const SITE: Record<Language, SiteStrings> = { en, es, zh, vi, tl, hi, fr };

export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, k: string) => String(values[k] ?? ""));
}
