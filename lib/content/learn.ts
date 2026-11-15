import { guides as fr } from "../lang/fr";
import { guides as hi } from "../lang/hi";
import type { Language } from "../schema";

export const SCAM_SLUGS = ["delivery", "bank", "government", "family", "tech-support", "prize", "romance", "job"] as const;
export type ScamSlug = (typeof SCAM_SLUGS)[number];

export type ScamGuide = {
  title: string;
  short: string;
  example: { from: string; text: string };
  how: string;
  signs: string[];
  todo: string[];
};

export type Guides = Record<ScamSlug, ScamGuide>;

const en: Guides = {
  delivery: {
    title: "Fake delivery and toll fees",
    short: "A text says a package is stuck or a toll is unpaid, and asks for a small fee.",
    example: { from: "+1 (415) 555-0187", text: "USPS: Your package is on hold. Pay the $1.99 redelivery fee within 24h: usps-redeliver-help.co" },
    how: "The fee is small so you don't think twice. The link goes to a fake site that steals your card number, which is then used for much bigger charges.",
    signs: ["A link that isn't the company's real website", "A deadline, like \"within 24 hours\"", "A fee you didn't expect"],
    todo: ["Don't tap the link.", "Track packages in the real app or website you already use.", "Delete the text and block the number."],
  },
  bank: {
    title: "Bank and card alerts",
    short: "A message says your account is locked or there's fraud, and asks you to confirm details.",
    example: { from: "Chase Alert", text: "Your debit card is locked due to suspicious activity. Reply with your 4-digit PIN to unlock it." },
    how: "Scammers pretend to be your bank's fraud team. They ask for your PIN, a one-time code, or your login, then empty the account.",
    signs: ["Asks for a PIN, password or code", "Says your account is locked or closing", "Asks you to move money to a \"safe account\""],
    todo: [
      "Never share a PIN or code. Real banks never ask for them.",
      "Call the number on the back of your card.",
      "If you shared anything, call your bank right away.",
    ],
  },
  government: {
    title: "Government and immigration threats",
    short: "Someone claims to be the IRS, Social Security, Medicare, police or immigration, and says you'll be in trouble unless you pay.",
    example: { from: "Unknown caller", text: "This is the IRS. A warrant will be issued for your arrest unless you pay today with gift cards." },
    how: "Fear makes people act fast. Real agencies send letters first, and never demand gift cards, crypto or wire transfers, or threaten arrest over the phone.",
    signs: ["Threats of arrest, deportation or losing benefits", "Demands payment right now", "Asks for gift cards, crypto or a wire"],
    todo: [
      "Hang up. Don't call back the number they give you.",
      "Look up the agency's real number yourself, on its official .gov website.",
      "Talk to someone you trust before doing anything.",
    ],
  },
  family: {
    title: "A family member in trouble",
    short: "A call or text from a \"grandchild\" or relative who needs money fast and asks you to keep it secret.",
    example: { from: "Unknown number", text: "Grandma it's me, I'm in jail and need help. Please send $2,000 in gift cards. Don't tell Mom." },
    how: "Scammers use emotion and secrecy. Some even use AI to copy a loved one's voice. They ask for gift cards, cash by courier, or a wire.",
    signs: ["An emergency and a request for money", "\"Don't tell anyone\"", "A new number, or a voice that sounds a bit off"],
    todo: [
      "Hang up and call your family member on the number you already have.",
      "Ask a question only they would know.",
      "Agree on a family code word ahead of time.",
    ],
  },
  "tech-support": {
    title: "Fake tech support",
    short: "A pop-up or call says your computer has a virus and gives you a number to call.",
    example: { from: "Pop-up on screen", text: "WARNING! Your computer is infected. Do not close this page. Call Microsoft Support at 1-844-555-0199." },
    how: "The \"technician\" asks you to install an app like AnyDesk so they can control your device, then steals passwords or asks you to pay for fake repairs.",
    signs: ["A scary pop-up with a phone number", "Asks you to install an app or share your screen", "Asks to be paid in gift cards or crypto"],
    todo: [
      "Don't call. Close the browser, or restart the computer.",
      "Never let a stranger control your device.",
      "If you let them in, disconnect from the internet and get help.",
    ],
  },
  prize: {
    title: "Prizes, lotteries and refunds",
    short: "You've \"won\" money or a prize, but first you need to pay a fee or tax.",
    example: { from: "Prize Center", text: "Congratulations! You won $5,000 in our annual draw. Pay $50 in taxes by Western Union to claim your prize today." },
    how: "Real prizes never ask you to pay to receive them. Once you pay, more \"fees\" keep coming, and the prize never arrives.",
    signs: ["A prize for a contest you didn't enter", "A fee or tax to get the money", "Pressure to claim it today"],
    todo: ["Don't pay anything.", "Don't share bank or card details.", "Delete the message."],
  },
  romance: {
    title: "Romance and \"wrong number\" scams",
    short: "A friendly stranger starts chatting, builds trust over weeks, then asks for money or investment.",
    example: { from: "+1 (628) 555-0140", text: "Hi, is this Sam? Oh sorry, wrong number! You seem really nice though. Where are you from?" },
    how: "The scammer becomes a \"friend\" or partner, often for weeks. Later they need money for an emergency, or invite you to a crypto \"investment\" that can't be withdrawn.",
    signs: ["A stranger who becomes very friendly very fast", "They can never meet or video chat", "Talk of investments, crypto, or money troubles"],
    todo: [
      "Never send money to someone you haven't met in person.",
      "Talk to a family member or friend about the relationship.",
      "Stop replying if money or investing comes up.",
    ],
  },
  job: {
    title: "Fake jobs and overpayments",
    short: "An easy job with high pay, or a buyer who \"accidentally\" overpays you and asks for the difference back.",
    example: { from: "HR Team", text: "Remote job! Earn $500/day liking videos. Message our manager on WhatsApp to start. Small deposit required." },
    how: "You're asked to pay for training or equipment, or you get a check that later bounces after you've sent money back.",
    signs: ["Pay that seems too high for easy work", "You must pay to start", "A check for more than you're owed"],
    todo: [
      "Never pay to get a job.",
      "Never send back extra money from a check or transfer.",
      "Look up the company yourself before replying.",
    ],
  },
};

const es: Guides = {
  delivery: {
    title: "Cobros falsos de entrega y peaje",
    short: "Un texto dice que un paquete está detenido o que debe un peaje, y pide un pago pequeño.",
    example: { from: "+1 (415) 555-0187", text: "USPS: Su paquete está retenido. Pague $1.99 de reenvío en 24h: usps-redeliver-help.co" },
    how: "El cobro es pequeño para que no lo piense dos veces. El enlace lleva a un sitio falso que roba el número de su tarjeta, que luego usan para cargos mucho mayores.",
    signs: ["Un enlace que no es el sitio real de la empresa", "Un plazo, como \"en 24 horas\"", "Un cobro que no esperaba"],
    todo: ["No toque el enlace.", "Rastree sus paquetes en la aplicación o sitio real que ya usa.", "Borre el texto y bloquee el número."],
  },
  bank: {
    title: "Alertas de banco y tarjeta",
    short: "Un mensaje dice que su cuenta está bloqueada o que hay fraude, y le pide confirmar datos.",
    example: { from: "Chase Alert", text: "Su tarjeta de débito está bloqueada por actividad sospechosa. Responda con su PIN de 4 dígitos para desbloquearla." },
    how: "Los estafadores fingen ser el equipo de fraude de su banco. Piden su PIN, un código de un solo uso o su usuario, y luego vacían la cuenta.",
    signs: ["Pide un PIN, contraseña o código", "Dice que su cuenta está bloqueada o se cerrará", "Le pide mover dinero a una \"cuenta segura\""],
    todo: [
      "Nunca comparta un PIN o código. Los bancos reales nunca los piden.",
      "Llame al número detrás de su tarjeta.",
      "Si compartió algo, llame a su banco de inmediato.",
    ],
  },
  government: {
    title: "Amenazas del gobierno o de inmigración",
    short: "Alguien dice ser del IRS, Seguro Social, Medicare, la policía o inmigración, y dice que tendrá problemas si no paga.",
    example: { from: "Llamada desconocida", text: "Habla el IRS. Se emitirá una orden de arresto en su contra si no paga hoy con tarjetas de regalo." },
    how: "El miedo hace que la gente actúe rápido. Las agencias reales envían cartas primero y nunca exigen tarjetas de regalo, criptomonedas o giros, ni amenazan con arresto por teléfono.",
    signs: ["Amenazas de arresto, deportación o perder beneficios", "Exige pagar ahora mismo", "Pide tarjetas de regalo, criptomonedas o un giro"],
    todo: [
      "Cuelgue. No devuelva la llamada al número que le dan.",
      "Busque usted mismo el número real de la agencia en su sitio oficial .gov.",
      "Hable con alguien de confianza antes de hacer nada.",
    ],
  },
  family: {
    title: "Un familiar en problemas",
    short: "Una llamada o texto de un \"nieto\" o pariente que necesita dinero rápido y le pide guardar el secreto.",
    example: { from: "Número desconocido", text: "Abuela soy yo, estoy en la cárcel y necesito ayuda. Mándame $2,000 en tarjetas de regalo. No le digas a mamá." },
    how: "Los estafadores usan la emoción y el secreto. Algunos incluso usan IA para copiar la voz de un ser querido. Piden tarjetas de regalo, efectivo por mensajero o un giro.",
    signs: ["Una emergencia y un pedido de dinero", "\"No le digas a nadie\"", "Un número nuevo, o una voz que suena un poco rara"],
    todo: [
      "Cuelgue y llame a su familiar al número que ya tiene.",
      "Haga una pregunta que solo esa persona sabría.",
      "Acuerden de antemano una palabra clave familiar.",
    ],
  },
  "tech-support": {
    title: "Falso soporte técnico",
    short: "Una ventana emergente o una llamada dice que su computadora tiene un virus y le da un número para llamar.",
    example: { from: "Ventana en pantalla", text: "¡ADVERTENCIA! Su computadora está infectada. No cierre esta página. Llame a Soporte de Microsoft al 1-844-555-0199." },
    how: "El \"técnico\" le pide instalar una aplicación como AnyDesk para controlar su aparato, y luego roba contraseñas o le cobra reparaciones falsas.",
    signs: ["Una ventana alarmante con un número de teléfono", "Le pide instalar una aplicación o compartir su pantalla", "Pide pago con tarjetas de regalo o criptomonedas"],
    todo: [
      "No llame. Cierre el navegador o reinicie la computadora.",
      "Nunca deje que un desconocido controle su aparato.",
      "Si les dio acceso, desconéctese del internet y busque ayuda.",
    ],
  },
  prize: {
    title: "Premios, loterías y reembolsos",
    short: "Usted \"ganó\" dinero o un premio, pero primero tiene que pagar una tarifa o impuesto.",
    example: { from: "Centro de Premios", text: "¡Felicidades! Usted ganó $5,000 en nuestro sorteo anual. Pague $50 de impuestos por Western Union para reclamar su premio hoy." },
    how: "Los premios reales nunca piden que pague para recibirlos. Cuando paga, siguen llegando más \"cobros\" y el premio nunca llega.",
    signs: ["Un premio de un concurso en el que no participó", "Una tarifa o impuesto para recibir el dinero", "Presión para reclamarlo hoy"],
    todo: ["No pague nada.", "No comparta datos de banco o tarjeta.", "Borre el mensaje."],
  },
  romance: {
    title: "Estafas románticas y de \"número equivocado\"",
    short: "Un desconocido amable empieza a conversar, gana su confianza durante semanas y luego pide dinero o inversión.",
    example: { from: "+1 (628) 555-0140", text: "Hola, ¿eres Sam? ¡Ay, perdón, número equivocado! Pero pareces muy amable. ¿De dónde eres?" },
    how: "El estafador se vuelve un \"amigo\" o pareja, a menudo durante semanas. Luego necesita dinero para una emergencia, o le invita a una \"inversión\" en criptomonedas que no se puede retirar.",
    signs: ["Un desconocido que se vuelve muy cercano muy rápido", "Nunca puede verse en persona ni por video", "Habla de inversiones, criptomonedas o problemas de dinero"],
    todo: [
      "Nunca envíe dinero a alguien que no conoce en persona.",
      "Hable de la relación con un familiar o amigo.",
      "Deje de responder si sale el tema del dinero o de invertir.",
    ],
  },
  job: {
    title: "Empleos falsos y pagos de más",
    short: "Un trabajo fácil muy bien pagado, o un comprador que le paga de más \"por error\" y le pide devolver la diferencia.",
    example: { from: "Equipo de RR. HH.", text: "¡Trabajo desde casa! Gane $500 al día dando \"me gusta\" a videos. Escriba a nuestro gerente por WhatsApp. Se requiere un pequeño depósito." },
    how: "Le piden pagar por capacitación o equipo, o recibe un cheque que luego rebota después de que usted devolvió dinero.",
    signs: ["Un sueldo demasiado alto para un trabajo fácil", "Tiene que pagar para empezar", "Un cheque por más de lo que le deben"],
    todo: [
      "Nunca pague para conseguir un trabajo.",
      "Nunca devuelva dinero extra de un cheque o transferencia.",
      "Busque la empresa usted mismo antes de responder.",
    ],
  },
};

const zh: Guides = {
  delivery: {
    title: "假快递费和过路费",
    short: "短信说包裹被扣或过路费未付，要求付一小笔钱。",
    example: { from: "+1 (415) 555-0187", text: "USPS：您的包裹已被扣留。请在 24 小时内支付 $1.99 重新派送费：usps-redeliver-help.co" },
    how: "金额很小，让您不会多想。链接通往假网站，盗取您的卡号，之后被用来刷更大的金额。",
    signs: ["链接不是该公司的真实网站", "有期限，例如\"24 小时内\"", "您没预料到的费用"],
    todo: ["不要点链接。", "在您平时用的正规应用或网站查询包裹。", "删除短信并屏蔽号码。"],
  },
  bank: {
    title: "银行和信用卡警报",
    short: "信息说您的账户被锁或有盗刷，要求您确认资料。",
    example: { from: "Chase Alert", text: "您的借记卡因可疑活动已被锁定。请回复您的 4 位 PIN 码以解锁。" },
    how: "骗子冒充银行的反诈团队，索要 PIN 码、一次性验证码或登录信息，然后把账户里的钱转走。",
    signs: ["索要 PIN 码、密码或验证码", "说您的账户被锁或将被关闭", "要求您把钱转到\"安全账户\""],
    todo: ["绝不要透露 PIN 码或验证码。真正的银行从不索要。", "拨打您卡背面的电话。", "如果已经透露了，立刻打电话给银行。"],
  },
  government: {
    title: "冒充政府和移民局的威胁",
    short: "有人自称是国税局、社会安全局、联邦医疗保险、警察或移民局，说不付钱就有麻烦。",
    example: { from: "未知来电", text: "这里是国税局（IRS）。如果您今天不用礼品卡付款，将对您发出逮捕令。" },
    how: "恐惧让人仓促行事。真正的政府机构会先寄信，从不要求礼品卡、加密货币或电汇，也不会在电话里威胁逮捕。",
    signs: ["威胁逮捕、驱逐出境或取消福利", "要求马上付款", "要求礼品卡、加密货币或电汇"],
    todo: ["挂断电话。不要回拨对方给的号码。", "自己在官方 .gov 网站上查该机构的真实电话。", "做任何事之前，先和您信任的人谈谈。"],
  },
  family: {
    title: "家人出事了",
    short: "\"孙子\"或亲戚打电话或发短信，急需用钱，还要求您保密。",
    example: { from: "未知号码", text: "奶奶是我，我被关在拘留所，需要帮忙。请寄 $2,000 的礼品卡给我。别告诉妈妈。" },
    how: "骗子利用感情和保密。有些甚至用 AI 模仿亲人的声音。他们要礼品卡、让快递员上门取现金，或要求电汇。",
    signs: ["紧急情况加上要钱", "\"别告诉任何人\"", "新号码，或声音听起来有点不对"],
    todo: ["挂断，用您原本就有的号码打给这位家人。", "问一个只有他们才知道的问题。", "事先和家人约定一个暗号。"],
  },
  "tech-support": {
    title: "假冒技术支持",
    short: "弹窗或电话说您的电脑中了病毒，并给您一个电话号码。",
    example: { from: "屏幕弹窗", text: "警告！您的电脑已被感染。不要关闭此页面。请拨打微软支持 1-844-555-0199。" },
    how: "\"技术员\"会让您安装 AnyDesk 之类的应用来控制您的设备，然后盗取密码，或让您为假维修付钱。",
    signs: ["带电话号码的吓人弹窗", "要求您安装应用或共享屏幕", "要求用礼品卡或加密货币付款"],
    todo: ["不要打电话。关闭浏览器或重启电脑。", "绝不要让陌生人控制您的设备。", "如果已经让他们进入，请断开网络并寻求帮助。"],
  },
  prize: {
    title: "中奖、彩票和退款",
    short: "您\"赢了\"钱或奖品，但要先付手续费或税。",
    example: { from: "颁奖中心", text: "恭喜！您在我们的年度抽奖中赢得 $5,000。今天通过西联汇款支付 $50 税款即可领奖。" },
    how: "真正的奖品从不需要您先付钱。一旦付了，就会有更多\"费用\"，奖品永远不会到。",
    signs: ["没参加过的抽奖却中了奖", "要付费或交税才能拿到钱", "催您今天就领"],
    todo: ["什么钱都不要付。", "不要透露银行或信用卡资料。", "删除这条信息。"],
  },
  romance: {
    title: "恋爱诈骗和\"打错电话\"诈骗",
    short: "友善的陌生人开始聊天，花几周赢得信任，然后要钱或拉您投资。",
    example: { from: "+1 (628) 555-0140", text: "你好，是 Sam 吗？哎呀，打错了！不过你人好像很好。你是哪里人？" },
    how: "骗子会成为您的\"朋友\"或恋人，往往持续好几周。之后他们遇到急事要钱，或邀请您参加取不出钱的加密货币\"投资\"。",
    signs: ["陌生人很快变得非常亲热", "从来不能见面或视频", "谈到投资、加密货币或缺钱"],
    todo: ["绝不要给没见过面的人寄钱。", "和家人或朋友谈谈这段关系。", "一提到钱或投资，就不要再回复。"],
  },
  job: {
    title: "假工作和多付款",
    short: "轻松高薪的工作，或买家\"不小心\"多付了钱，要您退回差额。",
    example: { from: "人事部", text: "远程工作！给视频点赞每天赚 $500。在 WhatsApp 上联系我们的经理开始。需要少量押金。" },
    how: "他们让您付培训费或设备费，或者寄给您一张支票，等您退钱之后支票才被退票。",
    signs: ["轻松工作却给很高的报酬", "要先付钱才能开始", "支票金额比应付的多"],
    todo: ["找工作绝不要付钱。", "绝不要把支票或转账多出来的钱退回去。", "回复之前，自己查一查这家公司。"],
  },
};

const vi: Guides = {
  delivery: {
    title: "Phí giao hàng và phí cầu đường giả",
    short: "Tin nhắn nói gói hàng bị giữ hoặc chưa trả phí cầu đường, và đòi một khoản phí nhỏ.",
    example: { from: "+1 (415) 555-0187", text: "USPS: Gói hàng của quý vị đang bị giữ. Trả phí giao lại $1.99 trong 24 giờ: usps-redeliver-help.co" },
    how: "Phí nhỏ để quý vị không suy nghĩ nhiều. Đường link dẫn đến trang giả để lấy số thẻ, rồi dùng nó cho những khoản lớn hơn nhiều.",
    signs: ["Đường link không phải trang web thật của công ty", "Có hạn chót, như \"trong 24 giờ\"", "Một khoản phí quý vị không ngờ tới"],
    todo: ["Đừng bấm vào link.", "Theo dõi gói hàng trong ứng dụng hoặc trang web thật quý vị vẫn dùng.", "Xóa tin nhắn và chặn số đó."],
  },
  bank: {
    title: "Cảnh báo ngân hàng và thẻ",
    short: "Tin nhắn nói tài khoản bị khóa hoặc có gian lận, và bảo quý vị xác nhận thông tin.",
    example: { from: "Chase Alert", text: "Thẻ ghi nợ của quý vị bị khóa do hoạt động đáng ngờ. Trả lời bằng mã PIN 4 số để mở khóa." },
    how: "Kẻ lừa đảo giả làm bộ phận chống gian lận của ngân hàng. Họ hỏi mã PIN, mã một lần hoặc thông tin đăng nhập, rồi rút sạch tài khoản.",
    signs: ["Hỏi mã PIN, mật khẩu hay mã số", "Nói tài khoản bị khóa hoặc sắp đóng", "Bảo chuyển tiền sang \"tài khoản an toàn\""],
    todo: ["Đừng bao giờ đưa mã PIN hay mã số. Ngân hàng thật không bao giờ hỏi.", "Gọi số ở mặt sau thẻ.", "Nếu đã đưa thông tin, hãy gọi ngân hàng ngay."],
  },
  government: {
    title: "Đe dọa giả danh chính phủ và di trú",
    short: "Có người tự xưng là IRS, An Sinh Xã Hội, Medicare, cảnh sát hay sở di trú, và nói quý vị sẽ gặp rắc rối nếu không trả tiền.",
    example: { from: "Người gọi lạ", text: "Đây là IRS. Lệnh bắt sẽ được ban hành nếu quý vị không trả tiền hôm nay bằng thẻ quà tặng." },
    how: "Nỗi sợ khiến người ta hành động vội. Cơ quan thật gửi thư trước, không bao giờ đòi thẻ quà tặng, tiền mã hóa hay chuyển khoản, và không đe dọa bắt giữ qua điện thoại.",
    signs: ["Đe dọa bắt giữ, trục xuất hoặc mất trợ cấp", "Đòi trả tiền ngay", "Đòi thẻ quà tặng, tiền mã hóa hay chuyển khoản"],
    todo: [
      "Cúp máy. Đừng gọi lại số họ đưa.",
      "Tự tìm số thật của cơ quan trên trang web chính thức .gov.",
      "Nói chuyện với người quý vị tin trước khi làm gì.",
    ],
  },
  family: {
    title: "Người thân gặp nạn",
    short: "Cuộc gọi hoặc tin nhắn từ \"cháu\" hay người thân cần tiền gấp và bảo quý vị giữ bí mật.",
    example: { from: "Số lạ", text: "Bà ơi con đây, con đang bị giam và cần giúp. Bà gửi con $2,000 thẻ quà tặng nhé. Đừng nói với mẹ." },
    how: "Kẻ lừa đảo dùng cảm xúc và sự bí mật. Có kẻ còn dùng AI để giả giọng người thân. Họ đòi thẻ quà tặng, tiền mặt qua người giao hàng, hoặc chuyển khoản.",
    signs: ["Chuyện khẩn cấp kèm đòi tiền", "\"Đừng nói với ai\"", "Số mới, hoặc giọng nghe hơi lạ"],
    todo: ["Cúp máy và gọi người thân bằng số quý vị đã có.", "Hỏi một câu chỉ người đó mới biết.", "Thống nhất trước một mật khẩu gia đình."],
  },
  "tech-support": {
    title: "Hỗ trợ kỹ thuật giả",
    short: "Cửa sổ bật lên hoặc cuộc gọi nói máy tính bị virus và đưa số điện thoại để gọi.",
    example: { from: "Cửa sổ trên màn hình", text: "CẢNH BÁO! Máy tính của quý vị bị nhiễm virus. Đừng đóng trang này. Gọi Hỗ trợ Microsoft: 1-844-555-0199." },
    how: "\"Kỹ thuật viên\" bảo quý vị cài ứng dụng như AnyDesk để điều khiển thiết bị, rồi lấy mật khẩu hoặc đòi trả tiền sửa chữa giả.",
    signs: ["Cửa sổ đáng sợ có số điện thoại", "Bảo cài ứng dụng hoặc chia sẻ màn hình", "Đòi trả bằng thẻ quà tặng hay tiền mã hóa"],
    todo: ["Đừng gọi. Đóng trình duyệt hoặc khởi động lại máy.", "Đừng bao giờ để người lạ điều khiển thiết bị.", "Nếu đã cho họ vào, hãy ngắt mạng và tìm trợ giúp."],
  },
  prize: {
    title: "Giải thưởng, xổ số và hoàn tiền",
    short: "Quý vị \"trúng\" tiền hay giải thưởng, nhưng phải trả phí hoặc thuế trước.",
    example: { from: "Trung tâm Giải thưởng", text: "Chúc mừng! Quý vị đã trúng $5,000 trong đợt quay thưởng năm. Trả $50 tiền thuế qua Western Union để nhận giải hôm nay." },
    how: "Giải thưởng thật không bao giờ bắt trả tiền mới được nhận. Trả rồi thì lại có thêm \"phí\", và giải thưởng không bao giờ đến.",
    signs: ["Trúng giải của cuộc thi mình không tham gia", "Phải trả phí hay thuế để nhận tiền", "Hối thúc nhận ngay hôm nay"],
    todo: ["Đừng trả bất cứ khoản nào.", "Đừng đưa thông tin ngân hàng hay thẻ.", "Xóa tin nhắn."],
  },
  romance: {
    title: "Lừa đảo tình cảm và \"nhắn nhầm số\"",
    short: "Một người lạ thân thiện bắt chuyện, tạo lòng tin trong nhiều tuần, rồi xin tiền hoặc rủ đầu tư.",
    example: { from: "+1 (628) 555-0140", text: "Chào, có phải Sam không? Ôi xin lỗi, nhầm số! Nhưng bạn có vẻ dễ thương ghê. Bạn ở đâu vậy?" },
    how: "Kẻ lừa đảo trở thành \"bạn\" hoặc người yêu, thường trong nhiều tuần. Sau đó họ cần tiền gấp, hoặc rủ quý vị \"đầu tư\" tiền mã hóa mà không rút ra được.",
    signs: ["Người lạ trở nên rất thân rất nhanh", "Không bao giờ gặp mặt hay gọi video được", "Nói chuyện đầu tư, tiền mã hóa hay khó khăn tiền bạc"],
    todo: [
      "Đừng bao giờ gửi tiền cho người chưa gặp ngoài đời.",
      "Kể về mối quan hệ này với người thân hoặc bạn bè.",
      "Ngừng trả lời nếu bắt đầu nói đến tiền hay đầu tư.",
    ],
  },
  job: {
    title: "Việc làm giả và trả dư tiền",
    short: "Việc nhẹ lương cao, hoặc người mua \"lỡ\" trả dư rồi xin quý vị gửi lại phần chênh lệch.",
    example: { from: "Phòng Nhân sự", text: "Việc làm tại nhà! Kiếm $500/ngày bằng cách bấm thích video. Nhắn quản lý qua WhatsApp để bắt đầu. Cần đặt cọc nhỏ." },
    how: "Quý vị bị bảo trả tiền đào tạo hay thiết bị, hoặc nhận một tấm séc mà sau đó bị trả về sau khi quý vị đã gửi lại tiền.",
    signs: ["Lương quá cao cho việc dễ", "Phải trả tiền mới được bắt đầu", "Séc nhiều hơn số tiền đáng nhận"],
    todo: ["Đừng bao giờ trả tiền để có việc làm.", "Đừng bao giờ gửi lại tiền dư từ séc hay chuyển khoản.", "Tự tìm hiểu công ty trước khi trả lời."],
  },
};

const tl: Guides = {
  delivery: {
    title: "Pekeng bayad sa delivery at toll",
    short: "Sinasabi ng text na naipit ang package o may hindi bayad na toll, at humihingi ng maliit na bayad.",
    example: { from: "+1 (415) 555-0187", text: "USPS: Naka-hold ang iyong package. Bayaran ang $1.99 redelivery fee sa loob ng 24h: usps-redeliver-help.co" },
    how: "Maliit ang bayad para hindi ka na mag-isip. Papunta ang link sa pekeng site na nagnanakaw ng numero ng card mo, na ginagamit sa mas malalaking singil.",
    signs: ["Link na hindi tunay na website ng kumpanya", "May deadline, tulad ng \"sa loob ng 24 oras\"", "Bayad na hindi mo inaasahan"],
    todo: ["Huwag pindutin ang link.", "I-track ang package sa tunay na app o website na gamit mo na.", "Burahin ang text at i-block ang numero."],
  },
  bank: {
    title: "Alerto mula sa bangko at card",
    short: "Sinasabi ng mensahe na naka-lock ang account mo o may fraud, at pinakukumpirma ang iyong detalye.",
    example: { from: "Chase Alert", text: "Naka-lock ang iyong debit card dahil sa kahina-hinalang aktibidad. Sumagot gamit ang iyong 4-digit PIN para ma-unlock." },
    how: "Nagpapanggap ang scammer na fraud team ng bangko mo. Hinihingi nila ang PIN, one-time code o login mo, saka nila uubusin ang account.",
    signs: ["Humihingi ng PIN, password o code", "Sinasabing naka-lock o isasara ang account", "Pinalilipat ang pera sa \"safe account\""],
    todo: [
      "Huwag ibigay ang PIN o code. Hindi ito hinihingi ng tunay na bangko.",
      "Tawagan ang numero sa likod ng iyong card.",
      "Kung may naibigay ka, tawagan agad ang bangko.",
    ],
  },
  government: {
    title: "Pananakot mula sa \"gobyerno\" at immigration",
    short: "May nagsasabing taga-IRS, Social Security, Medicare, pulis o immigration sila, at magkakaproblema ka kung hindi ka magbabayad.",
    example: { from: "Hindi kilalang tumatawag", text: "Ito ang IRS. Maglalabas ng warrant of arrest laban sa iyo kung hindi ka magbabayad ngayon gamit ang gift card." },
    how: "Pinapabilis ng takot ang pagkilos ng tao. Nagpapadala muna ng sulat ang tunay na ahensya, at hindi sila humihingi ng gift card, crypto o wire, o nananakot ng pag-aresto sa telepono.",
    signs: ["Banta ng pag-aresto, deportasyon o pagkawala ng benepisyo", "Pinababayad agad-agad", "Humihingi ng gift card, crypto o wire"],
    todo: [
      "Ibaba ang tawag. Huwag tawagan ang numerong ibinigay nila.",
      "Ikaw mismo ang maghanap ng tunay na numero sa opisyal na .gov website.",
      "Kausapin muna ang taong pinagkakatiwalaan mo bago kumilos.",
    ],
  },
  family: {
    title: "Kapamilyang nasa gulo",
    short: "Tawag o text mula sa \"apo\" o kamag-anak na nangangailangan agad ng pera at pinalilihim ito sa iyo.",
    example: { from: "Hindi kilalang numero", text: "Lola ako 'to, nakakulong ako at kailangan ko ng tulong. Padalhan mo ako ng $2,000 na gift card. Huwag mong sabihin kay Mama." },
    how: "Ginagamit ng scammer ang damdamin at paglilihim. May ilan pang gumagamit ng AI para gayahin ang boses ng mahal mo sa buhay. Humihingi sila ng gift card, cash sa courier o wire.",
    signs: ["Emergency at paghingi ng pera", "\"Huwag mong sabihin kahit kanino\"", "Bagong numero, o boses na parang may mali"],
    todo: [
      "Ibaba ang tawag at tawagan ang kapamilya sa numerong alam mo na.",
      "Magtanong ng bagay na sila lang ang nakakaalam.",
      "Magkasundo nang maaga sa isang family code word.",
    ],
  },
  "tech-support": {
    title: "Pekeng tech support",
    short: "May pop-up o tawag na nagsasabing may virus ang computer mo at nagbibigay ng numerong tatawagan.",
    example: { from: "Pop-up sa screen", text: "BABALA! Infected ang iyong computer. Huwag isara ang page na ito. Tawagan ang Microsoft Support sa 1-844-555-0199." },
    how: "Ipapa-install sa iyo ng \"technician\" ang app tulad ng AnyDesk para makontrol ang device mo, saka magnanakaw ng password o pababayarin ka sa pekeng repair.",
    signs: ["Nakakatakot na pop-up na may numero ng telepono", "Pinapa-install ng app o pinapa-share ang screen", "Pinababayad sa gift card o crypto"],
    todo: [
      "Huwag tumawag. Isara ang browser o i-restart ang computer.",
      "Huwag hayaang kontrolin ng estranghero ang device mo.",
      "Kung napapasok mo sila, putulin ang internet at humingi ng tulong.",
    ],
  },
  prize: {
    title: "Premyo, lotto at refund",
    short: "\"Nanalo\" ka ng pera o premyo, pero kailangan mo munang magbayad ng fee o buwis.",
    example: { from: "Prize Center", text: "Congratulations! Nanalo ka ng $5,000 sa aming taunang raffle. Magbayad ng $50 na buwis sa Western Union para makuha ang premyo ngayon." },
    how: "Hindi ka pinababayad ng tunay na premyo bago mo ito makuha. Kapag nagbayad ka, may susunod pang \"fee\", at hindi darating ang premyo.",
    signs: ["Premyo sa paligsahang hindi mo sinalihan", "May fee o buwis bago makuha ang pera", "Minamadaling kunin ngayon"],
    todo: ["Huwag magbayad ng kahit ano.", "Huwag ibigay ang detalye ng bangko o card.", "Burahin ang mensahe."],
  },
  romance: {
    title: "Romance at \"wrong number\" na scam",
    short: "Isang mabait na estranghero ang nakikipag-chat, kinukuha ang tiwala mo nang ilang linggo, saka hihingi ng pera o pag-invest.",
    example: { from: "+1 (628) 555-0140", text: "Hi, si Sam ba ito? Ay sorry, wrong number! Pero mukha kang mabait. Taga-saan ka?" },
    how: "Nagiging \"kaibigan\" o karelasyon ang scammer, kadalasan nang ilang linggo. Saka sila mangangailangan ng pera sa emergency, o iimbitahan ka sa crypto \"investment\" na hindi na mawi-withdraw.",
    signs: ["Estrangherong biglang naging malapit", "Hindi kayo makapagkita o makapag-video call", "Usapan tungkol sa investment, crypto o problema sa pera"],
    todo: [
      "Huwag magpadala ng pera sa taong hindi mo pa nakikita nang personal.",
      "Ikuwento ang relasyon sa kapamilya o kaibigan.",
      "Huminto sa pagsagot kapag napag-usapan na ang pera o pag-invest.",
    ],
  },
  job: {
    title: "Pekeng trabaho at sobrang bayad",
    short: "Madaling trabaho na malaki ang sweldo, o mamimiling \"aksidenteng\" nagbayad nang sobra at pinababalik ang sukli.",
    example: { from: "HR Team", text: "Remote job! Kumita ng $500/araw sa pag-like ng videos. I-message ang manager namin sa WhatsApp para magsimula. May maliit na deposit." },
    how: "Pinababayad ka para sa training o kagamitan, o makakatanggap ka ng tseke na tatalbog pagkatapos mong magpadala ng pera pabalik.",
    signs: ["Sweldong sobrang laki para sa madaling trabaho", "Kailangan mong magbayad para magsimula", "Tsekeng mas malaki kaysa sa utang sa iyo"],
    todo: [
      "Huwag magbayad para lang magkatrabaho.",
      "Huwag ibalik ang sobrang pera mula sa tseke o transfer.",
      "Ikaw mismo ang mag-research sa kumpanya bago sumagot.",
    ],
  },
};

export const GUIDES: Record<Language, Guides> = { en, es, zh, vi, tl, hi, fr };
