import { practice as fr } from "../lang/fr";
import { practice as hi } from "../lang/hi";
import type { Language } from "../schema";

export type PracticeItem = {
  from: string;
  text: string;
  scam: boolean;
  clues: string[];
};

const SCAM = [true, false, true, false, true, true, false, true] as const;

export type PracticeRaw = Omit<PracticeItem, "scam">[];
type Raw = PracticeRaw;

const en: Raw = [
  {
    from: "+1 (309) 555-0122",
    text: "E-ZPass: You have an unpaid toll of $6.89. Pay by today to avoid a $50 late fee: ezpass-tollpay.info",
    clues: ["The link isn't the real E-ZPass website.", "A deadline and a late-fee threat rush you.", "Toll agencies send bills by mail to your registered address."],
  },
  {
    from: "Main Street Pharmacy",
    text: "Your prescription is ready for pickup at Main Street Pharmacy. Reply STOP to opt out of texts.",
    clues: ["It doesn't ask for money, codes or personal details.", "There's no link to tap.", "It's something you'd expect if you ordered a refill."],
  },
  {
    from: "Unknown number",
    text: "Hi Grandpa, it's me. I had a car accident and need bail money. Please don't tell Mom. Can you get gift cards?",
    clues: ["A family emergency plus a money request.", "\"Don't tell Mom\" keeps you from checking.", "Gift cards are a scammer's favorite way to be paid."],
  },
  {
    from: "Your bank",
    text: "Did you try a $86.40 purchase at Target? Reply YES or NO. We will never ask for your PIN or passcode.",
    clues: [
      "Banks really do send yes/no fraud checks.",
      "It asks for no codes, no link, and no payment.",
      "If in doubt, call the number on the back of your card.",
    ],
  },
  {
    from: "HR Recruiting",
    text: "Remote job! Earn $500/day liking videos. Message our manager on WhatsApp to start. Small deposit required.",
    clues: ["Pay that's far too high for easy work.", "You have to pay a deposit to start.", "Moving you to WhatsApp avoids normal hiring checks."],
  },
  {
    from: "Medicare Services",
    text: "Your Medicare card will be cancelled. Call now to confirm your Medicare number and bank details.",
    clues: ["Medicare doesn't call or text to cancel your card.", "It asks for your Medicare number and bank details.", "The threat of losing benefits is meant to scare you."],
  },
  {
    from: "Amazon",
    text: "Your package was delivered to your front door. You can see details in the Amazon app.",
    clues: ["No link, no payment, no request.", "It points you to the app you already use.", "It matches something you'd expect after an order."],
  },
  {
    from: "Pop-up on screen",
    text: "WARNING! Your computer is infected. Do not close this page. Call Microsoft Support at 1-844-555-0199.",
    clues: ["Real virus warnings never include a phone number to call.", "\"Do not close this page\" is meant to trap you.", "They'll ask to control your computer once you call."],
  },
];

const es: Raw = [
  {
    from: "+1 (309) 555-0122",
    text: "E-ZPass: Tiene un peaje sin pagar de $6.89. Pague hoy para evitar un recargo de $50: ezpass-tollpay.info",
    clues: ["El enlace no es el sitio real de E-ZPass.", "Un plazo y una amenaza de recargo le apuran.", "Las agencias de peaje envían facturas por correo a su dirección registrada."],
  },
  {
    from: "Farmacia Main Street",
    text: "Su receta está lista para recoger en Farmacia Main Street. Responda STOP para dejar de recibir textos.",
    clues: ["No pide dinero, códigos ni datos personales.", "No hay ningún enlace.", "Es algo que esperaría si pidió un resurtido."],
  },
  {
    from: "Número desconocido",
    text: "Abuelo, soy yo. Tuve un accidente y necesito dinero para la fianza. Por favor no le digas a mamá. ¿Puedes comprar tarjetas de regalo?",
    clues: ["Una emergencia familiar más un pedido de dinero.", "\"No le digas a mamá\" evita que usted lo verifique.", "Las tarjetas de regalo son la forma de pago favorita de los estafadores."],
  },
  {
    from: "Su banco",
    text: "¿Intentó una compra de $86.40 en Target? Responda SÍ o NO. Nunca le pediremos su PIN ni su clave.",
    clues: ["Los bancos sí envían verificaciones de fraude de sí o no.", "No pide códigos, enlaces ni pagos.", "Si tiene dudas, llame al número detrás de su tarjeta."],
  },
  {
    from: "Reclutamiento RR. HH.",
    text: "¡Trabajo desde casa! Gane $500 al día dando \"me gusta\" a videos. Escriba a nuestro gerente por WhatsApp. Se requiere un pequeño depósito.",
    clues: ["Un sueldo demasiado alto para un trabajo fácil.", "Tiene que pagar un depósito para empezar.", "Llevarle a WhatsApp evita los controles normales de contratación."],
  },
  {
    from: "Servicios de Medicare",
    text: "Su tarjeta de Medicare será cancelada. Llame ahora para confirmar su número de Medicare y sus datos bancarios.",
    clues: ["Medicare no llama ni manda textos para cancelar su tarjeta.", "Pide su número de Medicare y datos bancarios.", "La amenaza de perder beneficios busca asustarle."],
  },
  {
    from: "Amazon",
    text: "Su paquete fue entregado en la puerta de su casa. Puede ver los detalles en la aplicación de Amazon.",
    clues: ["Sin enlace, sin pago, sin pedidos.", "Le dirige a la aplicación que ya usa.", "Coincide con algo que esperaría después de un pedido."],
  },
  {
    from: "Ventana en pantalla",
    text: "¡ADVERTENCIA! Su computadora está infectada. No cierre esta página. Llame a Soporte de Microsoft al 1-844-555-0199.",
    clues: ["Los avisos reales de virus nunca incluyen un teléfono para llamar.", "\"No cierre esta página\" busca atraparle.", "Cuando llame, pedirán controlar su computadora."],
  },
];

const zh: Raw = [
  {
    from: "+1 (309) 555-0122",
    text: "E-ZPass：您有一笔 $6.89 的过路费未付。请今天支付，以免产生 $50 滞纳金：ezpass-tollpay.info",
    clues: ["链接不是 E-ZPass 的真实网站。", "期限和滞纳金威胁在催促您。", "收费机构会把账单寄到您登记的地址。"],
  },
  {
    from: "Main Street 药房",
    text: "您的处方药已可在 Main Street 药房领取。回复 STOP 退订短信。",
    clues: ["没有要钱、验证码或个人资料。", "没有要点的链接。", "如果您续过药，这是意料之中的信息。"],
  },
  {
    from: "未知号码",
    text: "爷爷，是我。我出了车祸，需要保释金。请别告诉妈妈。你能买些礼品卡吗？",
    clues: ["家人出事加上要钱。", "\"别告诉妈妈\"是为了让您无法核实。", "礼品卡是骗子最爱的收款方式。"],
  },
  {
    from: "您的银行",
    text: "您是否在 Target 尝试消费 $86.40？请回复 YES 或 NO。我们绝不会索要您的 PIN 码或密码。",
    clues: ["银行确实会发送\"是/否\"的盗刷确认。", "没有要验证码、没有链接、没有要付款。", "如有疑问，拨打您卡背面的电话。"],
  },
  {
    from: "人事招聘",
    text: "远程工作！给视频点赞每天赚 $500。在 WhatsApp 上联系我们的经理开始。需要少量押金。",
    clues: ["轻松工作却给太高的报酬。", "要先交押金才能开始。", "转到 WhatsApp 是为了避开正常的招聘核查。"],
  },
  {
    from: "Medicare 服务",
    text: "您的 Medicare 卡将被取消。请立即来电确认您的 Medicare 号码和银行资料。",
    clues: ["Medicare 不会打电话或发短信来取消您的卡。", "它索要您的 Medicare 号码和银行资料。", "用失去福利来吓唬您。"],
  },
  {
    from: "Amazon",
    text: "您的包裹已送到家门口。您可以在 Amazon 应用中查看详情。",
    clues: ["没有链接、没有付款、没有要求。", "它让您去用您本来就在用的应用。", "下单后收到这样的信息是正常的。"],
  },
  {
    from: "屏幕弹窗",
    text: "警告！您的电脑已被感染。不要关闭此页面。请拨打微软支持 1-844-555-0199。",
    clues: ["真正的病毒警告从不附带电话号码。", "\"不要关闭此页面\"是为了困住您。", "您一打电话，他们就会要求控制您的电脑。"],
  },
];

const vi: Raw = [
  {
    from: "+1 (309) 555-0122",
    text: "E-ZPass: Quý vị còn nợ phí cầu đường $6.89. Hãy trả trong hôm nay để tránh phí trễ hạn $50: ezpass-tollpay.info",
    clues: ["Đường link không phải trang web thật của E-ZPass.", "Hạn chót và lời dọa phạt trễ hối thúc quý vị.", "Cơ quan thu phí gửi hóa đơn qua bưu điện đến địa chỉ đã đăng ký."],
  },
  {
    from: "Nhà thuốc Main Street",
    text: "Thuốc theo toa của quý vị đã sẵn sàng tại Nhà thuốc Main Street. Trả lời STOP để ngừng nhận tin.",
    clues: ["Không đòi tiền, mã số hay thông tin cá nhân.", "Không có link để bấm.", "Là tin quý vị sẽ chờ nếu đã đặt thêm thuốc."],
  },
  {
    from: "Số lạ",
    text: "Ông ơi, con đây. Con bị tai nạn xe và cần tiền bảo lãnh. Đừng nói với mẹ nhé. Ông mua giúp con thẻ quà tặng được không?",
    clues: ["Chuyện khẩn cấp trong gia đình kèm đòi tiền.", "\"Đừng nói với mẹ\" để quý vị không kiểm chứng được.", "Thẻ quà tặng là cách trả tiền kẻ lừa đảo thích nhất."],
  },
  {
    from: "Ngân hàng của quý vị",
    text: "Quý vị có thực hiện giao dịch $86.40 tại Target không? Trả lời YES hoặc NO. Chúng tôi không bao giờ hỏi mã PIN hay mật mã.",
    clues: ["Ngân hàng thật sự có gửi tin xác nhận có/không.", "Không hỏi mã số, không có link, không đòi trả tiền.", "Nếu còn nghi ngờ, gọi số ở mặt sau thẻ."],
  },
  {
    from: "Tuyển dụng",
    text: "Việc làm tại nhà! Kiếm $500/ngày bằng cách bấm thích video. Nhắn quản lý qua WhatsApp để bắt đầu. Cần đặt cọc nhỏ.",
    clues: ["Lương quá cao cho việc dễ.", "Phải đặt cọc mới được bắt đầu.", "Chuyển sang WhatsApp để tránh các bước tuyển dụng bình thường."],
  },
  {
    from: "Dịch vụ Medicare",
    text: "Thẻ Medicare của quý vị sẽ bị hủy. Hãy gọi ngay để xác nhận số Medicare và thông tin ngân hàng.",
    clues: ["Medicare không gọi hay nhắn tin để hủy thẻ.", "Nó đòi số Medicare và thông tin ngân hàng.", "Dọa mất quyền lợi để làm quý vị sợ."],
  },
  {
    from: "Amazon",
    text: "Gói hàng của quý vị đã được giao đến trước cửa. Quý vị có thể xem chi tiết trong ứng dụng Amazon.",
    clues: ["Không link, không trả tiền, không yêu cầu gì.", "Chỉ quý vị đến ứng dụng quý vị vẫn dùng.", "Đúng với điều quý vị chờ sau khi đặt hàng."],
  },
  {
    from: "Cửa sổ trên màn hình",
    text: "CẢNH BÁO! Máy tính của quý vị bị nhiễm virus. Đừng đóng trang này. Gọi Hỗ trợ Microsoft: 1-844-555-0199.",
    clues: ["Cảnh báo virus thật không bao giờ kèm số điện thoại.", "\"Đừng đóng trang này\" là để giữ chân quý vị.", "Khi quý vị gọi, họ sẽ đòi điều khiển máy tính."],
  },
];

const tl: Raw = [
  {
    from: "+1 (309) 555-0122",
    text: "E-ZPass: May hindi ka pa nababayarang toll na $6.89. Magbayad ngayong araw para iwas $50 late fee: ezpass-tollpay.info",
    clues: ["Hindi tunay na website ng E-ZPass ang link.", "Minamadali ka ng deadline at banta ng late fee.", "Nagpapadala ng bill sa koreo ang toll agency sa nakarehistrong address mo."],
  },
  {
    from: "Main Street Pharmacy",
    text: "Handa nang kunin ang iyong reseta sa Main Street Pharmacy. Sumagot ng STOP para huminto sa mga text.",
    clues: ["Hindi ito humihingi ng pera, code o personal na detalye.", "Walang link na pipindutin.", "Inaasahan mo ito kung nag-order ka ng refill."],
  },
  {
    from: "Hindi kilalang numero",
    text: "Lolo, ako 'to. Naaksidente ako at kailangan ko ng pampiyansa. Huwag mong sabihin kay Mama. Makakabili ka ba ng gift card?",
    clues: ["Emergency sa pamilya at paghingi ng pera.", "Ang \"Huwag mong sabihin kay Mama\" ay para hindi mo ito ma-check.", "Gift card ang paboritong paraan ng bayad ng scammer."],
  },
  {
    from: "Ang iyong bangko",
    text: "Sinubukan mo bang bumili ng $86.40 sa Target? Sumagot ng YES o NO. Hindi namin hihingin ang iyong PIN o passcode.",
    clues: ["Talagang nagpapadala ang bangko ng yes/no na fraud check.", "Walang hinihinging code, walang link, walang bayad.", "Kung may duda, tawagan ang numero sa likod ng card."],
  },
  {
    from: "HR Recruiting",
    text: "Remote job! Kumita ng $500/araw sa pag-like ng videos. I-message ang manager namin sa WhatsApp para magsimula. May maliit na deposit.",
    clues: ["Sobrang laki ng sweldo para sa madaling trabaho.", "Kailangan mong magbayad ng deposit para magsimula.", "Inililipat ka sa WhatsApp para iwasan ang normal na proseso ng pag-hire."],
  },
  {
    from: "Medicare Services",
    text: "Kakanselahin ang iyong Medicare card. Tumawag ngayon para kumpirmahin ang iyong Medicare number at detalye ng bangko.",
    clues: ["Hindi tumatawag o nagte-text ang Medicare para kanselahin ang card.", "Hinihingi ang Medicare number at detalye ng bangko mo.", "Tinatakot ka sa pagkawala ng benepisyo."],
  },
  {
    from: "Amazon",
    text: "Naihatid na ang iyong package sa harap ng pinto. Makikita ang detalye sa Amazon app.",
    clues: ["Walang link, walang bayad, walang hinihingi.", "Itinuturo ka sa app na gamit mo na.", "Tugma sa inaasahan mo pagkatapos mag-order."],
  },
  {
    from: "Pop-up sa screen",
    text: "BABALA! Infected ang iyong computer. Huwag isara ang page na ito. Tawagan ang Microsoft Support sa 1-844-555-0199.",
    clues: ["Hindi kailanman may numerong tatawagan ang tunay na babala ng virus.", "Ang \"Huwag isara ang page\" ay para ma-trap ka.", "Kapag tumawag ka, hihingin nilang makontrol ang computer mo."],
  },
];

function build(raw: Raw): PracticeItem[] {
  return raw.map((r, i) => ({ ...r, scam: SCAM[i] }));
}

export const PRACTICE: Record<Language, PracticeItem[]> = {
  en: build(en),
  es: build(es),
  zh: build(zh),
  vi: build(vi),
  tl: build(tl),
  hi: build(hi),
  fr: build(fr),
};
