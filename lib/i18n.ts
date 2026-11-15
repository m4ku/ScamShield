import { strings as fr } from "./lang/fr";
import { strings as hi } from "./lang/hi";
import type { Language, SignType, Verdict } from "./schema";

export const LANGUAGE_LABELS: Record<Language, string> = {
  en: "English",
  es: "Español",
  zh: "中文",
  vi: "Tiếng Việt",
  tl: "Tagalog",
  hi: "हिन्दी",
  fr: "Français",
};

/** HTML lang attribute for each language. */
export const HTML_LANG: Record<Language, string> = {
  en: "en",
  es: "es",
  zh: "zh-Hans",
  vi: "vi",
  tl: "tl",
  hi: "hi",
  fr: "fr",
};

export type HelpTopic =
  | "clicked"
  | "malware"
  | "password"
  | "card"
  | "money"
  | "giftcard"
  | "crypto"
  | "check"
  | "meetup"
  | "ssn"
  | "access"
  | "threats";
export const HELP_TOPICS: HelpTopic[] = [
  "clicked",
  "malware",
  "password",
  "card",
  "money",
  "giftcard",
  "crypto",
  "check",
  "meetup",
  "ssn",
  "access",
  "threats",
];

export type Strings = {
  languageLabel: string;
  homeTitle: string;
  homeIntro: string;
  tabs: { text: string; image: string; call: string };
  textLabel: string;
  textPlaceholder: string;
  callLabel: string;
  callPlaceholder: string;
  imageChoose: string;
  imageChange: string;
  imageHint: string;
  imageAlt: string;
  checkButton: string;
  privacy: string;
  checking: string;
  errors: {
    empty: string;
    tooLong: string;
    imageMissing: string;
    imageBad: string;
    unreadable: string;
    busy: string;
    failed: string;
    offline: string;
  };
  verdicts: Record<Verdict, { title: string; sub: string }>;
  summaryLabel: string;
  messageHeading: string;
  signsHeading: string;
  noSignsNote: string;
  signs: Record<SignType, { label: string; tip: string }>;
  stepsHeading: string;
  steps: Record<Verdict, string[]>;
  /** Always shown, whatever the verdict. */
  trustedStep: string;
  shareButton: string;
  shared: string;
  shareIntro: string;
  shareSigns: string;
  shareCheckedWith: string;
  clickedButton: string;
  againButton: string;
  backButton: string;
  helpTitle: string;
  helpIntro: string;
  helpQuestion: string;
  helpTopics: Record<HelpTopic, { label: string; steps: string[] }>;
  reportHeading: string;
  reportSteps: string[];
  helpOpenAnother: string;
  footer: string;
};

const en: Strings = {
  languageLabel: "Language",
  homeTitle: "Check a message",
  homeIntro: "Not sure about a text, email, letter or call? Check it here before you reply, click or pay.",
  tabs: { text: "Paste text", image: "Add a screenshot", call: "Describe a call" },
  textLabel: "The message",
  textPlaceholder: "Paste or type the message here",
  callLabel: "What happened on the call",
  callPlaceholder: "Who did they say they were? What did they ask you to do?",
  imageChoose: "Choose a screenshot or photo",
  imageChange: "Choose a different picture",
  imageHint: "A screenshot of a text or email, or a photo of a letter.",
  imageAlt: "The picture you chose",
  checkButton: "Check this message",
  privacy: "We don't save your messages.",
  checking: "Reading your message…",
  errors: {
    empty: "Paste or type the message first.",
    tooLong: "That's too long. Paste just the message, up to 5,000 characters.",
    imageMissing: "Choose a screenshot or photo first.",
    imageBad: "We couldn't open that picture. Try a different screenshot or photo.",
    unreadable: "We couldn't read a message in that picture. Try a clearer photo, or paste the words instead.",
    busy: "Too many people are checking right now. Please try again in a few minutes.",
    failed: "Something went wrong on our side. Please try again.",
    offline: "We couldn't connect. Check your internet and try again.",
  },
  verdicts: {
    likely_scam: { title: "Very likely a scam", sub: "Don't reply, click or pay." },
    careful: { title: "Be careful", sub: "Check this another way before you act." },
    no_signs: {
      title: "No common warning signs found",
      sub: "If it asks for money or details, still check with the official number.",
    },
  },
  summaryLabel: "What it wants you to do:",
  messageHeading: "The message",
  signsHeading: "Warning signs we found",
  noSignsNote: "We didn't find any of the usual warning signs. Scams change all the time, so stay careful.",
  signs: {
    urgency: { label: "Rushing you", tip: "Scammers rush you so you don't stop to think." },
    threat: { label: "Threats or fear", tip: "Real agencies don't threaten arrest or fines by text, email or phone." },
    unusual_payment: {
      label: "Strange way to pay",
      tip: "Surprise fees and odd ways to pay, like gift cards, crypto or wire transfers, are common scam tricks.",
    },
    secrets: { label: "Asks for private details", tip: "Real banks never ask for your PIN, password or codes." },
    suspicious_link: { label: "Suspicious link", tip: "The link doesn't go to the real company's website." },
    impersonation: {
      label: "Pretends to be someone you trust",
      tip: "Contact them yourself using a number you already trust.",
    },
    too_good: { label: "Too good to be true", tip: "You can't win a contest you didn't enter." },
    secrecy: { label: "Asks you to keep it secret", tip: "Scammers want you alone. Talk to someone you trust." },
    remote_access: { label: "Wants control of your device", tip: "Never let a stranger control your computer or phone." },
    mismatch: { label: "Something doesn't match", tip: "Who it says it's from isn't who really sent it." },
    unexpected_contact: {
      label: "A stranger reaching out",
      tip: "Friendly messages from strangers can turn into requests for money later.",
    },
  },
  stepsHeading: "What to do now",
  steps: {
    likely_scam: [
      "Don't reply, click any link, or call any number in the message.",
      "Don't pay, and don't send gift cards, codes or personal details.",
      "Block the sender and delete the message.",
    ],
    careful: [
      "Don't click links or call numbers in the message yet.",
      "Ask a family member or friend to look at it with you.",
    ],
    no_signs: ["Never share a password, PIN or code with someone who contacts you."],
  },
  trustedStep:
    "Contact the organization using a number or website you already trust, like the one on your card, bill or their official website. Not the one in this message.",
  shareButton: "Share with family",
  shared: "Copied. You can paste it into a text or email.",
  shareIntro: "I checked a message with ScamShield.",
  shareSigns: "Warning signs:",
  shareCheckedWith: "Check one yourself:",
  clickedButton: "I already clicked, replied or paid",
  againButton: "Check another message",
  backButton: "Back",
  helpTitle: "Already clicked, replied or paid?",
  helpIntro: "Don't panic, and don't feel ashamed. Scammers fool careful people every day. Acting quickly helps.",
  helpQuestion: "What happened?",
  helpTopics: {
    clicked: {
      label: "I clicked a link or replied",
      steps: [
        "Close the page. Don't type anything into it.",
        "Don't reply again. Block the sender.",
        "If you typed a password, card number or other details, choose that option below too.",
      ],
    },
    password: {
      label: "I gave a password or code",
      steps: [
        "Change that password now, using the real app or website, not the link you were sent.",
        "If you use the same password anywhere else, change it there too.",
        "Turn on 2-step sign-in if the account offers it.",
      ],
    },
    card: {
      label: "I gave card or bank details",
      steps: [
        "Call your bank now, using the number on the back of your card.",
        "Ask them to block the card and send a new one.",
        "Check your statements for charges you don't know.",
      ],
    },
    money: {
      label: "I sent money (bank, wire, Zelle, Cash App)",
      steps: [
        "Call your bank or the payment app right away. Ask them to stop or reverse the payment.",
        "For a wire transfer, ask for a \"wire recall.\"",
        "Don't send more money, even if they promise to pay you back.",
      ],
    },
    giftcard: {
      label: "I paid with gift cards",
      steps: [
        "Call the gift card company now, using the number on the back of the card. Say it was a scam.",
        "Keep the cards and the receipts.",
        "Don't buy more cards, whatever they tell you.",
      ],
    },
    ssn: {
      label: "I gave my Social Security number or a photo of my ID",
      steps: [
        "Go to IdentityTheft.gov for a step-by-step recovery plan.",
        "Freeze your credit for free with Equifax, Experian and TransUnion.",
        "Watch your mail and bank accounts for anything you don't recognize.",
      ],
    },
    access: {
      label: "I let them into my computer or phone",
      steps: [
        "Turn off Wi-Fi or unplug the internet now.",
        "Remove any app they asked you to install.",
        "From a different device, change your email and bank passwords.",
        "Have a trusted person or repair shop check the device.",
      ],
    },
    malware: {
      label: "I downloaded a file or app they sent",
      steps: [
        "Don't open it again. Delete the file or uninstall the app.",
        "Turn off Wi-Fi, then run your device's built-in security check (Windows Security on a computer; update your phone).",
        "From a different device, change your email and bank passwords.",
        "Ask a trusted person or repair shop to check the device.",
      ],
    },
    meetup: {
      label: "Someone is coming to me, or I met them in person",
      steps: [
        "If someone is on the way to pick up cash, gold, cards or a package, don't hand anything over. Real banks, police and government agencies never send couriers.",
        "If you feel unsafe, call 911. Otherwise call your local police and tell them a courier is coming.",
        "If you already handed something over, write down what they looked like, their car and the time, and call the police right away.",
        "Never meet someone from online alone. Meet in a busy public place and tell someone where you'll be.",
      ],
    },
    crypto: {
      label: "I sent cryptocurrency or used a Bitcoin ATM",
      steps: [
        "Contact the crypto exchange or the Bitcoin ATM company right away, using the number on the machine or the receipt.",
        "Keep the receipt, the wallet address and any transaction ID.",
        "Report it to the FBI at ic3.gov and to ReportFraud.ftc.gov.",
        "Beware of anyone who offers to \"recover\" your money for a fee. That is a second scam.",
      ],
    },
    check: {
      label: "I deposited a check a stranger sent me",
      steps: [
        "Don't spend the money, and don't send any of it back, even if they say it was a mistake.",
        "Tell your bank now that you think the check is fake. A check can bounce days or weeks later.",
        "Stop talking to the person who sent it.",
      ],
    },
    threats: {
      label: "They're threatening or blackmailing me",
      steps: [
        "Stop replying, and don't pay. Paying usually leads to more demands.",
        "Save the messages with screenshots, then block the sender.",
        "If you are in danger, call 911. Report online threats at ic3.gov.",
        "Talk to someone you trust. Being targeted is not your fault.",
      ],
    },
  },
  reportHeading: "Report it",
  reportSteps: [
    "Tell your bank if money or card details were involved.",
    "Report it to the FTC at ReportFraud.ftc.gov.",
    "If you lost money, report it to your local police too.",
    "Free help line: AARP Fraud Watch, 877-908-3360.",
    "Tell someone you trust. You don't have to handle this alone.",
  ],
  helpOpenAnother: "Choose another",
  footer: "ScamShield doesn't save what you check.",
};

const es: Strings = {
  languageLabel: "Idioma",
  homeTitle: "Revisar un mensaje",
  homeIntro:
    "¿No está seguro de un texto, correo, carta o llamada? Revíselo aquí antes de responder, hacer clic o pagar.",
  tabs: { text: "Pegar texto", image: "Agregar una captura", call: "Describir una llamada" },
  textLabel: "El mensaje",
  textPlaceholder: "Pegue o escriba el mensaje aquí",
  callLabel: "Qué pasó en la llamada",
  callPlaceholder: "¿Quién dijeron que eran? ¿Qué le pidieron que hiciera?",
  imageChoose: "Elegir una captura o foto",
  imageChange: "Elegir otra imagen",
  imageHint: "Una captura de pantalla de un texto o correo, o una foto de una carta.",
  imageAlt: "La imagen que eligió",
  checkButton: "Revisar este mensaje",
  privacy: "No guardamos sus mensajes.",
  checking: "Leyendo su mensaje…",
  errors: {
    empty: "Primero pegue o escriba el mensaje.",
    tooLong: "Es demasiado largo. Pegue solo el mensaje, hasta 5,000 caracteres.",
    imageMissing: "Primero elija una captura o foto.",
    imageBad: "No pudimos abrir esa imagen. Pruebe con otra captura o foto.",
    unreadable: "No pudimos leer un mensaje en esa imagen. Pruebe con una foto más clara o pegue el texto.",
    busy: "Hay muchas personas revisando ahora. Inténtelo de nuevo en unos minutos.",
    failed: "Algo salió mal de nuestro lado. Inténtelo de nuevo.",
    offline: "No pudimos conectarnos. Revise su internet e inténtelo de nuevo.",
  },
  verdicts: {
    likely_scam: { title: "Muy probablemente es una estafa", sub: "No responda, no haga clic y no pague." },
    careful: { title: "Tenga cuidado", sub: "Verifíquelo de otra forma antes de actuar." },
    no_signs: {
      title: "No encontramos señales comunes de alerta",
      sub: "Si pide dinero o datos, verifíquelo igual con el número oficial.",
    },
  },
  summaryLabel: "Lo que le pide hacer:",
  messageHeading: "El mensaje",
  signsHeading: "Señales de alerta que encontramos",
  noSignsNote:
    "No encontramos ninguna de las señales de alerta comunes. Las estafas cambian todo el tiempo, así que siga con cuidado.",
  signs: {
    urgency: { label: "Le apura", tip: "Los estafadores le apuran para que no se detenga a pensar." },
    threat: {
      label: "Amenazas o miedo",
      tip: "Las agencias reales no amenazan con arresto o multas por texto, correo o teléfono.",
    },
    unusual_payment: {
      label: "Forma de pago extraña",
      tip: "Los cobros inesperados y las formas de pago raras, como tarjetas de regalo, criptomonedas o giros, son trucos comunes de estafa.",
    },
    secrets: {
      label: "Pide datos privados",
      tip: "Los bancos reales nunca piden su PIN, contraseña o códigos.",
    },
    suspicious_link: { label: "Enlace sospechoso", tip: "El enlace no lleva al sitio web real de la empresa." },
    impersonation: {
      label: "Se hace pasar por alguien de confianza",
      tip: "Comuníquese usted mismo usando un número en el que ya confía.",
    },
    too_good: { label: "Demasiado bueno para ser verdad", tip: "No puede ganar un concurso en el que no participó." },
    secrecy: {
      label: "Le pide guardar el secreto",
      tip: "Los estafadores quieren que esté solo. Hable con alguien de confianza.",
    },
    remote_access: {
      label: "Quiere controlar su aparato",
      tip: "Nunca deje que un desconocido controle su computadora o teléfono.",
    },
    mismatch: { label: "Algo no coincide", tip: "Quien dice enviarlo no es quien realmente lo envió." },
    unexpected_contact: {
      label: "Un desconocido le escribe",
      tip: "Los mensajes amables de desconocidos pueden terminar en pedidos de dinero.",
    },
  },
  stepsHeading: "Qué hacer ahora",
  steps: {
    likely_scam: [
      "No responda, no haga clic en enlaces y no llame a números del mensaje.",
      "No pague ni envíe tarjetas de regalo, códigos o datos personales.",
      "Bloquee al remitente y borre el mensaje.",
    ],
    careful: [
      "Todavía no haga clic en enlaces ni llame a números del mensaje.",
      "Pida a un familiar o amigo que lo revise con usted.",
    ],
    no_signs: ["Nunca comparta una contraseña, PIN o código con alguien que le contacte."],
  },
  trustedStep:
    "Comuníquese con la organización usando un número o sitio web en el que ya confía, como el de su tarjeta, su factura o su sitio oficial. No el de este mensaje.",
  shareButton: "Compartir con la familia",
  shared: "Copiado. Puede pegarlo en un texto o correo.",
  shareIntro: "Revisé un mensaje con ScamShield.",
  shareSigns: "Señales de alerta:",
  shareCheckedWith: "Revise uno usted también:",
  clickedButton: "Ya hice clic, respondí o pagué",
  againButton: "Revisar otro mensaje",
  backButton: "Volver",
  helpTitle: "¿Ya hizo clic, respondió o pagó?",
  helpIntro:
    "No se asuste ni sienta vergüenza. Los estafadores engañan a personas cuidadosas todos los días. Actuar rápido ayuda.",
  helpQuestion: "¿Qué pasó?",
  helpTopics: {
    clicked: {
      label: "Hice clic en un enlace o respondí",
      steps: [
        "Cierre la página. No escriba nada en ella.",
        "No vuelva a responder. Bloquee al remitente.",
        "Si escribió una contraseña, número de tarjeta u otros datos, elija también esa opción abajo.",
      ],
    },
    password: {
      label: "Di una contraseña o código",
      steps: [
        "Cambie esa contraseña ahora, desde la aplicación o sitio web real, no desde el enlace que le enviaron.",
        "Si usa la misma contraseña en otro lugar, cámbiela allí también.",
        "Active la verificación en dos pasos si la cuenta la ofrece.",
      ],
    },
    card: {
      label: "Di datos de mi tarjeta o banco",
      steps: [
        "Llame a su banco ahora, al número que está detrás de su tarjeta.",
        "Pida que bloqueen la tarjeta y le envíen una nueva.",
        "Revise sus estados de cuenta por cargos que no conoce.",
      ],
    },
    money: {
      label: "Envié dinero (banco, giro, Zelle, Cash App)",
      steps: [
        "Llame de inmediato a su banco o a la aplicación de pago. Pida que detengan o reviertan el pago.",
        "Si fue una transferencia bancaria (wire), pida un \"wire recall\".",
        "No envíe más dinero, aunque le prometan devolvérselo.",
      ],
    },
    giftcard: {
      label: "Pagué con tarjetas de regalo",
      steps: [
        "Llame ahora a la empresa de la tarjeta, al número que está detrás de la tarjeta. Diga que fue una estafa.",
        "Guarde las tarjetas y los recibos.",
        "No compre más tarjetas, le digan lo que le digan.",
      ],
    },
    ssn: {
      label: "Di mi número de Seguro Social o una foto de mi identificación",
      steps: [
        "Visite IdentityTheft.gov (también en español) para un plan de recuperación paso a paso.",
        "Congele su crédito gratis con Equifax, Experian y TransUnion.",
        "Revise su correo y sus cuentas por cualquier cosa que no reconozca.",
      ],
    },
    access: {
      label: "Les di acceso a mi computadora o teléfono",
      steps: [
        "Apague el Wi-Fi o desconecte el internet ahora.",
        "Borre cualquier aplicación que le pidieron instalar.",
        "Desde otro aparato, cambie las contraseñas de su correo y su banco.",
        "Pida a una persona de confianza o a un taller que revise el aparato.",
      ],
    },
    malware: {
      label: "Descargué un archivo o aplicación que me enviaron",
      steps: [
        "No lo vuelva a abrir. Borre el archivo o desinstale la aplicación.",
        "Apague el Wi-Fi y use la revisión de seguridad de su aparato (Seguridad de Windows en la computadora; actualice su teléfono).",
        "Desde otro aparato, cambie las contraseñas de su correo y su banco.",
        "Pida a una persona de confianza o a un taller que revise el aparato.",
      ],
    },
    meetup: {
      label: "Alguien viene a verme, o me reuní con la persona",
      steps: [
        "Si alguien viene a recoger efectivo, oro, tarjetas o un paquete, no entregue nada. Los bancos, la policía y el gobierno nunca envían mensajeros.",
        "Si se siente en peligro, llame al 911. Si no, llame a la policía local y avise que viene un mensajero.",
        "Si ya entregó algo, anote cómo era la persona, su carro y la hora, y llame a la policía de inmediato.",
        "Nunca se reúna a solas con alguien que conoció en internet. Hágalo en un lugar público y concurrido, y avise a alguien.",
      ],
    },
    crypto: {
      label: "Envié criptomonedas o usé un cajero de Bitcoin",
      steps: [
        "Comuníquese de inmediato con la plataforma de criptomonedas o la empresa del cajero de Bitcoin, al número que aparece en la máquina o el recibo.",
        "Guarde el recibo, la dirección de la billetera y cualquier número de transacción.",
        "Repórtelo al FBI en ic3.gov y en ReportaFraude.ftc.gov.",
        "Cuidado con quien ofrezca \"recuperar\" su dinero a cambio de un pago. Es otra estafa.",
      ],
    },
    check: {
      label: "Deposité un cheque que me envió un desconocido",
      steps: [
        "No gaste el dinero ni devuelva nada, aunque le digan que fue un error.",
        "Avise ahora a su banco que cree que el cheque es falso. Un cheque puede rebotar días o semanas después.",
        "Deje de hablar con la persona que lo envió.",
      ],
    },
    threats: {
      label: "Me están amenazando o chantajeando",
      steps: [
        "Deje de responder y no pague. Pagar suele traer más exigencias.",
        "Guarde los mensajes con capturas de pantalla y luego bloquee al remitente.",
        "Si está en peligro, llame al 911. Reporte las amenazas en línea en ic3.gov.",
        "Hable con alguien de confianza. Que le hayan elegido como blanco no es su culpa.",
      ],
    },
  },
  reportHeading: "Repórtelo",
  reportSteps: [
    "Avise a su banco si hubo dinero o datos de tarjeta de por medio.",
    "Repórtelo a la FTC en ReportaFraude.ftc.gov.",
    "Si perdió dinero, repórtelo también a la policía local.",
    "Línea de ayuda gratis: AARP Fraud Watch, 877-908-3360.",
    "Cuénteselo a alguien de confianza. No tiene que enfrentarlo solo.",
  ],
  helpOpenAnother: "Elegir otra",
  footer: "ScamShield no guarda lo que usted revisa.",
};

const zh: Strings = {
  languageLabel: "语言",
  homeTitle: "检查一条信息",
  homeIntro: "不确定一条短信、邮件、信件或电话是否可信？在回复、点击或付款之前，先在这里检查一下。",
  tabs: { text: "粘贴文字", image: "添加截图", call: "描述来电" },
  textLabel: "信息内容",
  textPlaceholder: "在这里粘贴或输入信息",
  callLabel: "电话里发生了什么",
  callPlaceholder: "对方说自己是谁？要求您做什么？",
  imageChoose: "选择截图或照片",
  imageChange: "换一张图片",
  imageHint: "短信或邮件的截图，或信件的照片。",
  imageAlt: "您选择的图片",
  checkButton: "检查这条信息",
  privacy: "我们不会保存您的信息。",
  checking: "正在阅读您的信息…",
  errors: {
    empty: "请先粘贴或输入信息。",
    tooLong: "内容太长了。请只粘贴信息本身，最多 5,000 个字符。",
    imageMissing: "请先选择截图或照片。",
    imageBad: "无法打开这张图片。请换一张截图或照片。",
    unreadable: "无法从这张图片中读出信息。请换一张更清楚的照片，或直接粘贴文字。",
    busy: "现在检查的人太多了。请过几分钟再试。",
    failed: "我们这边出了问题。请再试一次。",
    offline: "无法连接。请检查网络后再试。",
  },
  verdicts: {
    likely_scam: { title: "很可能是诈骗", sub: "不要回复、不要点击、不要付款。" },
    careful: { title: "请小心", sub: "行动之前，先用别的方式核实。" },
    no_signs: { title: "没有发现常见的警告信号", sub: "如果它要钱或要个人资料，仍请拨打官方电话核实。" },
  },
  summaryLabel: "它要您做的事：",
  messageHeading: "信息内容",
  signsHeading: "我们发现的警告信号",
  noSignsNote: "我们没有发现常见的警告信号。诈骗手法一直在变，请继续保持警惕。",
  signs: {
    urgency: { label: "催促您", tip: "骗子催促您，是为了让您来不及思考。" },
    threat: { label: "威胁或恐吓", tip: "真正的政府机构不会通过短信、邮件或电话威胁逮捕或罚款。" },
    unusual_payment: {
      label: "奇怪的付款方式",
      tip: "意外的收费，以及礼品卡、加密货币、电汇等奇怪的付款方式，都是常见的诈骗手法。",
    },
    secrets: { label: "索要私人资料", tip: "真正的银行从不索要您的密码、PIN 码或验证码。" },
    suspicious_link: { label: "可疑链接", tip: "这个链接不是通往该公司的真实网站。" },
    impersonation: { label: "冒充您信任的人或机构", tip: "请用您本来就信任的电话号码自己联系对方。" },
    too_good: { label: "好得令人难以置信", tip: "您不可能赢得一个从没参加过的抽奖。" },
    secrecy: { label: "要求您保密", tip: "骗子想让您孤立无援。请和您信任的人谈谈。" },
    remote_access: { label: "想控制您的设备", tip: "绝不要让陌生人控制您的电脑或手机。" },
    mismatch: { label: "有些地方对不上", tip: "声称的发送者并不是真正的发送者。" },
    unexpected_contact: { label: "陌生人主动联系", tip: "陌生人的友好信息，之后可能会变成要钱。" },
  },
  stepsHeading: "现在该怎么做",
  steps: {
    likely_scam: [
      "不要回复，不要点击信息里的任何链接，也不要拨打里面的任何电话。",
      "不要付款，不要发送礼品卡、验证码或个人资料。",
      "屏蔽发送者，并删除这条信息。",
    ],
    careful: ["暂时不要点击信息里的链接或拨打里面的电话。", "请家人或朋友和您一起看看。"],
    no_signs: ["绝不要把密码、PIN 码或验证码告诉主动联系您的人。"],
  },
  trustedStep: "请用您本来就信任的电话号码或网站联系该机构，例如您的卡背面、账单上或其官方网站上的号码。不要用这条信息里的。",
  shareButton: "分享给家人",
  shared: "已复制。您可以把它粘贴到短信或邮件里。",
  shareIntro: "我用 ScamShield 检查了一条信息。",
  shareSigns: "警告信号：",
  shareCheckedWith: "您也可以自己检查：",
  clickedButton: "我已经点击、回复或付款了",
  againButton: "检查另一条信息",
  backButton: "返回",
  helpTitle: "已经点击、回复或付款了？",
  helpIntro: "别慌，也不用觉得丢脸。骗子每天都在骗细心的人。尽快行动会有帮助。",
  helpQuestion: "发生了什么？",
  helpTopics: {
    clicked: {
      label: "我点了链接或回复了",
      steps: [
        "关闭那个网页，不要在里面输入任何东西。",
        "不要再回复，屏蔽发送者。",
        "如果您输入了密码、卡号或其他资料，也请选择下面对应的选项。",
      ],
    },
    password: {
      label: "我给了密码或验证码",
      steps: [
        "立即修改那个密码，要通过真正的应用或网站，不要用别人发给您的链接。",
        "如果别的地方也用同一个密码，也要一起修改。",
        "如果账户提供两步验证，请开启。",
      ],
    },
    card: {
      label: "我给了银行卡或银行资料",
      steps: ["现在就拨打您卡背面的电话联系银行。", "请银行冻结这张卡并补发新卡。", "查看账单上有没有您不认识的消费。"],
    },
    money: {
      label: "我汇了钱（银行、电汇、Zelle、Cash App）",
      steps: [
        "立刻联系您的银行或付款应用，请他们停止或撤回这笔付款。",
        "如果是电汇，请要求办理\"电汇召回\"（wire recall）。",
        "不要再汇钱，即使对方承诺会还给您。",
      ],
    },
    giftcard: {
      label: "我用礼品卡付了钱",
      steps: ["现在就拨打礼品卡背面的电话联系发卡公司，说明这是诈骗。", "保留礼品卡和收据。", "无论对方怎么说，都不要再买卡。"],
    },
    ssn: {
      label: "我给了社会安全号码或证件照片",
      steps: [
        "访问 IdentityTheft.gov，获取一步一步的补救方案。",
        "在 Equifax、Experian 和 TransUnion 免费冻结您的信用。",
        "留意您的信件和银行账户里有没有不认识的东西。",
      ],
    },
    access: {
      label: "我让他们进入了我的电脑或手机",
      steps: [
        "现在就关闭 Wi-Fi 或拔掉网线。",
        "删除他们让您安装的任何应用。",
        "用另一台设备修改您的邮箱和银行密码。",
        "请信任的人或维修店检查这台设备。",
      ],
    },
    malware: {
      label: "我下载了对方发来的文件或应用",
      steps: [
        "不要再打开它。删除文件或卸载应用。",
        "关闭 Wi-Fi，然后运行设备自带的安全检查（电脑用 Windows 安全中心；手机请更新系统）。",
        "用另一台设备修改您的邮箱和银行密码。",
        "请信任的人或维修店检查这台设备。",
      ],
    },
    meetup: {
      label: "有人要来找我，或我已经和对方见过面",
      steps: [
        "如果有人要上门来取现金、黄金、银行卡或包裹，什么都不要交出去。真正的银行、警察和政府机构从不派人上门取钱。",
        "如果您感到不安全，请拨打 911。否则请打电话给当地警察，告诉他们有人要上门来取东西。",
        "如果已经交出去了，记下对方的长相、车辆和时间，并立刻报警。",
        "绝不要单独去见网上认识的人。约在人多的公共场所，并告诉别人您的去向。",
      ],
    },
    crypto: {
      label: "我转了加密货币或用了比特币 ATM",
      steps: [
        "立刻用机器或收据上的电话联系加密货币交易所或比特币 ATM 公司。",
        "保留收据、钱包地址和交易编号。",
        "在 ic3.gov 向联邦调查局（FBI）举报，并在 ReportFraud.ftc.gov 举报。",
        "小心任何收费帮您\"追回\"钱的人。那是第二个骗局。",
      ],
    },
    check: {
      label: "我存了陌生人寄来的支票",
      steps: [
        "不要花这笔钱，也不要退回任何钱，即使对方说是寄错了。",
        "现在就告诉银行您怀疑这张支票是假的。支票可能几天甚至几周后才被退票。",
        "不要再和寄支票的人联系。",
      ],
    },
    threats: {
      label: "对方在威胁或勒索我",
      steps: [
        "不要再回复，也不要付钱。付了钱通常只会被要更多。",
        "把信息截图保存，然后屏蔽对方。",
        "如果您有危险，请拨打 911。网上的威胁可以在 ic3.gov 举报。",
        "和您信任的人谈谈。被骗子盯上不是您的错。",
      ],
    },
  },
  reportHeading: "举报",
  reportSteps: [
    "如果涉及钱或银行卡资料，请告诉您的银行。",
    "在 ReportFraud.ftc.gov 向联邦贸易委员会（FTC）举报。",
    "如果您损失了钱，也请向当地警察报案。",
    "免费求助热线：AARP Fraud Watch，877-908-3360。",
    "告诉一个您信任的人。您不必独自面对。",
  ],
  helpOpenAnother: "选择其他",
  footer: "ScamShield 不会保存您检查的内容。",
};

const vi: Strings = {
  languageLabel: "Ngôn ngữ",
  homeTitle: "Kiểm tra một tin nhắn",
  homeIntro:
    "Không chắc về một tin nhắn, email, thư hay cuộc gọi? Hãy kiểm tra ở đây trước khi trả lời, bấm vào hay trả tiền.",
  tabs: { text: "Dán chữ", image: "Thêm ảnh chụp", call: "Kể về cuộc gọi" },
  textLabel: "Tin nhắn",
  textPlaceholder: "Dán hoặc gõ tin nhắn vào đây",
  callLabel: "Chuyện gì xảy ra trong cuộc gọi",
  callPlaceholder: "Họ nói họ là ai? Họ bảo quý vị làm gì?",
  imageChoose: "Chọn ảnh chụp màn hình hoặc ảnh",
  imageChange: "Chọn ảnh khác",
  imageHint: "Ảnh chụp màn hình tin nhắn hoặc email, hoặc ảnh chụp một lá thư.",
  imageAlt: "Ảnh quý vị đã chọn",
  checkButton: "Kiểm tra tin nhắn này",
  privacy: "Chúng tôi không lưu tin nhắn của quý vị.",
  checking: "Đang đọc tin nhắn của quý vị…",
  errors: {
    empty: "Hãy dán hoặc gõ tin nhắn trước.",
    tooLong: "Quá dài. Chỉ dán phần tin nhắn, tối đa 5.000 ký tự.",
    imageMissing: "Hãy chọn ảnh chụp màn hình hoặc ảnh trước.",
    imageBad: "Chúng tôi không mở được ảnh đó. Hãy thử ảnh khác.",
    unreadable: "Chúng tôi không đọc được tin nhắn trong ảnh đó. Hãy thử ảnh rõ hơn, hoặc dán chữ vào.",
    busy: "Hiện có quá nhiều người đang kiểm tra. Vui lòng thử lại sau vài phút.",
    failed: "Có lỗi xảy ra ở phía chúng tôi. Vui lòng thử lại.",
    offline: "Không kết nối được. Hãy kiểm tra mạng và thử lại.",
  },
  verdicts: {
    likely_scam: { title: "Rất có thể là lừa đảo", sub: "Đừng trả lời, đừng bấm vào, đừng trả tiền." },
    careful: { title: "Hãy cẩn thận", sub: "Hãy kiểm tra bằng cách khác trước khi làm gì." },
    no_signs: {
      title: "Không thấy dấu hiệu cảnh báo thường gặp",
      sub: "Nếu nó đòi tiền hoặc thông tin, vẫn nên kiểm tra qua số điện thoại chính thức.",
    },
  },
  summaryLabel: "Nó muốn quý vị làm gì:",
  messageHeading: "Tin nhắn",
  signsHeading: "Dấu hiệu cảnh báo chúng tôi tìm thấy",
  noSignsNote:
    "Chúng tôi không thấy dấu hiệu cảnh báo thường gặp nào. Kẻ lừa đảo luôn thay đổi cách làm, nên hãy tiếp tục cẩn thận.",
  signs: {
    urgency: { label: "Hối thúc quý vị", tip: "Kẻ lừa đảo hối thúc để quý vị không kịp suy nghĩ." },
    threat: {
      label: "Đe dọa hoặc gây sợ hãi",
      tip: "Cơ quan thật không đe dọa bắt giữ hay phạt tiền qua tin nhắn, email hay điện thoại.",
    },
    unusual_payment: {
      label: "Cách trả tiền lạ",
      tip: "Phí bất ngờ và cách trả tiền lạ, như thẻ quà tặng, tiền mã hóa hay chuyển khoản, là mánh lừa đảo thường gặp.",
    },
    secrets: {
      label: "Đòi thông tin riêng tư",
      tip: "Ngân hàng thật không bao giờ hỏi mã PIN, mật khẩu hay mã xác nhận.",
    },
    suspicious_link: { label: "Đường link đáng ngờ", tip: "Đường link không dẫn đến trang web thật của công ty." },
    impersonation: {
      label: "Giả làm người hoặc nơi quý vị tin",
      tip: "Hãy tự liên lạc với họ bằng số điện thoại quý vị đã tin tưởng.",
    },
    too_good: { label: "Tốt đến khó tin", tip: "Quý vị không thể trúng một cuộc thi mà mình không tham gia." },
    secrecy: {
      label: "Bảo quý vị giữ bí mật",
      tip: "Kẻ lừa đảo muốn quý vị một mình. Hãy nói chuyện với người quý vị tin.",
    },
    remote_access: {
      label: "Muốn điều khiển thiết bị của quý vị",
      tip: "Đừng bao giờ để người lạ điều khiển máy tính hay điện thoại của quý vị.",
    },
    mismatch: { label: "Có điều không khớp", tip: "Người nói là gửi tin không phải là người thật sự gửi." },
    unexpected_contact: {
      label: "Người lạ chủ động liên lạc",
      tip: "Tin nhắn thân thiện từ người lạ về sau có thể thành lời xin tiền.",
    },
  },
  stepsHeading: "Bây giờ nên làm gì",
  steps: {
    likely_scam: [
      "Đừng trả lời, đừng bấm vào link, và đừng gọi số nào trong tin nhắn.",
      "Đừng trả tiền, đừng gửi thẻ quà tặng, mã số hay thông tin cá nhân.",
      "Chặn người gửi và xóa tin nhắn.",
    ],
    careful: [
      "Khoan bấm vào link hay gọi số điện thoại trong tin nhắn.",
      "Nhờ người thân hoặc bạn bè xem cùng quý vị.",
    ],
    no_signs: ["Đừng bao giờ đưa mật khẩu, mã PIN hay mã số cho người tự liên lạc với quý vị."],
  },
  trustedStep:
    "Hãy liên lạc với tổ chức đó bằng số điện thoại hoặc trang web quý vị đã tin tưởng, như số trên thẻ, trên hóa đơn hoặc trang web chính thức của họ. Không dùng số trong tin nhắn này.",
  shareButton: "Chia sẻ với gia đình",
  shared: "Đã sao chép. Quý vị có thể dán vào tin nhắn hoặc email.",
  shareIntro: "Tôi đã kiểm tra một tin nhắn bằng ScamShield.",
  shareSigns: "Dấu hiệu cảnh báo:",
  shareCheckedWith: "Tự kiểm tra tại:",
  clickedButton: "Tôi đã bấm vào, trả lời hoặc trả tiền",
  againButton: "Kiểm tra tin nhắn khác",
  backButton: "Quay lại",
  helpTitle: "Đã bấm vào, trả lời hoặc trả tiền?",
  helpIntro:
    "Đừng hoảng sợ và đừng xấu hổ. Kẻ lừa đảo lừa cả những người cẩn thận mỗi ngày. Hành động nhanh sẽ giúp ích.",
  helpQuestion: "Chuyện gì đã xảy ra?",
  helpTopics: {
    clicked: {
      label: "Tôi đã bấm vào link hoặc trả lời",
      steps: [
        "Đóng trang đó lại. Đừng gõ gì vào đó.",
        "Đừng trả lời nữa. Chặn người gửi.",
        "Nếu quý vị đã gõ mật khẩu, số thẻ hay thông tin khác, hãy chọn thêm mục đó bên dưới.",
      ],
    },
    password: {
      label: "Tôi đã đưa mật khẩu hoặc mã số",
      steps: [
        "Đổi mật khẩu đó ngay, bằng ứng dụng hoặc trang web thật, không dùng link được gửi cho quý vị.",
        "Nếu quý vị dùng cùng mật khẩu ở chỗ khác, hãy đổi ở đó luôn.",
        "Bật xác minh 2 bước nếu tài khoản có.",
      ],
    },
    card: {
      label: "Tôi đã đưa thông tin thẻ hoặc ngân hàng",
      steps: [
        "Gọi ngân hàng ngay, bằng số ở mặt sau thẻ của quý vị.",
        "Xin họ khóa thẻ và gửi thẻ mới.",
        "Xem sao kê để tìm khoản chi quý vị không biết.",
      ],
    },
    money: {
      label: "Tôi đã gửi tiền (ngân hàng, chuyển khoản, Zelle, Cash App)",
      steps: [
        "Gọi ngay cho ngân hàng hoặc ứng dụng thanh toán. Xin họ dừng hoặc hoàn lại khoản tiền.",
        "Nếu là chuyển khoản điện tử (wire), hãy xin \"wire recall\".",
        "Đừng gửi thêm tiền, dù họ hứa sẽ trả lại.",
      ],
    },
    giftcard: {
      label: "Tôi đã trả bằng thẻ quà tặng",
      steps: [
        "Gọi ngay công ty phát hành thẻ, bằng số ở mặt sau thẻ. Nói rằng đây là lừa đảo.",
        "Giữ lại thẻ và hóa đơn.",
        "Đừng mua thêm thẻ, dù họ nói gì.",
      ],
    },
    ssn: {
      label: "Tôi đã đưa số An Sinh Xã Hội hoặc ảnh giấy tờ tùy thân",
      steps: [
        "Vào IdentityTheft.gov để có kế hoạch khắc phục từng bước.",
        "Đóng băng tín dụng miễn phí với Equifax, Experian và TransUnion.",
        "Để ý thư từ và tài khoản ngân hàng xem có gì lạ không.",
      ],
    },
    access: {
      label: "Tôi đã cho họ vào máy tính hoặc điện thoại",
      steps: [
        "Tắt Wi-Fi hoặc rút dây mạng ngay.",
        "Xóa ứng dụng mà họ bảo quý vị cài.",
        "Dùng một thiết bị khác để đổi mật khẩu email và ngân hàng.",
        "Nhờ người quý vị tin hoặc tiệm sửa máy kiểm tra thiết bị.",
      ],
    },
    malware: {
      label: "Tôi đã tải tập tin hoặc ứng dụng họ gửi",
      steps: [
        "Đừng mở lại. Xóa tập tin hoặc gỡ ứng dụng.",
        "Tắt Wi-Fi, rồi chạy kiểm tra bảo mật có sẵn trên thiết bị (Windows Security trên máy tính; cập nhật điện thoại).",
        "Dùng một thiết bị khác để đổi mật khẩu email và ngân hàng.",
        "Nhờ người quý vị tin hoặc tiệm sửa máy kiểm tra thiết bị.",
      ],
    },
    meetup: {
      label: "Có người đang đến gặp tôi, hoặc tôi đã gặp họ",
      steps: [
        "Nếu có người đang đến lấy tiền mặt, vàng, thẻ hoặc gói hàng, đừng đưa gì cả. Ngân hàng, cảnh sát và cơ quan chính phủ thật không bao giờ cử người đến lấy tiền.",
        "Nếu thấy không an toàn, hãy gọi 911. Nếu không, gọi cảnh sát địa phương và báo có người sắp đến lấy đồ.",
        "Nếu đã đưa rồi, hãy ghi lại hình dáng người đó, xe và giờ giấc, rồi gọi cảnh sát ngay.",
        "Đừng bao giờ gặp người quen trên mạng một mình. Hẹn ở nơi công cộng đông người và báo cho người khác biết.",
      ],
    },
    crypto: {
      label: "Tôi đã gửi tiền mã hóa hoặc dùng máy ATM Bitcoin",
      steps: [
        "Liên lạc ngay với sàn tiền mã hóa hoặc công ty máy ATM Bitcoin, bằng số trên máy hoặc trên biên lai.",
        "Giữ biên lai, địa chỉ ví và mã giao dịch.",
        "Báo cáo với FBI tại ic3.gov và tại ReportFraud.ftc.gov.",
        "Cẩn thận với ai hứa \"lấy lại\" tiền cho quý vị nếu trả phí. Đó là vụ lừa thứ hai.",
      ],
    },
    check: {
      label: "Tôi đã gửi vào ngân hàng tấm séc người lạ gửi",
      steps: [
        "Đừng tiêu số tiền đó, và đừng gửi lại đồng nào, dù họ nói là gửi nhầm.",
        "Báo ngay cho ngân hàng rằng quý vị nghĩ tấm séc là giả. Séc có thể bị trả về sau nhiều ngày hoặc nhiều tuần.",
        "Ngừng liên lạc với người đã gửi séc.",
      ],
    },
    threats: {
      label: "Họ đang đe dọa hoặc tống tiền tôi",
      steps: [
        "Ngừng trả lời và đừng trả tiền. Trả tiền thường khiến họ đòi thêm.",
        "Chụp màn hình lưu tin nhắn, rồi chặn người gửi.",
        "Nếu đang gặp nguy hiểm, hãy gọi 911. Báo cáo đe dọa trên mạng tại ic3.gov.",
        "Nói chuyện với người quý vị tin. Bị nhắm đến không phải lỗi của quý vị.",
      ],
    },
  },
  reportHeading: "Báo cáo",
  reportSteps: [
    "Báo cho ngân hàng nếu có liên quan đến tiền hoặc thông tin thẻ.",
    "Báo cáo với FTC tại ReportFraud.ftc.gov.",
    "Nếu bị mất tiền, hãy báo cả cảnh sát địa phương.",
    "Đường dây trợ giúp miễn phí: AARP Fraud Watch, 877-908-3360.",
    "Kể cho người quý vị tin. Quý vị không phải tự lo một mình.",
  ],
  helpOpenAnother: "Chọn mục khác",
  footer: "ScamShield không lưu những gì quý vị kiểm tra.",
};

const tl: Strings = {
  languageLabel: "Wika",
  homeTitle: "Suriin ang isang mensahe",
  homeIntro:
    "Hindi sigurado sa isang text, email, sulat o tawag? Suriin ito dito bago ka sumagot, mag-click o magbayad.",
  tabs: { text: "I-paste ang text", image: "Mag-screenshot", call: "Ilarawan ang tawag" },
  textLabel: "Ang mensahe",
  textPlaceholder: "I-paste o i-type ang mensahe dito",
  callLabel: "Ano ang nangyari sa tawag",
  callPlaceholder: "Sino raw sila? Ano ang pinagagawa nila sa iyo?",
  imageChoose: "Pumili ng screenshot o litrato",
  imageChange: "Pumili ng ibang larawan",
  imageHint: "Screenshot ng text o email, o litrato ng sulat.",
  imageAlt: "Ang larawang pinili mo",
  checkButton: "Suriin ang mensaheng ito",
  privacy: "Hindi namin sine-save ang iyong mga mensahe.",
  checking: "Binabasa ang iyong mensahe…",
  errors: {
    empty: "I-paste o i-type muna ang mensahe.",
    tooLong: "Masyadong mahaba. I-paste lang ang mensahe, hanggang 5,000 character.",
    imageMissing: "Pumili muna ng screenshot o litrato.",
    imageBad: "Hindi namin mabuksan ang larawang iyan. Subukan ang ibang screenshot o litrato.",
    unreadable: "Wala kaming mabasang mensahe sa larawang iyan. Subukan ang mas malinaw na litrato, o i-paste ang mga salita.",
    busy: "Maraming tao ang nagsusuri ngayon. Pakisubukang muli pagkalipas ng ilang minuto.",
    failed: "May nagkaproblema sa aming panig. Pakisubukang muli.",
    offline: "Hindi kami makakonekta. Tingnan ang iyong internet at subukang muli.",
  },
  verdicts: {
    likely_scam: { title: "Malamang na scam ito", sub: "Huwag sumagot, mag-click o magbayad." },
    careful: { title: "Mag-ingat", sub: "Suriin ito sa ibang paraan bago kumilos." },
    no_signs: {
      title: "Walang nakitang karaniwang babala",
      sub: "Kung humihingi ito ng pera o detalye, tiyakin pa rin sa opisyal na numero.",
    },
  },
  summaryLabel: "Ang gusto nitong ipagawa sa iyo:",
  messageHeading: "Ang mensahe",
  signsHeading: "Mga babalang nakita namin",
  noSignsNote:
    "Wala kaming nakitang karaniwang babala. Palaging nagbabago ang mga scam, kaya patuloy na mag-ingat.",
  signs: {
    urgency: { label: "Minamadali ka", tip: "Minamadali ka ng scammer para hindi ka makapag-isip." },
    threat: {
      label: "Pananakot",
      tip: "Hindi nananakot ng pag-aresto o multa ang tunay na ahensya sa text, email o telepono.",
    },
    unusual_payment: {
      label: "Kakaibang paraan ng bayad",
      tip: "Ang biglaang singil at kakaibang paraan ng bayad, tulad ng gift card, crypto o wire transfer, ay karaniwang taktika ng scam.",
    },
    secrets: {
      label: "Humihingi ng pribadong detalye",
      tip: "Hindi kailanman hihingin ng tunay na bangko ang iyong PIN, password o code.",
    },
    suspicious_link: { label: "Kahina-hinalang link", tip: "Hindi papunta sa tunay na website ng kumpanya ang link." },
    impersonation: {
      label: "Nagpapanggap na pinagkakatiwalaan mo",
      tip: "Ikaw mismo ang tumawag sa kanila gamit ang numerong pinagkakatiwalaan mo na.",
    },
    too_good: { label: "Masyadong maganda para totoo", tip: "Hindi ka mananalo sa paligsahang hindi mo sinalihan." },
    secrecy: {
      label: "Pinalilihim sa iyo",
      tip: "Gusto ng scammer na mag-isa ka. Kausapin ang taong pinagkakatiwalaan mo.",
    },
    remote_access: {
      label: "Gustong kontrolin ang iyong device",
      tip: "Huwag hayaang kontrolin ng estranghero ang iyong computer o telepono.",
    },
    mismatch: { label: "May hindi tugma", tip: "Hindi ang sinasabing nagpadala ang tunay na nagpadala." },
    unexpected_contact: {
      label: "Estrangherong lumalapit",
      tip: "Ang mabait na mensahe mula sa estranghero ay maaaring mauwi sa paghingi ng pera.",
    },
  },
  stepsHeading: "Ano ang gagawin ngayon",
  steps: {
    likely_scam: [
      "Huwag sumagot, mag-click ng link, o tumawag sa anumang numero sa mensahe.",
      "Huwag magbayad o magpadala ng gift card, code o personal na detalye.",
      "I-block ang nagpadala at burahin ang mensahe.",
    ],
    careful: [
      "Huwag munang mag-click ng link o tumawag sa numero sa mensahe.",
      "Ipatingin ito sa isang kapamilya o kaibigan.",
    ],
    no_signs: ["Huwag ibigay ang password, PIN o code sa sinumang kumontak sa iyo."],
  },
  trustedStep:
    "Kontakin ang organisasyon gamit ang numero o website na pinagkakatiwalaan mo na, tulad ng nasa iyong card, bill o opisyal nilang website. Hindi ang nasa mensaheng ito.",
  shareButton: "Ibahagi sa pamilya",
  shared: "Nakopya na. Maaari mo itong i-paste sa text o email.",
  shareIntro: "Sinuri ko ang isang mensahe gamit ang ScamShield.",
  shareSigns: "Mga babala:",
  shareCheckedWith: "Suriin mo rin dito:",
  clickedButton: "Nakapag-click, sumagot o nagbayad na ako",
  againButton: "Suriin ang ibang mensahe",
  backButton: "Bumalik",
  helpTitle: "Nakapag-click, sumagot o nagbayad na?",
  helpIntro:
    "Huwag mag-panic at huwag mahiya. Araw-araw nalilinlang ng scammer kahit ang maingat na tao. Makatutulong ang mabilis na pagkilos.",
  helpQuestion: "Ano ang nangyari?",
  helpTopics: {
    clicked: {
      label: "Nag-click ako ng link o sumagot",
      steps: [
        "Isara ang page. Huwag mag-type ng kahit ano roon.",
        "Huwag nang sumagot. I-block ang nagpadala.",
        "Kung nag-type ka ng password, numero ng card o ibang detalye, piliin din ang opsyong iyon sa ibaba.",
      ],
    },
    password: {
      label: "Nagbigay ako ng password o code",
      steps: [
        "Palitan agad ang password na iyon, sa tunay na app o website, hindi sa link na ipinadala sa iyo.",
        "Kung ginagamit mo ang parehong password sa iba, palitan din doon.",
        "I-on ang 2-step sign-in kung mayroon ang account.",
      ],
    },
    card: {
      label: "Nagbigay ako ng detalye ng card o bangko",
      steps: [
        "Tawagan agad ang iyong bangko, sa numerong nasa likod ng iyong card.",
        "Ipa-block ang card at humingi ng bago.",
        "Tingnan ang iyong statement kung may singil na hindi mo kilala.",
      ],
    },
    money: {
      label: "Nagpadala ako ng pera (bangko, wire, Zelle, Cash App)",
      steps: [
        "Tawagan agad ang iyong bangko o ang payment app. Hilingin na pigilan o ibalik ang bayad.",
        "Kung wire transfer, humingi ng \"wire recall.\"",
        "Huwag nang magpadala ng pera, kahit mangako silang ibabalik ito.",
      ],
    },
    giftcard: {
      label: "Nagbayad ako gamit ang gift card",
      steps: [
        "Tawagan agad ang kumpanya ng gift card, sa numerong nasa likod ng card. Sabihing scam ito.",
        "Itago ang mga card at resibo.",
        "Huwag nang bumili ng card, anuman ang sabihin nila.",
      ],
    },
    ssn: {
      label: "Ibinigay ko ang aking Social Security number o litrato ng ID ko",
      steps: [
        "Pumunta sa IdentityTheft.gov para sa sunud-sunod na plano.",
        "I-freeze nang libre ang iyong credit sa Equifax, Experian at TransUnion.",
        "Bantayan ang iyong sulat at bank account kung may hindi mo kilala.",
      ],
    },
    access: {
      label: "Pinapasok ko sila sa aking computer o telepono",
      steps: [
        "I-off agad ang Wi-Fi o tanggalin ang internet.",
        "Burahin ang anumang app na ipina-install nila.",
        "Sa ibang device, palitan ang password ng iyong email at bangko.",
        "Ipasuri ang device sa taong pinagkakatiwalaan mo o sa repair shop.",
      ],
    },
    malware: {
      label: "Nag-download ako ng file o app na ipinadala nila",
      steps: [
        "Huwag na itong buksan ulit. Burahin ang file o i-uninstall ang app.",
        "I-off ang Wi-Fi, saka patakbuhin ang built-in na security check ng device (Windows Security sa computer; i-update ang telepono).",
        "Sa ibang device, palitan ang password ng iyong email at bangko.",
        "Ipasuri ang device sa taong pinagkakatiwalaan mo o sa repair shop.",
      ],
    },
    meetup: {
      label: "May pupunta sa akin, o nakipagkita na ako sa kanila",
      steps: [
        "Kung may papunta para kunin ang cash, ginto, card o package, huwag magbigay ng kahit ano. Hindi nagpapadala ng courier ang tunay na bangko, pulis o ahensya ng gobyerno.",
        "Kung pakiramdam mo ay hindi ka ligtas, tumawag sa 911. Kung hindi, tawagan ang lokal na pulis at sabihing may courier na papunta.",
        "Kung may naibigay ka na, isulat ang itsura nila, ang sasakyan at ang oras, at tumawag agad sa pulis.",
        "Huwag makipagkita nang mag-isa sa nakilala mo online. Sa mataong pampublikong lugar, at sabihan ang iba kung nasaan ka.",
      ],
    },
    crypto: {
      label: "Nagpadala ako ng crypto o gumamit ng Bitcoin ATM",
      steps: [
        "Tawagan agad ang crypto exchange o ang kumpanya ng Bitcoin ATM, gamit ang numero sa makina o resibo.",
        "Itago ang resibo, ang wallet address at anumang transaction ID.",
        "I-report sa FBI sa ic3.gov at sa ReportFraud.ftc.gov.",
        "Mag-ingat sa sinumang nag-aalok na \"bawiin\" ang pera mo kapalit ng bayad. Pangalawang scam iyon.",
      ],
    },
    check: {
      label: "Nag-deposito ako ng tseke na ipinadala ng estranghero",
      steps: [
        "Huwag gastusin ang pera at huwag magpadala pabalik, kahit sabihin nilang nagkamali sila.",
        "Sabihan ngayon ang bangko na sa tingin mo ay peke ang tseke. Maaaring tumalbog ang tseke pagkalipas ng ilang araw o linggo.",
        "Huminto na sa pakikipag-usap sa nagpadala nito.",
      ],
    },
    threats: {
      label: "Tinatakot o bina-blackmail nila ako",
      steps: [
        "Huminto sa pagsagot at huwag magbayad. Kadalasang humihingi pa sila ng higit kapag nagbayad ka.",
        "I-save ang mga mensahe gamit ang screenshot, saka i-block ang nagpadala.",
        "Kung nasa panganib ka, tumawag sa 911. I-report ang online na pananakot sa ic3.gov.",
        "Kausapin ang taong pinagkakatiwalaan mo. Hindi mo kasalanan na ikaw ang tinarget.",
      ],
    },
  },
  reportHeading: "I-report ito",
  reportSteps: [
    "Sabihan ang iyong bangko kung may kinalaman ang pera o detalye ng card.",
    "I-report sa FTC sa ReportFraud.ftc.gov.",
    "Kung nawalan ka ng pera, i-report din sa lokal na pulis.",
    "Libreng help line: AARP Fraud Watch, 877-908-3360.",
    "Sabihan ang taong pinagkakatiwalaan mo. Hindi mo kailangang harapin ito nang mag-isa.",
  ],
  helpOpenAnother: "Pumili ng iba",
  footer: "Hindi sine-save ng ScamShield ang iyong sinusuri.",
};

export const STRINGS: Record<Language, Strings> = { en, es, zh, vi, tl, hi, fr };
